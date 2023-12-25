const [leftInnerEye, rightInnerEye] = [...document.querySelectorAll('.inner-eye')];

window.addEventListener('mousemove', (e) => {
  // console.log(e.offsetX, e.offsetY);
  // console.log(window.innerWidth, window.innerHeight);

  const leftX = (e.clientX / (window.innerWidth) * 100 / 2) - 25;
  const leftY = (e.clientY / (window.innerHeight) * 100 / 2) - 25;

  leftInnerEye.style.top = `${leftY}px`;
  leftInnerEye.style.left = `${leftX}px`;

  const rightX = (e.clientX / (window.innerWidth) * 100 / 2) - 25;
  const rightY = (e.clientY / (window.innerHeight) * 100 / 2) - 25;

  rightInnerEye.style.top = `${rightY}px`;
  rightInnerEye.style.left = `${rightX}px`;

});



const bgColors = Object.freeze([
  'gray', 'red', 'orange', 'yellow', 'green', 'skyblue', 'blue', 'purple',
]);

let colorIdx = 0;

window.addEventListener('click', () => {
  document.querySelector(':root').style.setProperty('--bg-color', bgColors[colorIdx++ % bgColors.length]);
})