import { styleText } from 'node:util';

const LOGO_ASCII = `
   ___    _   _   ___   ____ 
  / _ \\  | | | | |_ _| |_  / 
 | | | | | | | |  | |   / /  
 | |_| | | |_| |  | |  / /_  
  \\__\\_\\  \\___/  |___| /____|
                              
    ╔═══════════════════════════════════════════╗
    ║   Answer 5 random questions correctly     ║
    ║   Enter number to select • 'q' to quit   ║
    ╚═══════════════════════════════════════════╝
`;

export const COLORS = ['green', 'yellow', 'blue', 'magenta'] as const;

export function getRandomColor(): (typeof COLORS)[number] {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

export function titleScreen(): void {
  console.clear();
  const randomColor = getRandomColor();
  console.log(styleText(randomColor, LOGO_ASCII));
  console.log('\n');
}
