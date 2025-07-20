// ---------- Dark Mode Toggle ----------

const toggleBtn = document.getElementById("toggle-mode");
const prefersDark = localStorage.getItem("theme") === "dark";

// Apply saved theme
if (prefersDark) {
    document.body.classList.remove("light");
    toggleBtn.textContent = "☀️";
} else {
    document.body.classList.add("light");
    toggleBtn.textContent = "🌙";
}

toggleBtn.addEventListener("click", () => {
    const isLight = document.body.classList.toggle("light");
    localStorage.setItem("theme", isLight ? "light" : "dark");
    toggleBtn.textContent = isLight ? "🌙" : "☀️";
});

async function fetchStories() {
  const res = await fetch("json/stories.json");
  return await res.json();
}

// HOME PAGE RANDOM DISPLAY
if (window.location.pathname.includes("index.html")) {
  fetchStories().then(data => {
    const container = document.getElementById("random-stories");
    const today = new Date().getDate();
    const shuffled = [...data].sort(() => 0.5 - Math.random());
    const stories = shuffled.slice(0, 3);
    container.innerHTML = stories.map(s => `
      <div class="story-card">
        <h3><a href="${s.link}">${s.title}</a></h3>
        <p>${s.excerpt}</p>
        <small>${s.faction} • ${s.type}</small>
      </div>
    `).join('');
  });
}

// STORIES PAGE
if (window.location.pathname.includes("stories.html")) {
  fetchStories().then(data => {
    const container = document.getElementById("all-stories");
    const search = document.getElementById("search");
    const factionFilter = document.getElementById("faction-filter");

    // Load factions
    const factions = [...new Set(data.map(s => s.faction))];
    factions.forEach(f => {
      const option = document.createElement("option");
      option.value = f;
      option.textContent = f;
      factionFilter.appendChild(option);
    });

    function render(stories) {
      container.innerHTML = stories.map(s => `
        <article class="story-card">
          <h4><a href="${s.link}">${s.title}</a></h4>
          <p>${s.excerpt}</p>
          <small>${s.faction} • ${s.type}</small>
        </article>
      `).join('');
    }

    function filter() {
      const text = search.value.toLowerCase();
      const faction = factionFilter.value;
      const filtered = data.filter(s => {
        return s.title.toLowerCase().includes(text) && (!faction || s.faction === faction);
      });
      render(filtered);
    }

    search.addEventListener('input', filter);
    factionFilter.addEventListener('change', filter);
    render(data);
  });
}

// STORY PAGE
if (window.location.pathname.includes("story.html")) {
  fetchStories().then(data => {
    const params = new URLSearchParams(location.search);
    const id = params.get("id");
    const story = data.find(s => s.id === id);
    if (!story) return;

    document.getElementById("story-title").textContent = story.title;
    document.getElementById("story-content").textContent = story.content;
    document.getElementById("story-tags").innerHTML = `<span><strong>${story.faction}</strong></span> • ${story.type}`;

    const recommendations = data.filter(s => s.id !== id).sort(() => 0.5 - Math.random()).slice(0, 2);
    document.getElementById("recommend-list").innerHTML = recommendations.map(r => `
      <li><a href="${r.link}"><strong>${r.title}</strong></a> — ${r.excerpt}</li>
    `).join('');
  });
}