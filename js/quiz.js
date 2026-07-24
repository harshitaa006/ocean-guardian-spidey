/* Quiz Zone logic: topic selection, question flow, scoring, results. */
document.addEventListener("DOMContentLoaded", function () {
  const badge = document.getElementById("quiz-badge");
  if (badge) badge.innerHTML = OG.icon("brain", "w-4 h-4") + " Test your knowledge";

  const topicIcons = { pollution: "recycle", marine: "fish", coral: "waves", endangered: "heart" };

  // sections
  const selectSec = document.getElementById("quiz-select");
  const activeSec = document.getElementById("quiz-active");
  const resultSec = document.getElementById("quiz-result");

  // active-quiz elements
  const topicLabel = document.getElementById("quiz-topic-label");
  const counter = document.getElementById("quiz-counter");
  const bar = document.getElementById("quiz-bar");
  const questionEl = document.getElementById("quiz-question");
  const optionsEl = document.getElementById("quiz-options");
  const feedback = document.getElementById("quiz-feedback");
  const nextBtn = document.getElementById("quiz-next");

  // state
  let currentTopic = null;
  let questions = [];
  let index = 0;
  let correct = 0;
  let answered = false;

  /* ---------- render topic selection ---------- */
  function renderSelect() {
    const progress = OG.getProgress();
    const grid = document.getElementById("topic-select-grid");
    grid.innerHTML = OG.topics
      .map(function (t) {
        const score = progress.quizScores[t.id];
        const status = score
          ? `Best ${score.best}/${score.total}`
          : `${OG.quizzes[t.id].length} questions`;
        return `
        <button data-topic="${t.id}" class="glass lift group flex items-center gap-4 rounded-2xl p-5 text-left">
          <span class="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-cyan/10 text-cyan">${OG.icon(
            topicIcons[t.id] || "waves",
            "w-7 h-7"
          )}</span>
          <span class="flex-1">
            <span class="block font-display text-lg font-semibold">${t.title}</span>
            <span class="block text-sm text-mute">${status}</span>
          </span>
          <span class="text-mute transition-transform group-hover:translate-x-1">${OG.icon(
            "arrow",
            "w-5 h-5"
          )}</span>
        </button>`;
      })
      .join("");
  }

  /* ---------- start a quiz ---------- */
  function startQuiz(topicId) {
    currentTopic = topicId;
    questions = OG.quizzes[topicId];
    index = 0;
    correct = 0;
    const topic = OG.topics.find((t) => t.id === topicId);
    topicLabel.textContent = topic ? topic.title : "Quiz";

    show(activeSec);
    hide(selectSec);
    hide(resultSec);
    renderQuestion();
  }

  function renderQuestion() {
    answered = false;
    feedback.textContent = "";
    feedback.className = "text-sm font-medium";
    nextBtn.classList.add("hidden");

    const total = questions.length;
    counter.textContent = "Question " + (index + 1) + " of " + total;
    bar.style.width = (index / total) * 100 + "%";

    const q = questions[index];
    questionEl.textContent = q.q;
    optionsEl.innerHTML = q.options
      .map(
        (opt, i) => `
        <button data-opt="${i}" class="quiz-option w-full rounded-xl border border-cyan/15 bg-surface/40 px-5 py-4 text-left text-sm font-medium text-foam hover:border-cyan/50 hover:bg-surface transition">
          <span class="mr-3 inline-flex h-6 w-6 items-center justify-center rounded-md bg-surface2 text-xs font-semibold text-cyan-soft">${String.fromCharCode(
            65 + i
          )}</span>${opt}
        </button>`
      )
      .join("");
  }

  function handleAnswer(chosen) {
    if (answered) return;
    answered = true;
    const q = questions[index];
    const buttons = optionsEl.querySelectorAll(".quiz-option");

    buttons.forEach((b, i) => {
      b.disabled = true;
      if (i === q.answer) {
        b.classList.remove("border-cyan/15", "bg-surface/40");
        b.classList.add("border-teal", "bg-teal/15", "text-teal");
      } else if (i === chosen) {
        b.classList.remove("border-cyan/15", "bg-surface/40");
        b.classList.add("border-rose-400/60", "bg-rose-500/10", "text-rose-300");
      } else {
        b.classList.add("opacity-50");
      }
    });

    if (chosen === q.answer) {
      correct++;
      feedback.textContent = "Correct! +" + OG.POINTS_PER_CORRECT + " KP";
      feedback.className = "text-sm font-medium text-teal";
    } else {
      feedback.textContent = "Not quite — the highlighted answer is correct.";
      feedback.className = "text-sm font-medium text-rose-300";
    }

    const last = index === questions.length - 1;
    nextBtn.innerHTML = last
      ? "See Results " + OG.icon("arrow", "w-4 h-4")
      : "Next Question " + OG.icon("arrow", "w-4 h-4");
    nextBtn.classList.remove("hidden");
  }

  function nextQuestion() {
    if (index < questions.length - 1) {
      index++;
      renderQuestion();
    } else {
      finishQuiz();
    }
  }

  /* ---------- results ---------- */
  function finishQuiz() {
    bar.style.width = "100%";
    const total = questions.length;
    const result = OG.recordQuizResult(currentTopic, correct, total);
    const perfect = correct === total;

    document.getElementById("result-icon").innerHTML = OG.icon(
      perfect ? "trophy" : "star",
      "w-9 h-9"
    );
    document.getElementById("result-title").textContent = perfect
      ? "Perfect Dive!"
      : correct >= total / 2
      ? "Well Done!"
      : "Keep Swimming!";
    const topic = OG.topics.find((t) => t.id === currentTopic);
    document.getElementById("result-sub").textContent =
      "You completed the " + (topic ? topic.title : "") + " quiz.";

    document.getElementById("result-score").textContent = correct + "/" + total;
    document.getElementById("result-earned").textContent = "+" + result.awarded;
    document.getElementById("result-total").textContent = result.totalPoints;

    const unlockBox = document.getElementById("result-unlock");
    if (result.unlockedNow.length) {
      const names = result.unlockedNow
        .map((id) => (OG.zones.find((z) => z.id === id) || {}).name)
        .filter(Boolean)
        .join(", ");
      unlockBox.innerHTML =
        OG.icon("compass", "w-5 h-5 inline -mt-0.5 mr-1") +
        " New zone unlocked: <strong>" +
        names +
        "</strong>";
      unlockBox.classList.remove("hidden");
    } else {
      const next = OG.nextZoneInfo(result.totalPoints);
      if (next) {
        unlockBox.className =
          "mt-6 rounded-2xl border border-cyan/20 bg-cyan/5 p-4 text-sm text-mute";
        unlockBox.innerHTML =
          OG.icon("lock", "w-4 h-4 inline -mt-0.5 mr-1") +
          " " +
          next.remaining +
          " more KP to unlock the <strong class='text-cyan-soft'>" +
          next.zone.name +
          "</strong>.";
        unlockBox.classList.remove("hidden");
      } else {
        unlockBox.classList.add("hidden");
      }
    }

    // refresh nav points display
    const navPoints = document.getElementById("nav-points");
    if (navPoints) navPoints.textContent = result.totalPoints;

    show(resultSec);
    hide(activeSec);
    hide(selectSec);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ---------- helpers ---------- */
  function show(el) {
    el.classList.remove("hidden");
  }
  function hide(el) {
    el.classList.add("hidden");
  }

  /* ---------- events ---------- */
  document.getElementById("topic-select-grid").addEventListener("click", function (e) {
    const btn = e.target.closest("[data-topic]");
    if (btn) startQuiz(btn.getAttribute("data-topic"));
  });

  optionsEl.addEventListener("click", function (e) {
    const btn = e.target.closest("[data-opt]");
    if (btn) handleAnswer(Number(btn.getAttribute("data-opt")));
  });

  nextBtn.addEventListener("click", nextQuestion);

  document.getElementById("quiz-quit").addEventListener("click", function () {
    show(selectSec);
    hide(activeSec);
    hide(resultSec);
    renderSelect();
  });

  document.getElementById("result-retry").addEventListener("click", function () {
    startQuiz(currentTopic);
  });
  document.getElementById("result-more").addEventListener("click", function () {
    show(selectSec);
    hide(resultSec);
    renderSelect();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------- init ---------- */
  renderSelect();
  // deep link e.g. /quiz.html#coral starts that quiz immediately
  const hashTopic = location.hash.replace("#", "");
  if (hashTopic && OG.quizzes[hashTopic]) {
    startQuiz(hashTopic);
  }
});
