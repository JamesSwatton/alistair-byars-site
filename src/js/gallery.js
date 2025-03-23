const container = document.querySelector("#gallery-container");
const track = document.querySelector("#track");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector('#next');

let currentIndex = 0;
let numOfImages = 0;
let widths = []; // Stores widths of images
let shift = 0; // Stores the current translateX value
let gap = 6;

document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener("resize", updateWidth);
});

window.addEventListener('load', function() {
  const images = document.querySelectorAll('img');
  images.forEach(image => {
    widths.push(image.offsetWidth);
  });
  updateWidth();
});


prevBtn.addEventListener('click', (e) => {
  if (currentIndex > 0) {
    currentIndex--;
    updatePosition();
  }
  
  if (currentIndex === numOfImages - 1) {
    e.target.setAttribute('disabled', '');
  } else {
    e.target.removeAttribute('disabled');
  }
});

nextBtn.addEventListener('click', (e) => {
  if (currentIndex < numOfImages - 1) {
    currentIndex++;
    updatePosition();
  }

  if (currentIndex === numOfImages) {
    e.target.setAttribute('disabled', '');
  } else {
    e.target.removeAttribute('disabled');
  }
});

function updateWidth() {
  if (track) {
    widths = Array.from(track.children).map((img) => img.clientWidth);
    numOfImages = widths.length;

    if (widths.length > 0) {
      container.style.width = `${widths[currentIndex]}px`; // Set initial width
      shift = 0; // Ensure first image starts aligned
      track.style.transform = `translateX(${shift}px)`;
    }
  }
}

function updatePosition() {
  if (widths.length === 0) return;

  shift = -widths.slice(0, currentIndex).reduce((acc, w) => acc + w + gap, 0);

  // Apply the same transition timing to the width change
  container.style.transition = "width 1s ease-in-out";
  container.style.width = `${widths[currentIndex]}px`;

  // Directly update transform without tweening
  track.style.transform = `translateX(${shift}px)`;
} 
