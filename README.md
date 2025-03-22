# canvas-lang Language Documentation

## Installation

```bash
npm install -g canvas-lang
```
```bash
canvas-lang your-script.canvas
```
## Introduction

Create Animated , Colorful ASCII-ART right in your terminals 
write few line .canvas code & get your desired ascii art !

## Basic Syntax

Every canvas-lang program starts with a `canvas` block:

```
canvas {
  // Your code here
}
```

## Commands

### Background

Set the background color for the canvas:

```
background "color";
```

Colors can be named colors like "red", "blue", "green", or hex colors like "#FF5733".

### Circle

Draw a circle:

```
circle at (x, y) radius r fill "color";
```

- `x, y`: Coordinates for the center of the circle
- `r`: Radius of the circle
- `color`: Fill color

### Rectangle

Draw a rectangle:

```
rect at (x, y) width w height h fill "color";
```

- `x, y`: Coordinates for the top-left corner
- `w`: Width of the rectangle
- `h`: Height of the rectangle
- `color`: Fill color

### Text

Display text:

```
text "Your text" at (x, y) size s color "color";
```

- `"Your text"`: The text to display
- `x, y`: Coordinates for the text
- `s`: Text size (affects font selection - larger values use larger fonts)
- `color`: Text color

### Line

Draw a line:

```
line from (x1, y1) to (x2, y2) color "color";
```

- `x1, y1`: Starting coordinates
- `x2, y2`: Ending coordinates
- `color`: Line color

### Rainbow Text

Display animated rainbow text:

```
rainbow "Your text" at (x, y) duration 100;
```

- `"Your text"`: The text to display with rainbow animation
- `x, y`: Coordinates for the text
- `duration`: How long to run the animation (in cycles)

### Variables

Define variables for reuse:

```
var name = value;
```

### Wait

Pause execution:

```
wait 1000;  // Waits for 1000ms
```

### Frames and Animation

Create frame-based animations:

```
frame {
  // Commands for this frame
}

frame {
  // Commands for another frame
}

// Or use the animate block
animate {
  frame {
    // Frame 1
  }
  frame {
    // Frame 2
  }
} for 5000;  // Animation runs for 5000ms
```

## Examples

### Basic Example

```
canvas {
  background "navy";
  circle at (10, 10) radius 5 fill "yellow";
  text "Hello World" at (0, 15) size 10 color "white";
}
```

### Animation Example

```
canvas {
  background "black";
  
  animate {
    frame {
      circle at (5, 5) radius 3 fill "red";
    }
    frame {
      circle at (10, 5) radius 3 fill "blue";
    }
    frame {
      circle at (15, 5) radius 3 fill "green";
    }
  } for 5000;
}
```

### Rainbow Text Example

```
canvas {
  background "black";
  rainbow "Welcome to canvas-lang!" at (5, 5) duration 200;
}
```


## Supported Colors

canvas-lang supports the following named colors:
- black
- red
- green
- blue
- yellow
- magenta
- cyan
- white
- gray
- orange
- purple
- pink
- brown
- lime
- navy
- teal

You can also use hex colors like "#FF5733".

<hr>

### Github of canvas-lang & other Socials so you contact us and ask for more features & Report Bugs!

Contribute at : 

[Github/rahulsingh2312/canvas-lang](https://github.com/rahulsingh2312/canvas-lang) 

[Report Issues & Bugs & Request a feature at 🚧 ](https://github.com/rahulsingh2312/canvas-lang/issues/new)



Contact at [X](https://x.com/rrahulol) :  https://x.com/rrahulol 