export module DiceConst {
    export const DICENUM = 16;
    export const GOALSCORE = Math.floor(Math.random() * (6 * DICENUM + 1 - 1 * DICENUM) + DICENUM);
}