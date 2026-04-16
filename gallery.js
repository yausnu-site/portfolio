const items = document.querySelectorAll('.gallery__item');
const previews = document.querySelectorAll('.gallery__preview-item');

const galleries = {
  1: [
    "images/gensyn/1.jpg",
    "images/gensyn/2.jpg",
    "images/gensyn/3.jpg",
    "images/gensyn/4.jpg",
    "images/gensyn/5.jpg",
    "images/gensyn/6.jpg",
    "images/gensyn/7.jpg",
    "images/gensyn/8.jpg",
    "images/gensyn/9.jpg",
    "images/gensyn/10.jpg",
    "images/gensyn/11.jpg",
  ],

  2: [
    "images/borpa/1.jpg",
    "images/borpa/2.jpg",
    "images/borpa/3.jpg",
    "images/borpa/4.jpg",
    "images/borpa/5.jpg",
    "images/borpa/6.jpg",
    "images/borpa/7.jpg",
    "images/borpa/8.jpg",
    "images/borpa/9.jpg",
    "images/borpa/10.jpg",
    "images/borpa/11.jpg",
    "images/borpa/12.jpg",
    "images/borpa/13.jpg",
    "images/borpa/14.jpg",
    "images/borpa/15.jpg",
    "images/borpa/16.jpg",
    "images/borpa/17.jpg",
    "images/borpa/18.jpg",
  ],

  3: [
    "images/symbiotic/1.jpg",
    "images/symbiotic/2.jpg",
    "images/symbiotic/3.jpg",
    "images/symbiotic/4.jpg",
    "images/symbiotic/5.jpg",
    "images/symbiotic/6.jpg",
    "images/symbiotic/7.jpg",
    "images/symbiotic/8.jpg",
    "images/symbiotic/9.jpg",
    "images/symbiotic/10.jpg",
    "images/symbiotic/11.jpg",
  ]
};


/* =========================
   MODAL ELEMENTS
========================= */

const modal = document.querySelector('#galleryModal');
const modalTrack = document.querySelector('.modal__track');

const modalClose = document.querySelector('.modal__close');
const modalOverlay = document.querySelector('.modal__overlay');

const prevBtn = document.querySelector('.modal__nav--prev');
const nextBtn = document.querySelector('.modal__nav--next');

const currentEl = document.querySelector('.modal__current');
const totalEl = document.querySelector('.modal__total');


/* =========================
   STATE
========================= */

let currentGallery = [];
let currentIndex = 0;

let autoIndex = 0;
let autoTimer = null;
let autoStopped = false;

let modalDraggable = null;


/* =========================
   MAIN PREVIEW SWITCH
========================= */

function switchGallery(id) {
  items.forEach(item => {
    item.classList.toggle(
      'is-active',
      item.dataset.gallery === id
    );
  });

  previews.forEach(preview => {
    preview.classList.toggle(
      'is-active',
      preview.dataset.gallery === id
    );
  });
}


/* =========================
   AUTO SWITCH
========================= */

function startAutoSwitch() {
  autoTimer = setInterval(() => {
    if (autoStopped) return;

    autoIndex++;

    if (autoIndex >= items.length) {
      autoIndex = 0;
    }

    switchGallery(items[autoIndex].dataset.gallery);

  }, 3000);
}

function stopAutoSwitch() {
  autoStopped = true;
  clearInterval(autoTimer);
}


/* =========================
   MODAL RENDER
========================= */

function renderModalGallery() {
  modalTrack.innerHTML = '';

  currentGallery.forEach(src => {
    const slide = document.createElement('div');
    slide.className = 'modal__slide';

    slide.innerHTML = `<img src="${src}" alt="">`;

    modalTrack.appendChild(slide);
  });

  updateCounter();

  requestAnimationFrame(() => {
    moveModal(false);
    initModalSwipe();
  });
}

function updateCounter() {
  currentEl.textContent = currentIndex + 1;
  totalEl.textContent = currentGallery.length;
}


/* =========================
   MODAL OPEN / CLOSE
========================= */

function openModal() {
  modal.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('is-open');
  document.body.style.overflow = '';

  if (modalDraggable) {
    modalDraggable.kill();
    modalDraggable = null;
  }
}


/* =========================
   MODAL MOVE
========================= */

function getSlideWidth() {
  return modal.querySelector('.modal__content').clientWidth;
}

function moveModal(animate = true) {
  const x = -currentIndex * getSlideWidth();

  if (animate) {
    gsap.to(modalTrack, {
      x,
      duration: 0.35,
      ease: 'power2.out',
      overwrite: true
    });
  } else {
    gsap.set(modalTrack, { x });
  }

  updateCounter();
}


/* =========================
   NEXT / PREV
========================= */

function nextSlide() {
  currentIndex++;

  if (currentIndex >= currentGallery.length) {
    currentIndex = 0;
  }

  moveModal();
}

function prevSlide() {
  currentIndex--;

  if (currentIndex < 0) {
    currentIndex = currentGallery.length - 1;
  }

  moveModal();
}


/* =========================
   SWIPE / DRAG
========================= */

function initModalSwipe() {
  if (modalDraggable) modalDraggable.kill();

  const width = getSlideWidth();

  modalDraggable = Draggable.create(modalTrack, {
    type: 'x',

    bounds: {
      minX: -(currentGallery.length - 1) * width,
      maxX: 0
    },

    inertia: true,
    edgeResistance: 0.88,
    dragResistance: 0.04,
    allowNativeTouchScrolling: false,

    onDragStart() {
      gsap.killTweensOf(modalTrack);
    },

    onDragEnd() {
      if (!this.isThrowing) snapModal();
    },

    onThrowComplete() {
      snapModal();
    }

  })[0];
}

function snapModal() {
  const width = getSlideWidth();

  const x = gsap.getProperty(modalTrack, 'x');

  currentIndex = Math.round(-x / width);

  currentIndex = Math.max(
    0,
    Math.min(currentIndex, currentGallery.length - 1)
  );

  moveModal();
}


/* =========================
   EVENTS
========================= */

/* sidebar */

items.forEach(item => {
  const button = item.querySelector('.gallery__trigger');

  button.addEventListener('mouseenter', () => {
    stopAutoSwitch();
    switchGallery(item.dataset.gallery);
  });

  button.addEventListener('click', () => {
    stopAutoSwitch();
    switchGallery(item.dataset.gallery);
  });
});


/* preview click = open modal */

previews.forEach(preview => {
  preview.addEventListener('click', () => {
    stopAutoSwitch();

    const id = preview.dataset.gallery;

    currentGallery = galleries[id];
    currentIndex = 0;

    switchGallery(id);

    renderModalGallery();
    openModal();
  });
});


/* buttons */

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);


/* keyboard */

document.addEventListener('keydown', e => {
  if (!modal.classList.contains('is-open')) return;

  if (e.key === 'Escape') closeModal();
  if (e.key === 'ArrowRight') nextSlide();
  if (e.key === 'ArrowLeft') prevSlide();
});


/* resize */

window.addEventListener('resize', () => {
  if (!modal.classList.contains('is-open')) return;

  moveModal(false);
  initModalSwipe();
});


/* start */

startAutoSwitch();