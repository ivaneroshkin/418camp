import { styleText } from 'node:util';

const colors = ['cyan', 'red', 'magenta', 'yellow', 'green', 'blue'] as const;

function getRandomColor(): (typeof colors)[number] {
  return colors[Math.floor(Math.random() * colors.length)];
}

export const titleScreen = (): void => {
  const color = getRandomColor();
  console.log(
    styleText(
      color,
      `
╔══════════════════════════════════════════════╗
║                                              ║
║    ░█▀▄░█▀█░█▀▀░░░█▀▄░█▀█░▀█▀░▀█▀░█░░░█▀▀    ║
║    ░█▀▄░█▀▀░█░█░░░█▀▄░█▀█░░█░░░█░░█░░░█▀▀    ║
║    ░▀░▀░▀░░░▀▀▀░░░▀▀░░▀░▀░░▀░░░▀░░▀▀▀░▀▀▀    ║
║                                              ║
║                                              ║
║     ⚔️  BATTLE FOR GLORY AND HONOR  ⚔️         ║
║                                              ║
║                                              ║
╚══════════════════════════════════════════════╝
`
    )
  );
};
