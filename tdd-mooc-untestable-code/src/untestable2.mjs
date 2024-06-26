// * At the very least invariants has to be tested for diceRoll
export function diceRoll() {
  const min = 1;
  const max = 6;
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

// * diceHandValue includes randomness by directly assigning the result of diceRoll to its variables which makes it untestable
// TODO: Move die1 and die2 to be parameters of diceHandValue DONE
export function diceHandValue(die1, die2) {
  if (die1 === die2) {
    // one pair
    return 100 + die1;
  } else {
    // high die
    return Math.max(die1, die2);
  }
}
