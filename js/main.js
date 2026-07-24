/* ==========================================================================
   Ocean Guardian — shared app logic
   - localStorage progress (points, quiz scores, unlocked zones, achievements)
   - shared navigation bar + footer injection
   Depends on data.js (window.OG) being loaded first.
   ========================================================================== */

window.OG = window.OG || {};

/* ------------------------------ Icon helper ------------------------------ */
/* Minimal inline SVG icons (Lucide-style paths) so we avoid emojis. */
OG.icon = function (name, cls) {
  const paths = {
    waves:
      '<path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 1.3 0 1.9-.5 2.5-1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 1.3 0 1.9-.5 2.5-1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 1.3 0 1.9-.5 2.5-1"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
    brain:
      '<path d="M12 5a3 3 0 1 0-5.9.8A3 3 0 0 0 4 9a3 3 0 0 0 1.5 2.6A3 3 0 0 0 7 17a3 3 0 0 0 5 1.5 3 3 0 0 0 5-1.5 3 3 0 0 0 1.5-5.4A3 3 0 0 0 20 9a3 3 0 0 0-2.1-3.2A3 3 0 0 0 12 5z"/>',
    compass:
      '<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>',
    leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/>',
    lock: '<rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    trophy:
      '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>',
    star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
    recycle:
      '<path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5"/><path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12"/><path d="m14 16-3 3 3 3"/><path d="M8.293 13.596 4.875 9.5 1.5 13.5"/><path d="m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843"/><path d="m13.378 9.633 4.096 1.098 1.097-4.096"/>',
    fish: '<path d="M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6Z"/><path d="M18 12v.5"/><path d="M16 17.93a9.77 9.77 0 0 1 0-11.86"/><path d="M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33"/><path d="M10.46 7.26C10.2 5.88 9.17 4.24 8 3h5.8a2 2 0 0 1 1.98 1.67l.23 1.4"/><path d="m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98"/>',
    hand: '<path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>',
    droplet: '<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>',
    heart:
      '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
    megaphone: '<path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>',
    arrow: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    close: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    menu: '<line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="18" y2="18"/>',
    map: '<path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z"/><path d="M15 5.764v15"/><path d="M9 3.236v15"/>',
    globe:
      '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
  };
  const d = paths[name] || "";
  return (
    '<svg xmlns="http://www.w3.org/2000/svg" class="' +
    (cls || "w-6 h-6") +
    '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    d +
    "</svg>"
  );
};

/* ------------------------------ Progress store --------------------------- */
OG.STORAGE_KEY = "oceanGuardian.v1";

OG.defaultProgress = function () {
  return {
    knowledgePoints: 0,
    quizScores: {}, // { topicId: { best: n, total: m } }
    achievements: [], // array of achievement ids
  };
};

OG.getProgress = function () {
  try {
    const raw = localStorage.getItem(OG.STORAGE_KEY);
    if (!raw) return OG.defaultProgress();
    const parsed = JSON.parse(raw);
    return Object.assign(OG.defaultProgress(), parsed);
  } catch (e) {
    console.log("[v0] Failed to read progress:", e.message);
    return OG.defaultProgress();
  }
};

