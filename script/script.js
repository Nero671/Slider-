 window.addEventListener('DOMContentLoaded', function() {
  'use strict';
  //Timer
  function countTimer(deadline) {
    let timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds');

    function getTimeRemaining() {
      let dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000,
        seconds = Math.floor(timeRemaining % 60),
        minutes = Math.floor((timeRemaining / 60) % 60),
        hours = Math.floor(timeRemaining / 60 / 60);
      // day = Math.floor(timeRemaining / 60 / 60 / 24);

      seconds = seconds < 10 ? '0' + seconds : seconds;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      hours = hours < 10 ? '0' + hours : hours;

      return {timeRemaining, hours, minutes, seconds};
    }

    function updateClock() {
      let timer = getTimeRemaining();

      timerHours.textContent = timer.hours;
      timerMinutes.textContent = timer.minutes;
      timerSeconds.textContent = timer.seconds;

      if(timer.timeRemaining <= 0) {
        clearInterval(setInterval(updateClock, 1000));
        timerHours.textContent = '00';
        timerMinutes.textContent = '00';
        timerSeconds.textContent = '00';
      }   
    }

    setInterval(updateClock, 1000)
    updateClock();

  }


  countTimer('12 september 2020');
  //Menu

  const toggleMenu = () => {
    const btnMenu = document.querySelector('.menu'),
          menu = document.querySelector('menu');
    
    const handlerMenu = () => {
      menu.classList.toggle('active-menu');
    };

    document.body.addEventListener('click', event => {
      let target = event.target;

      if (target.closest('.menu')) {
        handlerMenu();
      } else if (!target.closest('menu') && menu.classList.contains('active-menu')) {
        handlerMenu();
      } else if (target.closest('menu')) {
        if (target.classList.contains('close-btn')) {
          handlerMenu();
        } else {
          if(target.closest('li')) {
            target = target.closest('li');

            event.preventDefault();
            const menuLink = target.querySelector('a[href^="#"]'),
                  linkID = menuLink.getAttribute('href');
            console.log(menuLink);
            document.querySelector(linkID).scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
            handlerMenu();
          }
        }
      }
    });
  };

  toggleMenu();
  
  //scrollTo 
  const btnScrollToContent = document.querySelector('a[href="#service-block"]');
  btnScrollToContent.addEventListener('click', () => {
    event.preventDefault();
    const linkID = btnScrollToContent.getAttribute('href');
    document.querySelector(linkID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });

  //popup

  const togglePopu = () => {
    const popup = document.querySelector('.popup'),
          popupBtn = document.querySelectorAll('.popup-btn'),
          popupContent = document.querySelector('.popup-content');
    
    popupContent.style.left = '0';
    let count = 0,
        popupInterval;

    const popupAnimate = () => {
      count++;
      popupInterval = requestAnimationFrame(popupAnimate);
      popupContent.style.left = count + '%';
      if (count === 40) {
        cancelAnimationFrame(popupInterval);
      }
    };
    
    popupBtn.forEach(elem => elem.addEventListener('click', () => {
      popup.style.display = 'block';
      if (document.documentElement.clientWidth > 768) {
        popupInterval = requestAnimationFrame(popupAnimate);
      } else {
        popupContent.removeAttribute('style');
      }
    }));

    popup.addEventListener('click', (event) => {
      let target = event.target;

      if(target.classList.contains('popup-close')) {
        popup.style.display = 'none';
        count = 0;
      } else {
        target = target.closest('.popup-content');

        if (!target) {
          popup.style.display = 'none';
          count = 0;
        }
      }
    });
  };

  togglePopu();

  //Create Tabs
  const tabs = () => {
    const tabHeader = document.querySelector('.service-header'),
          tab = tabHeader.querySelectorAll('.service-header-tab'),
          tabContent = document.querySelectorAll('.service-tab');
    
    const toggleTabContent = (index) => {
      for(let i = 0; i < tabContent.length; i++){
        if(index === i) {
          tab[i].classList.add('active');
          tabContent[i].classList.remove('d-none');
        } else {
          tabContent[i].classList.add('d-none');
          tab[i].classList.remove('active');
        }
      }
    };

    tabHeader.addEventListener('click', event => {
      let target = event.target;
      target = target.closest('.service-header-tab');
      if (target.classList.contains('service-header-tab')) {
        tab.forEach((item, i) => {
          if(item === target) {
            toggleTabContent(i);
          }
        });
      }
    });
  };

  tabs();

  //Slider
  const slider = () => {

    const slide = document.querySelectorAll('.portfolio-item'),
          btn = document.querySelectorAll('.portfolio-btn'),
          slider = document.querySelector('.portfolio-content');
    
    let currentSlide = 0,
        interval;

    const createDots = () => {
      const portfolioDots = document.querySelector('.portfolio-dots');

      for (let i = 0; i < slide.length; i++) {
        const dot = document.createElement('li');
        dot.classList.add('dot');
        portfolioDots.append(dot);
      }
    };

    createDots();

    const dot = document.querySelectorAll('.dot');

    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };

    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };

    const autoPlaySlide = () => {
      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');
      currentSlide++;
      if(currentSlide >= slide.length) {
        currentSlide = 0;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    };

    const startSlide = (time = 3000) => {
      interval = setInterval(autoPlaySlide, time)
    };

    const stopSlide = () => {
      clearInterval(interval);
    };

   

    slider.addEventListener('click', event => {
      event.preventDefault();
      let target = event.target;

      if (!target.matches('.portfolio-btn, .dot')) {
        return;
      }

      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');

      
      if(target.matches('#arrow-right')) {
        currentSlide++;
      } else if(target.matches('#arrow-left')) {
        currentSlide--;
      } else if(target.matches('.dot')) {
        dot.forEach((elem, index) => {
          if(elem === target) {
            currentSlide = index;
          }
        });
      }

      if(currentSlide >= slide.length) {
        currentSlide = 0;
      };

      if(currentSlide < 0) {
        currentSlide = slide.length -1;
      }


      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    });

    slider.addEventListener('mouseover', event => {
      if(event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
        stopSlide();
      }
    });

    slider.addEventListener('mouseout', event => {
      if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
        startSlide();
      }
    });

    startSlide(1500);
  };


  slider();


 

  //Change photoes

  const changePhotoes = () => {
    const commandPhoto = document.querySelectorAll('.command__photo');

    commandPhoto.forEach(item => {
      item.addEventListener('mouseover', event => {
        [event.target.src, event.target.dataset.img] = [event.target.dataset.img, event.target.src];
      });
    });

    commandPhoto.forEach(item => {
      item.addEventListener('mouseout', event => {
        [event.target.src, event.target.dataset.img] = [event.target.dataset.img, event.target.src];
      });
    });
      
  };

  changePhotoes();

  const validateInput = () => {
    const calcBlock = document.querySelector('.calc-block');

    calcBlock.addEventListener('input', event => {
      if (event.target.matches('.calc-square') || event.target.matches('.calc-count') || event.target.matches('.calc-day')) {
        event.target.value = event.target.value.replace(/\D/g, '');
      }
    });
  }

  validateInput();

  //Calculate && animateTotal
  const animateTotal = ({
    duration,
    draw,
    timing
  }) => {
    const start = performance.now();

    requestAnimationFrame(function animateTotal(time) {
      let timeFraction = (time - start) / duration;

      if (timeFraction > 1) timeFraction = 1;

      const progress = timing(timeFraction);
      draw(progress);

      if (timeFraction < 1) {
        requestAnimationFrame(animateTotal);
      }
    });
  };

  const calc = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block'),
          calcType = document.querySelector('.calc-type'),
          calcSquare = document.querySelector('.calc-square'),
          calcDay = document.querySelector('.calc-day'),
          calcCount = document.querySelector('.calc-count'),
          totalValue = document.getElementById('total');


    const countSum = () => {
      let total = 0,
          countValue = 1,
          dayValue = 1;
      const typeValue = calcType.options[calcType.selectedIndex].value,
            squareValue = +calcSquare.value;
      
      if(calcCount.value < 1) {
        countValue += (calcCount.value - 1) / 10
      }

      if (calcDay.value && calcDay.value < 5) {
        dayValue *= 2;
      } else if (calcDay.value && calcDay.value < 10) {
        dayValue *= 1.5;
      }

      if(typeValue && squareValue) {
        total = price * typeValue * squareValue * countValue * dayValue;
      } 

      totalValue.textContent = total;

      animateTotal({
        duration: 1000,
        timing(timeFraction) {
          return timeFraction;
        },
        draw(progress) {
          totalValue.textContent = Math.floor(progress * total);
        }
      });
    };

    calcBlock.addEventListener('change', event => {
      const target = event.target;

      if(target === calcType || target === calcSquare || target === calcDay || target === calcCount) {
        countSum();
      }
      
    })

  };

  calc(100);

  //send-ajax-form
  const sendForm = () => {
    const errorMessage = 'Что-то пошло не так...',
      successMessage = 'Спасибо! Мы скоро с вами свяжемся!',
      forms = document.querySelectorAll('form'),
      statusMessage = document.createElement('div');

    statusMessage.style.cssText = 'font-size: 2rem; color: #fff';

    forms.forEach(item => {
      item.addEventListener('input', event => {
        if (event.target.matches('.form-phone')) {
          event.target.value = event.target.value.replace(/^[^+\d]*(\+|\d)|\D/g, '$1');
        } else if (event.target.matches('.mess') || event.target.matches('input[name="user_name"]')) {
          event.target.value = event.target.value.replace(/[^А-ЯЁа-яё\s]/, '');
        }
      });
    });


    const createAnimationStyle = () => {
      const style = document.createElement('style');
      style.textContent = `
			.sk-rotating-plane {
				width: 2rem;
				height: 2rem;
				margin: auto;
				margin-top: 10px;
				background-color: #19b5fe;
				border-radius: 100%;
        animation: sk-spinner-pulse 1.0s infinite ease-in-out;
			}
			@keyframes sk-spinner-pulse {
        0% {
          transform: scale(0);
        }
        100% {
          transform: scale(1.0);
          opacity: 0;
        }
      }
			`;
      document.head.appendChild(style);
    };


    const postData = (body, outputData, errorData) => {
      const request = new XMLHttpRequest();

      request.addEventListener('readystatechange', () => {
        if (request.readyState !== 4) {
          return;
        }

        if (request.status === 200) {
          outputData();
        } else {
          errorData(request.status);
        }
      });

      request.open('POST', './server.php');
      request.setRequestHeader('Content-Type', 'application/json');
      request.send(JSON.stringify(body));
    };


    forms.forEach(item => {
      item.addEventListener('submit', event => {
        event.preventDefault();
        item.appendChild(statusMessage);
        createAnimationStyle();
        statusMessage.textContent = '';
        statusMessage.classList.add('sk-rotating-plane');
        const formData = new FormData(item);

        const body = {};
        for (const value of formData.entries()) {
          body[value[0]] = value[1];
        }
        postData(body, () => {
          statusMessage.classList.remove('sk-rotating-plane');
          statusMessage.textContent = successMessage;
        }, error => {
          statusMessage.classList.remove('sk-rotating-plane');
          statusMessage.textContent = errorMessage;
          console.error(error);
        });
        const inputs = item.querySelectorAll('input');
        inputs.forEach(item => {
          item.value = '';
        });
      });
    });

  };

  sendForm();



































 });