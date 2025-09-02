const assets = {
  background: "assets/BACKGROUND",
  body: "assets/BODDY",
  eyes: "assets/EYES",
  head: "assets/HEADS",
  mouth: "assets/MOUTH",
  ear: "assets/EAR",
  outfit: "assets/OUTFIT",
  offhand: "assets/OFFNHAND",
  face: "assets/FACE"
};

const options = {
  background: [
    "_0001s_0000_Ocean.png", "_0001s_0001_torn-paint.png", "_0001s_0002_BlueSky.png",
    "_0001s_0003_Night.png", "_0001s_0004_Blue.png", "_0001s_0005_NightBlue.png",
    "_0001s_0007_SuperNight.png", "_0001s_0008_Red.png", "_0001s_0009_Night-Sunset.png",
    "_0001s_0010_Acid.png", "_0001s_0011_Pinki.png", "_0001s_0012_Purple.png",
    "_0001s_0013_LightGreen.png"
  ],
  body: [
    "_0000s_0000_Angel.png", "_0000s_0001_Devil.png", "_0000s_0002_HumanStand.png",
    "_0000s_0003_Pink.png", "_0000s_0004_Demon.png", "_0000s_0005_White.png",
    "_0000s_0006_Nigga.png"
  ],
  eyes: [
    "_0004s_0000_Angel.png", "_0004s_0001_GreenMythick.png", "_0004s_0002_Demon.png",
    "_0004s_0003_YellowHero.png", "_0004s_0004_WhiteHero.png", "_0004s_0005_turquoiseHero.png",
    "_0004s_0006_Sad-Closed-eyes.png", "_0004s_0007_Normal-Closed-eyes.png",
    "_0004s_0008_Closed-eyes-Aggressive.png", "_0004s_0009_Tatoo-purple.png",
    "_0004s_0010_Blue-bruises.png", "_0004s_0011_Green-bruises.png",
    "_0004s_0012_BlueStandEyes.png", "_0004s_0013_RedStandEyes.png",
    "_0004s_0014_GreenStandEyes.png"
  ],
  head: [
    "_0005s_0000_SilverPunk.png", "_0005s_0001_RedPunk.png", "_0005s_0002_GreenPunk.png",
    "_0005s_0003_Light-brown-undercut.png", "_0005s_0004_UndercutPurple.png",
    "_0005s_0005_undercut-Blond.png", "_0005s_0006_bundle-Ginger.png",
    "_0005s_0007_bundle-BROWN.png", "_0005s_0008_bundle.png", "_0005s_0009_Ginger-SWEPT-BACK.png",
    "_0005s_0010_BROWN-SWEPT-BACK.png", "_0005s_0011_SILVER-SWEPT-BACK.png",
    "_0005s_0012_Zero-Hair.png", "_0005s_0013_Zero-HairBlond.png",
    "_0005s_0014_ZeroHairBlack.png", "_0005s_0015_BrownSplash.png",
    "_0005s_0016_turquoiseSplash.png", "_0005s_0017_PinkiPue.png",
    "_0005s_0018_TraditionalAngelHunter.png", "_0005s_0019_TraditionalBlond.png",
    "_0005s_0020_TraditionalDarkSide.png", "_0005s_0021_AngelHinter.png",
    "_0005s_0022_DarkSide.png", "_0005s_0023_semi-boxBlond.png",
    "_0005s_0024_LightMolnia.png", "_0005s_0025_MolniaPurple.png",
    "_0005s_0026_MolniaRed.png"
  ],
  mouth: [
    "_0000s_0000_Angry.png", "_0000s_0001_Sneaky-smile.png", "_0000s_0002_Open-mouth.png",
    "_0000s_0003_Broad-smile.png", "_0000s_0004_serious-mouth.png",
    "_0000s_0005_slight-smile.png", "_0000s_0006_Teeth.png", "_0000s_0007_Standsrt.png"
  ],
  ear: [
    "_0001s_0000_SmallHoopRed.png", "_0001s_0001_SmallHoopAg.png", "_0001s_0002_SmallHoopGold.png",
    "_0001s_0003_CORDED-EARBUDS-Black.png", "_0001s_0004_CORDED-EARBUDS-Pink.png",
    "_0001s_0005_CORDED-EARBUDS-White.png", "_0001s_0006_EARCUFFS-Lasur.png",
    "_0001s_0007_EAR-CUFFS.png", "_0001s_0008_EAR-CUFFS-GOLD.png",
    "_0001s_0009_MiniBlack.png", "_0001s_0010_MiniArgentum.png",
    "_0001s_0011_Minigold.png", "_0001s_0012_Layer179.png",
    "_0001s_0013_Hanafuda-ear.png", "_0001s_0014_Himavari-ear.png"
  ],
  outfit: [
    "_0003s_0000_badlonRed.png", "_0003s_0001_badlonWhite.png", "_0003s_0002_badlonBlack.png",
    "_0003s_0003_Russia-bomber.png", "_0003s_0004_NEO-bomber.png",
    "_0003s_0005_CamouflageBomber.png", "_0003s_0006_DownJacket.png",
    "_0003s_0007_DownJacketPurple.png", "_0003s_0008_DownJacket-Camouflage.png",
    "_0003s_0009_SUIKAN-Blue.png", "_0003s_0010_SUIKAN-Black.png",
    "_0003s_0011_SUIKAN-White.png", "_0003s_0012_CoffieMilk-Blazer.png",
    "_0003s_0013_Blazer-Black.png", "_0003s_0014_Blazer-White.png",
    "_0003s_0015_green-bathrobe.png", "_0003s_0016_brown-bathrobe.png",
    "_0003s_0017_Orange-bathrobe.png", "_0003s_0018_office-worker-blue.png",
    "_0003s_0019_office-worker-white.png", "_0003s_0020_office-worker-black.png",
    "_0003s_0021_Brown-bathrobe-V2.png", "_0003s_0022_blue-bathrobe-V2.png",
    "_0003s_0023_white-bathrobe-V2.png", "_0003s_0024_Angry-Sweatshirt.png",
    "_0003s_0025_Katana-Sweatshirt.png", "_0003s_0026_GoldsSmile-Sweatshirt.png",
    "_0003s_0027_shirt-vest-white-black.png", "_0003s_0028_shirt-vest-BlackWhite.png",
    "_0003s_0029_shirt-vest-Blue-Red.png", "_0003s_0030_T-shirtV2.png",
    "_0003s_0031_T-shirtV2-Black.png", "_0003s_0032_T-shirtV2-Yellow.png",
    "_0003s_0033_Jean-jacket.png", "_0003s_0034_JeanPilot.png",
    "_0003s_0035_Jean-jacket-Green.png", "_0003s_0036_Jacket-T-shirt-One.png",
    "_0003s_0037_Jacket-T-shirt-blue-Pink.png", "_0003s_0038_Jacket-T-shirt-purple.png",
    "_0003s_0039_MonkBlack.png", "_0003s_0040_MonkWhite.png",
    "_0003s_0041_MonkRed.png", "_0003s_0042_Mizu-Kimono.png",
    "_0003s_0043_Hikari-Kimono.png", "_0003s_0044_Hi-Kimono.png",
    "_0003s_0045_BLACK-QIPAO.png", "_0003s_0046_BLUE-QIPAO.png",
    "_0003s_0047_RED-QIPAO.png", "_0003s_0048_PurpleBlackWindbreaker.png",
    "_0003s_0049_OrangeWindbreaker.png", "_0003s_0050_BlackWindbreaker.png",
    "_0003s_0051_ItezieSweatshirt-Black.png", "_0003s_0052_ItezieSweatshirt-Red.png",
    "_0003s_0053_ItezieSweatshirt-White.png", "_0003s_0054_T-shirt-Black.png",
    "_0003s_0055_T-shirt-Green.png", "_0003s_0056_T-shirt-White.png",
    "_0003s_0057_KimonoBrownStand.png", "_0003s_0058_KimonoRedStand.png",
    "_0003s_0059_KimonoBlue.png"
  ],
  offhand: [
    "_0000s_0000_Layer229.png", "_0000s_0001_MagicWarrior.png", "_0000s_0002_Diamonds-KURI.png",
    "_0000s_0003_GoldPink.png", "_0000s_0004_REDFLAG.png", "_0000s_0005_ARGENTUM.png",
    "_0000s_0006_SUN.png", "_0000s_0007_ITEZI-STAND.png", "_0000s_0008_ITEZI-EMERALD.png",
    "_0000s_0009_ITEZIGOLDS.png", "_0000s_0010_DeamonSworld.png", "_0000s_0011_BLACKWATER.png",
    "_0000s_0012_BlueSky.png", "_0000s_0013_FIREGOLDS.png", "_0000s_0014_katana-MUZI.png",
    "_0000s_0015_katana-himawari.png"
  ],
  face: [
    "Glass/_0000s_0000s_0000_BlueGlasses.png",
    "Glass/_0000s_0000s_0001_BlackGlass.png",
    "Glass/_0000s_0000s_0002_RedGlass.png",
    "Mask/BLACK MASK.png",
    "Mask/RED MASK.png",
    "Mask/WHITE MASK.png",
    "MouthAttributes/_0000s_0000s_0000_Asleep.png",
    "MouthAttributes/_0000s_0000s_0001_exhalation.png",
    "MouthAttributes/_0000s_0000s_0002_Music.png",
    "MouthAttributes/_0000s_0000s_0003_MACDOND.png",
    "MouthAttributes/_0000s_0000s_0004_tubule.png",
    "MouthAttributes/_0000s_0000s_0005_Sig.png",
    "MouthAttributes/_0000s_0000s_0006_Chewing-gum.png",
    "MouthAttributes/_0000s_0000s_0007_Spikelet.png"
  ]
};

// ==== Дальше всё как раньше ====

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

// Отрисовка
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

// Скачать персонажа
document.getElementById("download").addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "character.png";
  link.href = canvas.toDataURL();
  link.click();
});

// Первая отрисовка
drawCharacter();