OG.saveProgress = function (progress) {
  try {
    localStorage.setItem(OG.STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.log("[v0] Failed to save progress:", e.message);
  }
};

/* Which zones are unlocked given current points. */
OG.getUnlockedZones = function (points) {
  const p = typeof points === "number" ? points : OG.getProgress().knowledgePoints;
  return OG.zones.filter((z) => p >= z.unlockAt).map((z) => z.id);
};

/* Record a completed quiz. Returns info about newly earned points/unlocks. */
OG.recordQuizResult = function (topicId, correctCount, totalCount) {
  const progress = OG.getProgress();
  const gained = correctCount * OG.POINTS_PER_CORRECT;

  const prevUnlocked = OG.getUnlockedZones(progress.knowledgePoints);
  const prev = progress.quizScores[topicId];

  // Points count only for improvement on a topic's best score, so replaying
  // the same quiz can't farm unlimited points.
  let awarded = gained;
  if (prev) {
    const prevBestPoints = prev.best * OG.POINTS_PER_CORRECT;
    awarded = Math.max(0, gained - prevBestPoints);
  }

  progress.knowledgePoints += awarded;
  progress.quizScores[topicId] = {
    best: prev ? Math.max(prev.best, correctCount) : correctCount,
    total: totalCount,
  };

  // Achievements
  OG.grantAchievement(progress, "first-quiz", "First Quiz Completed");
  if (correctCount === totalCount) {
    OG.grantAchievement(progress, "perfect-" + topicId, "Perfect Score: " + topicId);
  }
  const topicsDone = Object.keys(progress.quizScores).length;
  if (topicsDone >= OG.topics.length) {
    OG.grantAchievement(progress, "all-topics", "Scholar of the Sea");
  }

  const newUnlocked = OG.getUnlockedZones(progress.knowledgePoints);
  const unlockedNow = newUnlocked.filter((z) => !prevUnlocked.includes(z));
  unlockedNow.forEach((zid) => {
    const zone = OG.zones.find((z) => z.id === zid);
    if (zone) OG.grantAchievement(progress, "zone-" + zid, "Unlocked: " + zone.name);
  });

  OG.saveProgress(progress);

  return {
    awarded: awarded,
    totalPoints: progress.knowledgePoints,
    unlockedNow: unlockedNow,
  };
};

OG.grantAchievement = function (progress, id, label) {
  if (!progress.achievements.some((a) => a.id === id)) {
    progress.achievements.push({ id: id, label: label });
  }
};

/* Points needed until the next locked zone unlocks (or null if all unlocked). */
OG.nextZoneInfo = function (points) {
  const locked = OG.zones.filter((z) => points < z.unlockAt).sort((a, b) => a.unlockAt - b.unlockAt);
  if (!locked.length) return null;
  const next = locked[0];
  return { zone: next, remaining: next.unlockAt - points };
};

/* ------------------------- Navigation + footer --------------------------- */
OG.NAV_LINKS = [
  { href: "/index.html", label: "Home", key: "home" },
  { href: "/knowledge.html", label: "Learn", key: "learn" },
  { href: "/quiz.html", label: "Quiz", key: "quiz" },
  { href: "/explorer.html", label: "Explore", key: "explore" },
  { href: "/action.html", label: "Take Action", key: "action" },
];

OG.renderNav = function () {
  const mount = document.getElementById("site-nav");
  if (!mount) return;
  const active = mount.getAttribute("data-active") || "";
  const points = OG.getProgress().knowledgePoints;

  const links = OG.NAV_LINKS.map((l) => {
    const current = l.key === active ? 'aria-current="page"' : "";
    return `<a href="${l.href}" ${current} class="nav-link text-sm font-medium text-mute hover:text-foam transition-colors">${l.label}</a>`;
  }).join("");

  const mobileLinks = OG.NAV_LINKS.map((l) => {
    const current = l.key === active ? 'aria-current="page"' : "";
    return `<a href="${l.href}" ${current} class="nav-link block py-2 text-base font-medium text-mute hover:text-foam">${l.label}</a>`;
  }).join("");

  mount.innerHTML = `
    <div class="fixed top-0 inset-x-0 z-50">
      <nav class="glass-strong border-b border-cyan/10" aria-label="Primary">
        <div class="mx-auto max-w-7xl px-4 sm:px-6">
          <div class="flex h-16 items-center justify-between gap-4">
            <a href="/index.html" class="flex items-center gap-2 group">
              <span class="text-cyan group-hover:text-cyan-soft transition-colors">${OG.icon(
                "waves",
                "w-7 h-7"
              )}</span>
              <span class="font-display text-lg font-bold tracking-tight text-foam">Ocean<span class="text-cyan">Guardian</span></span>
            </a>
            <div class="hidden md:flex items-center gap-8">${links}</div>
            <div class="flex items-center gap-3">
              <a href="/explorer.html" class="hidden sm:flex items-center gap-1.5 rounded-full bg-cyan/10 border border-cyan/30 px-3 py-1.5 text-xs font-semibold text-cyan-soft" title="Your knowledge points">
                ${OG.icon("star", "w-4 h-4")}
                <span id="nav-points">${points}</span> KP
              </a>
              <button id="nav-toggle" class="md:hidden text-foam p-2 -mr-2" aria-label="Toggle menu" aria-expanded="false">
                ${OG.icon("menu", "w-6 h-6")}
              </button>
            </div>
          </div>
        </div>
        <div id="nav-mobile" class="md:hidden hidden border-t border-cyan/10 px-4 pb-4 pt-2">${mobileLinks}
          <a href="/explorer.html" class="mt-2 inline-flex items-center gap-1.5 rounded-full bg-cyan/10 border border-cyan/30 px-3 py-1.5 text-xs font-semibold text-cyan-soft">${OG.icon(
            "star",
            "w-4 h-4"
          )} ${points} Knowledge Points</a>
        </div>
      </nav>
    </div>
    <div class="h-16"></div>`;

  const toggle = document.getElementById("nav-toggle");
  const mobile = document.getElementById("nav-mobile");
  if (toggle && mobile) {
    toggle.addEventListener("click", () => {
      const open = !mobile.classList.contains("hidden");
      mobile.classList.toggle("hidden");
      toggle.setAttribute("aria-expanded", String(!open));
    });
  }
};

OG.renderFooter = function () {
  const mount = document.getElementById("site-footer");
  if (!mount) return;
  const year = new Date().getFullYear();
  const links = OG.NAV_LINKS.map(
    (l) =>
      `<a href="${l.href}" class="text-sm text-mute hover:text-cyan-soft transition-colors">${l.label}</a>`
  ).join("");
  mount.innerHTML = `
    <footer class="mt-24 border-t border-cyan/10 bg-abyss/60">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div class="max-w-sm">
            <div class="flex items-center gap-2 mb-3">
              <span class="text-cyan">${OG.icon("waves", "w-6 h-6")}</span>
              <span class="font-display text-lg font-bold text-foam">Ocean<span class="text-cyan">Guardian</span></span>
            </div>
            <p class="text-sm text-mute leading-relaxed">Learn about our oceans, test your knowledge, and dive deeper to protect the blue heart of our planet.</p>
          </div>
          <nav class="flex flex-wrap gap-x-8 gap-y-3" aria-label="Footer">${links}</nav>
        </div>
        <div class="mt-10 pt-6 border-t border-cyan/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p class="text-xs text-mute">© ${year} Ocean Guardian. An educational project.</p>
          <p class="text-xs text-mute">Made for the ocean. Every drop counts.</p>
        </div>
      </div>
    </footer>`;
};

/* ------------------------------- Bootstrap ------------------------------- */
document.addEventListener("DOMContentLoaded", function () {
  OG.renderNav();
  OG.renderFooter();
});
