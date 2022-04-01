"use strict";

const fetchNavigation = async () => {
  const res = await fetch("../../public/json/navigation.json");
  const navData = await res.json();
  return navData;
};

const setActiveStates = () => {
  const tabLinks = [...document.querySelectorAll(".tablist-item-link")];
  tabLinks[0].classList.add("active");
  tabLinks[0].setAttribute("aria-selected", true);
  tabLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      [...this.parentElement.parentElement.childNodes].forEach((sibling) => {
        const link = sibling.querySelector(".tablist-item-link");
        link.classList.remove("active");
        link.setAttribute("aria-selected", false);
      });
      e.currentTarget.classList.add("active");
      e.currentTarget.setAttribute("aria-selected", true);
      updateLine(e.currentTarget);
    });
  });
};

const createLine = () => {
  const container = document.querySelector(".tablist");
  const lineEl = document.createElement("div");
  lineEl.classList.add("line");
  container.appendChild(lineEl);
};

const updateLine = (elem) => {
  const lineEl = document.querySelector(".line");
  console.log(elem);
  const leftOffset = elem.offsetLeft;
  const width = elem.offsetWidth;

  lineEl.style.width = `${width}px`;
  lineEl.style.left = `${leftOffset}px`;

  console.log(lineEl.style.width, lineEl.style.left);
};

fetchNavigation().then((navData) => {
  const { cities } = navData;

  //create container
  const body = document.querySelector("body");
  const tabList = document.createElement("div");
  tabList.classList.add("tablist");
  body.appendChild(tabList);

  //create UL
  const tabListItems = document.createElement("ul");
  tabListItems.classList.add("tablist-items");
  tabListItems.setAttribute("role", "tablist");
  tabListItems.setAttribute("aria-label", "cities");
  tabList.appendChild(tabListItems);

  for (const { section, label } of Object.values(cities)) {
    //create li
    const tabListItem = document.createElement("li");
    tabListItem.classList.add("tablist-item");
    tabListItem.setAttribute("role", "presentation");

    //create a
    const tabListItemLink = document.createElement("a");
    tabListItemLink.classList.add("tablist-item-link");
    tabListItemLink.href = `#${section}`;
    tabListItemLink.setAttribute("aria-controls", "");
    tabListItemLink.setAttribute("aria-selected", false);
    tabListItemLink.setAttribute("role", "tab");
    tabListItemLink.setAttribute("tabindex", "0");
    tabListItemLink.innerHTML = `${label}`;

    //add a to li
    tabListItem.appendChild(tabListItemLink);

    //add li to container
    tabListItems.appendChild(tabListItem);
  }

  setActiveStates();
  createLine();
});

window.addEventListener("resize", () => {
  const activeLink = document.querySelector(".tablist-item-link.active");
  updateLine(activeLink);
});
