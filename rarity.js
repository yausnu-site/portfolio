// rarity.js
// Значения: "Common", "Rare", "Epic", "Legendary"
// Используется скриптом для выпадения и отображения общей редкости.

const rarity = {
  // === Background ===
  background: {
    "Acid.png": "Common",
    "Blue.png": "Common",
    "BlueSky.png": "Common",
    "LightGreen.png": "Common",
    "Night.png": "Rare",
    "NightBlue.png": "Rare",
    "NightSunset.png": "Rare",
    "Ocean.png": "Epic",
    "Pinki.png": "Common",
    "Purple.png": "Rare",
    "Red.png": "Common",
    "SuperNight.png": "Epic",
    "Torn.png": "Legendary"
  },

  // === Body (базовые — пусть будут Common, чтобы «голый» = Common) ===
  body: {
    "Angel.png": "Common",
    "Beige.png": "Common",
    "Black.png": "Common",
    "Demon.png": "Common",
    "Devil.png": "Common",
    "Pink.png": "Common",
    "White.png": "Common"
  },

  // === Earbuds ===
  earbuds: {
    "Black.png": "Rare",
    "Red.png": "Rare",
    "White.png": "Common"
  },

  // === Earring ===
  earring: {
    "EarCuffs_Gold.png": "Rare",
    "EarCuffs_Lasur.png": "Rare",
    "EarCuffs_Metal.png": "Common",
    "Hoop_Gold.png": "Rare",
    "Hoop_Metal.png": "Common",
    "Hoop_Red.png": "Rare",
    "J.ear_Hanafudo.png": "Epic",
    "J.ear_Himavari.png": "Epic",
    "J.ear_Kiriko.png": "Epic",
    "Mini_Argentum.png": "Common",
    "Mini_Black.png": "Common",
    "Mini_gold.png": "Rare"
  },

  // === Eyes ===
  eyes: {
    "Angel.png": "Rare",
    "Bruises_Blue.png": "Rare",
    "Bruises_Green.png": "Rare",
    "Closed_V1.png": "Common",
    "Closed_V2.png": "Common",
    "Closed_V3.png": "Common",
    "Demon.png": "Rare",
    "Hero_Turquoise.png": "Rare",
    "Hero_White.png": "Rare",
    "Hero_Yellow.png": "Rare",
    "Mythick.png": "Epic",
    "Stand_Blue.png": "Common",
    "Stand_Green.png": "Common",
    "Stand_Red.png": "Common",
    "Tatoo_purple.png": "Rare"
  },

  // === Glass (очки) ===
  glasses: {
    "Black.png": "Common",
    "Blue.png": "Rare",
    "Red.png": "Rare"
  },

  // === Head (волосы/голова) ===
  head: {
    "Anime_Purple_.png": "Epic",
    "Anime_Red.png": "Rare",
    "Anime_Yellow.png": "Rare",
    "Bald_Black.png": "Common",
    "Bald_Blonde.png": "Common",
    "Bald_Stand.png": "Common",
    "HairBack_Orange.png": "Rare",
    "HairBack_Silver.png": "Rare",
    "HairBack_Stand.png": "Common",
    "HairUp_Blonde.png": "Rare",
    "HairUp_Dark.png": "Rare",
    "HairUp_White.png": "Epic",
    "Punk_green.png": "Rare",
    "Punk_red.png": "Rare",
    "Punk_silver.png": "Epic",
    "Shaggy_Crimson.png": "Rare",
    "Shaggy_Grey.png": "Common",
    "Shaggy_Stand.png": "Common",
    "Sneaf_Orange.png": "Rare",
    "Sneaf_Silver.png": "Rare",
    "Sneaf_Stand.png": "Common",
    "Tail_Black.png": "Rare",
    "Tail_Blonde.png": "Rare",
    "Tail_Silver.png": "Epic",
    "Undercut_Blonde.png": "Rare",
    "Undercut_Purple.png": "Epic",
    "Undercut_Stand.png": "Common"
  },

  // === Mask (делаю редкими, чтобы без маски выпадало чаще) ===
  mask: {
    "Black.png": "Epic",
    "Red.png": "Epic",
    "White.png": "Epic"
    // Пустой вариант ("нет маски") берётся из селекта и считается как Common,
    // поэтому шанс "без маски" станет значительно выше, чем с маской.
  },

  // === Mouth ===
  mouth: {
    "Angry.png": "Rare",
    "Open.png": "Common",
    "Serious.png": "Rare",
    "Slight.png": "Common",
    "Smile.png": "Common",
    "Sneaky.png": "Rare",
    "Stand.png": "Common",
    "Teeth.png": "Epic"
  },

  // === MouthAttributes ===
  mouthAttr: {
    "Asleep.png": "Rare",
    "Exhalation.png": "Rare",
    "Gum.png": "Rare",
    "Macdond.png": "Epic",
    "Music.png": "Rare",
    "Sig.png": "Rare",
    "Spikelet.png": "Rare",
    "Tubule.png": "Rare"
  },

  // === Offhand ===
  offhand: {
    "Katana_Black.png": "Rare",
    "Katana_Bluesky.png": "Rare",
    "Katana_Bluewather.png": "Rare",
    "Katana_Demon.png": "Epic",
    "Katana_Goldfire.png": "Legendary",
    "Katana_Hinokami.png": "Epic",
    "Krab.png": "Rare",
    "Staff_Diamond.png": "Legendary",
    "Staff_Fireball.png": "Epic",
    "Staff_Goldenpink.png": "Epic",
    "Staff_Metal.png": "Rare",
    "Staff_Ruby.png": "Epic",
    "Staff_Silver.png": "Rare",
    "Sworld_Emerald.png": "Epic",
    "Sworld_Golds.png": "Legendary",
    "Sworld_Stand.png": "Rare"
  },

  // === Outfit (много Common, немного Rare/Epic/Legendary) ===
  outfit: {
    "Badlon_Brown.png": "Common",
    "Badlon_Red.png": "Common",
    "Badlon_White.png": "Common",
    "BathrobeV2_Blue.png": "Rare",
    "BathrobeV2_Brown.png": "Rare",
    "Bathrobe_Brown.png": "Common",
    "Bathrobe_Green.png": "Common",
    "Bathrobe_Orange.png": "Common",
    "Bathrobe_White_V2.png": "Rare",
    "Blazer_Black.png": "Common",
    "Blazer_Coffiemilk.png": "Rare",
    "Blazer_White.png": "Common",
    "Bomber_Camouflage.png": "Rare",
    "Bomber_Neon.png": "Epic",
    "Bomber_Sport.png": "Rare",
    "DownJacket_Camouflage.png": "Rare",
    "DownJacket_Purple.png": "Rare",
    "DownJacket_Red.png": "Rare",
    "Jacket_Blue.png": "Common",
    "Jacket_Brown.png": "Common",
    "Jacket_purple.png": "Rare",
    "Jean_Green.png": "Common",
    "Jean_Jacket.png": "Common",
    "Jean_Pilot.png": "Rare",
    "Kimono-Hi.png": "Epic",
    "Kimono-Hikari.png": "Legendary",
    "Kimono_Blue.png": "Rare",
    "Kimono_Brown.png": "Rare",
    "Kimono_Mizu.png": "Epic",
    "Kimono_Red.png": "Epic",
    "Monk_Black.png": "Rare",
    "Monk_Red.png": "Rare",
    "Monk_White.png": "Rare",
    "Office_Black.png": "Common",
    "Office_Blue.png": "Common",
    "Office_White.png": "Common",
    "Qipao_Black.png": "Rare",
    "Qipao_Blue.png": "Rare",
    "Qipao_Red.png": "Rare",
    "ShirtVest_Black.png": "Common",
    "ShirtVest_Blue.png": "Common",
    "ShirtVest_White.png": "Common",
    "Suikan_Black.png": "Rare",
    "Suikan_Blue.png": "Rare",
    "Suikan_White.png": "Rare",
    "Sweatshirt_Angry.png": "Rare",
    "Sweatshirt_Goldsmile.png": "Epic",
    "Sweatshirt_Itezie_Black.png": "Rare",
    "Sweatshirt_Itezie_Red.png": "Rare",
    "Sweatshirt_Katana.png": "Epic",
    "Sweatshirt_White.png": "Common",
    "TshirtV2_Black.png": "Common",
    "TshirtV2_Brown.png": "Common",
    "TshirtV2_Yellow.png": "Common",
    "Tshirt_Black.png": "Common",
    "Tshirt_Green.png": "Common",
    "Tshirt_White.png": "Common",
    "Windbreaker_Black.png": "Common",
    "Windbreaker_Orange.png": "Rare",
    "Windbreaker_Purple.png": "Rare"
  }
};
