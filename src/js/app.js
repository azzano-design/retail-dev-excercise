"use strict";

const TabList = require("./tabList");

const fetchNavigation = async () => {
  const res = await fetch("../../json/navigation.json");
  return await res.json();
};

const createClock = (cityName) => {
  const timezones = {
    cupertino: "America/Los_Angeles",
    newyorkcity: "America/New_York",
    london: "Europe/London",
    amsterdam: "Europe/Amsterdam",
    tokyo: "Asia/Tokyo",
    hongkong: "Asia/Hong_Kong",
    sydney: "Australia/Sydney",
  };
  function updateTime() {
    const today = new Date().toLocaleString("en-US", {
      timeZone: `${timezones[cityName]}`,
    });
    const [date, time] = today.split(",");
    document.querySelector(`[data-name="${cityName}"]`).innerHTML = time;
    setTimeout(updateTime, 1000);
  }
  updateTime();
};

fetchNavigation().then((response) => {
  const { cities } = response;
  const cityTabs = new TabList(document.querySelector("body"), cities, "cites");
  cityTabs.init();
  const clocks = [...document.querySelectorAll(".time")];
  clocks.forEach((clock) => {
    createClock(clock.dataset.name);
  });
});
