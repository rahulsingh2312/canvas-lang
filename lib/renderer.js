import art from "ascii-art";
import chalk from "chalk";
import colorConvert from 'color-convert';

// Color handling functions
const colorMap = {
  "black": "#000000",
  "red": "#ff0000",
  "green": "#00ff00",
  "blue": "#0000ff",
  "yellow": "#ffff00",
  "magenta": "#ff00ff",
  "cyan": "#00ffff",
  "white": "#ffffff",
  "gray": "#808080",
  "orange": "#ffa500",
  "purple": "#800080",
  "pink": "#ffc0cb",
  "brown": "#a52a2a",
  "lime": "#00ff00",
  "navy": "#000080",
  "teal": "#008080"
};

export const processColor = (color) => {
  // Remove quotes if they exist
  color = color.replace(/"/g, '');
  
  // Check if it's a named color
  if (colorMap[color.toLowerCase()]) {
    return colorMap[color.toLowerCase()];
  }
  
  // Return as is (assuming it's a hex color)
  return color.startsWith('#') ? color : `#${color}`;
};

export const bgColor = (color) => {
  return chalk.bgHex(processColor(color));
};

export const textColor = (color) => {
  return chalk.hex(processColor(color));
};

// Rainbow text animation
export const rainbowColor = (string, offset) => {
  if (!string || string.length === 0) {
    return string;
  }
  
  const ignoreChars = /[^!-~]/g;
  const hueStep = 360 / string.replaceAll(ignoreChars, '').length;
  
  let hue = offset % 360;
  const characters = [];
  
  for (const character of string) {
    if (ignoreChars.test(character)) {
      characters.push(character);
    } else {
      characters.push(chalk.hex(colorConvert.hsl.hex(hue, 100, 50))(character));
      hue = (hue + hueStep) % 360;
    }
  }
  
  return characters.join('');
};

// Drawing functions
export const drawText = async (text, color, size = 30) => {
  try {
    const font = size > 15 ? "Doom" : "Doom";
    const renderedText = await art.font(text, font);
    return textColor(color)(renderedText);
  } catch (err) {
    console.error("Error rendering ASCII text:", err);
    return textColor(color)(text);
  }
};

export const drawCircle = (radius, color) => {
  let output = "";
  for (let y = -radius; y <= radius; y++) {
    for (let x = -radius; x <= radius; x++) {
      const distance = Math.sqrt(x * x + y * y);
      output += distance < radius ? textColor(color)("●") : " ";
    }
    output += "\n";
  }
  return output;
};

export const drawRect = (width, height, color) => {
  let output = "";
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      output += textColor(color)("█");
    }
    output += "\n";
  }
  return output;
};

export const drawLine = (x1, y1, x2, y2, color) => {
  const dx = Math.abs(x2 - x1);
  const dy = Math.abs(y2 - y1);
  const sx = x1 < x2 ? 1 : -1;
  const sy = y1 < y2 ? 1 : -1;
  let err = dx - dy;
  
  // Create a 2D grid to represent the line
  const maxX = Math.max(x1, x2);
  const maxY = Math.max(y1, y2);
  const minX = Math.min(x1, x2);
  const minY = Math.min(y1, y2);
  
  const width = maxX - minX + 5;
  const height = maxY - minY + 5;
  
  const grid = Array(height).fill().map(() => Array(width).fill(' '));
  
  let x = x1;
  let y = y1;
  
  while (true) {
    grid[y - minY + 2][x - minX + 2] = '●';
    
    if (x === x2 && y === y2) break;
    
    const e2 = 2 * err;
    if (e2 > -dy) {
      err -= dy;
      x += sx;
    }
    if (e2 < dx) {
      err += dx;
      y += sy;
    }
  }
  
  let output = "";
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      output += grid[y][x] === '●' ? textColor(color)('●') : ' ';
    }
    output += "\n";
  }
  
  return output;
};