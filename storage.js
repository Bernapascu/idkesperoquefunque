export class GameStorage {
    constructor() {
      this.PLAYER_KEY = 'playerName';
      this.RANKINGS_KEY = 'rankings';
    }
  
    getPlayerName() {
      return localStorage.getItem(this.PLAYER_KEY);
    }
  
    setPlayerName(name) {
      localStorage.setItem(this.PLAYER_KEY, name);
    }
  
    getRankings() {
      return JSON.parse(localStorage.getItem(this.RANKINGS_KEY)) || [];
    }
  
    updateRankings(playerName, streak) {
      let rankings = this.getRankings();
      const existingPlayer = rankings.find(r => r.name === playerName);
      
      if (existingPlayer) {
        existingPlayer.streak = Math.max(existingPlayer.streak, streak);
      } else {
        rankings.push({ name: playerName, streak });
      }
      
      rankings.sort((a, b) => b.streak - a.streak);
      localStorage.setItem(this.RANKINGS_KEY, JSON.stringify(rankings));
      
      return rankings;
    }
  }