const wrapper = document.querySelector(".gallery-wrapper");
const container = document.querySelector("#gallery-container");
const track = document.querySelector("#track");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector('#next');
const galleryNavBtns = document.querySelectorAll('.gallery-nav-btn');
const imgInfo = document.querySelector('.img-info');
const imageCounter = document.querySelector(".img-counter");
const imageCredit = document.querySelector(".img-credit");

// For triggering gallery fade when navigting to another work
const worksListItems = document.querySelectorAll(".works-list-item");

let currentIndex = 0;
let numOfImages = 0;
let widths = []; // Stores widths of images
let shift = 0; // Stores the current translateX value
let gap = 6;


document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener("resize", updateWidth);
});

window.addEventListener('load', function() {
  // Get widths from images once full page has loaded.
  const images = document.querySelectorAll('img');
  images.forEach(image => {
    widths.push(image.offsetWidth);
  });
  updateWidth();
  updateImgInfo();
  
  // Remove gallery navigation if only one image.
  if (numOfImages === 1) {
    document.querySelector('#gallery-nav-container').remove();
    imageCounter.innerText = "";
  }
  
  // Fade in image credits after gallery has transitioned 
  setTimeout(() => {
    imgInfo.style.opacity = "1";
  }, 1000);

  console.log(worksListItems);
});

worksListItems.forEach((item) => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    wrapper.style.opacity = "0";
    setTimeout(() => {
      window.location.href = item.href;
    }, 500);
  })
})

prevBtn.addEventListener('click', (e) => {
  if (currentIndex > 0) {
    currentIndex--;
    updatePosition();
    updateImgInfo();
  }
  
  if (currentIndex === 0) {
    e.target.setAttribute('disabled', '');
  } else {
    e.target.removeAttribute('disabled');
    next.removeAttribute('disabled');
  }
});

nextBtn.addEventListener('click', (e) => {
  if (currentIndex < numOfImages - 1) {
    currentIndex++;
    updatePosition();
    updateImgInfo();
  }

  if (currentIndex === numOfImages - 1) {
    e.target.setAttribute('disabled', '');
  } else {
    e.target.removeAttribute('disabled');
    prev.removeAttribute('disabled');
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

function updateImgInfo() {
  imageCredit.innerText = imageCredits[currentIndex];
  imageCounter.innerText = `${currentIndex + 1}/${numOfImages}`;
}

