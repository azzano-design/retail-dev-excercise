"use strict";

const fetchNavigation = async () => {
  const res = await fetch("../../public/json/navigation.json");
  const navData = await res.json();
  return navData;
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
});
