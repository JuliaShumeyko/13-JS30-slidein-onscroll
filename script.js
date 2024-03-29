function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
      let context = this, args = arguments;
      const later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      let callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  const sliderImages = document.querySelectorAll('.slide-in');

  const checkSlide = (e) => {
      sliderImages.forEach(sliderImage => {
          const slideInAt = (window.scrollY + window.innerHeight) - sliderImage.height / 2; // halfway through the image
          const imageBottom = sliderImage.offsetTop + sliderImage.height; // bottom of the image
          const isHalfShown = slideInAt > sliderImage.offsetTop;
          const isNotScrolledPast = window.scrollY < imageBottom;

          if (isHalfShown && isNotScrolledPast) {
              sliderImage.classList.add('active');
          } else {
            sliderImage.classList.remove('active');
          }
      })
  }

  window.addEventListener('scroll', debounce(checkSlide)); // debounce on scroll helps performance