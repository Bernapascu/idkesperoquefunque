import { Game } from './modules/game.js';
import { GameStorage } from './modules/storage.js';
import { GameUI } from './modules/ui.js';

class RPSGame {
  constructor() {
    this.game = new Game();
    this.storage = new GameStorage();
    this.ui = new GameUI();
    this.currentStreak = 0;
    this.playerName = this.storage.getPlayerName();
    
    this.init();
    this.bindEvents();
  }

  init() {
    if (this.playerName) {
      this.ui.showGame();
      this.ui.updatePlayerName(this.playerName);
      this.ui.updateRankings(this.storage.getRankings(), this.playerName);
    }
  }

  bindEvents() {
    document.querySelectorAll('.choice').forEach(button => {
      button.addEventListener('click', (e) => {
        const choice = e.target.getAttribute('data-choice');
        if (choice) this.handlePlay(choice);
      });
    });

    const nameButton = document.querySelector('#start-button');
    if (nameButton) {
      nameButton.addEventListener('click', () => this.handleNameSubmit());
    }
  }

  handleNameSubmit() {
    const nameInput = document.querySelector('#player-name');
    const name = nameInput.value.trim();
    
    if (name) {
      this.playerName = name;
      this.storage.setPlayerName(name);
      this.ui.showGame();
      this.ui.updatePlayerName(name);
      this.ui.updateRankings(this.storage.getRankings(), name);
    }
  }

  handlePlay(choice) {
    const gameResult = this.game.play(choice);
    this.ui.showResult(gameResult);
    
    if (gameResult.result === 'win') {
      this.currentStreak++;
    } else {
      if (this.currentStreak > 0) {
        this.storage.updateRankings(this.playerName, this.currentStreak);
        this.ui.updateRankings(this.storage.getRankings(), this.playerName);
      }
      this.currentStreak = 0;
    }
    
    this.ui.updateStreak(this.currentStreak);
  }
}

// Initialize the game
window.addEventListener('DOMContentLoaded', () => {
  new RPSGame();
});