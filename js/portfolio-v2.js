(() => {
  const nav = document.querySelector(".site-nav");
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");

  const syncNav = () => {
    if (nav) nav.classList.toggle("is-scrolled", window.scrollY > 18);
  };
  syncNav();
  window.addEventListener("scroll", syncNav, { passive: true });

  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("is-open");
      document.body.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", String(open));
    });
    links.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => {
      links.classList.remove("is-open");
      document.body.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
    }));
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduced && window.matchMedia("(pointer:fine)").matches) {
    document.querySelectorAll(".tilt").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(900px) rotateX(${-y * 3.5}deg) rotateY(${x * 4}deg) translateY(-3px)`;
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
  }

  if (!reduced && window.matchMedia("(pointer:fine)").matches) {
    const depthScenes = [...document.querySelectorAll(".depth-scene")];
    window.addEventListener("pointermove", (e) => {
      const x = (e.clientX / window.innerWidth - 0.5);
      const y = (e.clientY / window.innerHeight - 0.5);
      depthScenes.forEach((scene, i) => {
        const strength = 9 + (i % 3) * 4;
        scene.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`;
      });
    }, { passive: true });
  }

  const holder = document.getElementById("hero3d");
  if (!holder || !window.THREE || reduced) return;

  const THREE = window.THREE;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 100);
  camera.position.set(0, 0, 7.2);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
  renderer.setClearColor(0x000000, 0);
  holder.appendChild(renderer.domElement);

  const group = new THREE.Group();
  scene.add(group);

  const nodeCount = 86;
  const radius = 2.15;
  const positions = [];
  const pointPositions = new Float32Array(nodeCount * 3);

  for (let i = 0; i < nodeCount; i++) {
    const phi = Math.acos(1 - 2 * (i + 0.5) / nodeCount);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    const jitter = 0.88 + Math.random() * 0.18;
    const p = new THREE.Vector3(
      radius * jitter * Math.sin(phi) * Math.cos(theta),
      radius * jitter * Math.cos(phi),
      radius * jitter * Math.sin(phi) * Math.sin(theta)
    );
    positions.push(p);
    pointPositions[i * 3] = p.x;
    pointPositions[i * 3 + 1] = p.y;
    pointPositions[i * 3 + 2] = p.z;
  }

  const pointGeo = new THREE.BufferGeometry();
  pointGeo.setAttribute("position", new THREE.BufferAttribute(pointPositions, 3));
  const pointMat = new THREE.PointsMaterial({
    color: 0xb9caff,
    size: 0.055,
    transparent: true,
    opacity: 0.92,
    sizeAttenuation: true
  });
  group.add(new THREE.Points(pointGeo, pointMat));

  const lineVerts = [];
  for (let i = 0; i < nodeCount; i++) {
    const nearest = positions
      .map((p, j) => ({ j, d: i === j ? Infinity : positions[i].distanceTo(p) }))
      .sort((a, b) => a.d - b.d)
      .slice(0, 2);
    nearest.forEach(({ j, d }) => {
      if (j > i && d < 1.1) {
        lineVerts.push(
          positions[i].x, positions[i].y, positions[i].z,
          positions[j].x, positions[j].y, positions[j].z
        );
      }
    });
  }

  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute("position", new THREE.Float32BufferAttribute(lineVerts, 3));
  const lineMat = new THREE.LineBasicMaterial({
    color: 0x5d80e8,
    transparent: true,
    opacity: 0.24
  });
  group.add(new THREE.LineSegments(lineGeo, lineMat));

  const shellGeo = new THREE.IcosahedronGeometry(2.33, 2);
  const shellMat = new THREE.MeshBasicMaterial({
    color: 0x3b5fc3,
    wireframe: true,
    transparent: true,
    opacity: 0.05
  });
  group.add(new THREE.Mesh(shellGeo, shellMat));

  const ringGeo = new THREE.TorusGeometry(2.72, 0.006, 8, 180);
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0x59d7c6,
    transparent: true,
    opacity: 0.18
  });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = 1.07;
  ring.rotation.y = 0.3;
  group.add(ring);

  const coreGeo = new THREE.SphereGeometry(0.11, 20, 20);
  const coreMat = new THREE.MeshBasicMaterial({ color: 0x59d7c6 });
  const core = new THREE.Mesh(coreGeo, coreMat);
  group.add(core);

  let targetX = 0;
  let targetY = 0;
  holder.addEventListener("pointermove", (e) => {
    const r = holder.getBoundingClientRect();
    targetX = ((e.clientX - r.left) / r.width - 0.5) * 0.26;
    targetY = ((e.clientY - r.top) / r.height - 0.5) * 0.18;
  });
  holder.addEventListener("pointerleave", () => {
    targetX = 0;
    targetY = 0;
  });

  const resize = () => {
    const w = Math.max(holder.clientWidth, 320);
    const h = Math.max(holder.clientHeight, 280);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  resize();
  window.addEventListener("resize", resize);

  let last = 0;
  const animate = (t) => {
    const dt = Math.min((t - last) / 1000 || 0, 0.05);
    last = t;
    group.rotation.y += dt * 0.12;
    group.rotation.x += (targetY - group.rotation.x) * 0.025;
    group.rotation.z += (targetX - group.rotation.z) * 0.025;
    ring.rotation.z += dt * 0.07;
    core.scale.setScalar(1 + Math.sin(t * 0.0018) * 0.12);
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };
  requestAnimationFrame(animate);

  const solHolder = document.getElementById("solpient3d");
  if (solHolder) {
    const solScene = new THREE.Scene();
    const solCamera = new THREE.PerspectiveCamera(42, 1, 0.1, 50);
    solCamera.position.set(4.8, 3.5, 6.2);
    solCamera.lookAt(0, 0, 0);

    const solRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    solRenderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    solRenderer.setClearColor(0x000000, 0);
    solHolder.appendChild(solRenderer.domElement);

    const stack = new THREE.Group();
    stack.rotation.x = -0.16;
    stack.rotation.y = -0.42;
    solScene.add(stack);

    const layerColors = [0x3659b8, 0x456bd2, 0x527ce7, 0x5b92dd, 0x59b9bd, 0x59d7c6];

    for (let i = 0; i < 6; i++) {
      const width = 3.8 - i * 0.12;
      const depth = 2.15 - i * 0.06;
      const geo = new THREE.BoxGeometry(width, 0.08, depth);
      const mat = new THREE.MeshBasicMaterial({
        color: layerColors[i],
        transparent: true,
        opacity: 0.055 + i * 0.008
      });
      const layer = new THREE.Mesh(geo, mat);
      layer.position.y = (i - 2.5) * 0.36;
      layer.position.x = i * 0.05;
      layer.position.z = -i * 0.06;
      stack.add(layer);

      const edgeGeo = new THREE.EdgesGeometry(geo);
      const edgeMat = new THREE.LineBasicMaterial({
        color: layerColors[i],
        transparent: true,
        opacity: 0.34
      });
      const edges = new THREE.LineSegments(edgeGeo, edgeMat);
      edges.position.copy(layer.position);
      stack.add(edges);
    }

    const nodeGeo = new THREE.SphereGeometry(0.045, 10, 10);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0x9bded4 });
    for (let i = 0; i < 18; i++) {
      const n = new THREE.Mesh(nodeGeo, nodeMat);
      n.position.set(
        -1.55 + Math.random() * 3.1,
        -0.8 + Math.random() * 1.6,
        -0.85 + Math.random() * 1.7
      );
      n.material = nodeMat.clone();
      n.material.transparent = true;
      n.material.opacity = 0.45 + Math.random() * 0.4;
      stack.add(n);
    }

    const solResize = () => {
      const w = Math.max(solHolder.clientWidth, 300);
      const h = Math.max(solHolder.clientHeight, 360);
      solRenderer.setSize(w, h, false);
      solCamera.aspect = w / h;
      solCamera.updateProjectionMatrix();
    };
    solResize();
    window.addEventListener("resize", solResize);

    const animateSolpient = (t) => {
      stack.rotation.y = -0.42 + Math.sin(t * 0.00022) * 0.09;
      stack.position.y = Math.sin(t * 0.0007) * 0.05;
      solRenderer.render(solScene, solCamera);
      requestAnimationFrame(animateSolpient);
    };
    requestAnimationFrame(animateSolpient);
  }
})();
