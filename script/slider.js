'use strict';

class SliderCarousel {
  constructor({
    main,
    wrap,
    next,
    prev,
    infinity = false,
    position = 0,
    slidesToShow = 3, 
    responsive = []
  }) {
    try {
      this.main = document.querySelector(main);
      this.wrap = document.querySelector(wrap);
      this.slides = document.querySelector(wrap).children;
      this.next = document.querySelector(next);
      this.prev = document.querySelector(prev);
      this.slidesToShow = slidesToShow;
      this.options = {
        position,
        infinity,
        widthSlide: Math.floor(100 / this.slidesToShow)
      }, 
      this.responsive = responsive;
    } catch(err) {
      console.warn('Ошибка')
    }
  }

  init() {
    this.addGloClass();
    this.addStyle();
    
    if(this.prev && this.next) {
      this.controlSlider();
    } else {
      this.addArrow();
      this.controlSlider();
    }
    
    if(this.responsive) {
      this.responseInit();
    }
    
  }

  addGloClass() {
    this.main.classList.add('glo-slider');
    this.wrap.classList.add('glo-slider__wrap');
    for (const item of this.slides) {
      item.classList.add('glo-slider__item')
    }
  }

  addStyle() {
    let style = document.getElementById('sliderCarusel-style');
    if(!style){
      style = document.createElement('style');
      style.id = 'sliderCarusel-style';
    }
    
    style.textContent = `
      .glo-slider {
        overflow: hidden !important;
      }
      .glo-slider__wrap {
        display: flex !important;
        transition: transform 0.5s !important;
        will-change: transform !important;
      }
      .glo-slider__item {
        display: flex;
        align-item: center;
        justify-content: center;
        flex: 0 0 ${this.options.widthSlide}% !important;
        margin: auto 0 !important;
      }
    `

    document.head.append(style);
  }

  controlSlider() {
    this.prev.addEventListener('click', this.prevslider.bind(this));
    this.next.addEventListener('click', this.nextslider.bind(this));
  }

  prevslider() {
    if(this.options.infinity || this.options.position > 0) {
      --this.options.position;
      console.log(this.options.position);
      if (this.options.position < 0) {
        this.options.position = this.slides.length - this.slidesToShow;
      }
      this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
    }
  }

  nextslider() {
    if(this.options.infinity || this.options.position < this.slides.length - this.slidesToShow) {
      ++this.options.position;
      console.log(this.options.position);
      if (this.options.position > this.slides.length - this.slidesToShow) {
        this.options.position = 0;
      }
      this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
    }
  }

  addArrow() {
    this.prev = document.createElement('button');
    this.next = document.createElement('button');

    this.prev.className = 'glo-slider__prev';
    this.next.className = 'glo-slider__next';

    this.main.append(this.prev);
    this.main.append(this.next);

    const style = document.createElement('style');
    style.textContent = `
      .glo-slider__prev, 
      .glo-slider__next {
        margin: 0 10px;
        border: 20px solid transparent;
        background: transparent;
      }
      .glo-slider__next {
        border-left-color: #19bbff;
      }
      .glo-slider__prev {
        border-right-color: #19bbff;
      }
      .glo-slider__prev:hover,
      .glo-slider__next:hover,
      .glo-slider__prev:focus,
      .glo-slider__next:focus {
        background: transparent;
        outline: transparent;
      }
    `
    document.head.append(style);
  }

  responseInit() {
    const slideToShowDefault = this.slidesToShow;
    const allResponse = this.responsive.map(item => item.breakpoint); 
    const maxResponse = Math.max(...allResponse);

    const checkResponse = () => {
      const widtWindow = document.documentElement.clientWidth;
      if(widtWindow < maxResponse) {
        for(let i = 0; i < allResponse.length; i++) {
          if (widtWindow < allResponse[i]) {
            this.slideToShow = this.responsive[i].slideToShow;
            this.options.widthSlide = Math.floor(100 / this.slideToShow);
            this.addStyle();
          }
        }
      } else {
        this.slideToShow = slideToShowDefault;
        this.options.widthSlide = Math.floor(100 / this.slideToShow);
        this.addStyle();
      }
    }

    checkResponse();

    window.addEventListener('resize', checkResponse);
  }
}
