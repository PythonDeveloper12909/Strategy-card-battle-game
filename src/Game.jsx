import "./Game.css";
import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";
import { DOMVisualElement, motion } from "motion/react";
import { useState, useEffect, useRef } from "react";
import goblinimg from "./assets/goblin_new.png";
import ironclad from "./assets/ironclad_new.png";
import emberlash from "./assets/emberlash_new.png";
import swiftshot from "./assets/swiftshot.png";
import hexblade from "./assets/hexblade.png";
import ghoststep from "./assets/ghoststep.png";
import ravanger from "./assets/ravanger.png";
import nightshade from "./assets/nightshade.png";
import stoneguard from "./assets/stoneguard.png";
import dawnkeeper from "./assets/dawnkeeper.png";
const useGameStore = create((set, get) => ({
  player: { hp: 500 },
  enemy: { hp: 500 },
  playerdeck: [
    { goblin: { attack: 10, defense: 3, hp: 50, img: goblinimg } },
    { ironclad: { attack: 20, defense: 22, hp: 100, img: ironclad } },
    { emberlash: { attack: 25, defense: 6, hp: 70, img: emberlash } },
    { swiftshot: { attack: 50, defense: 30, hp: 10, img: swiftshot } },
    { hexblade: { attack: 200, defense: 50, hp: 200, img: hexblade } },
    { ghoststep: { attack: 40, defense: 5, hp: 50, img: ghoststep } },
    { ravanger: { attack: 100, defense: 45, hp: 50, img: ravanger } },
    { nightshade: { attack: 30, defense: 12, hp: 30, img: nightshade } },
    { stoneguard: { attack: 5, defense: 200, hp: 50, img: stoneguard } },
    { dawnkeeper: { attack: 70, defense: 50, hp: 30, img: dawnkeeper } },
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
  playerhand: [],
  enemyhand: [],
  enemydiscard: [],
  playerdiscard: [],
  enemycard: {},
  playercard: {},
  turn: "player",
  deck_to_hand_player: () => {
    const { playerdeck, playerhand } = get();
    const randomchar = Math.floor(Math.random() * playerdeck.length);
    if (playerhand.length < 3) {
      set((state) => ({
        playerhand: state.playerhand.some(
          (e) => Object.keys(e)[0] === Object.keys(playerdeck[randomchar])[0],
        )
          ? state.playerhand.filter(
              (e) => Object.keys(e)[0] !== Object.keys(e)[randomchar],
            )
          : [...state.playerhand, playerdeck[randomchar]],
      }));
    }
  },
  deck_to_hand_enemy: () => {
    const { enemydeck, enemyhand } = get();
    const randomchar = Math.floor(Math.random() * enemydeck.length);
    if (enemyhand.length < 3) {
      set((state) => ({
        enemyhand: state.enemyhand.some(
          (e) => Object.keys(e)[0] === Object.keys(enemydeck[randomchar])[0],
        )
          ? state.enemyhand.filter(
              (e) => Object.keys(e)[0] !== Object.keys(e)[randomchar],
            )
          : [...state.enemyhand, enemydeck[randomchar]],
      }));
    }
  },
}));
function Game() {
  const call_player = useGameStore((s) => s.deck_to_hand_player);
  const call_enemy = useGameStore((s) => s.deck_to_hand_enemy);
  const player_hand = useGameStore((s) => s.playerhand);
  const enemy_hand = useGameStore((s) => s.enemyhand);
  const player_deck = useGameStore((s) => s.playerdeck);
  const enemy_deck = useGameStore((s) => s.enemydeck);
  useEffect(() => {
    call_player();
  }, [player_hand]);
  useEffect(() => {
    call_enemy();
  }, [enemy_hand]);

  return (
    <>
      <div className="flex items-end gap-5">
        <div>
          {player_hand.map((e) => (
            <>
              <div className="card w-50 border-amber-500 flex flex-col items-center border-5">
                <img src={e[Object.keys(e)[0]].img} className="w-60 h-31" />
                <h1 className="text-amber-200 text-3xl bg-yellow-700 text-center rounded-xl">
                  {Object.keys(e)[0].toLocaleUpperCase()}
                </h1>
                <div className="bg-yellow-100 w-40 flex items-center flex-col">
                  <h2 className="text-stone-900 text-3xl w-fit">
                    ATK: {e[Object.keys(e)[0]].attack}
                  </h2>
                  <h2 className="text-stone-900 text-3xl w-fit">
                    DEF: {e[Object.keys(e)[0]].defense}
                  </h2>
                </div>
              </div>
            </>
          ))}
        </div>
        <div className="card_deck w-50 border-amber-500 flex items-center flex-col justify-center border-5 text-5xl h-61 ">
          ⭐
        </div>
      </div>
    </>
  );
}
export default Game;
