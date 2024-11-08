export class Game {
    constructor() {
      this.choices = ['rock', 'paper', 'scissors'];
      this.emojis = {
        rock: '✊',
        paper: '✋',
        scissors: '✌️'
      };
    }
  
    play(playerChoice) {
      const computerChoice = this.getComputerChoice();
      const result = this.determineWinner(playerChoice, computerChoice);
      
      return {
        playerChoice,
        computerChoice,
        result,
        playerEmoji: this.emojis[playerChoice],
        computerEmoji: this.emojis[computerChoice]
      };
    }
  
    getComputerChoice() {
      return this.choices[Math.floor(Math.random() * this.choices.length)];
    }
  
    determineWinner(playerChoice, computerChoice) {
      if (playerChoice === computerChoice) return 'draw';
      
      const winningCombos = {
        rock: 'scissors',
        paper: 'rock',
        scissors: 'paper'
      };
      
      return winningCombos[playerChoice] === computerChoice ? 'win' : 'lose';
    }
  }