const assets = {
  background: "assets/Background",
  body: "assets/Body",
  eyes: "assets/Eyes",
  head: "assets/Head",
  mouth: "assets/Mouth",
  ear: "assets/Ear",
  outfit: "assets/Outfit",
  offhand: "assets/Offhand",
  face: "assets/Face"
};

// Список доступных файлов (чистые имена без _0000s)
const options = {
  background: [
    "Ocean.png", "Torn-paint.png", "BlueSky.png",
    "Night.png", "Blue.png", "NightBlue.png",
    "SuperNight.png", "Red.png", "Night-Sunset.png",
    "Acid.png", "Pinki.png", "Purple.png", "LightGreen.png"
  ],
  body: [
    "Angel.png", "Devil.png", "HumanStand.png",
    "Pink.png", "Demon.png", "White.png", "Nigga.png"
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
    "Bundle-Brown.png", "Bundle.png", "Ginger-Swept-Back.png",
    "Brown-Swept-Back.png", "Silver-Swept-Back.png",
    "Zero-Hair.png", "Zero-HairBlond.png", "ZeroHairBlack.png",
    "BrownSplash.png", "TurquoiseSplash.png", "PinkiPue.png",
    "TraditionalAngelHunter.png", "TraditionalBlond.png",
    "TraditionalDarkSide.png", "AngelHunter.png",
    "DarkSide.png", "Semi-boxBlond.png",
    "LightMolnia.png", "MolniaPurple.png", "MolniaRed.png"
  ],
  mouth: [
    "Angry.png", "Sneaky-smile.png", "Open-mouth.png",
    "Broad-smile.png", "Serious-mouth.png",
    "Slight-smile.png", "Teeth.png", "Standart.png"
  ],
  ear: [
    "SmallHoopRed.png", "SmallHoopAg.png", "SmallHoopGold.png",
    "Corded-Earbuds-Black.png", "Corded-Earbuds-Pink.png", "Corded-Earbuds-White.png",
    "Earcuffs-Lasur.png", "Ear-Cuffs.png", "Ear-Cuffs-Gold.png",
    "MiniBlack.png", "MiniArgentum.png", "MiniGold.png",
    "Layer179.png", "Hanafuda-ear.png", "Himavari-ear.png"
  ],
  outfit: [
    "BadlonRed.png", "BadlonWhite.png", "BadlonBlack.png",
    "Russia-bomber.png", "Neo-bomber.png", "CamouflageBomber.png",
    "DownJacket.png", "DownJacketPurple.png", "DownJacket-Camouflage.png",
    "Suikan-Blue.png", "Suikan-Black.png", "Suikan-White.png",
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
    "Black-Qipao.png", "Blue-Qipao.png", "Red-Qipao.png",
    "PurpleBlackWindbreaker.png", "OrangeWindbreaker.png", "BlackWindbreaker.png",
    "ItezieSweatshirt-Black.png", "ItezieSweatshirt-Red.png", "ItezieSweatshirt-White.png",
    "T-shirt-Black.png", "T-shirt-Green.png", "T-shirt-White.png",
    "KimonoBrownStand.png", "KimonoRedStand.png", "KimonoBlue.png"
  ],
  offhand: [
    "Layer229.png", "MagicWarrior.png", "Diamonds-Kuri.png",
    "GoldPink.png", "RedFlag.png", "Argentum.png", "Sun.png",
    "Itezi-Stand.png", "Itezi-Emerald.png", "IteziGolds.png",
    "DeamonSword.png", "BlackWater.png", "BlueSky.png",
    "FireGolds.png", "Katana-Muzi.png", "Katana-Himawari.png"
  ],
  face: [
    "Glass/BlueGlasses.png", "Glass/BlackGlasses.png", "Glass/RedGlasses.png",
    "Mask/BlackMask.png", "Mask/RedMask.png", "Mask/WhiteMask.png",
    "MouthAttributes/Asleep.png", "MouthAttributes/Exhalation.png", "MouthAttributes/Music.png",
    "MouthAttributes/MacDond.png", "MouthAttributes/Tubule.png", "MouthAttributes/Sig.png",
    "MouthAttributes/Chewing-gum.png", "MouthAttributes/Spikelet.png"
  ]
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
  current[key] = options[key][0];
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
    "ear",
    "offhand",
    "face"
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
