/* ==========================================================================
   Ocean Guardian — shared content data
   Plain JavaScript objects/arrays used across every page.
   Exposed on window.OG so any page script can read it.
   ========================================================================== */

window.OG = window.OG || {};

/* ---------------------------- Knowledge topics --------------------------- */
OG.topics = [
  {
    id: "pollution",
    title: "Ocean Pollution",
    image: "/images/topic-pollution.png",
    tagline: "The plastic problem",
    description:
      "Over 11 million tonnes of plastic enter the ocean every year, harming wildlife and entering the food chain.",
    facts: [
      "A single plastic bottle can take up to 450 years to break down at sea.",
      "By weight, there could be more plastic than fish in the ocean by 2050.",
      "Microplastics have been found in the deepest ocean trench on Earth.",
      "Around 80% of marine litter originates from land-based sources.",
    ],
  },
  {
    id: "marine",
    title: "Marine Life",
    image: "/images/topic-marine-life.png",
    tagline: "Life in the blue",
    description:
      "The ocean hosts an astonishing diversity of life, from microscopic plankton to the largest animal ever known.",
    facts: [
      "Scientists estimate over 90% of ocean species are still undiscovered.",
      "The blue whale is the largest animal to have ever lived on Earth.",
      "Phytoplankton produce more than half of the oxygen we breathe.",
      "Some jellyfish are effectively biologically immortal.",
    ],
  },
  {
    id: "coral",
    title: "Coral Reefs",
    image: "/images/topic-coral.png",
    tagline: "Rainforests of the sea",
    description:
      "Coral reefs cover less than 1% of the ocean floor but support around 25% of all marine species.",
    facts: [
      "Corals are animals, not plants — colonies of tiny polyps.",
      "Warming seas cause 'bleaching', where corals expel their algae and starve.",
      "The Great Barrier Reef is the largest living structure on Earth.",
      "Reefs protect coastlines by absorbing up to 97% of wave energy.",
    ],
  },
  {
    id: "endangered",
    title: "Endangered Species",
    image: "/images/topic-endangered.png",
    tagline: "Racing against extinction",
    description:
      "Many marine animals face extinction from overfishing, pollution, and habitat loss — but recovery is possible.",
    facts: [
      "The vaquita porpoise is the most endangered marine mammal, with only a handful left.",
      "All seven species of sea turtle are threatened or endangered.",
      "Overfishing has reduced some shark populations by more than 70%.",
      "Protected areas have helped humpback whale numbers recover strongly.",
    ],
  },
];

/* ------------------------------- Quiz bank ------------------------------- */
/* Each correct answer is worth OG.POINTS_PER_CORRECT knowledge points. */
OG.POINTS_PER_CORRECT = 10;

