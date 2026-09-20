const STORAGE_KEY = "quietNotesPostsV2";
const prompts = [
  "What is the one thought worth keeping?",
  "What did today teach without making noise?",
  "What can be carried lightly?",
  "What should be remembered, and what should be released?",
  "What would help the children one day?"
];

const seedPosts = [
  {
    id: "diary-2026-06-10-time-well",
    title: "Use Your Time Well",
    date: "2026-06-10",
    category: "Family",
    body: `Life does not last forever, and that is what makes it valuable. A real flower is beautiful because it fades. Our days are like that. Each one matters because it will not return.

Use your time to grow. Read. Write. Think carefully. Ask better questions. Strengthen your body. Strengthen your mind. Be kind even when life is not easy.

Living well does not mean rushing or becoming perfect. It means being awake to your own life. When you study, study. When you play, play. When someone speaks, listen.

You do not need to be the best in the world. Just do not sleepwalk through your life. Be curious, be steady, and keep growing. That is enough.`
  },
  {
    id: "diary-2026-06-09-simple-crafts",
    title: "A Life Built Around Simple Crafts",
    date: "2026-06-09",
    category: "Reflection",
    body: `The quiet hours make it easier to see what matters. I do not need more status, more noise, or more proof. I want a life organized around a few meaningful crafts.

The first craft is communication: speaking clearly and calmly so people understand without strain.

The second craft is thinking: studying systems, data, technology, and how information moves through organizations.

The third craft is physical discipline: keeping the body strong enough to support the mind.

The fourth craft is stewardship: managing money, work, time, and responsibilities with care.

The most important craft is family: being a patient father and husband, guiding without controlling, supporting without clinging.

A good life does not need to be dramatic. It can be a few simple disciplines practiced every day.`
  },
  {
    id: "diary-2026-06-08-observe-not-absorb",
    title: "Observe, Do Not Absorb",
    date: "2026-06-08",
    category: "Teaching",
    body: `Observe, but do not absorb. Love, but do not depend. Want, but do not need. Feel, but do not dwell. Give, but do not expect. Speak, but do not hurt.

This is not coldness. It is balance.

A person can care deeply without carrying every outcome inside the chest. A person can work hard without becoming the work. A person can plan carefully without letting the future occupy the whole mind.

The practice is simple: see clearly, act cleanly, and release gently.`
  },
  {
    id: "diary-2026-06-07-mental-noise",
    title: "The Weight Was Not the World",
    date: "2026-06-07",
    category: "Reflection",
    body: `Sometimes the heaviness is not one dramatic problem. It is the accumulation of open loops: the house, the grass, the car, the work, the move, the future, the small duties that never fully end.

I used to think the answer was more security. But security was already built. The harder work is learning how to stop carrying what is already secure.

I do not want to disappear from the world. I want to live in it with fewer background calculations.

Responsibility without constant tension. Planning without obsession. Presence without rehearsing tomorrow.

The goal is not to have no duties. The goal is to carry duties lightly.`
  },
  {
    id: "diary-2026-06-06-presence",
    title: "Presence Is Freedom",
    date: "2026-06-06",
    category: "Reflection",
    body: `There was a time when I had very little: no money, no stable path, no clear future. Yet I remember moments when I felt completely alive.

That taught me something important. Freedom is not only money, rank, or control. Freedom is the moment when I stop trying to become someone else.

When I am fully present, I do not need to defend my past or rehearse my future. I can simply be where I am.

That kind of freedom is quiet. It does not need an audience. It appears when comparison stops and the mind rests where the body already is.`
  },
  {
    id: "diary-2026-06-05-teacher",
    title: "What My Teacher Gave Me",
    date: "2026-06-05",
    category: "Teaching",
    body: `When I was young and uncertain, the temple gave me shelter. My teacher gave me kindness when I had little to offer back.

I once thought I needed to become a monk to understand the path. Later I learned that the real practice was not escaping life. It was living in the world without being owned by it.

The teaching remains simple: do not cling, do not resist, do not force. Act cleanly. Carry compassion forward. Let the rest pass.

The best way to honor a teacher is not to preserve every memory perfectly. It is to live better because of what was received.`
  },
  {
    id: "diary-2026-06-04-three-focus",
    title: "Three Focuses",
    date: "2026-06-04",
    category: "Teaching",
    body: `Three teachings keep returning to me.

Tín Tâm Minh: do not cling, do not resist. When the mind stops dividing everything into what it wants and what it hates, life becomes clearer.

Impermanence: everything changes. This is not a reason to panic. It is a reason to pay attention.

The Noble Path: act rightly and live cleanly. Not perfectly. Cleanly.

These are not slogans. They are operating rules for a quieter life.`
  },
  {
    id: "diary-2026-06-03-five-pillars",
    title: "Five Pillars",
    date: "2026-06-03",
    category: "Reflection",
    body: `My life becomes simpler when I return to five pillars.

Communication: clear, calm, brief.

Thinking: solve real problems only.

Health: maintain, do not neglect.

Finances: disciplined, no emotion.

Family: present, patient, supportive.

When I drift, it is usually because I am chasing noise outside these pillars. When I return, the path becomes visible again.`
  },
  {
    id: "diary-2026-06-02-rain-morning",
    title: "A Rainy Morning Rule",
    date: "2026-06-02",
    category: "Family",
    body: `There was light rain in the morning. Work still had to be done. Responsibilities did not disappear because the day felt quiet.

But the rain changed the pace. It reminded me that not every day has to be maximized. Some days are simply for showing up deliberately.

Drive safely. Work cleanly. Come home. Play with the children. Sit with them without rushing. Guide without pressure.

A meaningful life is not built only in major decisions. It is built in ordinary returns: back to the work, back to the family, back to the present moment.`
  },
  {
    id: "diary-2026-06-01-california-clarity",
    title: "California and the End of Recreating the Past",
    date: "2026-06-01",
    category: "Travel",
    body: `I went back thinking I needed to reconnect with old people and old places. What I found was simpler: nothing needed to be recreated.

My teacher had already given me what I needed. Old friends had their own lives. The past did not need another performance from me.

Change is not betrayal. Distance is not always loss. Some chapters do not end with drama; they end with clarity.

I came home lighter because I stopped asking the past to become present again.`
  },
  {
    id: "diary-2026-05-31-vietnam-memory",
    title: "Vietnam and the Feeling of Being Alive",
    date: "2026-05-31",
    category: "Travel",
    body: `Some memories stay not because we want to return to them, but because they revealed something true.

Vietnam once showed me a version of life that felt simple, open, and alive. I was not measuring myself. I was not proving anything. I was just present.

Years later, I understand the lesson better. The memory is not a place to live. It is a reminder that joy does not require everything to be perfect.

Presence is portable. I do not need to chase the old moment. I need to practice the same openness now.`
  },
  {
    id: "diary-2026-05-30-friendship",
    title: "Not Everyone Is a Friend",
    date: "2026-05-30",
    category: "Reflection",
    body: `Not everyone is a friend. Some people are classmates. Some are colleagues. Some are simply people we once knew.

There is no bitterness in this. It is maturity.

Friendship requires trust, effort, shared values, and time. A smile is not always loyalty. A shared photo is not always a bond.

Be kind to everyone. Be careful with labels. Give warmth freely, but give access wisely.`
  },
  {
    id: "diary-2026-05-29-right-time",
    title: "Right Person, Wrong Time",
    date: "2026-05-29",
    category: "Reflection",
    body: `Some memories are not unfinished business. They are completed lessons.

At different points in life, people appeared and taught me something: honesty, presence, regret, tenderness, patience, and release.

Not every meaningful connection is meant to continue. Some are meant to open the heart, teach the lesson, and leave quietly.

The mature task is not to recreate the past. It is to honor what was real, stop clinging to what cannot return, and live truthfully now.`
  },
  {
    id: "diary-2026-05-28-education",
    title: "The Long Road Back to Learning",
    date: "2026-05-28",
    category: "Learning",
    body: `There was a time when school felt like failure. I wanted a beautiful campus, a clear path, and a sense that I belonged. Instead, I stumbled.

Years later, I returned to learning differently. Not to prove that the past was wrong, but to build the person I still had time to become.

Degrees matter less than the discipline behind them. Study became a way to rebuild trust with myself.

The lesson is quiet: a failed chapter is not a failed life. A person can return to the work and become stronger than the version who fell.`
  },
  {
    id: "diary-2026-05-27-army-bridge",
    title: "The Bridge",
    date: "2026-05-27",
    category: "Reflection",
    body: `At a certain point, the mission became clear. The institution is not my identity. It is a bridge.

A bridge does not need to love me. It does not need to understand me. It only needs to help me cross.

The wise move is to keep working, stay professional, preserve health, protect family, build skills, and leave with options.

No resentment. No performance. No need to win every room. Cross the bridge cleanly.`
  },
  {
    id: "diary-2026-05-26-public-writing",
    title: "A Rule for Public Writing",
    date: "2026-05-26",
    category: "Teaching",
    body: `The first draft can be honest. The published draft must be useful.

Raw emotion belongs in a private journal. Public writing should be processed wisdom: clearer, calmer, and safer than the moment that created it.

This does not mean hiding the truth. It means respecting timing.

Write everything. Publish selectively. Let clarity age before it speaks.`
  }
];

