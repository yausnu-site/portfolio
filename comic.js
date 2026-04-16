// comic-slider.js
// Requires GSAP core and Draggable plugin:
// <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/Draggable.min.js"></script>

(function() {
  document.addEventListener('DOMContentLoaded', function() {

    // ----- Select the slider instance -----
    const slider = document.querySelector('.comic-slider');
    if (!slider) return;

    const track = slider.querySelector('.comic-slider__track');
    const slides = Array.from(track.querySelectorAll('.comic-slider__slide'));
    const prevBtn = slider.querySelector('.comic-slider__btn--prev');
    const nextBtn = slider.querySelector('.comic-slider__btn--next');
    const dotsContainer = slider.querySelector('.comic-slider__dots');

    // ----- State -----
    let currentIndex = 0;
    const slideCount = slides.length;
    let slideWidth = 0;
    let draggableInstance = null;

    // ----- Helper: Update the slide width based on container -----
    function updateSlideWidth() {
      const container = slider.querySelector('.comic-slider__body');
      slideWidth = container.clientWidth;
    }

    // ----- Create navigation dots -----
    function createDots() {
      dotsContainer.innerHTML = '';
      for (let i = 0; i < slideCount; i++) {
        const dot = document.createElement('span');
        dot.classList.add('comic-slider__dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
      }
    }

    // ----- Update UI: active dot, button states -----
    function updateUI() {
      const dots = dotsContainer.querySelectorAll('.comic-slider__dot');
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
      });

      if (prevBtn) prevBtn.disabled = currentIndex === 0;
      if (nextBtn) nextBtn.disabled = currentIndex === slideCount - 1;
    }

    // ----- Animate to a specific slide index -----
    function goToSlide(index, animate = true) {
      const targetIndex = Math.max(0, Math.min(index, slideCount - 1));
      if (targetIndex === currentIndex) return;

      currentIndex = targetIndex;
      const targetX = -currentIndex * slideWidth;

      if (animate) {
        gsap.to(track, {
          x: targetX,
          duration: 0.4,
          ease: 'power2.out',
          overwrite: true
        });
      } else {
        gsap.set(track, { x: targetX });
      }

      updateUI();

      // Update Draggable's internal state so bounds stay correct
      if (draggableInstance) {
        draggableInstance.update();
      }
    }

    // ----- Snap the current position to the nearest slide -----
    function snapToNearestSlide() {
      const currentX = gsap.getProperty(track, 'x');
      const progress = -currentX / slideWidth;
      const rawIndex = Math.round(progress);
      const clampedIndex = Math.max(0, Math.min(rawIndex, slideCount - 1));

      if (clampedIndex !== currentIndex) {
        currentIndex = clampedIndex;
        updateUI();
      }

      const snappedX = -clampedIndex * slideWidth;
      gsap.to(track, {
        x: snappedX,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: true
      });
    }

    // ----- Initialize Draggable (swipe/drag) -----
    function initDraggable() {
      if (draggableInstance) draggableInstance.kill();

      const maxX = 0;
      const minX = -(slideCount - 1) * slideWidth;

      draggableInstance = Draggable.create(track, {
        type: 'x',
        bounds: { minX: minX, maxX: maxX },
        edgeResistance: 0.85,
        inertia: true,
        dragResistance: 0.1,
        throwResistance: 3000,        // lower = further throw, adjust to taste
        allowNativeTouchScrolling: false, // prevent page scroll while swiping slider
        onDragStart: function() {
          gsap.killTweensOf(track);    // stop any ongoing animations
        },
        onDragEnd: function() {
          // For short drags (no inertia), manually snap
          if (!this.isThrowing) {
            snapToNearestSlide();
          }
        },
        onThrowComplete: function() {
          // After inertia finishes, snap exactly to nearest slide
          snapToNearestSlide();
        }
      })[0];
    }

    // ----- Handle window resize (debounced) -----
    function handleResize() {
      updateSlideWidth();

      // Recalculate track position
      const targetX = -currentIndex * slideWidth;
      gsap.set(track, { x: targetX });

      // Update Draggable bounds
      if (draggableInstance) {
        const minX = -(slideCount - 1) * slideWidth;
        draggableInstance.applyBounds({ minX: minX, maxX: 0 });
      }
    }

    // ----- Event listeners -----
    function bindEvents() {
      if (prevBtn) {
        prevBtn.addEventListener('click', () => {
          if (currentIndex > 0) goToSlide(currentIndex - 1);
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          if (currentIndex < slideCount - 1) goToSlide(currentIndex + 1);
        });
      }

      // Debounced resize
      let resizeTimer;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(handleResize, 100);
      });
    }

    // ----- Initialize everything -----
    function init() {
      updateSlideWidth();
      createDots();
      bindEvents();
      initDraggable();
      updateUI();
      gsap.set(track, { x: 0 });
    }

    init();
  });
})();