OG.quizzes = {
  pollution: [
    {
      q: "Roughly how much plastic enters the ocean each year?",
      options: ["11 million tonnes", "50 thousand tonnes", "900 tonnes", "1 billion tonnes"],
      answer: 0,
    },
    {
      q: "What are tiny plastic fragments under 5mm called?",
      options: ["Nanoplast", "Microplastics", "Plastoids", "Seafoam"],
      answer: 1,
    },
    {
      q: "About what share of marine litter comes from land?",
      options: ["10%", "35%", "80%", "5%"],
      answer: 2,
    },
    {
      q: "How long can a plastic bottle persist in the sea?",
      options: ["1 year", "10 years", "Up to 450 years", "Forever, it never breaks down"],
      answer: 2,
    },
    {
      q: "Which action most reduces ocean plastic pollution?",
      options: [
        "Using more single-use packaging",
        "Reducing and reusing everyday plastics",
        "Dumping waste further offshore",
        "Ignoring recycling",
      ],
      answer: 1,
    },
  ],
  marine: [
    {
      q: "What produces more than half of Earth's oxygen?",
      options: ["Rainforests", "Phytoplankton", "Coral", "Seaweed farms"],
      answer: 1,
    },
    {
      q: "What is the largest animal known to have ever lived?",
      options: ["Great white shark", "Giant squid", "Blue whale", "Whale shark"],
      answer: 2,
    },
    {
      q: "About what fraction of ocean species remain undiscovered?",
      options: ["Around 10%", "Around 50%", "Over 90%", "None, all are known"],
      answer: 2,
    },
    {
      q: "Which creature is considered biologically 'immortal'?",
      options: ["Certain jellyfish", "Dolphins", "Tuna", "Seahorses"],
      answer: 0,
    },
    {
      q: "Plankton forms the base of the ocean's what?",
      options: ["Coral skeleton", "Food web", "Tide system", "Salt content"],
      answer: 1,
    },
  ],
  coral: [
    {
      q: "Coral reefs support roughly what share of marine species?",
      options: ["1%", "25%", "60%", "99%"],
      answer: 1,
    },
    {
      q: "A coral is actually which of the following?",
      options: ["A plant", "A rock", "An animal", "A type of algae"],
      answer: 2,
    },
    {
      q: "What is coral 'bleaching' caused by?",
      options: [
        "Too little sunlight",
        "Warming and stressed water",
        "Excess fish",
        "Strong tides",
      ],
      answer: 1,
    },
    {
      q: "Which is the largest living structure on Earth?",
      options: ["Amazon reef", "Great Barrier Reef", "Red Sea reef", "Maldives atoll"],
      answer: 1,
    },
    {
      q: "How do reefs help coastlines?",
      options: [
        "They absorb most wave energy",
        "They increase erosion",
        "They raise sea levels",
        "They have no effect",
      ],
      answer: 0,
    },
  ],
  endangered: [
    {
      q: "Which is the most endangered marine mammal?",
      options: ["Vaquita porpoise", "Bottlenose dolphin", "Orca", "Manatee"],
      answer: 0,
    },
    {
      q: "How many sea turtle species are threatened or endangered?",
      options: ["None", "Two", "All seven", "Only one"],
      answer: 2,
    },
    {
      q: "A major driver of shark population decline is:",
      options: ["Overfishing", "Too much plankton", "Cold water", "Coral growth"],
      answer: 0,
    },
    {
      q: "What has helped humpback whale numbers recover?",
      options: [
        "More shipping lanes",
        "Protected areas and hunting bans",
        "Warmer oceans",
        "Increased fishing",
      ],
      answer: 1,
    },
    {
      q: "Which best helps endangered marine species?",
      options: [
        "Marine protected areas",
        "Unregulated fishing",
        "Coastal development",
        "Plastic dumping",
      ],
      answer: 0,
    },
  ],
};