let posts = loadPosts();
let activeFilter = "All";
let calendarDate = new Date();

const postForm = document.getElementById("postForm");
const postTitle = document.getElementById("postTitle");
const postDate = document.getElementById("postDate");
const postCategory = document.getElementById("postCategory");
const postBody = document.getElementById("postBody");
const postList = document.getElementById("postList");
const postTemplate = document.getElementById("postTemplate");
const calendarTitle = document.getElementById("calendarTitle");
const calendarDays = document.getElementById("calendarDays");
let editingId = null;

function loadPosts() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return seedPosts;
  try { return JSON.parse(stored); } catch { return seedPosts; }
}

function savePosts() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

function formatDate(dateString) {
  const date = new Date(dateString + "T00:00:00");
  return date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

function bodyToHtml(body) {
  return body
    .trim()
    .split(/\n\s*\n/)
    .map(paragraph => `<p>${escapeHtml(paragraph).replace(/\n/g, "<br>")}</p>`)
    .join("");
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function excerpt(body) {
  const clean = body.trim().replace(/\s+/g, " ");
  return clean.length > 165 ? clean.slice(0, 165) + "..." : clean;
}

function renderPosts() {
  postList.innerHTML = "";
  const filtered = posts
    .filter(post => activeFilter === "All" || post.category === activeFilter)
    .sort((a, b) => b.date.localeCompare(a.date));

  if (filtered.length === 0) {
    postList.innerHTML = `<p class="muted">No notes in this category yet.</p>`;
    return;
  }

  filtered.forEach(post => {
    const node = postTemplate.content.cloneNode(true);
    const article = node.querySelector(".post-card");
    const fullBody = node.querySelector(".post-body");
    const readButton = node.querySelector(".read-post");

    node.querySelector(".post-date").textContent = formatDate(post.date);
    node.querySelector(".post-category").textContent = post.category;
    node.querySelector(".post-title").textContent = post.title;
    node.querySelector(".post-excerpt").textContent = excerpt(post.body);
    fullBody.innerHTML = bodyToHtml(post.body);

    readButton.addEventListener("click", () => {
      article.classList.toggle("open");
      readButton.textContent = article.classList.contains("open") ? "Close" : "Read";
    });

    node.querySelector(".edit-post").addEventListener("click", () => editPost(post.id));
    node.querySelector(".export-post").addEventListener("click", () => exportPost(post));
    node.querySelector(".delete-post").addEventListener("click", () => deletePost(post.id));
    postList.appendChild(node);
  });
}

function renderCalendar() {
  calendarDays.innerHTML = "";
  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth();
  calendarTitle.textContent = calendarDate.toLocaleDateString(undefined, { month: "long", year: "numeric" });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  const postDates = new Set(posts.map(post => post.date));

  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement("div");
    empty.className = "day empty";
    calendarDays.appendChild(empty);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const cell = document.createElement("button");
    const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    cell.className = "day";
    cell.type = "button";
    cell.textContent = day;

    if (postDates.has(dateString)) cell.classList.add("has-post");
    if (today.getFullYear() === year && today.getMonth() === month && today.getDate() === day) cell.classList.add("today");

    cell.addEventListener("click", () => {
      postDate.value = dateString;
      location.hash = "write";
      postTitle.focus();
    });
    calendarDays.appendChild(cell);
  }
}

function resetForm() {
  editingId = null;
  postTitle.value = "";
  postBody.value = "";
  postCategory.value = "Reflection";
  postDate.value = new Date().toISOString().slice(0, 10);
}

function editPost(id) {
  const post = posts.find(item => item.id === id);
  if (!post) return;
  editingId = id;
  postTitle.value = post.title;
  postDate.value = post.date;
  postCategory.value = post.category;
  postBody.value = post.body;
  location.hash = "write";
  postTitle.focus();
}

function deletePost(id) {
  if (!confirm("Delete this note from this browser?")) return;
  posts = posts.filter(post => post.id !== id);
  savePosts();
  renderPosts();
  renderCalendar();
}

function exportPost(post) {
  const text = `Title: ${post.title}\nDate: ${post.date}\nCategory: ${post.category}\n\n${post.body}\n`;
  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${post.date}-${post.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}

postForm.addEventListener("submit", event => {
  event.preventDefault();
  const post = {
    id: editingId || crypto.randomUUID(),
    title: postTitle.value.trim(),
    date: postDate.value,
    category: postCategory.value,
    body: postBody.value.trim()
  };

  if (!post.title || !post.date) return;
  if (editingId) posts = posts.map(item => item.id === editingId ? post : item);
  else posts.push(post);

  savePosts();
  resetForm();
  loadFramework();
  renderPosts();
  renderCalendar();
  location.hash = "posts";
});

document.getElementById("exportDraft").addEventListener("click", () => {
  exportPost({
    title: postTitle.value.trim() || "Untitled Note",
    date: postDate.value || new Date().toISOString().slice(0, 10),
    category: postCategory.value || "Draft",
    body: postBody.value.trim()
  });
});

document.getElementById("clearEditor").addEventListener("click", resetForm);

document.getElementById("restoreSeed").addEventListener("click", () => {
  if (!confirm("Restore the curated diary posts? This will replace notes saved in this browser.")) return;
  posts = seedPosts;
  savePosts();
  renderPosts();
  renderCalendar();
  location.hash = "posts";
});

document.querySelectorAll(".chip").forEach(chip => {
  chip.addEventListener("click", () => {
    document.querySelectorAll(".chip").forEach(item => item.classList.remove("active"));
    chip.classList.add("active");
    activeFilter = chip.dataset.filter;
    renderPosts();
  });
});

document.getElementById("prevMonth").addEventListener("click", () => {
  calendarDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, 1);
  renderCalendar();
});

document.getElementById("nextMonth").addEventListener("click", () => {
  calendarDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 1);
  renderCalendar();
});


