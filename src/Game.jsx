import "./Game.css";
import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";
import { motion } from "motion/react";
import { useState, useEffect, useRef } from "react";
const useGameStore = create((set, get) => ({
  player: { hp: 500 },
  enemy: { hp: 500 },
  playerdeck: [
    { goblin: { attack: 10, defense: 3, hp: 50 } },
    { ironclad: { attack: 20, defense: 22, hp: 100 } },
    { emberlash: { attack: 25, defense: 6, hp: 70 } },
    { swiftshot: { attack: 50, defense: 30, hp: 10 } },
    { hexblade: { attack: 200, defense: 50, hp: 200 } },
    { ghoststep: { attack: 40, defense: 5 } },
    { ravanger: { attack: 100, defense: 45, hp: 50 } },
    { nightshade: { attack: 30, defense: 12, hp: 30 } },
    { stoneguard: { attack: 5, defense: 200, hp: 50 } },
    { dawnkeeper: { attack: 70, defense: 50, hp: 30 } },
  ],
  enemydeck: [
    { dreadlord: { hp: 32, attack: 50, defense: 20 } },
    { voidcaster: { hp: 40, attack: 44, defense: 40 } },
    { bonecrusher: { hp: 28, attack: 100, defense: 20 } },
    { shadowfang: { hp: 16, attack: 26, defense: 20 } },
    { plaguebringer: { hp: 22, attack: 12, defense: 10 } },
    { stonecolossus: { hp: 38, attack: 50, defense: 28 } },
    { grimreaper: { hp: 104, attack: 98, defense: 10 } },
    { frosttyrant: { hp: 24, attack: 15, defense: 18 } },
    { hellhound: { hp: 20, attack: 20, defense: 11 } },
    { souleater: { hp: 17, attack: 27, defense: 6 } },
  ],
  playerhand: new Set(),
  enemyhand: new Set(),
  enemydiscard: [],
  playerdiscard: [],
  enemycard: {},
  playercard: {},
  turn: "player",
  deck_to_hand_player: () => {
    const { playerdeck, playerhand } = get();
    if (playerhand.size < 3) {
      set((state) => {
        const newset = new Set(state.playerhand);
        newset.add(playerdeck[Math.floor(Math.random() * playerdeck.length)]);
        return { playerhand: newset };
      });
    }
  },
  deck_to_hand_enemy: () => {
    const { enemydeck, enemyhand } = get();
    if (enemyhand.size < 3) {
      set((state) => {
        const newset = new Set(state.enemyhand);
        newset.add(enemydeck[Math.floor(Math.random() * enemydeck.length)]);
        return { enemyhand: newset };
      });
    }
  },
}));
function Game() {
  const call_player = useGameStore((s) => s.deck_to_hand_player);
  const call_enemy = useGameStore((s) => s.deck_to_hand_enemy);
  const player_hand = useGameStore((s) => s.playerhand);
  const enemy_hand = useGameStore((s) => s.enemyhand);
  useEffect(() => {
    call_player();
  }, [player_hand]);
  useEffect(() => {
    call_enemy();
  }, [enemy_hand]);
  return (
    <>
      <>
        <h1>hi</h1>
      </>
    </>
  );
}
export default Game;
