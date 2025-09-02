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

// Список доступных файлов (собрано из files.txt)
const options = {
  background: [
    "Acid.png","Blue.png","BlueSky.png","LightGreen.png","Night-Sunset.png","Night.png",
    "NightBlue.png","Ocean.png","Pinki.png","Purple.png","Red.png","SuperNight.png","Torn-paint.png"
  ],
  body: [
    "Angel.png","Demon.png","Devil.png","HumanStand.png","Nigga.png","Pink.png","White.png"
  ],
  ear: [
    "CORDED-EARBUDS-Black.png","CORDED-EARBUDS-Pink.png","CORDED-EARBUDS-White.png",
    "EAR-CUFFS-GOLD.png","EAR-CUFFS.png","EARCUFFS-Lasur.png","Hanafuda-ear.png","Himavari-ear.png",
    "Layer179.png","MiniArgentum.png","MiniBlack.png","Minigold.png",
    "SmallHoopAg.png","SmallHoopGold.png","SmallHoopRed.png"
  ],
  eyes: [
    "Angel.png","Blue-bruises.png","BlueStandEyes.png","Closed-eyes-Aggressive.png","Demon.png",
    "Green-bruises.png","GreenMythick.png","GreenStandEyes.png","Normal-Closed-eyes.png",
    "RedStandEyes.png","Sad-Closed-eyes.png","Tatoo-purple.png","TurquoiseHero.png","WhiteHero.png","YellowHero.png"
  ],
  face: [
    "Glass/Blackglass.png","Glass/Blueglasses.png","Glass/Redglass.png",
    "Mask/BLACK-MASK.png","Mask/RED-MASK.png","Mask/WHITE-MASK.png",
    "MouthAttributes/Asleep.png","MouthAttributes/Chewing-gum.png","MouthAttributes/Exhalation.png",
    "MouthAttributes/Macdond.png","MouthAttributes/Music.png","MouthAttributes/Sig.png",
    "MouthAttributes/Spikelet.png","MouthAttributes/Tubule.png"
  ],
  head: [
    "AngelHinter.png","BROWN-SWEPT-BACK.png","BrownSplash.png","Bundle-BROWN.png","Bundle-Ginger.png","Bundle.png",
    "DarkSide.png","Ginger-SWEPT-BACK.png","GreenPunk.png","Light-brown-undercut.png","LightMolnia.png",
    "MolniaPurple.png","MolniaRed.png","PinkiPue.png","RedPunk.png","SILVER-SWEPT-BACK.png","Semi-boxBlond.png",
    "SilverPunk.png","TraditionalAngelHunter.png","TraditionalBlond.png","TraditionalDarkSide.png",
    "TurquoiseSplash.png","Undercut-Blond.png","UndercutPurple.png","Zero-Hair.png","Zero-HairBlond.png","ZeroHairBlack.png"
  ],
  mouth: [
    "Angry.png","Broad-smile.png","Open-mouth.png","Serious-mouth.png",
    "Slight-smile.png","Sneaky-smile.png","Standsrt.png","Teeth.png"
  ],
  offhand: [
    "ARGENTUM.png","BLACKWATER.png","BlueSky.png","DeamonSworld.png","Diamonds-KURI.png","FIREGOLDS.png","GoldPink.png",
    "ITEZI-EMERALD.png","ITEZI-STAND.png","ITEZIGOLDS.png","Katana-MUZI.png","Katana-himawari.png","Layer229.png",
    "MagicWarrior.png","REDFLAG.png","SUN.png"
  ],
  outfit: [
    "Angry-Sweatshirt.png","BLACK-QIPAO.png","BLUE-QIPAO.png","BadlonBlack.png","BadlonRed.png","BadlonWhite.png",
    "BlackWindbreaker.png","Blazer-Black.png","Blazer-White.png","Blue-bathrobe-V2.png","Brown-bathrobe-V2.png",
    "Brown-bathrobe.png","CamouflageBomber.png","CoffieMilk-Blazer.png","DownJacket-Camouflage.png","DownJacket.png",
    "DownJacketPurple.png","GoldsSmile-Sweatshirt.png","Green-bathrobe.png","Hi-Kimono.png","Hikari-Kimono.png",
    "ItezieSweatshirt-Black.png","ItezieSweatshirt-Red.png","ItezieSweatshirt-White.png",
    "Jacket-T-shirt-One.png","Jacket-T-shirt-blue-Pink.png","Jacket-T-shirt-purple.png",
    "Jean-jacket-Green.png","Jean-jacket.png","JeanPilot.png","Katana-Sweatshirt.png","KimonoBlue.png",
    "KimonoBrownStand.png","KimonoRedStand.png","Mizu-Kimono.png","MonkBlack.png","MonkRed.png","MonkWhite.png",
    "NEO-bomber.png","Office-worker-black.png","Office-worker-blue.png","Office-worker-white.png","Orange-bathrobe.png",
    "OrangeWindbreaker.png","PurpleBlackWindbreaker.png","RED-QIPAO.png","Russia-bomber.png","SUIKAN-Black.png",
    "SUIKAN-Blue.png","SUIKAN-White.png","Shirt-vest-BlackWhite.png","Shirt-vest-Blue-Red.png","Shirt-vest-white-black.png",
    "T-shirt-Black.png","T-shirt-Green.png","T-shirt-White.png","T-shirtV2-Black.png","T-shirtV2-Yellow.png","T-shirtV2.png",
    "White-bathrobe-V2.png"
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
    "background", "body", "outfit", "head", "eyes", "mouth", "ear", "offhand", "face"
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
