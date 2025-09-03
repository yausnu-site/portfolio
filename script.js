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

// Эти категории обязательны всегда
const REQUIRED = ["background", "body", "eyes"];

// Порядок отрисовки слоёв (снизу вверх)
const drawOrder = [
  "background",
  "offhand",     // по твоему пожеланию — сразу после фона
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

// Элементы интерфейса
const canvas = document.getElementById("character");
const ctx = canvas.getContext("2d");
const randomBtn = document.getElementById("randomize");
const downloadBtn = document.getElementById("download");
const rarityLabel = document.getElementById("rarity-label");

// Текущее состояние выбора
let current = {};
let options = {};

// Загрузка списка ассетов
async function loadOptions() {
  const cacheBuster = `?v=${Date.now()}`;
  const res = await fetch(`assets.json${cacheBuster}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Не удалось загрузить assets.json: ${res.status}`);
  return res.json();
}

// Заполнение выпадающих списков
function fillSelects() {
  for (let key in options) {
    const select = document.getElementById(key);
    if (!select) continue;

    // Добавляем вариант "Нет" для необязательных
    if (!REQUIRED.includes(key)) {
      const noneOpt = document.createElement("option");
      noneOpt.value = "";
      noneOpt.textContent = "Нет";
      select.appendChild(noneOpt);
      current[key] = "";
    }

    // Добавляем файлы
    options[key].forEach(file => {
      const opt = document.createElement("option");
      opt.value = file;
      opt.textContent = file.replace(".png", "");
      select.appendChild(opt);
    });

    // Стартовые значения
    if (REQUIRED.includes(key)) {
      select.value = options[key][0];
      current[key] = options[key][0];
    } else {
      select.value = "";
    }
  }

  // Подписка на изменения
  document.querySelectorAll("select").forEach(select => {
    select.addEventListener("change", (e) => {
      current[e.target.id] = e.target.value;
      drawCharacter();
    });
  });
}

// Отрисовка персонажа
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
    updateRarityLabel();
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
        updateRarityLabel();
      }
    };
  });
}

// 🎲 Выбор с учётом редкости
function weightedPickWithRarity(category) {
  const items = rarity[category];
  if (!items) return null;

  const entries = options[category]
    .filter(file => items[file] !== undefined || file === "")
    .map(file => {
      const rarityName = items[file] || "Common"; // если нет в rarity.js → Common
      return { value: file, weight: rarityLevels[rarityName] || 1 };
    });

  if (entries.length === 0) return "";

  const total = entries.reduce((sum, e) => sum + e.weight, 0);
  let rand = Math.random() * total;
  for (const e of entries) {
    rand -= e.weight;
    if (rand < 0) return e.value;
  }
  return entries[0].value;
}

// 📊 Подсчёт редкости персонажа
function calculateCharacterRarity() {
  let totalPoints = 0;
  let count = 0;

  for (let key in current) {
    const val = current[key];
    if (!val) continue;

    // если в rarity.js нет ассета → считаем Common
    let rarityName = "Common";
    if (rarity[key] && rarity[key][val]) {
      rarityName = rarity[key][val];
    }

    totalPoints += rarityPoints[rarityName];
    count++;
  }

  if (count === 0) return "Common"; // голый персонаж точно Common

  const avg = totalPoints / count;

  if (avg < 1.5) return "Common";
  if (avg < 2.5) return "Rare";
  if (avg < 3.5) return "Epic";
  return "Legendary";
}


  if (count === 0) return "Common";

  const avg = totalScore / count;

  // 📌 Диапазоны (подобраны для баланса)
  if (avg >= 40) return "Common";
  if (avg >= 20) return "Rare";
  if (avg >= 10) return "Epic";
  return "Legendary";
}

// 🖊️ Обновление надписи с редкостью
function updateRarityLabel() {
  const rarityClassMap = {
    Common: "rarity-common",
    Rare: "rarity-rare",
    Epic: "rarity-epic",
    Legendary: "rarity-legendary"
  };

  const rarityName = calculateCharacterRarity();

  rarityLabel.className = "rarity-text"; // сброс классов
  rarityLabel.classList.add(rarityClassMap[rarityName]); // добавить цвет
  rarityLabel.textContent = `🌟 ${rarityName} персонаж`;
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
        const pick = weightedPickWithRarity(key);
        select.value = pick;
        current[key] = pick;
      } else {
        const withNone = ["", ...options[key]];
        const rand = Math.floor(Math.random() * withNone.length);
        select.value = withNone[rand];
        current[key] = select.value;
      }
    }
  }

  drawCharacter();
});

// 🚀 Инициализация
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
