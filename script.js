// Пути к ассетам
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

// Обязательные категории
const REQUIRED = ["background", "body", "eyes"];

// Порядок отрисовки
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

// Интерфейс
const canvas = document.getElementById("character");
const ctx = canvas.getContext("2d");
const randomBtn = document.getElementById("randomize");
const downloadBtn = document.getElementById("download");
const rarityLabel = document.getElementById("rarity-label");

// Состояние
let current = {};
let options = {};

// Баланс выпадений (демо для портфолио)
const rarityLevels = {
  Common: 40,
  Rare: 30,
  Epic: 20,
  Legendary: 10
};

// Баллы для подсчёта редкости
const rarityPoints = {
  Common: 1,
  Rare: 2,
  Epic: 3,
  Legendary: 4
};

// Загрузка ассетов
async function loadOptions() {
  const cacheBuster = `?v=${Date.now()}`;
  const res = await fetch(`assets.json${cacheBuster}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Не удалось загрузить assets.json: ${res.status}`);
  return res.json();
}

// Заполнение селектов + подсветка
function fillSelects() {
  for (let key in options) {
    const select = document.getElementById(key);
    if (!select) continue;

    if (!REQUIRED.includes(key)) {
      const noneOpt = document.createElement("option");
      noneOpt.value = "";
      noneOpt.textContent = "Нет";
      noneOpt.classList.add("common");
      select.appendChild(noneOpt);
      current[key] = "";
    }

    options[key].forEach(file => {
      const opt = document.createElement("option");
      opt.value = file;
      opt.textContent = file.replace(".png", "");

      const rarityName = (rarity[key] && rarity[key][file]) || "Common";
      opt.classList.add(rarityName.toLowerCase());

      select.appendChild(opt);
    });

    if (REQUIRED.includes(key)) {
      select.value = options[key][0];
      current[key] = options[key][0];
    } else {
      select.value = "";
    }

    // подсветка самого селекта по редкости
    updateSelectRarityClass(select, current[key], key);
  }

  document.querySelectorAll("select").forEach(select => {
    select.addEventListener("change", (e) => {
      current[e.target.id] = e.target.value;
      updateSelectRarityClass(e.target, e.target.value, e.target.id);
      drawCharacter();
    });
  });
}

// 🔹 Обновление класса селекта по выбранному значению
function updateSelectRarityClass(select, value, key) {
  select.classList.remove("common", "rare", "epic", "legendary");

  if (!value) {
    select.classList.add("common");
    return;
  }

  const rarityName = (rarity[key] && rarity[key][value]) || "Common";
  select.classList.add(rarityName.toLowerCase());
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
    img.onerror = () => console.error(`❌ Ошибка загрузки: ${assets[layer]}/${file}`);
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
      const rarityName = items[file] || "Common";
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

// 📊 Подсчёт редкости
function calculateCharacterRarity() {
  let totalPoints = 0;
  let count = 0;

  for (let key in current) {
    const val = current[key];
    if (!val) continue;

    let rarityName = "Common";
    if (rarity[key] && rarity[key][val]) {
      rarityName = rarity[key][val];
    }

    totalPoints += rarityPoints[rarityName];
    count++;
  }

  if (count === 0) return "Common";

  const avg = totalPoints / count;
  if (avg < 1.5) return "Common";
  if (avg < 2.5) return "Rare";
  if (avg < 3.5) return "Epic";
  return "Legendary";
}


// 📈 Подсчёт шанса выпадения (динамично, не больше 15 символов)
function calculateDropChance() {
  let probability = 1;

  for (let key in current) {
    const file = current[key];
    if (!file) continue;

    const items = options[key];
    if (!items || items.length === 0) continue;

    const rarityName = (rarity[key] && rarity[key][file]) || "Common";
    const weight = rarityLevels[rarityName] || 1;

    const totalWeight = items.reduce((sum, f) => {
      const rName = (rarity[key] && rarity[key][f]) || "Common";
      return sum + (rarityLevels[rName] || 1);
    }, 0);

    probability *= weight / totalWeight;
  }

  let percent = probability * 100;
  let str = percent.toString();

  // Если число слишком длинное — обрезаем до 15 символов
  if (str.length > 15) {
    str = percent.toPrecision(15);
  }

  return str;
}


// 🖊️ Обновление надписи
function updateRarityLabel() {
  const rarityClassMap = {
    Common: "rarity-common",
    Rare: "rarity-rare",
    Epic: "rarity-epic",
    Legendary: "rarity-legendary"
  };

  const rarityName = calculateCharacterRarity();
  const dropChance = calculateDropChance();

  rarityLabel.className = "rarity-text";
  rarityLabel.classList.add(rarityClassMap[rarityName]);
  rarityLabel.textContent = `🌟 ${rarityName} (шанс выпадения ${dropChance}%)`;
}

// Скачать
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
    updateSelectRarityClass(select, select.value, key);
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
