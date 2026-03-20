let toggle = document.querySelector('.toggle');
let card = document.querySelector('.card');

toggle.onclick = function() {
  card.classList.toggle('active');
}