const FRAMEWORK_STORAGE_KEY = "nhatHueFrameworkV1";
const frameworkContent = document.getElementById("frameworkContent");
const editFrameworkButton = document.getElementById("editFramework");
const saveFrameworkButton = document.getElementById("saveFramework");
const resetFrameworkButton = document.getElementById("resetFramework");
const defaultFrameworkHtml = frameworkContent ? frameworkContent.innerHTML : "";

function setFrameworkEditing(isEditing) {
  if (!frameworkContent) return;
  frameworkContent.setAttribute("contenteditable", isEditing ? "true" : "false");
  editFrameworkButton.classList.toggle("hidden", isEditing);
  saveFrameworkButton.classList.toggle("hidden", !isEditing);
  resetFrameworkButton.classList.toggle("hidden", !isEditing);
  if (isEditing) frameworkContent.focus();
}

function loadFramework() {
  if (!frameworkContent) return;
  const savedFramework = localStorage.getItem(FRAMEWORK_STORAGE_KEY);
  if (savedFramework) frameworkContent.innerHTML = savedFramework;
  setFrameworkEditing(false);
}

function saveFramework() {
  if (!frameworkContent) return;
  localStorage.setItem(FRAMEWORK_STORAGE_KEY, frameworkContent.innerHTML);
  setFrameworkEditing(false);
}

function resetFramework() {
  if (!frameworkContent) return;
  if (!confirm("Reset the Three Focuses and Five Pillars to the original text?")) return;
  frameworkContent.innerHTML = defaultFrameworkHtml;
  localStorage.removeItem(FRAMEWORK_STORAGE_KEY);
  setFrameworkEditing(false);
}

if (editFrameworkButton && saveFrameworkButton && resetFrameworkButton) {
  editFrameworkButton.addEventListener("click", () => setFrameworkEditing(true));
  saveFrameworkButton.addEventListener("click", saveFramework);
  resetFrameworkButton.addEventListener("click", resetFramework);
}

function init() {
  const now = new Date();
  document.getElementById("todayDate").textContent = now.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric" });
  document.getElementById("todayPrompt").textContent = prompts[now.getDate() % prompts.length];
  document.getElementById("year").textContent = now.getFullYear();
  resetForm();
  loadFramework();
  renderPosts();
  renderCalendar();
}

init();
