import { update, load } from '../data/progress';

// ---------------------------------------------------------------------------
// Coins + cosmetic rewards. Kids earn coins for correct answers and streaks,
// then unlock fun cosmetics. Purely client-side, saved in localStorage.
// ---------------------------------------------------------------------------

export interface Reward {
  id: string;
  emoji: string;
  name: string;
  cost: number;
}

export const REWARDS: Reward[] = [
  { id: 'hat-party', emoji: '🎉', name: 'Party Hat', cost: 30 },
  { id: 'hat-crown', emoji: '👑', name: 'Crown', cost: 60 },
  { id: 'pet-dog', emoji: '🐶', name: 'Pet Pup', cost: 50 },
  { id: 'pet-alien', emoji: '👽', name: 'Pet Alien', cost: 80 },
  { id: 'hat-wizard', emoji: '🧙', name: 'Wizard Hat', cost: 100 },
  { id: 'skin-gold', emoji: '⭐', name: 'Gold Star Badge', cost: 120 },
  { id: 'pet-rocket', emoji: '🚀', name: 'Mini Rocket', cost: 150 },
  { id: 'hat-rainbow', emoji: '🌈', name: 'Rainbow Topper', cost: 200 },
];

export const COIN_CORRECT = 5;
export const COIN_STREAK_BONUS = 3; // per item once streak >= 3
export const COIN_TASK_COMPLETE = 15;

// Award coins for a single answer and update the streak. Returns coins gained.
export function awardForAnswer(correct: boolean): number {
  let gained = 0;
  update((d) => {
    if (correct) {
      d.streak += 1;
      gained = COIN_CORRECT + (d.streak >= 3 ? COIN_STREAK_BONUS : 0);
      d.coins += gained;
    } else {
      d.streak = 0;
    }
  });
  return gained;
}

export function awardTaskComplete(): number {
  update((d) => {
    d.coins += COIN_TASK_COMPLETE;
  });
  return COIN_TASK_COMPLETE;
}

export function canAfford(reward: Reward): boolean {
  return load().coins >= reward.cost && !load().unlocks.includes(reward.id);
}

export function buy(reward: Reward): boolean {
  const d = load();
  if (d.coins < reward.cost || d.unlocks.includes(reward.id)) return false;
  update((s) => {
    s.coins -= reward.cost;
    s.unlocks.push(reward.id);
  });
  return true;
}
