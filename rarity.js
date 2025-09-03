// rarity.js
// Здесь ты задаёшь шансы выпадения для каждой категории.
// "" — это значение "Нет" (например, без маски).

const rarity = {
  mask: {
    "": 50,            // 50% шанс "Нет маски"
    "Black.png": 20,   // 20%
    "Red.png": 20,     // 20%
    "White.png": 10    // 10%
  },
  glasses: {
    "": 70,            // чаще без очков
    "Black.png": 10,
    "Blue.png": 10,
    "Red.png": 10
  },
  mouthAttr: {
    "": 80,            // почти всегда пусто
    "Asleep.png": 5,
    "Exhalation.png": 5,
    "Gum.png": 5,
    "Sig.png": 5
  },
  earbuds: {
    "": 60,
    "Black.png": 20,
    "Red.png": 10,
    "White.png": 10
  },
  earring: {
    "": 50,
    "Hoop_Gold.png": 20,
    "Hoop_Metal.png": 15,
    "Hoop_Red.png": 15
  }
};

// Для работы в браузере
window.rarity = rarity;

// Для Node.js (например, тестов или генератора)
if (typeof module !== "undefined") {
  module.exports = rarity;
}
