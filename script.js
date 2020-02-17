"use strict";
window.addEventListener("DOMContentLoaded", initPage);
function initPage() {
  console.log("Init Function");
  start();
}

let selectedColor;
const HTML = [];
const style = document.createElement("style");
document.head.appendChild(style);

function start() {
  console.log(style);
  HTML.colorPicker = document.querySelector("#selectColor");
  HTML.colorBox = document.querySelector("#color");
  HTML.colorPicker.addEventListener("change", showColor);
}

function showColor() {
  selectedColor = HTML.colorPicker.value;

  document.querySelector("#hex").textContent = "HEX: " + selectedColor;
  console.log(selectedColor);

  HTML.colorBox.dataset.color_selected = selectedColor;

  style.sheet.insertRule(`[data-color_selected="${selectedColor}"] {--selected_color: ${selectedColor}}`);

  console.log(HTML.colorPicker.value);

  //document.querySelector("#color").style.backgroundColor = selectedColor;

  showRGB();
}

function showRGB() {
  let r, g, b;

  let hex = selectedColor;

  console.log(hex);

  r = hex.substring(1, 3);
  g = hex.substring(3, 5);
  b = hex.substring(5, 7);

  console.log(r, g, b);

  r = parseInt(r, 16);
  g = parseInt(b, 16);
  b = parseInt(g, 16);

  console.log(r, b, g);
  document.querySelector("#rbg").textContent = `RBG: (${r},${b},${g})`;

  showHSL(r, g, b);
}

function showHSL(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;

  console.log(h, s, l); // just for testing

  h = Math.round((h * 100) / 100);
  s = Math.round((s * 100) / 100);
  l = Math.round((l * 100) / 100);

  document.querySelector("#hsl").textContent = `HSL: (${h},${s},${l})`;
}
