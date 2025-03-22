// Tokenizer
export const tokenizeInput = (input) => {
    const tokens = [];
    const tokenPatterns = [
      { type: "NUMBER", regex: /^\d+(\.\d+)?/ },
      { type: "STRING", regex: /^"([^"]*)"/ },
      { type: "ID", regex: /^[a-zA-Z][a-zA-Z0-9_]*/ },
      { type: "LPAREN", regex: /^\(/ },
      { type: "RPAREN", regex: /^\)/ },
      { type: "LBRACE", regex: /^\{/ },
      { type: "RBRACE", regex: /^\}/ },
      { type: "LBRACKET", regex: /^\[/ },
      { type: "RBRACKET", regex: /^\]/ },
      { type: "SEMICOLON", regex: /^;/ },
      { type: "COMMA", regex: /^,/ },
      { type: "ASSIGN", regex: /^=/ },
      { type: "WHITESPACE", regex: /^\s+/, ignore: true },
      { type: "COMMENT", regex: /^\/\/.*/, ignore: true },
      { type: "ARROW", regex: /^->/ }
    ];
  
    while (input.length > 0) {
      let matched = false;
      for (let { type, regex, ignore } of tokenPatterns) {
        const match = input.match(regex);
        if (match) {
          if (!ignore) tokens.push({ type, value: match[0] });
          input = input.slice(match[0].length);
          matched = true;
          break;
        }
      }
      if (!matched) throw new Error(`Unexpected token: ${input[0]}`);
    }
  
    return tokens;
  };
  
  // Parser
  export const parseTokens = (tokens) => {
    let currentTokenIndex = 0;
    
    const peek = () => tokens[currentTokenIndex] || { type: "EOF", value: "EOF" };
    const consume = () => tokens[currentTokenIndex++];
    const match = (type) => {
      if (peek().type === type) {
        return consume();
      }
      throw new Error(`Expected ${type}, got ${peek().type}`);
    };
    
    const parseCanvas = () => {
      const ast = { type: "canvas", commands: [] };
      
      match("ID"); // canvas
      match("LBRACE");
      
      while (peek().type !== "RBRACE" && peek().type !== "EOF") {
        ast.commands.push(parseCommand());
      }
      
      match("RBRACE");
      return ast;
    };
    
    const parseCommand = () => {
      const token = peek();
      
      if (token.type === "ID") {
        switch (token.value) {
          case "background":
            return parseBackground();
          case "circle":
            return parseCircle();
          case "rect":
            return parseRect();
          case "text":
            return parseText();
          case "line":
            return parseLine();
          case "animate":
            return parseAnimation();
          case "var":
            return parseVariable();
          case "rainbow":
            return parseRainbow();
          case "wait":
            return parseWait();
          case "frame":
            return parseFrame();
          default:
            throw new Error(`Unknown command: ${token.value}`);
        }
      }
      
      throw new Error(`Expected command, got ${token.type}`);
    };
    
    const parseBackground = () => {
      consume(); // background
      const color = match("STRING");
      match("SEMICOLON");
      return { type: "background", color: color.value };
    };
    
    const parseCircle = () => {
      consume(); // circle
      match("ID"); // at
      match("LPAREN");
      const x = match("NUMBER");
      match("COMMA");
      const y = match("NUMBER");
      match("RPAREN");
      match("ID"); // radius
      const radius = match("NUMBER");
      match("ID"); // fill
      const color = match("STRING");
      match("SEMICOLON");
      
      return {
        type: "circle",
        x: parseFloat(x.value),
        y: parseFloat(y.value),
        radius: parseFloat(radius.value),
        fill: color.value
      };
    };
    
    const parseRect = () => {
      consume(); // rect
      match("ID"); // at
      match("LPAREN");
      const x = match("NUMBER");
      match("COMMA");
      const y = match("NUMBER");
      match("RPAREN");
      match("ID"); // width
      const width = match("NUMBER");
      match("ID"); // height
      const height = match("NUMBER");
      match("ID"); // fill
      const color = match("STRING");
      match("SEMICOLON");
      
      return {
        type: "rect",
        x: parseFloat(x.value),
        y: parseFloat(y.value),
        width: parseFloat(width.value),
        height: parseFloat(height.value),
        fill: color.value
      };
    };
    
    const parseText = () => {
      consume(); // text
      const text = match("STRING");
      match("ID"); // at
      match("LPAREN");
      const x = match("NUMBER");
      match("COMMA");
      const y = match("NUMBER");
      match("RPAREN");
      match("ID"); // size
      const size = match("NUMBER");
      match("ID"); // color
      const color = match("STRING");
      match("SEMICOLON");
      
      return {
        type: "text",
        text: text.value.replace(/"/g, ''),
        x: parseFloat(x.value),
        y: parseFloat(y.value),
        size: parseInt(size.value),
        color: color.value
      };
    };
    
    const parseLine = () => {
      consume(); // line
      match("ID"); // from
      match("LPAREN");
      const x1 = match("NUMBER");
      match("COMMA");
      const y1 = match("NUMBER");
      match("RPAREN");
      match("ID"); // to
      match("LPAREN");
      const x2 = match("NUMBER");
      match("COMMA");
      const y2 = match("NUMBER");
      match("RPAREN");
      match("ID"); // color
      const color = match("STRING");
      match("SEMICOLON");
      
      return {
        type: "line",
        x1: parseFloat(x1.value),
        y1: parseFloat(y1.value),
        x2: parseFloat(x2.value),
        y2: parseFloat(y2.value),
        color: color.value
      };
    };
    
    const parseAnimation = () => {
      consume(); // animate
      match("LBRACE");
      
      const frames = [];
      while (peek().type !== "RBRACE" && peek().type !== "EOF") {
        const cmd = parseCommand();
        frames.push(cmd);
      }
      
      match("RBRACE");
      match("ID"); // for
      const duration = match("NUMBER");
      match("SEMICOLON");
      
      return {
        type: "animate",
        frames,
        duration: parseInt(duration.value)
      };
    };
    
    const parseVariable = () => {
      consume(); // var
      const name = match("ID");
      match("ASSIGN");
      const value = match("NUMBER");
      match("SEMICOLON");
      
      return {
        type: "variable",
        name: name.value,
        value: parseFloat(value.value)
      };
    };
    
    const parseRainbow = () => {
      consume(); // rainbow
      const text = match("STRING");
      match("ID"); // at
      match("LPAREN");
      const x = match("NUMBER");
      match("COMMA");
      const y = match("NUMBER");
      match("RPAREN");
      match("ID"); // duration
      const duration = match("NUMBER");
      match("SEMICOLON");
      
      return {
        type: "rainbow",
        text: text.value.replace(/"/g, ''),
        x: parseFloat(x.value),
        y: parseFloat(y.value),
        duration: parseInt(duration.value)
      };
    };
    
    const parseWait = () => {
      consume(); // wait
      const duration = match("NUMBER");
      match("SEMICOLON");
      
      return {
        type: "wait",
        duration: parseInt(duration.value)
      };
    };
    
    const parseFrame = () => {
      consume(); // frame
      match("LBRACE");
      
      const commands = [];
      while (peek().type !== "RBRACE" && peek().type !== "EOF") {
        commands.push(parseCommand());
      }
      
      match("RBRACE");
      
      return {
        type: "frame",
        commands
      };
    };
    
    return parseCanvas();
  };