(() => {
  "use strict";

  const SESSION_KEY = "phn.personal.vault.key.v1";
  const expectedVerifier = "SOLPIENT_PERSONAL_VAULT_V1";
  let vaultKey = null;
  let config = null;
  let links = null;
  let activeBlobUrl = null;

  const $ = (s) => document.querySelector(s);
  const lockedView = $("#lockedView");
  const unlockedView = $("#unlockedView");
  const unlockForm = $("#unlockForm");
  const pinInput = $("#pinInput");
  const gateMessage = $("#gateMessage");
  const unlockButton = $("#unlockButton");
  const lockButton = $("#lockButton");
  const linkGrid = $("#linkGrid");
  const viewer = $("#viewer");
  const viewerFrame = $("#viewerFrame");
  const viewerTitle = $("#viewerTitle");
  const closeViewer = $("#closeViewer");

  function b64ToBytes(value) {
    const raw = atob(value);
    const out = new Uint8Array(raw.length);
    for (let i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
    return out;
  }

  function bytesToB64(bytes) {
    let raw = "";
    bytes.forEach((b) => raw += String.fromCharCode(b));
    return btoa(raw);
  }

  async function loadConfig() {
    if (!config) {
      const data = window.PERSONAL_VAULT_DATA;
      if (!data?.config) throw new Error("Vault configuration is unavailable.");
      config = data.config;
    }
    return config;
  }

  async function deriveKey(pin) {
    const cfg = await loadConfig();
    const material = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(pin),
      { name: "PBKDF2" },
      false,
      ["deriveKey"]
    );
    return crypto.subtle.deriveKey(
      { name: "PBKDF2", salt: b64ToBytes(cfg.salt), iterations: cfg.iterations, hash: "SHA-256" },
      material,
      { name: "AES-GCM", length: 256 },
      true,
      ["encrypt", "decrypt"]
    );
  }

  async function decryptBytes(payload, key = vaultKey) {
    const plain = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv: b64ToBytes(payload.iv) },
      key,
      b64ToBytes(payload.ciphertext)
    );
    return new Uint8Array(plain);
  }

  async function verifyKey(key) {
    try {
      const cfg = await loadConfig();
      const bytes = await decryptBytes(cfg.verifier, key);
      return new TextDecoder().decode(bytes) === expectedVerifier;
    } catch {
      return false;
    }
  }

  async function saveSessionKey(key) {
    const raw = new Uint8Array(await crypto.subtle.exportKey("raw", key));
    sessionStorage.setItem(SESSION_KEY, bytesToB64(raw));
  }

  async function restoreSessionKey() {
    const saved = sessionStorage.getItem(SESSION_KEY);
    if (!saved) return false;
    try {
      const key = await crypto.subtle.importKey("raw", b64ToBytes(saved), { name: "AES-GCM" }, true, ["encrypt", "decrypt"]);
      if (!(await verifyKey(key))) throw new Error("Invalid saved key");
      vaultKey = key;
      return true;
    } catch {
      sessionStorage.removeItem(SESSION_KEY);
      return false;
    }
  }

  function setUnlocked(unlocked) {
    lockedView.hidden = unlocked;
    unlockedView.hidden = !unlocked;
    lockButton.hidden = !unlocked;
    if (unlocked) renderLinks();
  }

  async function getLinks() {
    if (!links) {
      const data = window.PERSONAL_VAULT_DATA;
      if (!Array.isArray(data?.items)) throw new Error("Vault link registry is unavailable.");
      links = { items: data.items };
    }
    return links;
  }

  async function renderLinks() {
    const data = await getLinks();
    linkGrid.innerHTML = "";
    data.items.forEach((item) => {
      const card = document.createElement("article");
      card.className = "private-card";
      card.tabIndex = 0;
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", "Open " + item.title);
      card.innerHTML =
        '<span class="card-icon">▦</span>' +
        '<h2>' + item.title + '</h2>' +
        '<p>' + item.subtitle + '</p>' +
        '<div class="card-bottom"><span>Updated ' + item.updated + '</span><span class="card-open">Open →</span></div>';
      const open = () => openItem(item);
      card.addEventListener("click", open);
      card.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") open(); });
      linkGrid.appendChild(card);
    });
  }

  async function fetchPayload(item) {
    const payload = window.PERSONAL_VAULT_DATA?.payloads?.[item.id];
    if (!payload) throw new Error("Encrypted content is unavailable.");
    return payload;
  }

  async function decompressGzip(bytes) {
    if (!("DecompressionStream" in window)) {
      throw new Error("This browser cannot decompress the private page.");
    }
    const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream("gzip"));
    return new Uint8Array(await new Response(stream).arrayBuffer());
  }

  async function openItem(item) {
    if (!vaultKey) return;
    viewer.hidden = false;
    viewer.classList.remove("is-ready");
    viewerTitle.textContent = item.title;
    viewerFrame.removeAttribute("src");
    try {
      const payload = await fetchPayload(item);
      let bytes = await decryptBytes(payload.content);
      if (payload.compression === "gzip") bytes = await decompressGzip(bytes);
      if (activeBlobUrl) URL.revokeObjectURL(activeBlobUrl);
      activeBlobUrl = URL.createObjectURL(new Blob([bytes], { type: "text/html" }));
      viewerFrame.onload = () => viewer.classList.add("is-ready");
      viewerFrame.src = activeBlobUrl;
    } catch (error) {
      console.error(error);
      viewer.hidden = true;
      alert("Unable to decrypt this private page.");
    }
  }

  function closePrivateViewer() {
    viewer.hidden = true;
    viewer.classList.remove("is-ready");
    viewerFrame.removeAttribute("src");
    if (activeBlobUrl) {
      URL.revokeObjectURL(activeBlobUrl);
      activeBlobUrl = null;
    }
  }

  unlockForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const pin = pinInput.value.trim();
    if (!pin) return;
    unlockButton.disabled = true;
    unlockButton.textContent = "Checking…";
    gateMessage.textContent = "";
    try {
      const key = await deriveKey(pin);
      if (!(await verifyKey(key))) {
        gateMessage.textContent = "Incorrect PIN.";
        pinInput.select();
        return;
      }
      vaultKey = key;
      await saveSessionKey(key);
      pinInput.value = "";
      setUnlocked(true);
    } catch (error) {
      console.error(error);
      gateMessage.textContent = "This browser could not unlock the vault.";
    } finally {
      unlockButton.disabled = false;
      unlockButton.textContent = "Unlock";
    }
  });

  lockButton.addEventListener("click", () => {
    closePrivateViewer();
    vaultKey = null;
    sessionStorage.removeItem(SESSION_KEY);
    setUnlocked(false);
    setTimeout(() => pinInput.focus(), 50);
  });

  closeViewer.addEventListener("click", closePrivateViewer);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !viewer.hidden) closePrivateViewer();
  });

  (async () => {
    if (!window.crypto?.subtle) {
      gateMessage.textContent = "Web Crypto is not available in this browser.";
      unlockButton.disabled = true;
      return;
    }
    await loadConfig();
    if (await restoreSessionKey()) setUnlocked(true);
    else setUnlocked(false);
  })();
})();