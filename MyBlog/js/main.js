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
  },
  {
    id: "diary-2026-10-17-do-not-choose",
    title: "Do Not Choose, Do Not Cling",
    date: "2026-10-17",
    category: "Teaching",
    body: `Tín Tâm Minh, the Faith in Mind poem attributed to the Third Patriarch Sengcan, begins with a simple warning: the Great Way is not difficult. It only asks that we stop choosing.

When the mind divides everything into what it likes and what it dislikes, it grows tired. Every preference becomes a small weight to carry.

Practice is not forcing the mind to be quiet. It is noticing when we are choosing, and letting the choice settle. The mind does not need to be fixed. It only needs to stop grasping.

Not choosing does not mean not caring. It means caring without gripping.`
  },
  {
    id: "diary-2026-10-17-want-less",
    title: "I Want Less",
    date: "2026-10-17",
    category: "Reflection",
    body: `There is a difference between wanting more and wanting less.

Wanting more is easy to recognize: more money, more success, more recognition. Wanting less is quieter. Less rehearsal. Less comparison. Fewer open loops running in the background.

Most of life's weight does not come from one dramatic problem. It comes from many small duties that never fully end, all carried at once. The work is not to have no responsibilities. The work is to notice which ones are being carried twice, once in the hands and again in the head.

Start with one loop. Close it. Then notice how much space that frees.`
  },
  {
    id: "diary-2026-10-17-real-flower",
    title: "The Real Flower Fades",
    date: "2026-10-17",
    category: "Reflection",
    body: `A fake flower never fades, and that is exactly why it means little. A real flower is precious because it will wilt.

Time works the same way. Each day is one that will not come back. That is not a reason for panic. It is a reason to pay attention.

Impermanence is often heard as a warning. It can also be an invitation: to stop postponing what matters, to let go of what was never ours to hold, and to meet this season while it is here.`
  },
  {
    id: "diary-2026-10-17-deliberate",
    title: "Live Deliberately, Not Frantically",
    date: "2026-10-17",
    category: "Learning",
    body: `Maximizing every hour is not the same as living well. Rushing, pressuring ourselves, and turning life into a checklist can make even good days feel empty.

Deliberate living is simpler. When studying, study. When resting, rest. When someone speaks, listen. When the day ends, close it without regret.

If we do this consistently, we do not need to do everything. We only need to be awake to what we are doing.`
  },
  {
    id: "diary-2026-08-10-long-term",
    title: "Think and Act Long-Term",
    date: "2026-08-10",
    category: "Learning",
    body: `Love grows from long-term relationships. Health grows from long-term habits. Wealth grows from long-term investment. Peace grows from long-term self-reflection. Talent grows from long-term focused effort.

Most short-term choices feel urgent and matter little. The choices that shape a life are usually quiet and repeated: a walk taken again, a conversation handled with care, a dollar saved every month.

If you want something to last, think and act for the long term.`
  },
  {
    id: "diary-2026-08-24-good-person",
    title: "Be a Good Person",
    date: "2026-08-24",
    category: "Teaching",
    body: `The things people often try to impress others with are temporary: what they own, what they wear, where they live, what they drive.

What lasts is character. I have deep respect for people with pure hearts and good intentions, whatever their station.

Be honest. Be kind. Keep your word. Those qualities are visible to everyone, and they are the only impression that stays.`
  },
  {
    id: "diary-2026-09-07-simple-disciplines",
    title: "Simple Disciplines",
    date: "2026-09-07",
    category: "Learning",
    body: `Success is often described as a few simple disciplines, practiced every day. Failure is often a few small errors in judgment, repeated every day.

The difference is rarely talent or luck. It is whether the small habits are kept.

Pick one discipline this week. Practice it every day, even when it feels too small to matter. Small things repeated are how a life changes.`
  },
  {
    id: "diary-2026-09-21-let-go-gently",
    title: "Passing Through",
    date: "2026-09-21",
    category: "Reflection",
    body: `We close our hands around things we do not truly own, and call it life because they stayed a while. Even the sky cannot keep its colors. The wave remembers the shore it touched, then goes back out to sea.

Why does the heart tremble at goodbye when we are only passing through?

Hold things with open hands. Love fully, care fully, and then let the moment be what it was. That is not loss. That is how things are meant to move.`
  },
  {
    id: "diary-2026-08-03-speak-clearly",
    title: "Speak Clearly, Listen Fully",
    date: "2026-08-03",
    category: "Learning",
    body: `Communication is one of the simplest crafts to practice and one of the easiest to neglect.

Speak clearly and calmly so people can follow without strain. Keep it brief. Use facts, not volume.

Listen the same way. Notice the content, the emotion, and the urgency behind the words. Reflect before responding.

Clear words and attentive listening reduce more friction than any clever argument.`
  },
  {
    id: "diary-2026-08-06-better-questions",
    title: "Ask Better Questions",
    date: "2026-08-06",
    category: "Learning",
    body: `The quality of an answer often depends on the question behind it.

Instead of asking what someone wants me to say, I try to ask what they are actually trying to solve. Instead of asking how to win an argument, I ask what would help both sides see more clearly.

Good questions slow the mind down. They turn a reaction into a decision.`
  },
  {
    id: "diary-2026-08-12-being-here",
    title: "The Rare Gift of Being Here",
    date: "2026-08-12",
    category: "Reflection",
    body: `Out of all the possibilities in the universe, we exist in this moment, breathing and thinking. That alone is a kind of luck that is easy to forget.

Time moves whether we pay attention or not. Anger, regret, and resentment take up the hours we have, and they add nothing that lasts.

The question is not how to cram more into the time we have. It is how to live it consciously.`
  },
  {
    id: "diary-2026-08-17-protect-body",
    title: "Protect the Body",
    date: "2026-08-17",
    category: "Health",
    body: `The body is the foundation under every other craft. A sharp mind and a steady heart both depend on it.

Daily movement matters more than occasional intensity. A walk after dinner, a stretch in the morning, and enough rest are simple habits that compound.

Listen to the body when it asks for a slower day. Strength is not only pushing harder. It is also knowing when to recover.`
  },
  {
    id: "diary-2026-08-20-plan-lightly",
    title: "Plan Lightly",
    date: "2026-08-20",
    category: "Reflection",
    body: `Planning is useful. Obsessing over plans is not.

A good plan gives direction. It does not need to predict every turn. When I hold plans too tightly, every change feels like a threat. When I hold them lightly, changes become information.

Make the plan. Take the next step. Then meet the season as it comes.`
  },
  {
    id: "diary-2026-08-27-stewardship",
    title: "Steward What You Have",
    date: "2026-08-27",
    category: "Learning",
    body: `Money, time, and attention are resources. Money is not the purpose of life, but it can buy stability and room to focus on what matters.

Steward them calmly. Make decisions from a plan, not from fear or excitement. Avoid chasing returns and avoid panic when markets drop.

The goal is not to accumulate for its own sake. The goal is to have enough freedom to live well and to take care of the people who depend on you.`
  },
  {
    id: "diary-2026-09-01-monk-stages",
    title: "What a Monk Said About Ages",
    date: "2026-09-01",
    category: "Teaching",
    body: `A monk once said that at forty, the highly educated and the less educated are the same. At fifty, beauty and ugliness are the same. At sixty, high and low positions are the same. At seventy, a big house and a small house are the same. At eighty, having money or not is the same. At ninety, sleeping and waking are the same.

It is a reminder that many of the things we chase are labels we give to life. As the years pass, the labels fall away, and what remains is how we treated people and how fully we lived.

Hold the labels lightly. Live fully inside them.`
  },
  {
    id: "diary-2026-09-10-present-with-children",
    title: "Present With Children",
    date: "2026-09-10",
    category: "Family",
    body: `Children do not need perfect parents. They need present ones.

It is easy to sit beside a child while thinking about the next task, the next worry, or the next year. It is harder, and more important, to put the phone down and play without rushing.

Be patient with the slow parts. Guide without controlling. Show up on the ordinary days, because those are the days that shape them most.`
  },
  {
    id: "diary-2026-09-14-guide-without-gripping",
    title: "Guide Without Gripping",
    date: "2026-09-14",
    category: "Family",
    body: `The role of a parent, mentor, or teacher is to guide, not to control.

Guiding means offering a clear direction, explaining the reasons, and then making room for the other person to choose. Controlling means deciding for them and then measuring them against your plan.

Support, then step back. Care deeply, but do not cling.`
  },
  {
    id: "diary-2026-09-28-carry-lightly",
    title: "Carry It Lightly",
    date: "2026-09-28",
    category: "Reflection",
    body: `Responsibilities do not disappear because we wish they would. The house still needs care, the work still needs attention, and the people we love still depend on us.

The difference is in how we carry them. Carried tightly, every duty becomes friction. Carried lightly, the same duties become part of a day we can live in.

Duty and peace are not opposites. The work is to hold both without gripping.`
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
  try {
    const saved = JSON.parse(stored);
    // Add curated posts that are newer than this browser's saved copy
    const savedIds = new Set(saved.map((post) => post.id));
    return [...saved, ...seedPosts.filter((post) => !savedIds.has(post.id))];
  } catch { return seedPosts; }
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
