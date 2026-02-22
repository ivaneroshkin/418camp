import { styleText } from 'node:util';

const LOGO_ASCII = `
   ___    _   _   ___   ____ 
  / _ \\  | | | | |_ _| |_  / 
 | | | | | | | |  | |   / /  
 | |_| | | |_| |  | |  / /_  
  \\__\\_\\  \\___/  |___| /____|
                              
    ╔═══════════════════════════════════════════╗
    ║   Answer 5 random questions correctly     ║
    ║   Select your answer using number keys    ║
    ╚═══════════════════════════════════════════╝
`;

const COLORS = ['green', 'yellow', 'blue', 'magenta'] as const;

function getRandomColor(): typeof COLORS[number] {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

export function titleScreen(): void {
  console.clear();
  const randomColor = getRandomColor();
  console.log(styleText(randomColor, LOGO_ASCII));
  console.log('\n');
}
