"use strict";
const TabList = require("./tabList");

const fetchNavigation = async () => {
  const res = await fetch("../../public/json/navigation.json");
  return await res.json();
};

fetchNavigation().then((response) => {
  const { cities } = response;
  const cityTabs = new TabList(document.querySelector("body"), cities, "cites");
  cityTabs.init();
});
