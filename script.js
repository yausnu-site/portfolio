// ===== Интерфейс =====
const canvas = document.getElementById("character");
const ctx = canvas.getContext("2d");
const randomBtn = document.getElementById("randomize");
const downloadBtn = document.getElementById("download");
const rarityLabel = document.getElementById("rarity-label");

// ===== Состояние =====
let current = {};
let options = {};

// ===== Вспомогательные =====
function createOption(fileObj) {
  const opt = document.createElement("option");
  opt.value = fileObj.file;
  opt.textContent = fileObj.file.replace(".png", "");
  opt.classList.add((fileObj.rarity || "Common").toLowerCase());
  return opt;
}

function fillSelects() {
  for (let key in options) {
    const select = document.getElementById(key);
    if (!select) continue;

    if (!REQUIRED.includes(key)) {
      // Добавляем пункт "Нет"
      select.appendChild(Object.assign(document.createElement("option"), {
        value: "",
        textContent: "Нет",
        className: "common"
      }));
      current[key] = "";
    }

    options[key].forEach(obj => select.appendChild(createOption(obj)));

    if (REQUIRED.includes(key)) {
      select.value = options[key][0].file;
      current[key] = select.value;
    } else {
      select.value = "";
    }

    updateSelectRarityClass(select, current[key], key);

    select.addEventListener("change", e => {
      current[key] = e.target.value;
      updateSelectRarityClass(select, current[key], key);
      drawCharacter();
    });
  }
}

function updateSelectRarityClass(select, value, key) {
  select.classList.remove("common", "rare", "epic", "legendary");
  if (!value) return select.classList.add("common");
  const rarityName = options[key].find(o => o.file === value)?.rarity || "Common";
  select.classList.add(rarityName.toLowerCase());
}

// ===== Отрисовка =====
async function drawCharacter() {
  canvas.classList.add("loading");
  canvas.classList.remove("loaded");
  await drawCharacterLayered(ctx, canvas, options, current);
  finishDraw();
}

function finishDraw() {
  canvas.classList.remove("loading");
  canvas.classList.add("loaded");
  updateRarityLabel();
}

function updateRarityLabel() {
  const rarityClassMap = {
    Common: "rarity-common",
    Rare: "rarity-rare",
    Epic: "rarity-epic",
    Legendary: "rarity-legendary"
  };
  const rarityName = calculateCharacterRarity(current, options);
  const dropChance = calculateDropChance(current, options);
  rarityLabel.className = "rarity-text";
  rarityLabel.classList.add(rarityClassMap[rarityName]);
  rarityLabel.textContent = `🌟 ${rarityName} (шанс выпадения ${dropChance}%)`;
}

// ===== Кнопки =====
downloadBtn.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "character.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
});

randomBtn.addEventListener("click", () => {
  randomBtn.classList.add("shake");
  setTimeout(() => randomBtn.classList.remove("shake"), 400);

  for (let key in options) {
    const select = document.getElementById(key);
    if (!select) continue;

    if (REQUIRED.includes(key)) {
      const rand = Math.floor(Math.random() * options[key].length);
      current[key] = select.value = options[key][rand].file;
    } else {
      const pick = weightedPickWithRarity(key, options);
      current[key] = select.value = pick;
    }

    updateSelectRarityClass(select, select.value, key);
  }

  drawCharacter();
});

// ===== Инициализация =====
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
