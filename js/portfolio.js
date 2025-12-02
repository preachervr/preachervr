// Active states

const links = document.querySelectorAll(`#navLinks a`);
links.forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add(`text-blue-500`, `scale-105`);
  }
})

// Back To Top Button

const backToTopButton = document.getElementById("backToTop");
const footer = document.getElementById("footer");

window.addEventListener("scroll", () => {
  if(window.scrollY > 300) {
    backToTopButton.classList.remove("opacity-0");
    backToTopButton.classList.add("opacity-100");
  } else {
    backToTopButton.classList.add("opacity-0");
    backToTopButton.classList.remove("opacity-100");
  }
  const footerRect = footer.getBoundingClientRect();
  const overlap = window.innerHeight - footerRect.top;

  if (overlap > 0 ) {
    backToTopButton.style.bottom = `${overlap +24}px`
  } else {
    backToTopButton.style.bottom = "24px";
  }
});

function backToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  })
};

backToTopButton.addEventListener("click", backToTop);

// Menu Navigation

const btnMenu = document.getElementById("btnMenu");
const sidebar = document.getElementById("sidebar");
const sideBarBackdrop = document.getElementById("sidebarBackdrop");
const closeSidebar = document.getElementById("closeSidebar");
const sidebarContent = sidebar.querySelector("aside");

btnMenu.addEventListener("click", () => {
  sidebar.classList.remove("opacity-0", "pointer-events-none");
  sideBarBackdrop.classList.remove("opacity-40");
  sidebarContent.classList.remove("-translate-x-full");
  btnMenu.classList.add("hidden");
});


const close = () => {
  sidebarContent.classList.add("-translate-x-full");
  sideBarBackdrop.classList.add("opacity-30");
  sidebar.classList.add("opacity-0", "pointer-events-none");
  btnMenu.classList.remove("hidden");
};


sideBarBackdrop.addEventListener("click", close);
closeSidebar.addEventListener("click", close);


document.addEventListener("keydown", e => {
  if (e.key === "Escape" && !sidebar.classList.contains("pointer-events-none")) close();
});


// Dark mode

const themeButtons = document.querySelectorAll('.themeToggle');
const html = document.documentElement;

function updateDots(isDark) {
  themeButtons.forEach(btn => {
    const themeDot = btn.querySelector('.themeDot');
    themeDot.classList.toggle('left-1', !isDark);
    themeDot.classList.toggle('right-1', isDark);
  });
}

let isDark = localStorage.theme === 'dark' || (!localStorage.theme && window.matchMedia('(prefers-color-scheme: dark)').matches);
html.classList.toggle('dark', isDark);
updateDots(isDark);

themeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    isDark = !isDark;
    html.classList.toggle('dark', isDark);
    localStorage.theme = isDark ? 'dark' : 'light';
    updateDots(isDark);
  });
});

// Gallery Modal

const modal = document.getElementById("modal");
const galleryImage = document.getElementById("galleryImage");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const closeModal = document.getElementById("closeModal");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentImages = [];
let currentImageIndex = 0;

function updateGalleryUI() {
  galleryImage.src = currentImages[currentImageIndex];
  if (currentImages.length > 1) {
    prevBtn.classList.remove("hidden");
    nextBtn.classList.remove("hidden");
    prevBtn.disabled = currentImageIndex === 0;
    prevBtn.classList.toggle("opacity-50", prevBtn.disabled);
    nextBtn.disabled = currentImageIndex === currentImages.length - 1;
    nextBtn.classList.toggle("opacity-50", nextBtn.disabled);

  } else {
    prevBtn.classList.add("hidden");
    nextBtn.classList.add("hidden");
  }
}
function nextImage() {
  if (currentImageIndex < currentImages.length - 1) {
    currentImageIndex++;
    updateGalleryUI();
  }
}

function prevImage() {
  if (currentImageIndex > 0) {
    currentImageIndex--;
    updateGalleryUI();
  }
}

nextBtn.addEventListener("click", nextImage);
prevBtn.addEventListener("click", prevImage);

document.querySelectorAll(".group").forEach(card => {
  card.addEventListener("click", () => {
    const imagesData = card.dataset.images;
    currentImages = imagesData ? JSON.parse(imagesData.replace(/'/g, '"')) : [card.dataset.img];
    currentImageIndex = 0;
    modalTitle.textContent = card.dataset.title;
    
    // Split description by |P| delimiter and wrap each in <p> tags
    const descText = card.dataset.desc;
    if (descText) {
      const paragraphs = descText.split('|P|').map(p => `<p>${p.trim()}</p>`).join('');
      modalDesc.innerHTML = paragraphs;
    } else {
      modalDesc.innerHTML = '';
    }

    updateGalleryUI();

    modal.classList.remove("opacity-0", "pointer-events-none");
    modal.classList.add("flex", "opacity-100");
    const galleryContainer = document.getElementById("galleryImage").parentNode;
    let startX;
    galleryContainer.addEventListener('touchstart', (e) => {

        startX = e.touches[0].clientX;

    });
    galleryContainer.addEventListener('touchmove', (e) => {

        e.preventDefault();

    });
    galleryContainer.addEventListener('touchend', (e) => {

        const endX = e.changedTouches[0].clientX;

        const diffX = endX - startX;

       

        if (Math.abs(diffX) > 50) {

            if (diffX < 0) {

                nextImage();

            } else {

                prevImage();

            }

        }

    });



  });

});
function hideModal() {

  modal.classList.remove("opacity-100");

  modal.classList.add("opacity-0", "pointer-events-none");

}
closeModal.addEventListener("click", hideModal);
document.addEventListener("keydown", (e) => {

  if (e.key === "Escape") hideModal();

  if (modal.classList.contains("opacity-100")) {

    if (e.key === "ArrowLeft") prevImage();

    if (e.key === "ArrowRight") nextImage();

  }

});
modal.addEventListener("click", e => {

  if (e.target === modal) hideModal();

});