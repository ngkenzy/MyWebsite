(() => {
  "use strict";

  const KNOWLEDGE = [
    { id:"current-role", title:"Current role", tags:["current","job","role","usard","operations research","data systems","decision support platform"], text:"Phuoc currently works in Operations Research and Data Systems at USARD. Since August 2026, he has been building the Decision Support Platform, analytical workflows, and data systems for operational decision making. He applies operations research, statistics, and automation to recurring mission requirements.", source:"Experience", url:"#experience" },
    { id:"cdao", title:"DoD CDAO DataOps", tags:["cdao","dataops","pentagon","data scientist","data operations","joint staff","secure pipelines"], text:"From July 2024 through July 2026, Phuoc served as a Data Operations Projects Lead and Data Scientist at the DoD Chief Digital and Artificial Intelligence Office. His work supported decision support analytics for Joint Staff and Army senior leaders and included secure data pipelines and analytics across multiple classification environments.", source:"Experience", url:"#experience" },
    { id:"trac", title:"Operations research at TRAC", tags:["trac","army futures command","orsa","operations research","simulation","modernization","force design","statistics"], text:"From September 2021 through July 2024, Phuoc was a Lead Operations Research Analyst with Army Futures Command and The Research and Analysis Center. He led predictive analytics, simulation, and statistical studies supporting Army modernization and force design.", source:"Experience", url:"#experience" },
    { id:"earlier-career", title:"Earlier Army and intelligence experience", tags:["nsa","centcom","intelligence","cryptologic","sigint","electronic warfare","army"], text:"Phuoc served as a Cryptologic Officer with NSA and U.S. Central Command from 2018 to 2021. Earlier Army assignments from 2011 to 2018 included cyber, SIGINT, electronic warfare, and all source intelligence work in joint and forward environments.", source:"Experience", url:"#experience" },
    { id:"skills", title:"Technical skills", tags:["skills","python","sql","r","spark","aws","databricks","docker","git","llm","nlp","agents","statistics"], text:"Phuoc works across operations research, statistical modeling, simulation, predictive analytics, decision support, Python, SQL, R, Spark, ETL, APIs, automation, AWS, Databricks, Docker, Git, LLM workflows, NLP, AI evaluation, and agents.", source:"Resume", url:"https://www.overleaf.com/read/vdmwqmjczbfb#a90afb" },
    { id:"education", title:"Education", tags:["education","degree","mba","statistics","computer science","colorado","kansas","niu","mathematics","economics"], text:"Phuoc is pursuing an MS in Computer Science at the University of Colorado Boulder. He holds an MS in Applied Statistics, Analytics, and Data Science and an MBA from the University of Kansas, plus a BS in Mathematics and Economics from Northern Illinois University.", source:"Resume", url:"https://www.overleaf.com/read/vdmwqmjczbfb#a90afb" },
    { id:"solpient", title:"SOLPIENT Research", tags:["solpient","investing","investment research","founder","research system","supabase","next.js","typescript","vercel"], text:"Phuoc is the founder and builder of SOLPIENT Research, a point in time fundamental investment research system. SOLPIENT preserves what the research believed at each date, compares later evidence with prior assumptions, and builds a durable historical research dataset. Its core stack is Next.js, TypeScript, Supabase with PostgreSQL, Vercel, and GitHub.", source:"SOLPIENT Research", url:"https://solpient-research-app.vercel.app/" },
    { id:"solpient-automation", title:"SOLPIENT automated intelligence", tags:["solpient","sec","10-k","10-q","8-k","form 4","13f","xbrl","market data","predictions"], text:"SOLPIENT includes an append only intelligence pipeline with SEC 10-K, 10-Q, 8-K and Form 4 monitoring, notable manager 13F monitoring, daily SEC XBRL fundamental snapshots, market snapshots, immutable prediction snapshots, and realized outcome and prediction error scoring when forecasts mature.", source:"SOLPIENT GitHub", url:"https://github.com/ngkenzy/solpient-research" },
    { id:"mission-tailor", title:"Mission Tailor AI", tags:["mission tailor","mtai","hackathon","ndia","multimodal","threat detection","ai"], text:"At the NDIA Hackathon 2025, Phuoc built Mission Tailor AI, a context aware multimodal threat detection prototype. The project tied for second place and was awarded third.", source:"Selected work", url:"#work" },
    { id:"research", title:"Published AI research", tags:["research","published","arxiv","gpt","summarization","bias","nlp","paper"], text:"Phuoc published research in 2024 evaluating AI generated text summaries using OpenAI GPT models, including quality and bias evaluation. He also developed work on iterative bias evaluation for sentiment aware text summarization.", source:"Research", url:"research.html" },
    { id:"profile", title:"Professional profile", tags:["who","phuoc","background","profile","about","experience"], text:"Phuoc H. Nguyen is an Operations Research Analyst working across data systems and applied AI. His background spans Army and DoD analytics, modeling, intelligence, data engineering, and decision support. He also builds independent technical projects and research systems.", source:"About", url:"#about" },
    { id:"contact", title:"Professional links", tags:["contact","github","linkedin","website","resume"], text:"Phuoc's public professional links include phnguyen.com, github.com/ngkenzy, LinkedIn, his live Overleaf resume, and SOLPIENT Research.", source:"Profile kit", url:"#home" }
  ];

  const STOP = new Set(["a","an","and","are","as","at","be","by","can","did","do","does","for","from","had","has","have","he","her","him","his","how","i","in","is","it","me","of","on","or","phuoc","tell","that","the","their","them","they","this","to","was","what","when","where","which","who","why","with","work"]);

  const $ = (selector) => document.querySelector(selector);
  const launch = $("#askPhuocLaunch");
  const panel = $("#askPhuocPanel");
  const close = $("#askPhuocClose");
  const loadButton = $("#askPhuocLoad");
  const status = $("#askPhuocStatus");
  const progress = $("#askPhuocProgress");
  const progressBar = $("#askPhuocProgressBar");
  const form = $("#askPhuocForm");
  const input = $("#askPhuocInput");
  const send = $("#askPhuocSend");
  const messages = $("#askPhuocMessages");
  const suggested = document.querySelectorAll(".ask-phuoc-suggestion");

  if (!launch || !panel) return;

  let engine = null;
  let modelLoaded = false;
  let loading = false;
  let searchOnly = false;
  let selectedModel = "";

  function setOpen(open) {
    panel.classList.toggle("is-open", open);
    panel.setAttribute("aria-hidden", String(!open));
    launch.setAttribute("aria-expanded", String(open));
    if (open) setTimeout(() => input && input.focus(), 250);
  }

  launch.addEventListener("click", () => setOpen(!panel.classList.contains("is-open")));
  if (close) close.addEventListener("click", () => setOpen(false));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && panel.classList.contains("is-open")) setOpen(false);
  });

  suggested.forEach((button) => {
    button.addEventListener("click", () => {
      const q = button.dataset.question || button.textContent.trim();
      if (input) {
        input.value = q;
        input.focus();
      }
    });
  });

  function tokenize(text) {
    return String(text).toLowerCase().replace(/[^a-z0-9+#.]+/g, " ").split(/\s+/).filter((token) => token.length > 1 && !STOP.has(token));
  }

  function retrieve(query, count) {
    const limit = count || 3;
    const q = tokenize(query);
    const queryText = query.toLowerCase();

    const scored = KNOWLEDGE.map((item) => {
      const title = item.title.toLowerCase();
      const tags = item.tags.join(" ").toLowerCase();
      const body = item.text.toLowerCase();
      let score = 0;

      q.forEach((token) => {
        if (title.includes(token)) score += 6;
        if (tags.includes(token)) score += 5;
        if (body.includes(token)) score += 2;
      });

      item.tags.forEach((tag) => {
        if (queryText.includes(tag.toLowerCase())) score += 9;
      });

      if (item.id === "profile" && score === 0) score = 0.1;
      return Object.assign({}, item, { score: score });
    }).sort((a, b) => b.score - a.score);

    const positive = scored.filter((item) => item.score > 0.1);
    return (positive.length ? positive : scored).slice(0, limit);
  }

  function addSources(bubble, sources) {
    if (!sources.length) return;
    const wrap = document.createElement("div");
    wrap.className = "ask-phuoc-sources";
    sources.forEach((source) => {
      const a = document.createElement("a");
      a.href = source.url;
      a.textContent = source.source;
      if (/^https?:/i.test(source.url)) {
        a.target = "_blank";
        a.rel = "noopener noreferrer";
      }
      wrap.appendChild(a);
    });
    bubble.appendChild(wrap);
  }

  function addMessage(role, text, sources) {
    const row = document.createElement("div");
    row.className = "ask-phuoc-message " + role;

    const bubble = document.createElement("div");
    bubble.className = "ask-phuoc-bubble";

    const body = document.createElement("div");
    body.className = "ask-phuoc-message-text";
    body.textContent = text;
    bubble.appendChild(body);

    addSources(bubble, sources || []);
    row.appendChild(bubble);
    messages.appendChild(row);
    messages.scrollTop = messages.scrollHeight;
    return { body: body, bubble: bubble };
  }

  function directAnswer(results) {
    return results.length ? results[0].text : "That is not in Phuoc's public portfolio.";
  }

  function sourceList(results) {
    const seen = new Set();
    return results.filter((item) => {
      const key = item.source + item.url;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    }).slice(0, 3);
  }

  function enableSearchFallback(message) {
    searchOnly = true;
    modelLoaded = false;
    loading = false;
    status.textContent = "Portfolio search mode";
    status.className = "ask-phuoc-status is-search";
    loadButton.textContent = "Local AI unavailable";
    loadButton.disabled = true;
    form.classList.add("is-ready");
    progress.classList.remove("is-visible");
    addMessage("assistant", message || "Local AI is not available in this browser. You can still search Phuoc's public portfolio.");
  }

  async function loadModel() {
    if (loading || modelLoaded) return;

    if (!("gpu" in navigator)) {
      enableSearchFallback("This browser does not expose WebGPU. Portfolio search is ready instead.");
      return;
    }

    loading = true;
    loadButton.disabled = true;
    loadButton.textContent = "Loading...";
    status.textContent = "Preparing local AI";
    status.className = "ask-phuoc-status is-loading";
    progress.classList.add("is-visible");
    progressBar.style.width = "2%";

    try {
      const webllm = await import("https://esm.run/@mlc-ai/web-llm");
      const available = webllm.prebuiltAppConfig.model_list.map((m) => m.model_id);
      const preferred = [
        "Qwen2.5-0.5B-Instruct-q4f16_1-MLC",
        "Qwen2-0.5B-Instruct-q4f16_1-MLC",
        "Llama-3.2-1B-Instruct-q4f16_1-MLC"
      ];

      selectedModel = preferred.find((id) => available.includes(id)) ||
        available.find((id) => /0\.5B.*Instruct.*q4f16/i.test(id)) ||
        available.find((id) => /1B.*Instruct.*q4f16/i.test(id));

      if (!selectedModel) throw new Error("No compact WebLLM model is available.");

      engine = await webllm.CreateMLCEngine(selectedModel, {
        initProgressCallback: (report) => {
          const pct = Number.isFinite(report.progress) ? Math.round(report.progress * 100) : null;
          if (pct !== null) progressBar.style.width = Math.max(2, pct) + "%";
          status.textContent = pct !== null ? "Loading local AI " + pct + "%" : (report.text || "Loading local AI");
        },
        logLevel: "WARN"
      });

      modelLoaded = true;
      loading = false;
      status.textContent = "Local AI ready";
      status.className = "ask-phuoc-status is-ready";
      progressBar.style.width = "100%";
      setTimeout(() => progress.classList.remove("is-visible"), 450);
      loadButton.textContent = "Loaded on this device";
      loadButton.disabled = true;
      form.classList.add("is-ready");
      addMessage("assistant", "Ready. Ask about Phuoc's work, research, projects, education, or technical background.");
    } catch (error) {
      console.error("Ask Phuoc model load failed:", error);
      enableSearchFallback("The local model could not load on this device. Portfolio search is ready instead.");
    }
  }

  if (loadButton) loadButton.addEventListener("click", loadModel);

  function buildContext(results) {
    return results.map((item, i) => "[Source " + (i + 1) + ": " + item.source + "]\n" + item.text).join("\n\n");
  }

  async function answerWithModel(question, results, outputNode) {
    const context = buildContext(results);
    const systemPrompt =
      "You are Ask Phuoc, a small portfolio assistant on Phuoc H. Nguyen's website. " +
      "Answer questions about Phuoc using ONLY the supplied public portfolio context. " +
      "Do not guess, infer private facts, or add facts from general knowledge. " +
      "If the context does not support the answer, say exactly: That is not in Phuoc's public portfolio. " +
      "Be concise, professional, natural, and specific. Use 1 to 3 short sentences. " +
      "Refer to him as Phuoc, not as I. Do not discuss family, private life, health, politics, or nonpublic military information.";

    const chunks = await engine.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: "PUBLIC PORTFOLIO CONTEXT:\n" + context + "\n\nQUESTION:\n" + question }
      ],
      temperature: 0.15,
      top_p: 0.85,
      max_tokens: 150,
      stream: true
    });

    let answer = "";
    for await (const chunk of chunks) {
      answer += (chunk.choices[0] && chunk.choices[0].delta && chunk.choices[0].delta.content) || "";
      outputNode.textContent = answer.trimStart();
      messages.scrollTop = messages.scrollHeight;
    }

    if (!answer.trim()) outputNode.textContent = directAnswer(results);
  }

  async function submitQuestion(question) {
    const clean = question.trim();
    if (!clean) return;

    addMessage("user", clean);
    input.value = "";
    send.disabled = true;
    input.disabled = true;

    const results = retrieve(clean, 3);
    const sources = sourceList(results);

    if (searchOnly || !modelLoaded || !engine) {
      addMessage("assistant", directAnswer(results), sources);
      send.disabled = false;
      input.disabled = false;
      input.focus();
      return;
    }

    const msg = addMessage("assistant", "Thinking locally...");

    try {
      await answerWithModel(clean, results, msg.body);
      addSources(msg.bubble, sources);
    } catch (error) {
      console.error("Ask Phuoc generation failed:", error);
      msg.body.textContent = directAnswer(results);
      const note = document.createElement("div");
      note.className = "ask-phuoc-inline-note";
      note.textContent = "Local generation failed, so this answer is from portfolio search.";
      msg.bubble.appendChild(note);
      addSources(msg.bubble, sources);
    } finally {
      send.disabled = false;
      input.disabled = false;
      input.focus();
      messages.scrollTop = messages.scrollHeight;
    }
  }

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.classList.contains("is-ready")) {
        loadModel();
        return;
      }
      submitQuestion(input.value);
    });
  }

  addMessage("assistant", "I answer from Phuoc's public portfolio only. Load the local model to start.");
})();