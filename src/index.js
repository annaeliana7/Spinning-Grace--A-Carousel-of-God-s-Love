import './style.css';

document.querySelectorAll('.carousel').forEach((carousel) => {
  const items = carousel.querySelectorAll('.carousel__item');
  const buttonsHtml = Array.from(items, () => '<span class="carousel__button"></span>');

  carousel.insertAdjacentHTML(
    'beforeend',
    `
      <div class="carousel__nav">
        ${buttonsHtml.join('')}
      </div>
    `,
  );

  const buttons = carousel.querySelectorAll('.carousel__button');
  const audios = carousel.querySelectorAll('audio');
  let selectedIndex = 0;

  items[selectedIndex].classList.add('carousel__item--selected');
  buttons[selectedIndex].classList.add('carousel__button--selected');
  audios[selectedIndex].play();

  audios.forEach((audio, index) => {
    audio.addEventListener('ended', () => {
      audio.pause();
      buttons[selectedIndex].classList.remove('carousel__button--selected');
      items[selectedIndex].classList.remove('carousel__item--selected');
      selectedIndex = (selectedIndex + 1) % items.length;
      buttons[selectedIndex].classList.add('carousel__button--selected');
      items[selectedIndex].classList.add('carousel__item--selected');
      audio.currentTime = 0;
      audio.play();
    });
  });

  buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
      audios[selectedIndex].pause();
      buttons[selectedIndex].classList.remove('carousel__button--selected');
      items[selectedIndex].classList.remove('carousel__item--selected');
      selectedIndex = index;
      buttons[selectedIndex].classList.add('carousel__button--selected');
      items[selectedIndex].classList.add('carousel__item--selected');
      audios[selectedIndex].currentTime = 0;
      audios[selectedIndex].play();
    });
  });
});
