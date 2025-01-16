const slider = document.getElementById('slider');
const cards = document.querySelectorAll('.card');
const cardHeight = cards[0].clientHeight;
let currentIndex = 0;
let startY = 0;
let isDragging = false;

const updateSliderPosition = () => {
  slider.style.transform = `translateY(-${currentIndex * cardHeight}px)`;
};

const handleStart = (e) => {
  isDragging = true;
  startY = e.touches?.[0]?.clientY || e.clientY;
};

const handleMove = (e) => {
  if (!isDragging) return;
  const currentY = e.touches?.[0]?.clientY || e.clientY;
  const deltaY = currentY - startY;

  if (deltaY > 100) {
    currentIndex = Math.max(0, currentIndex - 1); 
    isDragging = false;
  } else if (deltaY < -100) {
    currentIndex = Math.min(cards.length - 1, currentIndex + 1); 
    isDragging = false;
  }
  updateSliderPosition();
};

const handleEnd = () => {
  isDragging = false;
};

slider.addEventListener('touchstart', handleStart);
slider.addEventListener('touchmove', handleMove);
slider.addEventListener('touchend', handleEnd);
slider.addEventListener('mousedown', handleStart);
slider.addEventListener('mousemove', (e) => e.buttons && handleMove(e));
slider.addEventListener('mouseup', handleEnd);
slider.addEventListener('mouseleave', handleEnd);
