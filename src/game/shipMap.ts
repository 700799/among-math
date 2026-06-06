import type { Domain } from '../math/types';
import { GAME_WIDTH, GAME_HEIGHT } from '../theme';

// Room + station layout for the spaceship. Coordinates are in world pixels.
// Rooms are simple rectangles; stations sit inside rooms and map to a domain.

export interface Room {
  name: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Station {
  domain: Domain;
  x: number;
  y: number;
  room: string;
}

const W = GAME_WIDTH;
const H = GAME_HEIGHT;

// Six rooms arranged around a central corridor.
export const ROOMS: Room[] = [
  { name: 'Cafeteria', x: W * 0.36, y: H * 0.08, w: W * 0.28, h: H * 0.26 },
  { name: 'Fraction Lab', x: W * 0.06, y: H * 0.10, w: W * 0.24, h: H * 0.26 },
  { name: 'Decimal Bay', x: W * 0.70, y: H * 0.10, w: W * 0.24, h: H * 0.26 },
  { name: 'Volume Storage', x: W * 0.06, y: H * 0.58, w: W * 0.24, h: H * 0.30 },
  { name: 'Navigation', x: W * 0.70, y: H * 0.58, w: W * 0.24, h: H * 0.30 },
  { name: 'Reactor', x: W * 0.36, y: H * 0.60, w: W * 0.28, h: H * 0.30 },
];

// Each station maps a room to a math domain the kid practices there.
export const STATIONS: Station[] = [
  { domain: '5.NF', room: 'Fraction Lab', x: W * 0.18, y: H * 0.22 },
  { domain: '5.NBT', room: 'Decimal Bay', x: W * 0.82, y: H * 0.22 },
  { domain: '5.OA', room: 'Cafeteria', x: W * 0.50, y: H * 0.20 },
  { domain: '5.MD', room: 'Volume Storage', x: W * 0.18, y: H * 0.72 },
  { domain: '5.G', room: 'Navigation', x: W * 0.82, y: H * 0.72 },
  { domain: 'bridge', room: 'Reactor', x: W * 0.50, y: H * 0.74 },
];

export const SPAWN = { x: W * 0.50, y: H * 0.46 };
