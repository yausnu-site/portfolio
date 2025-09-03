const assets = {
  background: "assets/Background",
  body: "assets/Body",
  eyes: "assets/Eyes",
  head: "assets/Head",
  mouth: "assets/Mouth",
  outfit: "assets/Outfit",
  offhand: "assets/Offhand",
  glasses: "assets/Glass",
  mask: "assets/Mask",
  mouthAttr: "assets/MouthAttributes",
  earbuds: "assets/Earbuds",
  earring: "assets/Earring"
};

const REQUIRED = ["background", "body", "eyes"];

const drawOrder = [
  "background",
  "offhand",      // как ты хотел — сразу после фона
  "body",
  "outfit",
  "head",
  "eyes",
  "mouth",
  "mask",
  "mouthAttr",
  "earbuds",
  "earring",
  "glasses"
];

const canvas = document.getElementById("character");
const ctx = canvas.getContext("2d");
const randomBtn = document.getElementById("randomize");
const downloadBtn = document.getElementById("download");

let current = {};
let options = {};

async function loadOptions() {
  const cacheBuster = `?v=${Date.now()}`;
  const res = await fetch(`assets.json${cacheBuster}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to load assets.json: ${res.status}`);
  return res.json();
}

function fillSelects() {
  for (let key in options) {
    const select = document.getElementById(key);
    if (!select) continue;

    if (!REQUIRED.includes(key)) {
      const noneOpt = document.createElement("option");
      noneOpt.value = "";
      noneOpt.textContent = "Нет";
      select.appendChild(noneOpt);
      current[key] = "";
    }

    options[key].forEach(file => {
      const opt = document.createElement("option");
      opt.value = file;
      opt.textContent = file.replace(".png", "");
      select.appendChild(opt);
    });

    if (REQUIRED.includes(key)) {
      select.value = options[key][0];
      current[key] = options[key][0];
    } else {
      select.value = "";
    }
  }

  document.querySelectorAll("select").forEach(select => {
    select.addEventListener("change", (e) => {
      current[e.target.id] = e.target.value;
      drawCharacter();
    });
  });
}

function drawCharacter() {
  canvas.classList.add("loading");
  canvas.classList.remove("loaded");

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const images = [];
  for (const layer of drawOrder) {
    const file = current[layer];
    if (!file) continue;

    const img = new Image();
    img.src = `${assets[layer]}/${file}`;
    img.onerror = () => {
      console.error(`❌ Ошибка загрузки: ${assets[layer]}/${file}`);
    };
    images.push({ layer, img });
  }

  if (images.length === 0) {
    canvas.classList.remove("loading");
    canvas.classList.add("loaded");
    return;
  }

  let loaded = 0;
  images.forEach(item => {
    item.img.onload = () => {
      loaded++;
      if (loaded === images.length) {
        images.forEach(it => ctx.drawImage(it.img, 0, 0, canvas.width, canvas.height));
        canvas.classList.remove("loading");
        canvas.classList.add("loaded");
      }
    };
  });
}

// 🎲 Функция для выбора по весам
function weightedPick(weights) {
  const entries = Object.entries(weights);
  const total = entries.reduce((sum, [, w]) => sum + w, 0);
  let rand = Math.random() * total;
  for (const [val, weight] of entries) {
    rand -= weight;
    if (rand < 0) return val;
  }
  return entries[0][0]; // fallback
}

// Скачать персонажа
downloadBtn.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "character.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
});

// 🎲 Случайный персонаж
randomBtn.addEventListener("click", () => {
  randomBtn.classList.add("shake");
  setTimeout(() => randomBtn.classList.remove("shake"), 400);

  for (let key in options) {
    const select = document.getElementById(key);
    if (!select) continue;

    if (REQUIRED.includes(key)) {
      const rand = Math.floor(Math.random() * options[key].length);
      select.value = options[key][rand];
      current[key] = select.value;
    } else {
      if (window.rarity && rarity[key]) {
        // используем шансы из rarity.js
        const pick = weightedPick(rarity[key]);
        select.value = pick;
        current[key] = pick;
      } else {
        // стандартный рандом
        const withNone = ["", ...options[key]];
        const rand = Math.floor(Math.random() * withNone.length);
        select.value = withNone[rand];
        current[key] = select.value;
      }
    }
  }

  drawCharacter();
});

// Инициализация
(async () => {
  try {
    options = await loadOptions();
    fillSelects();
    drawCharacter();

    randomBtn.disabled = false;
    randomBtn.title = "";
  } catch (e) {
    console.error(e);
    randomBtn.disabled = true;
    randomBtn.title = "Ошибка загрузки ассетов";
  }
})();
