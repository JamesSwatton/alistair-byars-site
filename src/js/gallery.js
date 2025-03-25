const wrapper = document.querySelector(".gallery-wrapper");
const container = document.querySelector("#gallery-container");
const track = document.querySelector("#track");
const images = document.querySelectorAll(".track-img");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector('#next');
const galleryNavBtns = document.querySelectorAll('.gallery-nav-btn');
const imgInfo = document.querySelector('.img-info');
const imageCounter = document.querySelector(".img-counter");
const imageCredit = document.querySelector(".img-credit");

// For triggering gallery fade when navigting to another work
const worksListItems = document.querySelectorAll(".works-list-item");

let currentIndex = 0;
let previousIndex = 0;
let numOfImages = 0;
let widths = []; // Stores widths of images
let shift = 0; // Stores the current translateX value
let gap = 6;

let resizing = false;

window.onresize = () => {
  resizing = true;
  container.style.transition = "none";
  track.style.transition = "none";
  updateWidth();
  updatePosition();
  setTimeout(() => {
    track.style.transition = "transform 1s ease-in-out";
    container.style.transition = "transform 1s ease-in-out";
    resizing = false;
  }, 20)
}

window.addEventListener('load', function() {
  // Get widths from images once full page has loaded.
  const images = document.querySelectorAll('.track-img');
  images.forEach(image => {
    widths.push(image.offsetWidth);
  });
  
  updateWidth();
  
  // Remove gallery navigation if only one image.
  if (numOfImages === 1) {
    document.querySelector('#gallery-nav-container').remove();
    imageCounter.innerText = "";
  }
  
  // Fade in image credits after gallery has transitioned 
  setTimeout(() => {
    updateImgInfo();
    imgInfo.style.opacity = "1";
  }, 1000);
});

// Trigger gallery fade out before loading linked page
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
    previousIndex = currentIndex;
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
    previousIndex = currentIndex;
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
  console.log("shift: ", shift);

  if (!resizing) {
    if (fadeImages) {
      // Remove fade-out class for all images before udating position
      images.forEach((img) => {
	img.style.transition = "opacity 1.2s ease";
	img.classList.remove('fade-out');
      });

      // Add fade-out to the current img as it transitions out of view
      images[previousIndex].classList.add('fade-out');    
    } else {
      images.forEach((img) => {
	img.classList.remove('fade-out');
	img.style.transition = "opacity 0s ease";
	img.style.opactiy = "1"});
    }    
  }

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

