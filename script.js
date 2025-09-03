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

// Категории, которые обязательны всегда
const REQUIRED = ["background", "body", "eyes"];

// Порядок отрисовки слоёв
const drawOrder = [
  "background",
  "offhand",
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

// Состояние
let current = {};
let options = {};

// Веса для выпадения
const rarityLevels = {
  Common: 60,
  Rare: 25,
  Epic: 10,
  Legendary: 5
};

// Баллы для подсчёта итоговой редкости
const rarityPoints = {
  Common: 1,
  Rare: 2,
  Epic: 3,
  Legendary: 4
};

// Загрузка ассетов
async function loadOptions() {
  const res = await fetch(`assets.json?v=${Date.now()}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Не удалось загрузить assets.json: ${res.status}`);
  return res.json();
}

// Заполнение селектов
function fillSelects() {
  for (let key in options) {
    const select = document.getElementById(key);
    if (!select) continue;

    // Добавляем "Нет" для необязательных
    if (!REQUIRED.includes(key)) {
      const noneOpt = document.createElement("option");
      noneOpt.value = "";
      noneOpt.textContent = "Нет";
      select.appendChild(noneOpt);
      current[key] = "";
    }

    // Файлы
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

  // Изменения селектов
  document.querySelectorAll("select").forEach(select => {
    select.addEventListener("change", e => {
      current[e.target.id] = e.target.value;
      drawCharacter();
    });
  });
}

// Отрисовка персонажа
function drawCharacter() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  canvas.classList.add("loading");
  canvas.classList.remove("loaded");

  const images = [];
  for (const layer of drawOrder) {
    const file = current[layer];
    if (!file) continue;

    const img = new Image();
    img.src = `${assets[layer]}/${file}`;
    img.onerror = () => console.error(`❌ Ошибка загрузки: ${assets[layer]}/${file}`);
    images.push({ img });
  }

  if (!images.length) {
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

// 🎲 Рандом с учётом редкости
function weightedPickWithRarity(category) {
  const items = rarity[category];
  if (!items) return "";

  const entries = options[category].map(file => {
    const rarityName = items[file] || "Common"; // если нет в rarity.js → Common
    return { value: file, weight: rarityLevels[rarityName] || 1 };
  });

  if (!entries.length) return "";

  const total = entries.reduce((s, e) => s + e.weight, 0);
  let rand = Math.random() * total;
  for (const e of entries) {
    rand -= e.weight;
    if (rand < 0) return e.value;
  }
  return entries[0].value;
}

// 📊 Подсчёт итоговой редкости
function calculateCharacterRarity() {
  let total = 0, count = 0;

  for (let key in current) {
    const val = current[key];
    if (!val) continue;

    const rarityName = (rarity[key] && rarity[key][val]) || "Common";
    total += rarityPoints[rarityName];
    count++;
  }

  if (!count) return { name: "Common" };

  const avg = total / count;
  let name = "Common";

  if (avg < 1.5) name = "Common";
  else if (avg < 2.5) name = "Rare";
  else if (avg < 3.5) name = "Epic";
  else name = "Legendary";

  return { name };
}

// 🔹 Подсчёт шанса выпадения
function calculateDropChance() {
  let probability = 1;

  for (let key in current) {
    const file = current[key];
    if (!file) continue;

    const items = options[key];
    if (!items || items.length === 0) continue;

    const rarityName = (rarity[key] && rarity[key][file]) || "Common";
    const weight = rarityLevels[rarityName] || 1;

    // сумма весов по категории
    const totalWeight = items.reduce((sum, f) => {
      const rName = (rarity[key] && rarity[key][f]) || "Common";
      return sum + (rarityLevels[rName] || 1);
    }, 0);

    probability *= weight / totalWeight;
  }

  return (probability * 100).toFixed(2); // процент
}

// Обновление текста с редкостью
function updateRarityLabel() {
  const rarityClassMap = {
    Common: "rarity-common",
    Rare: "rarity-rare",
    Epic: "rarity-epic",
    Legendary: "rarity-legendary"
  };

  const { name } = calculateCharacterRarity();
  const chance = calculateDropChance();

  rarityLabel.className = "rarity-text";
  rarityLabel.classList.add(rarityClassMap[name]);
  rarityLabel.textContent = `🌟 ${name} (шанс выпадения ${chance}%)`;
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
      const pick = weightedPickWithRarity(key);
      select.value = pick;
      current[key] = pick;
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
  } catch (e) {
    console.error(e);
    randomBtn.disabled = true;
    randomBtn.title = "Ошибка загрузки ассетов";
  }
})();
