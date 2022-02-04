// БУРГЕР МЕНЮ

const menuIcon = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu-body');

if (menuIcon) {
    menuIcon.addEventListener('click', function(e){
        document.body.classList.toggle('_lock');
        menuIcon.classList.toggle('_active');
        menuBody.classList.toggle('_active');
    });
};

// ПЛАВНАЯ ПРОКРУТКА

const menuLinks = document.querySelectorAll('.menu__link[data-goto]');

if(menuLinks.length > 0){
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener("click", onMenuLinkClick);
    });

    function onMenuLinkClick(e){
        const menuLink = e.target;
        if(menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)){
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

            // ДЛЯ МЕНЮ НА ТЕЛЕФОНЕ, ЧТОБ СКРЫВАЛОСЬ ОКНО И ПРОЛИСТЫВАЛОСЬ ТУДА КУДА НАДО
            if(menuIcon.classList.contains('_active')){
                document.body.classList.remove('_lock');
                menuIcon.classList.remove('_active');
                menuBody.classList.remove('_active');
            }

            window.scrollTo({
                top: gotoBlockValue,
                behavior: "smooth"
            });
            e.preventDefault();
        }
    };

};

// АНИМАЦИЯ ПРИ СКРОЛЛЕ

const animItems = document.querySelectorAll('._anim-items');

if(animItems.length > 0) {
  window.addEventListener('scroll', animOnScroll);

  function animOnScroll(){
    for (let index = 0; index < animItems.length; index++) {
      const animItem = animItems[index];
      const animItemHeight = animItem.offsetHeight;
      const animItemOffset = offset(animItem).top;
      const animStart = 4;

      let animItemPoint = window.innerHeight - animItemHeight / animStart;

      if (animItemHeight > window.innerHeight) {
        animItemPoint = window.innerHeight - window.innerHeight / animStart;
      }

      if((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
        animItem.classList.add('_active');
      } else {
        if (!animItem.classList.contains('_anim-no-hide')){
          animItem.classList.remove('_active');
        }
      }

    }
  }
  function offset(el){
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return {
      top: rect.top + scrollTop,
      left: rect.left + scrollLeft
    }
  }

  setTimeout (() => {
    animOnScroll();
  }, 300);
};


// SWIPER

new Swiper('.swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  slidesPerView:7,
  spaceBetween:30,

  breakpoints: {
    320: {
      slidesPerView:1,
    },
    480: {
      slidesPerView:2,
    },
    768: {
      slidesPerView:3,
    },
    1024: {
      slidesPerView:5,
    },
    1224: {
      slidesPerView:7,
    },
  },
});