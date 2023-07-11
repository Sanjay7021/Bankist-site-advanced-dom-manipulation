'use strict';

//variable declaration
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const section1 = document.querySelector('#section--1');
const scrollbtn = document.querySelector('.btn--scroll-to');
//const NavLink1 = document.querySelector('.nav__link');
///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////

//Selecting Element
// const header = document.querySelector('.header');

// //creating a live dom element virtually..
// const message = document.createElement('div');
// message.classList.add('cookie-message');
// message.innerHTML =
//   'We using your login data for more improvisig sites and analysing.<button class="btn btn--close--cookie">Got it!</button>';
// // console.log(message);
// header.append(message);

// //deleting the message

// document
//   .querySelector('.btn--close--cookie')
//   .addEventListener('click', function () {
//     message.remove();
//   });

// //scrolling functionality
// message.style.backgroundColor = '#3738d';
// message.style.width = '100%';

const ScrollFun = () => {
  section1.scrollIntoView({ behavior: 'smooth' });
  // section2.scrollIntoView({ behavior: 'smooth' });
};
scrollbtn.addEventListener('click', ScrollFun);

//header navigation
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//     // console.log(id);
//   });
// });

//--/ event delegation in navigation.../--/
//add event listener to the parent node
//determine what element organized the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    // console.log(id);
  }
});

//tabbed model

const tabContainer = document.querySelector('.operations__tab-container');
const tab = document.querySelectorAll('.operations__tab');
const tabContent = document.querySelectorAll('.operations__content');

tabContainer.addEventListener('click', function (e) {
  // console.log('clicked');
  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked);
  if (!clicked) return;
  //removing activated part
  tab.forEach(function (t) {
    t.classList.remove('operations__tab--active');
  });
  tabContent.forEach(c => c.classList.remove('operations__content--active'));
  ////////////
  clicked.classList.add('operations__tab--active');
  console.log(clicked.dataset.tab);

  //activating the content part
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// nav fadding functionality
const nav = document.querySelector('.nav');

function handover(e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('nav').querySelectorAll('.nav__link');
    const logo = link.closest('nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
}
nav.addEventListener('mouseover', handover.bind(0.5));
nav.addEventListener('mouseout', handover.bind(1));

//Header navigation

const head = document.querySelector('.header');
const dheight = nav.getBoundingClientRect().height;
//console.log(dheight);
const stickNav = function (enteries) {
  const [entery] = enteries;
  //console.log(entery);

  if (!entery.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('stcky');
  }
  //observer.unobserve(entery.isIntersecting);
};

const headObsever = new IntersectionObserver(stickNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${dheight}px`,
});

headObsever.observe(head);

//smoothly upcoming next part;
const sections = document.querySelectorAll('.section');

const revealSelc = function (enteries, observer) {
  const [entery] = enteries;
  //console.log(entery.target);
  if (!entery.isIntersecting) return;
  entery.target.classList.remove('section--hidden');
  observer.unobserve(entery.target);
};
const selectionObserver = new IntersectionObserver(revealSelc, {
  root: null,
  threshold: 0.15,
});

sections.forEach(function (sections) {
  selectionObserver.observe(sections);
  sections.classList.add('section--hidden');
});

//Lazy Loading images functionality...
const ImgSelect = document.querySelectorAll('img[data-src]');
// console.log(ImgSelect);

//Logic function
const ImgLazy = function (enteries, observer) {
  const [entry] = enteries;
  console.log(entry);
  if (!entry.isIntersecting) return;

  //change the img src to data-src;
  entry.target.src = entry.target.dataset.src;

  //remove blur filter from the images;;
  //for that we have to use one event handler called LOAD event on the entry.target
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};
//create observer
const ImgObserver = new IntersectionObserver(ImgLazy, {
  root: null,
  threshold: 0,
  // rootMargin: '200px',
});

//called observer for all selected images..
ImgSelect.forEach(t => {
  ImgObserver.observe(t);
});

//slider funtionality
const slides = document.querySelectorAll('.slide');
const leftButton = document.querySelector('.slider__btn--left');
const rightButton = document.querySelector('.slider__btn--right');

let curSlide = 0;
let maxSize = slides.length;
console.log(maxSize);
//slides.forEach((t, i) => (t.style.transform = `translateX(${100 * i}%)`));

//functions
const dotContainer = document.querySelector('.dots');
const createdots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

//activate dots
const activatedots = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};

const gotoSlide = function (curSlide) {
  slides.forEach(
    (t, i) => (t.style.transform = `translateX(${100 * (i - curSlide)}%)`)
  );
};

const nextSlide = function () {
  if (curSlide === maxSize - 1) {
    curSlide = 0;
  } else {
    //maxSize = curSlide;
    curSlide++;
  }
  gotoSlide(curSlide);
  activatedots(curSlide);
};

const prevSlide = function () {
  if (curSlide !== 0) {
    curSlide--;
  }
  gotoSlide(curSlide);
  activatedots(curSlide);
};

const init = function () {
  createdots();
  activatedots(0);
  gotoSlide(0);
};
init();
//Right sideButton
rightButton.addEventListener('click', nextSlide);

//leftSide Button
leftButton.addEventListener('click', prevSlide);

//adding key stroke on silder
document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowRight') {
    nextSlide();
  } else {
    prevSlide();
  }
});

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const { slide } = e.target.dataset;
    gotoSlide(slide);
    activatedots(slide);
  }
});
//bulding dots attached  to slider
//creating dots
