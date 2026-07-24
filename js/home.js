/* Home page dynamic bits: hero badge/arrow icons, progress snapshot,
   journey steps and topic previews. */
document.addEventListener("DOMContentLoaded", function () {
  // decorative icons
  const badge = document.getElementById("hero-badge-icon");
  if (badge) badge.innerHTML = OG.icon("waves", "w-4 h-4");
  const arrow = document.getElementById("hero-cta-arrow");
  if (arrow) arrow.innerHTML = OG.icon("arrow", "w-4 h-4");

  const progress = OG.getProgress();
  const unlocked = OG.getUnlockedZones(progress.knowledgePoints);
  const quizzesTaken = Object.keys(progress.quizScores).length;

  // ---- progress snapshot ----
  const snap = document.getElementById("hero-progress");
  if (snap) {
    const stats = [
      { value: progress.knowledgePoints, label: "Knowledge Points" },
      { value: unlocked.length + "/" + OG.zones.length, label: "Zones Unlocked" },
      { value: quizzesTaken + "/" + OG.topics.length, label: "Quizzes Taken" },
    ];
    snap.innerHTML = stats
      .map(
        (s) => `
        <div class="glass rounded-2xl px-4 py-4 text-center">
          <div class="font-display text-2xl font-bold text-cyan-soft">${s.value}</div>
          <div class="mt-1 text-[11px] uppercase tracking-wide text-mute">${s.label}</div>
        </div>`
      )
      .join("");
  }

  // ---- journey steps ----
  const steps = [
    { icon: "book", title: "Learn", text: "Read bite-sized facts across four key ocean topics." },
    { icon: "brain", title: "Quiz", text: "Answer questions to earn Knowledge Points." },
    { icon: "compass", title: "Unlock", text: "Spend points to open deeper ocean zones." },
    { icon: "leaf", title: "Act", text: "Discover species and simple ways to help." },
  ];
  const stepsMount = document.getElementById("journey-steps");
  if (stepsMount) {
    stepsMount.innerHTML = steps
      .map(
        (s, i) => `
        <div class="glass lift rounded-2xl p-6">
          <div class="flex items-center justify-between">
            <span class="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-cyan/10 text-cyan">${OG.icon(
              s.icon,
              "w-6 h-6"
            )}</span>
            <span class="font-display text-3xl font-bold text-surface2/80 text-cyan/20">0${
              i + 1
            }</span>
          </div>
          <h3 class="mt-5 font-display text-xl font-semibold">${s.title}</h3>
          <p class="mt-2 text-sm text-mute leading-relaxed">${s.text}</p>
        </div>`
      )
      .join("");
  }

  // ---- topic previews ----
  const topicsMount = document.getElementById("home-topics");
  if (topicsMount) {
    topicsMount.innerHTML = OG.topics
      .map(
        (t) => `
        <a href="/knowledge.html#${t.id}" class="group relative overflow-hidden rounded-2xl border border-cyan/10 lift">
          <img src="${t.image}" alt="${t.title}" class="h-28 sm:h-32 w-full object-cover transition-transform duration-500 group-hover:scale-110" />
          <div class="absolute inset-0 bg-gradient-to-t from-deep via-deep/40 to-transparent"></div>
          <span class="absolute bottom-2 left-3 text-sm font-semibold">${t.title}</span>
        </a>`
      )
      .join("");
  }
});
