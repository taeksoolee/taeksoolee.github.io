console.log('hello world');

// typeIt
// const typeItOption = {
//   speed: 500,
//   // lifeLike: false,
// }



document.addEventListener('DOMContentLoaded', init);
function init() {
  // section animation
  const sliderDelay = 300;

  const sleep = (ms) => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res();
      }, ms)
    })
  }

  const $sections = document.querySelectorAll('section');
  
  $sections
    .forEach((el, i) => {
      console.log(el, i);
      sleep(i * sliderDelay).then(() => {
        el.classList.add('slider');
      });
    });

  // typeIt
  new TypeIt('#introduce', {
    speed: 100,
    startDelay: 100 + ($sections.length*sliderDelay),
    // loop: true, // default is false
    loopDelay: 100, // default is null
    // cursor: false, // default is true
    // cursorChar: '|', // default is '|'
    // beforeStep: async (instance) => {},
    // beforeString: async (instance) => {},
    // afterStep: async (instance) => {},
    // afterString: async (instance) => {},
    afterComplete: function(instance) {
      instance.destroy();
    },
  })
  .go();
}
