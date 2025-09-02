const assets = {
  background: "assets/Background",
  body: "assets/Body",
  eyes: "assets/Eyes",
  head: "assets/Head",
  mouth: "assets/Mouth",
  ear: "assets/Ear",
  outfit: "assets/Outfit",
  offhand: "assets/Offhand",
  glasses: "assets/Face/Glass",
  mask: "assets/Face/Mask",
  mouthAttr: "assets/Face/MouthAttributes"
};

const canvas = document.getElementById("character");
const ctx = canvas.getContext("2d");

let current = {};
let options = {};

fetch("assets.json")
  .then(r => r.json())
  .then(data => {
    options = data;

    for (let key in options) {
      const select = document.getElementById(key);
      if (!select) continue;

      // "Нет" только для необязательных слоёв
      if (!["background", "body", "eyes"].includes(key)) {
        const noneOpt = document.createElement("option");
        noneOpt.value = "";
        noneOpt.textContent = "Нет";
        select.appendChild(noneOpt);
        current[key] = ""; // пусто по умолчанию
      }

      // Добавляем все ассеты
      options[key].forEach(file => {
        const opt = document.createElement("option");
        opt.value = file;
        opt.textContent = file.replace(".png", "");
        select.appendChild(opt);
      });

      // Стартовые значения
      if (["background", "body", "eyes"].includes(key)) {
        select.value = options[key][0]; // первый элемент
        current[key] = options[key][0];
      } else {
        select.value = "";
      }
    }

    // Обработчики выбора
    document.querySelectorAll("select").forEach(select => {
      select.addEventListener("change", (e) => {
        current[e.target.id] = e.target.value;
        drawCharacter();
      });
    });

    // Первая отрисовка
    drawCharacter();
  });

// Порядок отрисовки слоёв
const drawOrder = [
  "background",
  "body",
  "outfit",
  "head",
  "eyes",
  "mouth",
  "mask",
  "mouthAttr",
  "ear",
  "offhand",
  "glasses"
];

function drawCharacter() {
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

  if (images.length === 0) return;

  let loaded = 0;
  images.forEach(item => {
    item.img.onload = () => {
      loaded++;
      if (loaded === images.length) {
        images.forEach(it => ctx.drawImage(it.img, 0, 0, canvas.width, canvas.height));
      }
    };
  });
}

// Скачать персонажа
document.getElementById("download").addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "character.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
});

// Случайный персонаж
document.getElementById("randomize").addEventListener("click", () => {
  for (let key in options) {
    const select = document.getElementById(key);
    if (!select) continue;

    if (["background", "body", "eyes"].includes(key)) {
      // обязательные: всегда случайный ассет
      const rand = Math.floor(Math.random() * options[key].length);
      select.value = options[key][rand];
      current[key] = select.value;
    } else {
      // необязательные: может быть "Нет"
      const withNone = ["", ...options[key]];
      const rand = Math.floor(Math.random() * withNone.length);
      select.value = withNone[rand];
      current[key] = select.value;
    }
  }

  drawCharacter();
});
