// Select all sections on the page
let sectionElements = document.querySelectorAll("section");

// Create navigation menu items for each section
function buildNavigation() {
    let navList = document.getElementById("nav-list");
    sectionElements.forEach(section => {
        navList.appendChild(createNavItem(section));
    });
}

// Create a navigation item with a link for a section
function createNavItem(section) {
    let listItem = document.createElement("li");
    let anchor = document.createElement("a");
    anchor.classList.add("menu-link");
    anchor.textContent = section.dataset.nav;
    listItem.appendChild(anchor);
    return listItem;
}

// Get the height of the header
function getHeaderHeight() {
    return document.querySelector(".header-section").getBoundingClientRect().height;
}

// Highlight the section and link currently in view
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

// Scroll smoothly to a section when its navigation link is clicked
function scrollToSection(index) {
    let sections = document.querySelectorAll("section");
    let rect = sections[index].getBoundingClientRect();
    let scrollOffset = rect.top - getHeaderHeight() + 1;
    window.scrollBy(0, scrollOffset);
}

// Add click events to the navigation items
function setupNavigation() {
    let navItems = document.querySelectorAll("#nav-list li");
    navItems.forEach((item, index) => {
        item.addEventListener("click", () => scrollToSection(index));
    });
}

// Build the navigation and set up functionality
buildNavigation();
setupNavigation();

// Update active section and link when scrolling
window.onscroll = updateActiveClass;
updateActiveClass();
