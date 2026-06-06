// Central color + layout theme so every scene looks consistent.
export const Theme = {
  bg: 0x0b1023,
  bgPanel: 0x141b3a,
  bgPanelLight: 0x1f2a52,
  wall: 0x2b3566,
  floor: 0x161d3d,
  floorAlt: 0x1b234a,
  accent: 0x4fc3ff,
  accentDim: 0x2f7fb0,
  good: 0x4ade80,
  bad: 0xff6b6b,
  warn: 0xffd166,
  text: 0xeaf2ff,
  textDim: 0x9fb3d8,
  coin: 0xffd166,
  // CSS string versions for HTML/Phaser text styles
  css: {
    text: '#eaf2ff',
    textDim: '#9fb3d8',
    accent: '#4fc3ff',
    good: '#4ade80',
    bad: '#ff6b6b',
    warn: '#ffd166',
    panel: '#141b3a',
  },
};

// Classic Among Us-ish crewmate colors the kid can pick.
export const CREW_COLORS: { name: string; hex: number }[] = [
  { name: 'Red', hex: 0xff4d4d },
  { name: 'Blue', hex: 0x4d6bff },
  { name: 'Green', hex: 0x3ddc84 },
  { name: 'Pink', hex: 0xff7bd5 },
  { name: 'Orange', hex: 0xff9f43 },
  { name: 'Yellow', hex: 0xffe14d },
  { name: 'Cyan', hex: 0x4fe3e3 },
  { name: 'Lime', hex: 0xa6ff4d },
  { name: 'Purple', hex: 0xa564ff },
  { name: 'White', hex: 0xf2f6ff },
];

export const GAME_WIDTH = 960;
export const GAME_HEIGHT = 640;
