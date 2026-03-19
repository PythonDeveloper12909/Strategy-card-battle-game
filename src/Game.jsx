import "./Game.css";
import { create } from "zustand";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
const useGamestore = create((set, get) => ({
  player: { hp: 500 },
  enemy: { hp: 500 },
  playerdeck: [],
  enemydeck: [],
  playerhand: [],
  enemyhand: [],
  enemydiscard: [],
  playerdiscard: [],
  enemycard: {},
  playercard: { goblin: { attack: 10, defense: 3 } },
  turn: "player",
  adding_cards_to_deck: () => {
    const { playercard, playerdeck } = get();
    set((state) => ({
      playerdeck: [...state.playerdeck, playercard],
    }));
  },
}));
function Game() {
  const call = useGamestore((s) => s.adding_cards_to_deck);
  console.log(call);
}
export default Game;
