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

// AOS

document.addEventListener('DOMContentLoaded', () => {
  AOS.init();
});