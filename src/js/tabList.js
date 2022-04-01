"use strict";

module.exports = class TabList {
  constructor(elem, json, label) {
    this.parentElem = elem;
    this.label = label ?? "";
    this.data = json;
  }
  init() {
    this.createListElem(this.data);
    this.createLineElem();
    this.setActiveStates();
    this.createEventListners();
  }
  update() {
    const activeLink = document.querySelector(".tablist-item-link.active");
    this.updateLine(activeLink);
  }
  createListElem(data) {
    const parent = this.parentElem;
    //create container
    const tabList = document.createElement("div");
    tabList.classList.add("tablist");
    parent.appendChild(tabList);
    //create ul
    const tabListItems = document.createElement("ul");
    tabListItems.classList.add("tablist-items");
    tabListItems.setAttribute("role", "tablist");
    tabListItems.setAttribute("aria-label", this.label);
    tabList.appendChild(tabListItems);
    //list items
    for (const { section, label } of Object.values(data)) {
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
  }
  createLineElem() {
    const container = document.querySelector(".tablist");
    const lineEl = document.createElement("div");
    lineEl.classList.add("line");
    container.appendChild(lineEl);
  }
  updateLine(elem) {
    const lineEl = document.querySelector(".line");
    const leftOffset = elem.offsetLeft ?? "0px";
    const width = elem.offsetWidth ?? "0px";
    lineEl.style.width = `${width}px`;
    lineEl.style.left = `${leftOffset}px`;
  }
  setActiveStates() {
    const tabLinks = [...document.querySelectorAll(".tablist-item-link")];
    tabLinks[0].classList.add("active");
    tabLinks[0].setAttribute("aria-selected", true);
  }
  createEventListners() {
    const tabLinks = [...document.querySelectorAll(".tablist-item-link")];
    tabLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        [...e.currentTarget.parentElement.parentElement.childNodes].forEach(
          (sibling) => {
            const link = sibling.querySelector(".tablist-item-link");
            link.classList.remove("active");
            link.setAttribute("aria-selected", false);
          }
        );
        e.currentTarget.classList.add("active");
        e.currentTarget.setAttribute("aria-selected", true);
        this.updateLine(e.currentTarget);
      });
    });
    window.addEventListener("resize", () => {
      this.update();
    });
  }
};
