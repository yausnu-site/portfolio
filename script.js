// Настройки папок с ассетами
const assets = {
  background: "assets/BACKGROUND",
  body: "assets/BODDY",
  eyes: "assets/EYES",
  head: "assets/HEADS",
  outfit: "assets/OUTFIT",
  face: "assets/FACE/Glass" // пример (можно расширить)
};

const canvas = document.getElementById("character");
const ctx = canvas.getContext("2d");

// Загрузка списка файлов в select (пока вручную, потом можно автоматизировать)
const options = {
  background: ["_0001s_0000_Ocean.png", "_0001s_0003_Night.png"],
  body: ["_0000s_0000_Angel.png", "_0000s_0002_HumanStand.png"],
  eyes: ["_0004s_0000_Angel.png", "_0004s_0002_Demon.png"],
  head: ["_0005s_0000_SilverPunk.png", "_0005s_0010_BROWN-SWEPT-BACK.png"],
  outfit: ["_0003s_0000_badlonRed.png", "_0003s_0006_DownJacket.png"],
  face: ["_0000s_0000_BlueGlasses.png", "_0000s_0001_BlackGlass.png"]
};

// Функция для заполнения селекторов
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
let current = {
  background: options.background[0],
  body: options.body[0],
  eyes: options.eyes[0],
  head: options.head[0],
  outfit: options.outfit[0],
  face: options.face[0],
};

// Обновление выбора
document.querySelectorAll("select").forEach(select => {
  select.addEventListener("change", (e) => {
    current[e.target.id] = e.target.value;
    drawCharacter();
  });
});

// Отрисовка персонажа
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

// Кнопка скачивания
document.getElementById("download").addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "character.png";
  link.href = canvas.toDataURL();
  link.click();
});

// Первая отрисовка
drawCharacter();
