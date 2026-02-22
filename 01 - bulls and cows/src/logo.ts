import { styleText } from 'node:util';

export function displayTitleScreen(): void {
  const colors = ['red', 'green', 'yellow', 'blue', 'magenta', 'cyan'] as const;
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  const titleArt = `
╔═══════════════════════════════════════════════╗
║                                               ║
║   ██████╗ ██╗   ██╗██╗     ██╗     ███████╗   ║
║   ██╔══██╗██║   ██║██║     ██║     ██╔════╝   ║
║   ██████╔╝██║   ██║██║     ██║     ███████╗   ║
║   ██╔══██╗██║   ██║██║     ██║     ╚════██║   ║
║   ██████╔╝╚██████╔╝███████╗███████╗███████║   ║
║   ╚═════╝  ╚═════╝ ╚══════╝╚══════╝╚══════╝   ║
║                         &                     ║
║    ██████╗ ██████╗ ██╗    ██╗███████╗         ║
║   ██╔════╝██╔═══██╗██║    ██║██╔════╝         ║
║   ██║     ██║   ██║██║ █╗ ██║███████╗         ║
║   ██║     ██║   ██║██║███╗██║╚════██║         ║
║   ╚██████╗╚██████╔╝╚███╔███╔╝███████║         ║
║    ╚═════╝ ╚═════╝  ╚══╝╚══╝ ╚══════╝         ║
║                                               ║
║         Guess the Secret Number!              ║
║                                               ║
╚═══════════════════════════════════════════════╝
`;

  console.log(styleText([randomColor, 'bold'], titleArt));
  console.log();
}
