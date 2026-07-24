/* ==========================================================================
   Ocean Explorer page — depth-based zones, locking/unlocking, creature modal
   ========================================================================== */
(function () {
  const progress = OG.getProgress();
  const points = progress.knowledgePoints;

  // Header widgets
  const iconEl = document.getElementById("explore-icon");
  if (iconEl) iconEl.innerHTML = OG.icon("compass", "w-5 h-5");

  const pointsEl = document.getElementById("explore-points");
  if (pointsEl) pointsEl.textContent = points;

  const nextEl = document.getElementById("explore-next");
  if (nextEl) {
    const next = OG.nextZoneInfo(points);
    nextEl.textContent = next
      ? `${next.remaining} KP to unlock the ${next.zone.name}`
      : "All zones unlocked. You are a true guardian.";
  }

  const statusStyles = {
    "Least Concern": "bg-teal/15 text-teal border-teal/30",
    Endangered: "bg-coral/15 text-coral border-coral/40",
    "Data Deficient": "bg-cyan/10 text-cyan-soft border-cyan/30",
  };

  function statusBadge(status) {
    const cls = statusStyles[status] || "bg-cyan/10 text-cyan-soft border-cyan/30";
    return `<span class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${cls}">${status}</span>`;
  }

  function creatureCard(creature, zoneAccent) {
    return `
      <button
        type="button"
        class="creature-card group text-left rounded-2xl overflow-hidden glass border border-cyan/10 hover:border-cyan/30 transition-all hover:-translate-y-1"
        data-name="${encodeURIComponent(creature.name)}"
      >
        <div class="relative aspect-[4/3] overflow-hidden bg-abyss">
          <img
            src="${creature.image}"
            alt="${creature.name}"
            loading="lazy"
            class="h-full w-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-abyss/90 via-transparent to-transparent"></div>
          <div class="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
            <span class="font-display font-bold text-foam drop-shadow">${creature.name}</span>
          </div>
        </div>
        <div class="p-4 flex items-center justify-between gap-2">
          ${statusBadge(creature.status)}
          <span class="text-xs text-mute inline-flex items-center gap-1">Details ${OG.icon(
            "arrow",
            "w-3.5 h-3.5"
          )}</span>
        </div>
      </button>`;
  }

  function zoneBlock(zone, unlocked) {
    const creaturesHTML = zone.creatures.map((c) => creatureCard(c, zone.accent)).join("");

    const lockedOverlay = unlocked
      ? ""
      : `<div class="absolute inset-0 z-10 flex flex-col items-center justify-center text-center gap-3 rounded-3xl bg-abyss/70 backdrop-blur-md px-6">
           <span class="text-mute">${OG.icon("lock", "w-9 h-9")}</span>
           <p class="font-display text-lg font-bold text-foam">${zone.name} is locked</p>
           <p class="text-sm text-mute max-w-xs">Earn <span class="text-cyan-soft font-semibold">${zone.unlockAt} Knowledge Points</span> in the Quiz Zone to dive this deep.</p>
           <a href="/quiz.html" class="mt-1 inline-flex items-center gap-2 rounded-full bg-cyan px-4 py-2 text-sm font-semibold text-abyss hover:bg-cyan-soft transition-colors">Take a quiz ${OG.icon(
             "brain",
             "w-4 h-4"
           )}</a>
         </div>`;

    return `
      <article class="relative rounded-3xl border border-cyan/10 overflow-hidden" style="background:linear-gradient(180deg, ${zone.accent}14, transparent 60%)">
        <div class="p-6 sm:p-8">
          <div class="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <div class="flex items-center gap-3">
                <span class="h-3 w-3 rounded-full" style="background:${zone.accent}"></span>
                <h2 class="font-display text-2xl sm:text-3xl font-extrabold text-foam">${zone.name}</h2>
              </div>
              <p class="mt-2 text-mute max-w-2xl text-pretty">${zone.blurb}</p>
            </div>
            <div class="text-right">
              <p class="text-xs uppercase tracking-widest text-mute">Depth</p>
              <p class="font-display font-bold" style="color:${zone.accent}">${zone.depth}</p>
            </div>
          </div>
          <div class="relative">
            <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 ${
              unlocked ? "" : "pointer-events-none blur-sm opacity-40"
            }">
              ${creaturesHTML}
            </div>
            ${lockedOverlay}
          </div>
        </div>
      </article>`;
  }

  // Render all zones
  const zonesMount = document.getElementById("zones");
  const unlockedIds = OG.getUnlockedZones(points);
  zonesMount.innerHTML = OG.zones
    .map((z) => zoneBlock(z, unlockedIds.includes(z.id)))
    .join("");

  // Creature modal
  const modal = document.getElementById("creature-modal");
  const modalBody = document.getElementById("creature-modal-body");
  const closeBtn = document.getElementById("creature-close");
  const backdrop = document.getElementById("creature-backdrop");
  closeBtn.innerHTML = OG.icon("close", "w-5 h-5");

  function findCreature(name) {
    for (const zone of OG.zones) {
      const found = zone.creatures.find((c) => c.name === name);
      if (found) return { creature: found, zone };
    }
    return null;
  }

  function openCreature(name) {
    const match = findCreature(name);
    if (!match) return;
    const { creature, zone } = match;

    const threats = creature.threats
      .map(
        (t) =>
          `<li class="flex items-center gap-2 text-sm text-mute"><span class="text-coral">${OG.icon(
            "arrow",
            "w-3.5 h-3.5"
          )}</span>${t}</li>`
      )
      .join("");

    modalBody.innerHTML = `
      <div class="relative aspect-[16/10] overflow-hidden">
        <img src="${creature.image}" alt="${creature.name}" class="h-full w-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/20 to-transparent"></div>
        <div class="absolute bottom-4 left-5 right-5">
          <p class="text-xs uppercase tracking-widest" style="color:${zone.accent}">${zone.name}</p>
          <h3 id="creature-modal-title" class="font-display text-2xl font-extrabold text-foam">${creature.name}</h3>
        </div>
      </div>
      <div class="p-5 sm:p-6 space-y-5">
        <div class="flex flex-wrap items-center gap-3">
          ${statusBadge(creature.status)}
          <span class="text-xs text-mute">Population: <span class="text-foam font-medium">${creature.population}</span></span>
        </div>
        <div>
          <p class="text-xs uppercase tracking-widest text-mute mb-1">Habitat</p>
          <p class="text-sm text-foam">${creature.habitat}</p>
        </div>
        <div>
          <p class="text-xs uppercase tracking-widest text-mute mb-2">Main threats</p>
          <ul class="space-y-1.5">${threats}</ul>
        </div>
        <div class="rounded-xl bg-cyan/5 border border-cyan/15 p-4">
          <p class="text-xs uppercase tracking-widest text-cyan-soft mb-1 flex items-center gap-1.5">${OG.icon(
            "star",
            "w-3.5 h-3.5"
          )} Did you know?</p>
          <p class="text-sm text-foam leading-relaxed">${creature.fact}</p>
        </div>
      </div>`;

    modal.classList.remove("hidden");
    modal.classList.add("flex");
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }

  function closeCreature() {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    document.body.style.overflow = "";
  }

  zonesMount.addEventListener("click", function (e) {
    const card = e.target.closest(".creature-card");
    if (!card) return;
    openCreature(decodeURIComponent(card.getAttribute("data-name")));
  });

  closeBtn.addEventListener("click", closeCreature);
  backdrop.addEventListener("click", closeCreature);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) closeCreature();
  });
})();
