const fs = require("fs");
const path = require("path");

const assetsMap = {
  background: "Background",
  body: "Body",
  eyes: "Eyes",
  head: "Head",
  mouth: "Mouth",
  outfit: "Outfit",
  offhand: "Offhand",
  glasses: "Glass",
  mask: "Mask",
  mouthAttr: "MouthAttributes",
  earbuds: "Earbuds",
  earring: "Earring"
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
    .filter(f => /\.(png|jpg|jpeg)$/i.test(f));

  result[key] = files;
}

const outputPath = path.join(__dirname, "assets.json");
fs.writeFileSync(outputPath, JSON.stringify(result, null, 2), "utf8");

console.log(`✅ Файл assets.json создан: ${outputPath}`);
