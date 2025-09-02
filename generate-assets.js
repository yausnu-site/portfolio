const fs = require("fs");
const path = require("path");

// соответствие папок и ключей JSON
const assetsMap = {
  background: "Background",
  body: "Body",
  eyes: "Eyes",
  head: "Head",
  mouth: "Mouth",
  ear: "Ear",
  outfit: "Outfit",
  offhand: "Offhand",
  glasses: "Face/Glass",
  mask: "Face/Mask",
  mouthAttr: "Face/MouthAttributes"
};

const baseDir = path.join(__dirname, "assets");
let result = {};

for (let key in assetsMap) {
  const dirPath = path.join(baseDir, assetsMap[key]);

  if (!fs.existsSync(dirPath)) {
    console.warn(`⚠️ Папка не найдена: ${dirPath}`);
    result[key] = [];
    continue;
  }

  const files = fs.readdirSync(dirPath)
    .filter(f => /\.(png|jpg|jpeg)$/i.test(f)); // только картинки

  result[key] = files;
}

// Запись JSON
const outputPath = path.join(__dirname, "assets.json");
fs.writeFileSync(outputPath, JSON.stringify(result, null, 2), "utf8");

console.log(`✅ Файл assets.json создан: ${outputPath}`);
