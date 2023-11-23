//User menu controller
let navbar = document.querySelector(".header .header-2 .navbar");

document.querySelector("#menu-btn").onclick = () => {
  navbar.classList.toggle("active");
};

window.onscroll = () => {
  navbar.classList.remove("active");

  if (window.scrollY > 60) {
    document.querySelector(".header .header-2").classList.add("active");
  } else {
    document.querySelector(".header .header-2").classList.remove("active");
  }
};

//Toggle theme
const btn = document.querySelector(".theme-btn");
const currentTheme = localStorage.getItem("theme");

if (currentTheme == "dark") {
  document.body.classList.add("light-mode");
}

btn.addEventListener("click", function () {
  document.body.classList.toggle("light-mode");

  let theme = "light";
  if (document.body.classList.contains("light-mode")) {
    theme = "dark";
  }
  localStorage.setItem("theme", theme);
});
