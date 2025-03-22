import { drawCircle, drawRect, drawText, drawLine, bgColor, rainbowColor } from './renderer.js';
import { setTimeout as delay } from 'node:timers/promises';
import updateLog from 'log-update';

// Interpreter
export const interpretAST = async (ast) => {
  let canvasOutput = "";
  let backgroundColor = "black";
  let variables = {};
  let frames = [];
  
  const renderCommand = async (command, frameOutput = "") => {
    switch (command.type) {
      case "background":
        backgroundColor = command.color;
        break;
      case "circle":
        return frameOutput + drawCircle(command.radius, command.fill);
      case "rect":
        return frameOutput + drawRect(command.width, command.height, command.fill);
      case "text":
        return frameOutput + await drawText(command.text, command.color, command.size);
      case "line":
        return frameOutput + drawLine(command.x1, command.y1, command.x2, command.y2, command.color);
      case "variable":
        variables[command.name] = command.value;
        break;
      case "wait":
        await delay(command.duration);
        return frameOutput; // Make sure to return the current frameOutput
      case "rainbow":
        for (let i = 0; i < command.duration; i++) {
          const rainbowText = rainbowColor(command.text, i);
          updateLog(bgColor(backgroundColor)(frameOutput + rainbowText));
          await delay(10);
        }
        return frameOutput;
      case "frame":
        let frameContent = "";
        for (const cmd of command.commands) {
          frameContent = await renderCommand(cmd, frameContent);
        }
        frames.push(frameContent);
        return frameOutput;
      case "animate":
        let animContent = "";
        const animFrames = [];
        
        for (const frame of command.frames) {
          if (frame.type === "frame") {
            let frameContent = "";
            for (const cmd of frame.commands) {
              frameContent = await renderCommand(cmd, frameContent);
            }
            animFrames.push(frameContent);
          }
        }
        
        const frameDelay = Math.max(50, Math.floor(command.duration / animFrames.length));
        
        for (let i = 0; i < command.duration / frameDelay; i++) {
          const frameIndex = i % animFrames.length;
          updateLog(bgColor(backgroundColor)(animFrames[frameIndex]));
          await delay(frameDelay);
        }
        return frameOutput;
    }
    
    return frameOutput;
  };
  
  // Process all commands
  for (const command of ast.commands) {
    canvasOutput = await renderCommand(command, canvasOutput);
  }
  
  // If we have frames, animate them
  if (frames.length > 0) {
    while (true) {
      for (const frame of frames) {
        updateLog(bgColor(backgroundColor)(frame));
        await delay(100);
      }
    }
  } else {
    // Final output
    console.log(bgColor(backgroundColor)(canvasOutput));
  }
};