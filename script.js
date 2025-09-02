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

    // Заполняем селекты
    for (let key in options) {
      const select = document.getElementById(key);
      if (!select) continue;

      // "Нет" — пустое значение
      const noneOpt = document.createElement("option");
      noneOpt.value = "";
      noneOpt.textContent = "Нет";
      select.appendChild(noneOpt);

      // Файлы строго как в assets.json
      options[key].forEach(file => {
        const opt = document.createElement("option");
        opt.value = file;
        opt.textContent = file.replace(".png", "");
        select.appendChild(opt);
      });

      // По умолчанию "Нет" (можно поменять на первое значение для обязательных слоёв)
      select.value = "";
      current[key] = "";
    }

    // Слушатели изменений
    document.querySelectorAll("select").forEach(select => {
      select.addEventListener("change", (e) => {
        current[e.target.id] = e.target.value;
        drawCharacter();
      });
    });

    drawCharacter();
  });

// Порядок слоёв важен
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

    // Диагностика 404/опечаток
    img.onerror = () => {
      console.error(`❌ Не удалось загрузить: ${assets[layer]}/${file}`);
    };

    images.push({ layer, img });
  }

  if (images.length === 0) return;

  let loaded = 0;
  images.forEach(item => {
    item.img.onload = () => {
      loaded++;
      if (loaded === images.length) {
        // Рисуем по очереди
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
