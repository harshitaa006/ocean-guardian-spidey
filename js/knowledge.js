/* Knowledge Hub: render topic cards + Learn More modal. */
document.addEventListener("DOMContentLoaded", function () {
  const badge = document.getElementById("hub-badge");
  if (badge) badge.innerHTML = OG.icon("book", "w-4 h-4") + " Learn the essentials";

  const topicIcons = {
    pollution: "recycle",
    marine: "fish",
    coral: "waves",
    endangered: "heart",
  };

  const progress = OG.getProgress();

  const grid = document.getElementById("topic-grid");
  grid.innerHTML = OG.topics
    .map(function (t) {
      const score = progress.quizScores[t.id];
      const badgeHtml = score
        ? `<span class="inline-flex items-center gap-1 rounded-full bg-teal/15 px-3 py-1 text-xs font-semibold text-teal">${OG.icon(
            "check",
            "w-3.5 h-3.5"
          )} Best ${score.best}/${score.total}</span>`
        : `<span class="rounded-full bg-surface2 px-3 py-1 text-xs font-medium text-mute">Not attempted</span>`;
      return `
      <article id="${t.id}" class="glass lift group overflow-hidden rounded-3xl flex flex-col scroll-mt-24">
        <div class="relative h-48 overflow-hidden">
          <img src="${t.image}" alt="${t.title}" class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div class="absolute inset-0 bg-gradient-to-t from-surface via-surface/30 to-transparent"></div>
          <span class="absolute left-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-abyss/60 backdrop-blur text-cyan border border-cyan/20">${OG.icon(
            topicIcons[t.id] || "waves",
            "w-6 h-6"
          )}</span>
        </div>
        <div class="flex flex-1 flex-col p-6">
          <div class="flex items-center justify-between gap-3">
            <p class="text-xs font-semibold uppercase tracking-widest text-cyan-soft">${t.tagline}</p>
            ${badgeHtml}
          </div>
          <h2 class="mt-2 font-display text-2xl font-bold">${t.title}</h2>
          <p class="mt-2 text-sm text-mute leading-relaxed flex-1">${t.description}</p>
          <div class="mt-6 flex flex-wrap gap-3">
            <button data-learn="${t.id}" class="inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-surface/50 px-5 py-2.5 text-sm font-semibold text-foam hover:border-cyan/60 hover:bg-surface transition">
              Learn More
            </button>
            <a href="/quiz.html#${t.id}" class="inline-flex items-center gap-2 rounded-full bg-cyan px-5 py-2.5 text-sm font-semibold text-deep hover:bg-cyan-soft transition">
              Take Quiz ${OG.icon("arrow", "w-4 h-4")}
            </a>
          </div>
        </div>
      </article>`;
    })
    .join("");

  // ---- modal ----
  const modal = document.getElementById("topic-modal");
  const closeBtn = document.getElementById("modal-close-btn");
  if (closeBtn) closeBtn.innerHTML = OG.icon("close", "w-5 h-5");

  function openModal(topicId) {
    const t = OG.topics.find((x) => x.id === topicId);
    if (!t) return;
    document.getElementById("modal-img").src = t.image;
    document.getElementById("modal-img").alt = t.title;
    document.getElementById("modal-title").textContent = t.title;
    document.getElementById("modal-desc").textContent = t.description;
    document.getElementById("modal-quiz-link").href = "/quiz.html#" + t.id;
    document.getElementById("modal-facts").innerHTML = t.facts
      .map(
        (f) =>
          `<li class="flex gap-3 text-sm text-foam/90"><span class="mt-0.5 text-teal shrink-0">${OG.icon(
            "check",
            "w-4 h-4"
          )}</span><span>${f}</span></li>`
      )
      .join("");
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    document.body.style.overflow = "";
  }

  grid.addEventListener("click", function (e) {
    const btn = e.target.closest("[data-learn]");
    if (btn) openModal(btn.getAttribute("data-learn"));
  });

  modal.addEventListener("click", function (e) {
    if (e.target.hasAttribute("data-close")) closeModal();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) closeModal();
  });

  // deep-link: /knowledge.html#pollution scrolls (native), but if it matches a
  // topic we gently highlight it.
  if (location.hash) {
    const el = document.querySelector(location.hash);
    if (el) el.classList.add("ring-2", "ring-cyan/40");
  }
});
