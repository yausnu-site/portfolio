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

// Список доступных файлов
const options = {
  background: [
    "Ocean.png", "Torn-paint.png", "BlueSky.png",
    "Night.png", "Blue.png", "NightBlue.png",
    "SuperNight.png", "Red.png", "Night-Sunset.png",
    "Acid.png", "Pinki.png", "Purple.png",
    "LightGreen.png"
  ],
  body: [
    "Angel.png", "Devil.png", "HumanStand.png",
    "Pink.png", "Demon.png", "White.png",
    "Nigga.png"
  ],
  eyes: [
    "Angel.png", "GreenMythick.png", "Demon.png",
    "YellowHero.png", "WhiteHero.png", "TurquoiseHero.png",
    "Sad-Closed-eyes.png", "Normal-Closed-eyes.png",
    "Closed-eyes-Aggressive.png", "Tatoo-purple.png",
    "Blue-bruises.png", "Green-bruises.png",
    "BlueStandEyes.png", "RedStandEyes.png",
    "GreenStandEyes.png"
  ],
  head: [
    "SilverPunk.png", "RedPunk.png", "GreenPunk.png",
    "Light-brown-undercut.png", "UndercutPurple.png",
    "Undercut-Blond.png", "Bundle-Ginger.png",
    "Bundle-BROWN.png", "Bundle.png",
    "Ginger-SWEPT-BACK.png", "BROWN-SWEPT-BACK.png",
    "SILVER-SWEPT-BACK.png", "Zero-Hair.png",
    "Zero-HairBlond.png", "ZeroHairBlack.png",
    "BrownSplash.png", "TurquoiseSplash.png",
    "PinkiPue.png", "TraditionalAngelHunter.png",
    "TraditionalBlond.png", "TraditionalDarkSide.png",
    "AngelHinter.png", "DarkSide.png", "Semi-boxBlond.png",
    "LightMolnia.png", "MolniaPurple.png", "MolniaRed.png"
  ],
  mouth: [
    "Angry.png", "Sneaky-smile.png", "Open-mouth.png",
    "Broad-smile.png", "Serious-mouth.png", "Slight-smile.png",
    "Teeth.png", "Standsrt.png"
  ],
  ear: [
    "SmallHoopRed.png", "SmallHoopAg.png", "SmallHoopGold.png",
    "CORDED-EARBUDS-Black.png", "CORDED-EARBUDS-Pink.png", "CORDED-EARBUDS-White.png",
    "EARCUFFS-Lasur.png", "EAR-CUFFS.png", "EAR-CUFFS-GOLD.png",
    "MiniBlack.png", "MiniArgentum.png", "Minigold.png",
    "Layer179.png", "Hanafuda-ear.png", "Himavari-ear.png"
  ],
  outfit: [
    "BadlonRed.png", "BadlonWhite.png", "BadlonBlack.png",
    "Russia-bomber.png", "NEO-bomber.png", "CamouflageBomber.png",
    "DownJacket.png", "DownJacketPurple.png", "DownJacket-Camouflage.png",
    "SUIKAN-Blue.png", "SUIKAN-Black.png", "SUIKAN-White.png",
    "CoffieMilk-Blazer.png", "Blazer-Black.png", "Blazer-White.png",
    "Green-bathrobe.png", "Brown-bathrobe.png", "Orange-bathrobe.png",
    "Office-worker-blue.png", "Office-worker-white.png", "Office-worker-black.png",
    "Brown-bathrobe-V2.png", "Blue-bathrobe-V2.png", "White-bathrobe-V2.png",
    "Angry-Sweatshirt.png", "Katana-Sweatshirt.png", "GoldsSmile-Sweatshirt.png",
    "Shirt-vest-white-black.png", "Shirt-vest-BlackWhite.png", "Shirt-vest-Blue-Red.png",
    "T-shirtV2.png", "T-shirtV2-Black.png", "T-shirtV2-Yellow.png",
    "Jean-jacket.png", "JeanPilot.png", "Jean-jacket-Green.png",
    "Jacket-T-shirt-One.png", "Jacket-T-shirt-blue-Pink.png", "Jacket-T-shirt-purple.png",
    "MonkBlack.png", "MonkWhite.png", "MonkRed.png",
    "Mizu-Kimono.png", "Hikari-Kimono.png", "Hi-Kimono.png",
    "BLACK-QIPAO.png", "BLUE-QIPAO.png", "RED-QIPAO.png",
    "PurpleBlackWindbreaker.png", "OrangeWindbreaker.png", "BlackWindbreaker.png",
    "ItezieSweatshirt-Black.png", "ItezieSweatshirt-Red.png", "ItezieSweatshirt-White.png",
    "T-shirt-Black.png", "T-shirt-Green.png", "T-shirt-White.png",
    "KimonoBrownStand.png", "KimonoRedStand.png", "KimonoBlue.png"
  ],
  offhand: [
    "Layer229.png", "MagicWarrior.png", "Diamonds-KURI.png",
    "GoldPink.png", "REDFLAG.png", "ARGENTUM.png",
    "SUN.png", "ITEZI-STAND.png", "ITEZI-EMERALD.png",
    "ITEZIGOLDS.png", "DeamonSworld.png", "BLACKWATER.png",
    "BlueSky.png", "FIREGOLDS.png", "Katana-MUZI.png",
    "Katana-himawari.png"
  ],
  glasses: [
    "Blackglass.png", "Blueglasses.png", "Redglass.png"
  ],
  mask: [
    "BLACK-MASK.png", "RED-MASK.png", "WHITE-MASK.png"
  ],
  mouthAttr: [
    "Asleep.png", "Chewing-gum.png", "Exhalation.png",
    "Macdond.png", "Music.png", "Sig.png",
    "Spikelet.png", "Tubule.png"
  ]
};

// Canvas
const canvas = document.getElementById("character");
const ctx = canvas.getContext("2d");

// Заполнение селектов (с добавлением "Нет")
for (let key in options) {
  const select = document.getElementById(key);
  if (!select) continue;

  // Опция "Нет"
  let noneOpt = document.createElement("option");
  noneOpt.value = "";
  noneOpt.textContent = "Нет";
  select.appendChild(noneOpt);

  options[key].forEach(file => {
    let opt = document.createElement("option");
    opt.value = file;
    opt.textContent = file.replace(".png", "");
    select.appendChild(opt);
  });

  // По умолчанию "Нет"
  select.value = "";
}

// Текущий выбор
let current = {};
for (let key in options) {
  current[key] = "";
}

// Обновление выбора
document.querySelectorAll("select").forEach(select => {
  select.addEventListener("change", (e) => {
    current[e.target.id] = e.target.value;
    drawCharacter();
  });
});

// Рисуем строго по порядку слоёв
function drawCharacter() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

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

  let images = [];
  drawOrder.forEach(layer => {
    if (current[layer]) {
      let img = new Image();
      img.src = `${assets[layer]}/${current[layer]}`;
      images.push({ layer, img });
    }
  });

  let loaded = 0;
  images.forEach(item => {
    item.img.onload = () => {
      loaded++;
      if (loaded === images.length) {
        images.forEach(it => {
          ctx.drawImage(it.img, 0, 0, canvas.width, canvas.height);
        });
      }
    };
  });
}

// Скачать персонажа
document.getElementById("download").addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "character.png";
  link.href = canvas.toDataURL();
  link.click();
});

// Первая отрисовка
drawCharacter();