/* ------------------------- Ocean zones & creatures ----------------------- */
/* unlockAt = knowledge points required to unlock the zone. */
OG.zones = [
  {
    id: "sunlight",
    name: "Sunlight Zone",
    depth: "0 – 200 m",
    unlockAt: 0,
    accent: "#38bdf8",
    blurb: "Warm, bright surface waters where photosynthesis thrives and life is abundant.",
    creatures: [
      {
        name: "Clownfish",
        image: "/images/creature-clownfish.png",
        habitat: "Warm, shallow coral reefs",
        population: "Stable",
        status: "Least Concern",
        threats: ["Reef bleaching", "Aquarium trade", "Habitat loss"],
        fact: "Clownfish live in a protective partnership with stinging sea anemones.",
      },
      {
        name: "Green Sea Turtle",
        image: "/images/creature-turtle.png",
        habitat: "Coastal seagrass beds and reefs",
        population: "Decreasing",
        status: "Endangered",
        threats: ["Plastic ingestion", "Fishing bycatch", "Nesting habitat loss"],
        fact: "Green sea turtles can hold their breath for hours while resting.",
      },
      {
        name: "Bottlenose Dolphin",
        image: "/images/creature-dolphin.png",
        habitat: "Temperate and tropical surface waters",
        population: "Stable",
        status: "Least Concern",
        threats: ["Fishing nets", "Noise pollution", "Chemical pollution"],
        fact: "Dolphins use signature whistles as individual 'names'.",
      },
    ],
  },
  {
    id: "twilight",
    name: "Twilight Zone",
    depth: "200 – 1,000 m",
    unlockAt: 40,
    accent: "#22d3ee",
    blurb: "Dim, cold waters where sunlight fades and bioluminescence begins to glow.",
    creatures: [
      {
        name: "Swordfish",
        image: "/images/creature-swordfish.png",
        habitat: "Open ocean, diving into the twilight zone",
        population: "Stable",
        status: "Least Concern",
        threats: ["Overfishing", "Longline bycatch"],
        fact: "Swordfish have special organs that warm their eyes and brain in cold depths.",
      },
      {
        name: "Lanternfish",
        image: "/images/creature-lanternfish.png",
        habitat: "Deep scattering layers of the twilight zone",
        population: "Abundant",
        status: "Least Concern",
        threats: ["Emerging deep-sea fishing", "Climate shifts"],
        fact: "Lanternfish are among the most abundant vertebrates on the planet.",
      },
      {
        name: "Humboldt Squid",
        image: "/images/creature-humboldt-squid.png",
        habitat: "Eastern Pacific twilight waters",
        population: "Fluctuating",
        status: "Data Deficient",
        threats: ["Overfishing", "Ocean warming"],
        fact: "They can flash red and white to communicate, earning the name 'red devil'.",
      },
    ],
  },
  {
    id: "midnight",
    name: "Midnight Zone",
    depth: "1,000 – 4,000 m",
    unlockAt: 90,
    accent: "#6366f1",
    blurb: "Pitch-black, high-pressure waters where creatures make their own light.",
    creatures: [
      {
        name: "Anglerfish",
        image: "/images/creature-anglerfish.png",
        habitat: "Cold, dark midnight-zone depths",
        population: "Unknown",
        status: "Data Deficient",
        threats: ["Deep-sea trawling", "Climate change"],
        fact: "The female's glowing lure is powered by symbiotic bioluminescent bacteria.",
      },
      {
        name: "Giant Squid",
        image: "/images/creature-giant-squid.png",
        habitat: "Deep ocean worldwide",
        population: "Unknown",
        status: "Data Deficient",
        threats: ["Deep-sea disturbance", "Poorly understood"],
        fact: "Its eye can be the size of a dinner plate — the largest in the animal kingdom.",
      },
      {
        name: "Vampire Squid",
        image: "/images/creature-vampire-squid.png",
        habitat: "Low-oxygen midnight-zone waters",
        population: "Stable",
        status: "Least Concern",
        threats: ["Deep-sea mining interest", "Climate change"],
        fact: "Despite its name, it feeds on falling marine 'snow', not blood.",
      },
    ],
  },
  {
    id: "abyssal",
    name: "Abyssal Zone",
    depth: "4,000 – 6,000 m",
    unlockAt: 150,
    accent: "#0ea5a3",
    blurb: "The near-freezing abyss, one of Earth's least explored and most alien habitats.",
    creatures: [
      {
        name: "Dumbo Octopus",
        image: "/images/creature-dumbo-octopus.png",
        habitat: "Abyssal sea floor",
        population: "Unknown",
        status: "Data Deficient",
        threats: ["Deep-sea mining", "Bottom trawling"],
        fact: "It flaps ear-like fins to 'fly' gracefully through the deep.",
      },
      {
        name: "Fangtooth Fish",
        image: "/images/creature-fangtooth.png",
        habitat: "Abyssal open water",
        population: "Unknown",
        status: "Data Deficient",
        threats: ["Deep-sea disturbance"],
        fact: "It has the largest teeth relative to body size of any ocean fish.",
      },
      {
        name: "Sea Pig",
        image: "/images/creature-sea-pig.png",
        habitat: "Soft abyssal sediment",
        population: "Abundant",
        status: "Least Concern",
        threats: ["Deep-sea mining", "Sediment disturbance"],
        fact: "Sea pigs are sea cucumbers that vacuum nutrients from the sea floor mud.",
      },
    ],
  },
];

/* ---------------------- Conservation success stories --------------------- */
OG.stories = [
  {
    title: "Coral Reefs Reborn",
    image: "/images/story-reef.png",
    location: "Indo-Pacific",
    text: "Reef restoration teams grow coral fragments in nurseries and transplant them onto damaged reefs, bringing bleached areas back to life within a few years.",
  },
  {
    title: "Sea Turtles Return",
    image: "/images/story-turtle.png",
    location: "Global coastlines",
    text: "Protected nesting beaches and bans on egg harvesting have helped several sea turtle populations climb back from the brink.",
  },
  {
    title: "Beaches Reclaimed",
    image: "/images/story-cleanup.png",
    location: "Worldwide",
    text: "Community clean-ups remove millions of kilograms of plastic from coastlines every year, keeping waste out of the ocean food web.",
  },
];

/* --------------------------- Ways to help data --------------------------- */
OG.actions = [
  {
    title: "Cut single-use plastic",
    text: "Carry a reusable bottle, bag and cup. Refusing throwaway plastic keeps it out of the sea.",
    icon: "recycle",
  },
  {
    title: "Choose sustainable seafood",
    text: "Look for certified, responsibly-caught seafood to ease pressure on fish populations.",
    icon: "fish",
  },
  {
    title: "Join a beach clean-up",
    text: "A couple of hours with a local group removes waste before it reaches the water.",
    icon: "hand",
  },
  {
    title: "Save water & energy",
    text: "Less runoff and lower emissions mean healthier, cooler, cleaner oceans.",
    icon: "droplet",
  },
  {
    title: "Support marine charities",
    text: "Donating or volunteering funds research, patrols and protected areas.",
    icon: "heart",
  },
  {
    title: "Spread the word",
    text: "Share what you learn here. Awareness is the first wave of change.",
    icon: "megaphone",
  },
];
