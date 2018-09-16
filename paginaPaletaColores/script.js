const R = 0;
const G = 1;
const B = 2;
const H = 0;
const S = 1;
const L = 2;
const CSS_TO_REPLACE = [
    '.website-background{ color: ',
    '.element-text{ color: ',
    '.element-border{ border-color: ',
    '.element-background{ background-color: ',
    '.header{ color: '
];
const DIVISIONS = 5;

function randomPalette() {
    var increment = 360 / DIVISIONS;
    var saturation = Math.random();
    var lightness = Math.random();
    var hue = randomNumberBetween(0, 359);
    var colors = [];
    for (var i = 0; i < DIVISIONS; i++) {
        colors.push(hslToRgb(hue / 360, saturation, lightness));
        hue = (hue + increment) % 360;
    }
    generateRules(colors);
}

function generateRules(colors) {
    let cssText = '';
    for (var i = 0; i < colors.length; i++) {
        rgbCssRule = rgbToCssRule(colors[i]);
        cssText = cssText + `${CSS_TO_REPLACE[i]}${rgbCssRule}; }\n`;
        document.getElementById(`color${i + 1}`).style.background = rgbCssRule;
    }
    document.getElementById('css-rules').value = cssText;
}

function rgbToCssRule(rgb) {
    return `rgb(${rgb[R]}, ${rgb[G]}, ${rgb[B]})`;
}

function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function cleanPalette() {
    let cssText = '';
    for (var i = 0; i < DIVISIONS; i++) {
        cssText = cssText + `${CSS_TO_REPLACE[i]}#FFFFFF; }\n`;
        document.getElementById(`color${i + 1}`).style.background = '#FFFFFF';
    }
    document.getElementById('css-rules').value = cssText;
}
