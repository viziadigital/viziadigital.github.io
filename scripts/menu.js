const menu = document.querySelector("#menu");

const hideMenu = () => menu.style.top = -menu.offsetHeight + "px";
const showMenu = () => menu.style.top = "0";

let lastScrollY;
const isScrollingDown = () => window.scrollY > lastScrollY;
const hasReachedBottom = () => (window.innerHeight + Math.floor(window.scrollY)) >= document.body.scrollHeight;

onscroll = (event) => {
    if (window.scrollY > 0) {
        isScrollingDown() ? hideMenu() : showMenu();
        lastScrollY = window.scrollY;
    }
    if (hasReachedBottom()) {
        showMenu();
        if (menu.classList.contains("dark")) menu.classList.add("light");
    } else {
        if (menu.classList.contains("dark")) menu.classList.remove("light");
    }
}
