"use strict";
module.exports = class TabList {
  constructor(elem, json, label) {
    this.parentElem = elem;
    this.label = label ?? "";
    this.data = json;
  }
  init() {
    this.createListElem(this.data);
    this.createTabContent(this.data);
    this.createLineElem();
    this.initActiveStates();
    this.createEventListners();
    this.update();
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
      tabListItemLink.href = `#tabcontent-${section}`;
      tabListItemLink.setAttribute("id", `tab-${section}`);
      tabListItemLink.setAttribute("aria-controls", `${section}`);
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
  createTabContent(data) {
    const parent = this.parentElem;
    const tabContentContainer = document.createElement("div");
    tabContentContainer.classList.add("tabcontent");
    parent.appendChild(tabContentContainer);

    for (const { section, label } of Object.values(data)) {
      const tabContentItem = document.createElement("div");
      tabContentItem.classList.add("tabcontent-item");
      tabContentItem.setAttribute("id", `tabcontent-${section}`);
      tabContentItem.setAttribute("aria-controledby", `tab-${section}`);
      tabContentItem.setAttribute("role", "tabpanel");

      const timeClock = document.createElement("div");
      timeClock.classList.add("timeContainer");

      const timeClockName = document.createElement("span");
      timeClockName.innerHTML = `Current time in ${label}: `;

      const currentTime = document.createElement("span");
      currentTime.classList.add("time");
      currentTime.setAttribute(
        "data-name",
        section.toLowerCase().trim().replaceAll("-", "")
      );

      timeClock.appendChild(timeClockName);
      timeClock.appendChild(currentTime);
      tabContentItem.appendChild(timeClock);
      tabContentContainer.appendChild(tabContentItem);
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
  initActiveStates() {
    const tabLinks = [...document.querySelectorAll(".tablist-item-link")];
    tabLinks[0].classList.add("active");
    tabLinks[0].setAttribute("aria-selected", true);

    const activeTabLink = tabLinks[0].getAttribute("href");
    const tabContent = document.querySelector(`${activeTabLink}`);
    tabContent.classList.add("active");
  }

  updateActiveStates(eventTarget) {
    [...eventTarget.parentElement.parentElement.childNodes].forEach(
      (sibling) => {
        const link = sibling.querySelector(".tablist-item-link");
        link.classList.remove("active");
        link.setAttribute("aria-selected", false);
      }
    );
    eventTarget.classList.add("active");
    eventTarget.setAttribute("aria-selected", true);

    const activeTabLink = eventTarget.getAttribute("href");
    const activeTabElem = document.querySelector(`${activeTabLink}`);
    const tabContentItems = [...document.querySelectorAll(".tabcontent-item")];
    tabContentItems.forEach((tabItem) => {
      tabItem.classList.remove("active");
    });
    activeTabElem.classList.add("active");

    this.updateLine(eventTarget);
  }

  createEventListners() {
    const tabLinks = [...document.querySelectorAll(".tablist-item-link")];
    tabLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        this.updateActiveStates(e.currentTarget);
      });
    });
    window.addEventListener("resize", () => {
      this.update();
    });
  }
};
