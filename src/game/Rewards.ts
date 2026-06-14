import { update, load } from '../data/progress';

// ---------------------------------------------------------------------------
// Coins + cosmetic rewards. Kids earn coins for correct answers and streaks,
// then unlock cosmetics that VISIBLY appear on their crewmate (hats float on
// the head, pets follow behind, the badge stars their name).
// ---------------------------------------------------------------------------

export type RewardKind = 'hat' | 'pet' | 'badge';

export interface Reward {
  id: string;
  emoji: string;
  name: string;
  cost: number;
  kind: RewardKind;
}

export const REWARDS: Reward[] = [
  { id: 'hat-party', emoji: '🎉', name: 'Party Hat', cost: 30, kind: 'hat' },
  { id: 'pet-dog', emoji: '🐶', name: 'Pet Pup', cost: 50, kind: 'pet' },
  { id: 'hat-crown', emoji: '👑', name: 'Crown', cost: 60, kind: 'hat' },
  { id: 'pet-alien', emoji: '👽', name: 'Pet Alien', cost: 80, kind: 'pet' },
  { id: 'hat-wizard', emoji: '🧙', name: 'Wizard Hat', cost: 100, kind: 'hat' },
  { id: 'skin-gold', emoji: '⭐', name: 'Gold Star Badge', cost: 120, kind: 'badge' },
  { id: 'pet-rocket', emoji: '🚀', name: 'Mini Rocket', cost: 150, kind: 'pet' },
  { id: 'hat-rainbow', emoji: '🌈', name: 'Rainbow Topper', cost: 200, kind: 'hat' },
];

export const COIN_CORRECT = 5;
export const COIN_STREAK_BONUS = 3; // per item once streak >= 3
export const COIN_TASK_COMPLETE = 15;

export function rewardById(id: string | null): Reward | undefined {
  return REWARDS.find((r) => r.id === id);
}

export function equippedHatEmoji(): string | null {
  return rewardById(load().equippedHat)?.emoji ?? null;
}

export function equippedPetEmoji(): string | null {
  return rewardById(load().equippedPet)?.emoji ?? null;
}

export function hasBadge(): boolean {
  return load().unlocks.includes('skin-gold');
}

// Equip a cosmetic the kid owns (hats and pets; badge is always-on once owned).
export function equip(reward: Reward): void {
  update((d) => {
    if (!d.unlocks.includes(reward.id)) return;
    if (reward.kind === 'hat') d.equippedHat = d.equippedHat === reward.id ? null : reward.id;
    if (reward.kind === 'pet') d.equippedPet = d.equippedPet === reward.id ? null : reward.id;
  });
}

// Grant a reward (purchase already validated or free unlock) and auto-equip it.
export function grant(reward: Reward): void {
  update((d) => {
    if (!d.unlocks.includes(reward.id)) d.unlocks.push(reward.id);
    if (reward.kind === 'hat') d.equippedHat = reward.id;
    if (reward.kind === 'pet') d.equippedPet = reward.id;
  });
}

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

export function buy(reward: Reward): boolean {
  const d = load();
  if (d.coins < reward.cost || d.unlocks.includes(reward.id)) return false;
  update((s) => {
    s.coins -= reward.cost;
  });
  grant(reward);
  return true;
}
