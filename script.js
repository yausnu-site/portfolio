// Пути к папкам с ассетами
const assets = {
  background: "assets/BACKGROUND",
  body: "assets/BODDY",
  eyes: "assets/EYES",
  head: "assets/HEADS",
  mouth: "assets/MOUTH",
  ear: "assets/EAR",
  outfit: "assets/OUTFIT",
  offhand: "assets/OFFNHAND",
  face: "assets/FACE"
};

// Примеры файлов (только чтобы проверить работу)
const options = {
  background: ["_0001s_0000_Ocean.png", "_0001s_0003_Night.png"],
  body: ["_0000s_0000_Angel.png", "_0000s_0002_HumanStand.png"],
  eyes: ["_0004s_0000_Angel.png", "_0004s_0002_Demon.png"],
  head: ["_0005s_0000_SilverPunk.png", "_0005s_0010_BROWN-SWEPT-BACK.png"],
  mouth: ["_0000s_0000_Angry.png", "_0000s_0001_Sneaky-smile.png"],
  ear: ["_0001s_0000_SmallHoopRed.png", "_0001s_0002_SmallHoopGold.png"],
  outfit: ["_0003s_0000_badlonRed.png", "_0003s_0006_DownJacket.png"],
  offhand: ["_0000s_0000_Layer229.png", "_0000s_0001_MagicWarrior.png"],
  face: ["_0000s_0000s_0000_BlueGlasses.png", "_0000s_0000s_0001_BlackGlass.png"]
};

// Canvas
const canvas = document.getElementById("character");
const ctx = canvas.getContext("2d");

// Заполнение селектов
for (let key in options) {
  const select = document.getElementById(key);
  options[key].forEach(file => {
    let opt = document.createElement("option");
    opt.value = file;
    opt.textContent = file.replace(".png", "");
    select.appendChild(opt);
  });
}

// Текущий выбор
let current = {};
for (let key in options) {
  current[key] = options[key][0]; // по умолчанию первый элемент
}

// Обновление при выборе
document.querySelectorAll("select").forEach(select => {
  select.addEventListener("change", (e) => {
    current[e.target.id] = e.target.value;
    drawCharacter();
  });
});

// Функция отрисовки
function drawCharacter() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  Object.keys(current).forEach(layer => {
    let img = new Image();
    img.src = `${assets[layer]}/${current[layer]}`;
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  });
}

// Кнопка "Скачать"
document.getElementById("download").addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "character.png";
  link.href = canvas.toDataURL();
  link.click();
});

// Первая отрисовка
drawCharacter();
