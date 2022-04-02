"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

module.exports = /*#__PURE__*/function () {
  function TabList(elem, json, label) {
    _classCallCheck(this, TabList);

    this.parentElem = elem;
    this.label = label !== null && label !== void 0 ? label : "";
    this.data = json;
  }

  _createClass(TabList, [{
    key: "init",
    value: function init() {
      this.createListElem(this.data);
      this.createTabContent(this.data);
      this.createLineElem();
      this.initActiveStates();
      this.createEventListners();
      this.update();
    }
  }, {
    key: "update",
    value: function update() {
      var activeLink = document.querySelector(".tablist-item-link.active");
      this.updateLine(activeLink);
    }
  }, {
    key: "createListElem",
    value: function createListElem(data) {
      var parent = this.parentElem; //create container

      var tabList = document.createElement("div");
      tabList.classList.add("tablist");
      parent.appendChild(tabList); //create ul

      var tabListItems = document.createElement("ul");
      tabListItems.classList.add("tablist-items");
      tabListItems.setAttribute("role", "tablist");
      tabListItems.setAttribute("aria-label", this.label);
      tabList.appendChild(tabListItems); //list items

      for (var _i = 0, _Object$values = Object.values(data); _i < _Object$values.length; _i++) {
        var _Object$values$_i = _Object$values[_i],
            section = _Object$values$_i.section,
            label = _Object$values$_i.label;
        //create li
        var tabListItem = document.createElement("li");
        tabListItem.classList.add("tablist-item");
        tabListItem.setAttribute("role", "presentation"); //create a

        var tabListItemLink = document.createElement("a");
        tabListItemLink.classList.add("tablist-item-link");
        tabListItemLink.href = "#tabcontent-".concat(section);
        tabListItemLink.setAttribute("id", "tab-".concat(section));
        tabListItemLink.setAttribute("aria-controls", "".concat(section));
        tabListItemLink.setAttribute("aria-selected", false);
        tabListItemLink.setAttribute("role", "tab");
        tabListItemLink.setAttribute("tabindex", "0");
        tabListItemLink.innerHTML = "".concat(label); //add a to li

        tabListItem.appendChild(tabListItemLink); //add li to container

        tabListItems.appendChild(tabListItem);
      }
    }
  }, {
    key: "createTabContent",
    value: function createTabContent(data) {
      var parent = this.parentElem;
      var tabContentContainer = document.createElement("div");
      tabContentContainer.classList.add("tabcontent");
      parent.appendChild(tabContentContainer);

      for (var _i2 = 0, _Object$values2 = Object.values(data); _i2 < _Object$values2.length; _i2++) {
        var _Object$values2$_i = _Object$values2[_i2],
            section = _Object$values2$_i.section,
            label = _Object$values2$_i.label;
        var tabContentItem = document.createElement("div");
        tabContentItem.classList.add("tabcontent-item");
        tabContentItem.setAttribute("id", "tabcontent-".concat(section));
        tabContentItem.setAttribute("aria-controledby", "tab-".concat(section));
        tabContentItem.setAttribute("role", "tabpanel");
        var timeClock = document.createElement("div");
        timeClock.classList.add("timeContainer");
        var timeClockName = document.createElement("span");
        timeClockName.innerHTML = "Current time in ".concat(label, ": ");
        var currentTime = document.createElement("span");
        currentTime.classList.add("time");
        currentTime.setAttribute("data-name", section.toLowerCase().trim().replaceAll("-", ""));
        timeClock.appendChild(timeClockName);
        timeClock.appendChild(currentTime);
        tabContentItem.appendChild(timeClock);
        tabContentContainer.appendChild(tabContentItem);
      }
    }
  }, {
    key: "createLineElem",
    value: function createLineElem() {
      var container = document.querySelector(".tablist");
      var lineEl = document.createElement("div");
      lineEl.classList.add("line");
      container.appendChild(lineEl);
    }
  }, {
    key: "updateLine",
    value: function updateLine(elem) {
      var _elem$offsetLeft, _elem$offsetWidth;

      var lineEl = document.querySelector(".line");
      var leftOffset = (_elem$offsetLeft = elem.offsetLeft) !== null && _elem$offsetLeft !== void 0 ? _elem$offsetLeft : "0px";
      var width = (_elem$offsetWidth = elem.offsetWidth) !== null && _elem$offsetWidth !== void 0 ? _elem$offsetWidth : "0px";
      lineEl.style.width = "".concat(width, "px");
      lineEl.style.left = "".concat(leftOffset, "px");
    }
  }, {
    key: "initActiveStates",
    value: function initActiveStates() {
      var tabLinks = _toConsumableArray(document.querySelectorAll(".tablist-item-link"));

      tabLinks[0].classList.add("active");
      tabLinks[0].setAttribute("aria-selected", true);
      var activeTabLink = tabLinks[0].getAttribute("href");
      var tabContent = document.querySelector("".concat(activeTabLink));
      tabContent.classList.add("active");
    }
  }, {
    key: "updateActiveStates",
    value: function updateActiveStates(eventTarget) {
      _toConsumableArray(eventTarget.parentElement.parentElement.childNodes).forEach(function (sibling) {
        var link = sibling.querySelector(".tablist-item-link");
        link.classList.remove("active");
        link.setAttribute("aria-selected", false);
      });

      eventTarget.classList.add("active");
      eventTarget.setAttribute("aria-selected", true);
      var activeTabLink = eventTarget.getAttribute("href");
      var activeTabElem = document.querySelector("".concat(activeTabLink));

      var tabContentItems = _toConsumableArray(document.querySelectorAll(".tabcontent-item"));

      tabContentItems.forEach(function (tabItem) {
        tabItem.classList.remove("active");
      });
      activeTabElem.classList.add("active");
      this.updateLine(eventTarget);
    }
  }, {
    key: "createEventListners",
    value: function createEventListners() {
      var _this = this;

      var tabLinks = _toConsumableArray(document.querySelectorAll(".tablist-item-link"));

      tabLinks.forEach(function (link) {
        link.addEventListener("click", function (e) {
          e.preventDefault();

          _this.updateActiveStates(e.currentTarget);
        });
      });
      window.addEventListener("resize", function () {
        _this.update();
      });
    }
  }]);

  return TabList;
}();