let sectionElements = document.querySelectorAll("section");

function buildNavigation() {
    let navList = document.getElementById("nav-list");
    sectionElements.forEach(section => {
        navList.appendChild(createNavItem(section));
    });
}

function createNavItem(section) {
    let listItem = document.createElement("li");
    let anchor = document.createElement("a");
    anchor.classList.add("menu-link");
    anchor.textContent = section.dataset.nav;
    listItem.appendChild(anchor);
    return listItem;
}

function getHeaderHeight() {
    return document.querySelector(".header-section").getBoundingClientRect().height;
}

function updateActiveClass() {
    let sections = document.querySelectorAll("section");
    let navItems = document.querySelectorAll("#nav-list li");
    let isActive = false;

    sections.forEach((section, index) => {
        let rect = section.getBoundingClientRect();
        let sectionVisible = rect.top + rect.height - getHeaderHeight();

        if (isActive) {
            section.classList.remove("active-section");
            navItems[index].querySelector("a").classList.remove("active-link");
            navItems[index].querySelector("a").classList.add("menu-link");
        } else if (sectionVisible > 0) {
            section.classList.add("active-section");
            navItems[index].querySelector("a").classList.add("active-link");
            navItems[index].querySelector("a").classList.remove("menu-link");
            isActive = true;
        } else {
            section.classList.remove("active-section");
            navItems[index].querySelector("a").classList.remove("active-link");
            navItems[index].querySelector("a").classList.add("menu-link");
        }
    });
}

function scrollToSection(index) {
    let sections = document.querySelectorAll("section");
    let rect = sections[index].getBoundingClientRect();
    let scrollOffset = rect.top - getHeaderHeight() + 1;
    window.scrollBy(0, scrollOffset);
}

function setupNavigation() {
    let navItems = document.querySelectorAll("#nav-list li");
    navItems.forEach((item, index) => {
        item.addEventListener("click", () => scrollToSection(index));
    });
}

buildNavigation();
setupNavigation();

window.onscroll = updateActiveClass;

updateActiveClass();
