// ==== ОБЩИЕ НАСТРОЙКИ ====

// порядок отрисовки
const drawOrder = [
  "background",
  "offhand",
  "body",
  "outfit",
  "earring",   // серьги сразу после одежды
  "head",      // волосы
  "eyes",      // глаза
  "mouth",     // рот
  "mouthAttr", // атрибуты рта
  "glasses",   // очки поверх глаз и маски
  "earbuds"    // наушники поверх всего
];

// обязательные категории
const REQUIRED = ["background", "body", "eyes", "mouth"];

// балансы редкости
const rarityLevels = { Common: 40, Rare: 30, Epic: 20, Legendary: 10 };
const rarityPoints = { Common: 1, Rare: 2, Epic: 3, Legendary: 4 };

// 🎲 вероятности выпадения "Нет"
const noneWeights = {
  head: 20,
  outfit: 25,
  offhand: 60,
  glasses: 140,
  mask: 90,
  mouthAttr: 240,
  earbuds: 120,
  earring: 75
};

const folderMap = {
  glasses: "Glass",        
  mouthAttr: "MouthAttributes",    
  earbuds: "Earbuds",
  earring: "Earring",
  head: "Head",
  outfit: "Outfit",
  offhand: "Offhand",
  eyes: "Eyes",
  body: "Body",
  background: "Background",
  mouth: "Mouth"
};

// ==== ОБЩИЕ ФУНКЦИИ ====

// загрузка ассетов
async function loadOptions() {
  const res = await fetch(`assets.json?v=${Date.now()}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Не удалось загрузить assets.json: ${res.status}`);
  return res.json();
}

// случайный выбор (простой)
function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// 🎲 случайный выбор с учётом редкости и "Нет"
function weightedPickWithRarity(category, options) {
  const entries = [];

  if (!REQUIRED.includes(category)) {
    const weight = noneWeights[category] || 50; // дефолт 50%
    entries.push({ value: "", weight });
  }

  options[category].forEach(o => {
    entries.push({
      value: o.file,
      weight: rarityLevels[o.rarity] || 1
    });
  });

  const total = entries.reduce((s, e) => s + e.weight, 0);
  let rand = Math.random() * total;
  for (const e of entries) {
    rand -= e.weight;
    if (rand < 0) return e.value;
  }
  return entries[0]?.value || "";
}

// послойная отрисовка
async function drawCharacterLayered(ctx, canvas, assets, choices) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let cat of drawOrder) {
    const val = choices[cat];
    if (!val) continue;

    const folder = folderMap[cat] || capitalize(cat);
    const img = new Image();
    img.src = `assets/${folder}/${val}`;

    await new Promise(res => {
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        res();
      };
      img.onerror = () => {
        console.error(`❌ Не найден файл: ${img.src}`);
        res();
      };
    });
  }
}

// редкость персонажа
function calculateCharacterRarity(choices, options) {
  let totalPoints = 0, count = 0;
  for (let cat in choices) {
    const val = choices[cat];
    if (!val) continue;
    const rarityName = options[cat]?.find(o => o.file === val)?.rarity || "Common";
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

// шанс выпадения
function calculateDropChance(choices, options) {
  let probability = 1;
  for (let cat in choices) {
    const val = choices[cat];
    if (!val) continue;

    const item = options[cat]?.find(o => o.file === val);
    const weight = rarityLevels[item?.rarity] || 1;

    let totalWeight = options[cat].reduce((s, o) => s + (rarityLevels[o.rarity] || 1), 0);
    if (!REQUIRED.includes(cat)) {
      totalWeight += noneWeights[cat] || 50; // учитываем "Нет"
    }

    probability *= weight / totalWeight;
  }
  let str = (probability * 100).toString();
  return str.length > 15 ? (probability * 100).toPrecision(15) : str;
}

// вспомогательная функция
function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
