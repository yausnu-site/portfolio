const fs = require('fs');
const path = require('path');

// Папка с ассетами
const assetsDir = path.join(__dirname, 'assets');

// маппинг: имя папки → ключ в JSON (под твой script.js)
const normalizeMap = {
  Background: "background",
  Body: "body",
  Eyes: "eyes",
  Head: "head",
  Mouth: "mouth",
  Outfit: "outfit",
  Offhand: "offhand",
  Glass: "glasses",
  MouthAttributes: "mouthAttr",
  Earbuds: "earbuds",
  Earring: "earring"
};

// Генерация структуры ассетов
function generateAssets() {
  const categories = fs.readdirSync(assetsDir).filter(f =>
    fs.statSync(path.join(assetsDir, f)).isDirectory()
  );

  const assets = {};
  for (const category of categories) {
    const categoryPath = path.join(assetsDir, category);
    const files = fs.readdirSync(categoryPath).filter(f =>
      fs.statSync(path.join(categoryPath, f)).isFile()
    );

    const normalizedKey = normalizeMap[category] || category.toLowerCase();

    assets[normalizedKey] = files.map(file => ({
      file,
      rarity: "Common"
    }));
  }

  fs.writeFileSync(
    path.join(__dirname, 'assets.json'),
    JSON.stringify(assets, null, 2),
    'utf8'
  );

  console.log('✅ assets.json обновлён!');
}

generateAssets();
