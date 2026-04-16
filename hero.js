gsap.registerPlugin(ScrollTrigger);

const texts = gsap.utils.toArray(".hero__text-item");
const images = gsap.utils.toArray(".hero__media-item");

const total = texts.length;

// начальное состояние
gsap.set(texts, {opacity: 0, y: 30});
gsap.set(images, {opacity: 0, scale: 1.05});

gsap.set(texts[0], {opacity: 1, y: 0});
gsap.set(images[0], {opacity: 1, scale: 1});

// таймлайн
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: `+=${total * 100}%`,
    scrub: 1.2,
    pin: true,
    anticipatePin: 1,
  }
});

// 👉 разные easing
const easeOut = "power2.out"; // появление
const easeIn = "power2.in";   // исчезание

for (let i = 0; i < total - 1; i++) {
  const currentText = texts[i];
  const nextText = texts[i + 1];

  const currentImage = images[i];
  const nextImage = images[i + 1];

  // 🔻 сначала быстрее уводим текущий
  tl.to(currentText, {
    y: -50,
    opacity: 0,
    duration: 0.6,
    ease: easeIn,
  });

  tl.to(
    currentImage,
    {
      opacity: 0,
      scale: 0.95,
      duration: 0.6,
      ease: easeIn,
    },
    "<"
  );

  // 🔻 небольшая пауза = видно фон (очень важно)
  tl.addLabel(`gap-${i}`, "+=0.1");

  // 🔺 потом появляется следующий (чуть мягче и дольше)
  tl.fromTo(
    nextText,
    {
      y: 80,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.7,
      ease: easeOut,
    },
    `gap-${i}`
  );

  tl.fromTo(
    nextImage,
    {
      opacity: 0,
      scale: 1.05,
    },
    {
      opacity: 1,
      scale: 1,
      duration: 0.7,
      ease: easeOut,
    },
    `gap-${i}`
  );
}

let hidden = false;

ScrollTrigger.create({
  start: 0,
  end: "max",

  onUpdate: (self) => {
    const current = self.scroll();

    // если ушли вниз больше чем на 100px — прячем
    if (current > 100 && !hidden) {
      hidden = true;

      gsap.to(".header", {
        y: -100,
        duration: 0.35,
        ease: "power2.out"
      });
    }

    // если вернулись почти в верх страницы — показываем
    if (current <= 20 && hidden) {
      hidden = false;

      gsap.to(".header", {
        y: 0,
        duration: 0.35,
        ease: "power2.out"
      });
    }
  }
});