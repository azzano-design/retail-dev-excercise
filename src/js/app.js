"use strict";

const fetchNavigation = async () => {
  const res = await fetch("../../public/json/navigation.json");
  const navData = await res.json();
  return navData;
};

const animatedLine = () => {
  //get all links
  const tabLinks = [...document.querySelectorAll(".tablist-item-link")];
  //set first to active
  tabLinks[0].classList.add("active");
  //apply active classes, aria
  tabLinks[0].setAttribute("aria-selected", true);
  //position element to first active item

  //on click remove/add active state
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
    });
  });
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

  animatedLine();
});
