import { styleText } from 'node:util';
import { getRandomNumber } from './utils';

const comments = [
  'Brilliant. What could possibly go wrong?',
  'Ah yes... The optimal decision.',
  'The abyss files this under "Predictable."',
  'Bold strategy. The darkness loves optimism.',
  'Fate rubs its temples... and rolls its eyes.',
  'Congratulations. You\'ve impressed absolutely no one.',
  'The void has seen worse. Slightly.',
  'Another heroic miscalculation.',
  'The shadows begin preparing your apology letter.',
  'Well done! Doom appreciates the enthusiasm.',
  'The abyss approves. Probably.',  
  'Another excellent life decision.',
  'The darkness applauds… slowly.',
  'Fate sighs and takes notes...',
  'The void rolls its invisible eyes.',
  'Well done. The cursed gods are mildly impressed.',
  'Your doom has been scheduled...',
  'The shadows whisper, “Bold choice.”',
  'Consequences have entered the chat.',
  'And thus, the bad idea begins.',
];

export function displayRandomComment(): void {
  const randomIndex = getRandomNumber(comments.length);
  console.log(styleText('gray', `\n  "${comments[randomIndex]}"\n`));
}
