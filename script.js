let players = [];
let currentTurn = 0;

/* =========================
   THEME SYSTEM
========================= */

const themes = {
  theme: {
    primary: "#212121",
    secondary: "#5d4037",
    accent: "#ffffff"
  },
  forest: {
    primary: "#2e7d32",
    secondary: "#5d4037",
    accent: "#ffffff",
    bg: "backgrounds/forest.png"
  },
  dungeon: {
    primary: "#212121",
    secondary: "#ff6f00",
    accent: "#ffffff",
    bg: "backgrounds/dungeon.png"
  },
  ocean: {
    primary: "#4fc3f7",
    secondary: "#0277bd",
    accent: "#ffffff",
    bg: "backgrounds/ocean.png"
  },
  city: {
    primary: "#fff9d1",
    secondary: "#e63946",
    accent: "#7c54ff",
    bg: "backgrounds/city.png"
  },
  night: {
    primary: "#0d1b2a",
    secondary: "#c4c4c4",
    accent: "#ffffff",
    bg: "backgrounds/night.png"
  },
  desert: {
    primary: "#f4a261",
    secondary: "#ff6f00",
    accent: "#ffffff",
    bg: "backgrounds/desert.png"
  }

};

//Change theme
function changeTheme() {
  let themeName = document.getElementById("themeSelect").value;
  let theme = themes[themeName];

  document.documentElement.style.setProperty('--primary', theme.primary);
  document.documentElement.style.setProperty('--secondary', theme.secondary);
  document.documentElement.style.setProperty('--accent', theme.accent);

  document.getElementById("background").style.backgroundImage = `url(${theme.bg})`;
}

/* =========================
   PLAYER MANAGEMENT
========================= */

/* Add custom uploaded player */
function addPlayer() {
  let name = document.getElementById("name").value;
  let init = parseInt(document.getElementById("initiative").value) || 0;

  let fileInput = document.getElementById("imageUpload");
  let imgURL = "";

  if (fileInput.files[0]) {
    imgURL = URL.createObjectURL(fileInput.files[0]);
  }

  else if (fileInput.dataset.preloaded) {
    imgURL = fileInput.dataset.preloaded;
  }

  players.push({
    name,
    initiative: init,
    image: imgURL,
    sound: `sounds/${name}.mp3`
  });

  fileInput.dataset.preloaded = "";

  renderList();
}

/* Add preloaded dropdown */
function addPreloaded(type) {
  let select = document.getElementById(type === "player" ? "playerSelect" : "enemySelect");
  let initInput = document.getElementById(type === "player" ? "playerInit" : "enemyInit");

  let path = select.value;
  if (!path) return;

  let name = path.split("/").pop().split(".")[0];
  let init = parseInt(initInput.value) || 0;

  players.push({
    name,
    initiative: init,
    image: path,
    sound: `sounds/${name}.mp3`
  });

  renderList();
}

/* =========================
   TURN ORDER
========================= */


/* INITIATIVE */
function updateInitiative(index, value) {
  players[index].initiative = parseInt(value) || 0;
}

/* REMOVE Item */
function removePlayer(index) {
  players.splice(index, 1);

  // Fix current turn index
  if (currentTurn >= players.length) {
    currentTurn = players.length - 1;
  }

  if (currentTurn < 0) currentTurn = 0;

  renderList();
  updateDisplay();
}


function renderList() {
  let container = document.getElementById("initiative-list");
  container.innerHTML = "";

  players.forEach((p, i) => {
    let div = document.createElement("div");
    div.className = "initiative-item" + (i === currentTurn ? " active" : "");

    let img = p.image 
      ? `<img src="${p.image}" class="item-image">`
      : `<div class="item-image" style="background:#555;"></div>`;

    div.innerHTML = `
      <div class="initiative-number">
        <input type="number" value="${p.initiative}" min="0" 
          onchange="updateInitiative(${i}, this.value)" />
      </div>

      ${img}

      <div class="item-name" onclick="setTurn(${i})">
        ${p.name}
      </div>

      <button class="remove-btn" onclick="removePlayer(${i})">✖</button>
    `;

    container.appendChild(div);
  });
}

function setTurn(i) {
  currentTurn = i;
  updateDisplay();
}

function nextTurn() {
  currentTurn = (currentTurn + 1) % players.length;
  updateDisplay();
}

function prevTurn() {
  currentTurn = (currentTurn - 1 + players.length) % players.length;
  updateDisplay();
}

/* =========================
   DISPLAY
========================= */

function updateDisplay() {
  let p = players[currentTurn];
  if (!p) return;

  let img = document.getElementById("character-image");

  img.classList.remove("show");

  setTimeout(() => {
    img.src = p.image;
    document.getElementById("character-name").textContent = p.name;

    img.classList.add("show");

    playSound(p);
    renderList();
  }, 200);
}

/* =========================
   SOUND SYSTEM
========================= */

function playSound(player) {
  let audio = new Audio(player.sound);

  audio.onerror = () => {
    document.getElementById("defaultSound").play();
  };

  audio.play();
}

/* =========================
   SORTING
========================= */

function sortInitiative() {
  players.sort((a, b) => b.initiative - a.initiative);
  renderList();
}


/* =========================
   PRELOADED SELECT
========================= */

function selectPreloaded(type) {
  let select = document.getElementById(type === "player" ? "playerSelect" : "enemySelect");
  let path = select.value;

  if (!path) return;

  let name = path.split("/").pop().split(".")[0];

  document.getElementById("imageUpload").dataset.preloaded = path;

  document.getElementById("name").value = name;
}


/* =========================
   KEYBOARD CONTROLS
========================= */

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") nextTurn();
  if (e.key === "ArrowLeft") prevTurn();
});
