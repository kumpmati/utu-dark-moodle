const darkScheme = new Map()
  .set("--mdm-bg", "rgb(31, 31, 31)")
  .set("--mdm-bg-light", "rgb(35, 35, 35)")
  .set("--mdm-bg-dark", "rgb(20, 20, 20)")
  .set("--mdm-text", "rgb(219, 219, 219)")
  .set("--mdm-text-light", "rgb(235, 235, 235)")
  .set("--mdm-border", "rgba(255, 255, 255, 0.1)");

const defaultScheme = new Map()
  .set("--mdm-bg", "unset")
  .set("--mdm-bg-light", "unset")
  .set("--mdm-bg-dark", "unset")
  .set("--mdm-text", "unset")
  .set("--mdm-text-light", "unset")
  .set("--mdm-border", "unset");

/**
 * Updates the color scheme
 * @param {*} mode
 */
function setMode(mode) {
  const root = document.documentElement;
  const scheme = mode === "light" ? defaultScheme : darkScheme;

  for (const [prop, value] of scheme.entries()) {
    root.style.setProperty(prop, value);
  }

  localStorage.setItem("mdm-mode", mode);
  const nextMode = mode === "light" ? "dark" : "light";
  return `Switch to ${nextMode}`;
}

chrome.extension.sendMessage({}, () => {
  var readyStateCheckInterval = setInterval(function () {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);

      // set mode to current saved mode
      const txt = setMode(localStorage.getItem("mdm-mode") || "dark");

      // button
      const button = document.createElement("a");
      button.classList.add("nav-link", "dark-mode-button");
      button.innerHTML = txt; // update button text
      button.addEventListener("click", () => {
        const currentMode = localStorage.getItem("mdm-mode") || "dark";
        const text = setMode(currentMode === "dark" ? "light" : "dark");
        button.innerHTML = text;
      });

      // button container
      const darkModeButtonContainer = document.createElement("li");
      darkModeButtonContainer.classList.add("dropdown", "nav-item");

      darkModeButtonContainer.appendChild(button);

      // inject button into nav bar
      document
        .querySelector(".navbar-nav")
        .appendChild(darkModeButtonContainer);
    }
  }, 10);
});
