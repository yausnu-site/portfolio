const assets = {
  background: "assets/Background",
  body: "assets/Body",
  eyes: "assets/Eyes",
  head: "assets/Head",
  mouth: "assets/Mouth",
  ear: "assets/Ear",
  outfit: "assets/Outfit",
  offhand: "assets/Offhand",
  glasses: "assets/Face/Glass"
};

// Список доступных файлов
const options = {
  background: [
    "Ocean.png", "TornPaint.png", "BlueSky.png",
    "Night.png", "Blue.png", "NightBlue.png",
    "SuperNight.png", "Red.png", "NightSunset.png",
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
    "SadClosedEyes.png", "NormalClosedEyes.png",
    "ClosedEyesAggressive.png", "TatooPurple.png",
    "BlueBruises.png", "GreenBruises.png",
    "BlueStandEyes.png", "RedStandEyes.png",
    "GreenStandEyes.png"
  ],
  head: [
    "SilverPunk.png", "RedPunk.png", "GreenPunk.png",
    "LightBrownUndercut.png", "UndercutPurple.png",
    "UndercutBlond.png", "BundleGinger.png",
    "BundleBrown.png", "Bundle.png",
    "GingerSweptBack.png", "BrownSweptBack.png",
    "SilverSweptBack.png", "ZeroHair.png",
    "ZeroHairBlond.png", "ZeroHairBlack.png",
    "BrownSplash.png", "TurquoiseSplash.png",
    "PinkiPue.png", "TraditionalAngelHunter.png",
    "TraditionalBlond.png", "TraditionalDarkSide.png",
    "AngelHinter.png", "DarkSide.png", "SemiBoxBlond.png",
    "LightMolnia.png", "MolniaPurple.png", "MolniaRed.png"
  ],
  mouth: [
    "Angry.png", "SneakySmile.png", "OpenMouth.png",
    "BroadSmile.png", "SeriousMouth.png", "SlightSmile.png",
    "Teeth.png", "Standard.png",
    // Mask
    "BlackMask.png", "RedMask.png", "WhiteMask.png",
    // MouthAttributes
    "Asleep.png", "Exhalation.png", "Music.png",
    "MacDond.png", "Tubule.png", "Sig.png",
    "ChewingGum.png", "Spikelet.png"
  ],
  ear: [
    "SmallHoopRed.png", "SmallHoopAg.png", "SmallHoopGold.png",
    "CordedEarbudsBlack.png", "CordedEarbudsPink.png", "CordedEarbudsWhite.png",
    "EarcuffsLasur.png", "EarCuffs.png", "EarCuffsGold.png",
    "MiniBlack.png", "MiniArgentum.png", "MiniGold.png",
    "Layer179.png", "HanafudaEar.png", "HimavariEar.png"
  ],
  outfit: [
    "BadlonRed.png", "BadlonWhite.png", "BadlonBlack.png",
    "RussiaBomber.png", "NeoBomber.png", "CamouflageBomber.png",
    "DownJacket.png", "DownJacketPurple.png", "DownJacketCamouflage.png",
    "SuikanBlue.png", "SuikanBlack.png", "SuikanWhite.png",
    "CoffieMilkBlazer.png", "BlazerBlack.png", "BlazerWhite.png",
    "GreenBathrobe.png", "BrownBathrobe.png", "OrangeBathrobe.png",
    "OfficeWorkerBlue.png", "OfficeWorkerWhite.png", "OfficeWorkerBlack.png",
    "BrownBathrobeV2.png", "BlueBathrobeV2.png", "WhiteBathrobeV2.png",
    "AngrySweatshirt.png", "KatanaSweatshirt.png", "GoldsSmileSweatshirt.png",
    "ShirtVestWhiteBlack.png", "ShirtVestBlackWhite.png", "ShirtVestBlueRed.png",
    "TShirtV2.png", "TShirtV2Black.png", "TShirtV2Yellow.png",
    "JeanJacket.png", "JeanPilot.png", "JeanJacketGreen.png",
    "JacketTShirtOne.png", "JacketTShirtBluePink.png", "JacketTShirtPurple.png",
    "MonkBlack.png", "MonkWhite.png", "MonkRed.png",
    "MizuKimono.png", "HikariKimono.png", "HiKimono.png",
    "BlackQipao.png", "BlueQipao.png", "RedQipao.png",
    "PurpleBlackWindbreaker.png", "OrangeWindbreaker.png", "BlackWindbreaker.png",
    "ItezieSweatshirtBlack.png", "ItezieSweatshirtRed.png", "ItezieSweatshirtWhite.png",
    "TShirtBlack.png", "TShirtGreen.png", "TShirtWhite.png",
    "KimonoBrownStand.png", "KimonoRedStand.png", "KimonoBlue.png"
  ],
  offhand: [
    "Layer229.png", "MagicWarrior.png", "DiamondsKuri.png",
    "GoldPink.png", "RedFlag.png", "Argentum.png",
    "Sun.png", "IteziStand.png", "IteziEmerald.png",
    "IteziGolds.png", "DeamonSword.png", "Blackwater.png",
    "BlueSky.png", "FireGolds.png", "KatanaMuzi.png",
    "KatanaHimawari.png"
  ],
  glasses: [
    "BlueGlasses.png", "BlackGlasses.png", "RedGlasses.png"
  ]
};

// Canvas
const canvas = document.getElementById("character");
const ctx = canvas.getContext("2d");

// Заполнение селектов
for (let key in options) {
  const select = document.getElementById(key);
  if (!select) continue;
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
