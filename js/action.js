/* ==========================================================================
   Take Action page — success stories, ways to help, pledge (localStorage)
   ========================================================================== */
(function () {
  document.getElementById("action-icon").innerHTML = OG.icon("leaf", "w-5 h-5");
  document.getElementById("pledge-icon").innerHTML = OG.icon("heart", "w-10 h-10");

  /* --------------------------- Success stories --------------------------- */
  const storiesMount = document.getElementById("stories");
  storiesMount.innerHTML = OG.stories
    .map(
      (s) => `
      <article class="group rounded-2xl overflow-hidden glass border border-cyan/10 hover:border-cyan/30 transition-all">
        <div class="relative aspect-[16/10] overflow-hidden">
          <img src="${s.image}" alt="${s.title}" loading="lazy" class="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div class="absolute inset-0 bg-gradient-to-t from-abyss/80 to-transparent"></div>
          <span class="absolute bottom-3 left-3 rounded-full bg-teal/20 border border-teal/40 px-2.5 py-1 text-xs font-semibold text-teal">${s.location}</span>
        </div>
        <div class="p-5">
          <h3 class="font-display text-lg font-bold text-foam mb-2">${s.title}</h3>
          <p class="text-sm text-mute leading-relaxed">${s.text}</p>
        </div>
      </article>`
    )
    .join("");

  /* ----------------------------- Ways to help ---------------------------- */
  const actionsMount = document.getElementById("actions");
  actionsMount.innerHTML = OG.actions
    .map(
      (a) => `
      <div class="rounded-2xl glass border border-cyan/10 p-6 hover:border-cyan/30 transition-colors">
        <span class="inline-flex items-center justify-center rounded-xl bg-cyan/10 text-cyan p-2.5 mb-4">${OG.icon(
          a.icon,
          "w-6 h-6"
        )}</span>
        <h3 class="font-display text-lg font-bold text-foam mb-1.5">${a.title}</h3>
        <p class="text-sm text-mute leading-relaxed">${a.text}</p>
      </div>`
    )
    .join("");

  /* ------------------------------- Pledge -------------------------------- */
  const PLEDGE_KEY = "oceanGuardian.pledges";

  function getPledgeCount() {
    // Start from a friendly baseline so the counter feels alive, then add
    // any pledges made on this device.
    const base = 12847;
    try {
      const local = JSON.parse(localStorage.getItem(PLEDGE_KEY) || "[]");
      return base + local.length;
    } catch (e) {
      return base;
    }
  }

  function addPledge(name) {
    try {
      const local = JSON.parse(localStorage.getItem(PLEDGE_KEY) || "[]");
      local.push({ name: name, at: Date.now() });
      localStorage.setItem(PLEDGE_KEY, JSON.stringify(local));
    } catch (e) {
      console.log("[v0] Failed to store pledge:", e.message);
    }
  }

  function alreadyPledged() {
    try {
      const local = JSON.parse(localStorage.getItem(PLEDGE_KEY) || "[]");
      return local.length > 0 ? local[local.length - 1].name : null;
    } catch (e) {
      return null;
    }
  }

  const form = document.getElementById("pledge-form");
  const result = document.getElementById("pledge-result");
  const nameInput = document.getElementById("pledge-name");

  function showResult(name) {
    result.innerHTML = `
      <div class="rounded-2xl bg-teal/10 border border-teal/30 p-5">
        <p class="flex items-center justify-center gap-2 font-display text-lg font-bold text-teal">
          ${OG.icon("check", "w-5 h-5")} Thank you, ${name}!
        </p>
        <p class="mt-1 text-sm text-mute">You are guardian number
          <span class="font-semibold text-foam">${getPledgeCount().toLocaleString()}</span>.
          Now go tell someone what you learned.
        </p>
      </div>`;
    result.classList.remove("hidden");
  }

  // If they already pledged on this device, greet them.
  const existing = alreadyPledged();
  if (existing) showResult(existing);

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = nameInput.value.trim();
    if (!name) return;
    addPledge(name);
    form.reset();
    showResult(name);
    result.scrollIntoView({ behavior: "smooth", block: "center" });
  });
})();
