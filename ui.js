export class GameUI {
    constructor() {
      this.elements = {
        playerSetup: document.getElementById('player-setup'),
        gameSection: document.getElementById('game-section'),
        playerDisplay: document.getElementById('player-display'),
        streak: document.getElementById('streak'),
        result: document.getElementById('result'),
        botChoice: document.getElementById('bot-choice'),
        rankingBody: document.getElementById('ranking-body')
      };
    }
  
    showGame() {
      this.elements.playerSetup.classList.add('hidden');
      this.elements.gameSection.classList.remove('hidden');
    }
  
    updatePlayerName(name) {
      this.elements.playerDisplay.textContent = name;
    }
  
    updateStreak(streak) {
      const streakElement = this.elements.streak;
      streakElement.textContent = streak;
      this.pulseElement(streakElement);
    }
  
    showResult(gameResult) {
      const { result, playerEmoji, computerEmoji } = gameResult;
      const resultElement = this.elements.result;
      
      const messages = {
        draw: `¡Empate! ${playerEmoji} vs ${computerEmoji}`,
        win: `¡Victoria! ${playerEmoji} vence a ${computerEmoji}`,
        lose: `¡Derrota! ${computerEmoji} vence a ${playerEmoji}`
      };
      
      resultElement.classList.remove('win', 'lose', 'draw');
      resultElement.classList.add(result);
      resultElement.textContent = messages[result];
      
      this.animateBotChoice(computerEmoji);
    }
  
    updateRankings(rankings, currentPlayer) {
      const tbody = this.elements.rankingBody;
      tbody.innerHTML = '';
      
      rankings.slice(0, 10).forEach((player, index) => {
        const row = tbody.insertRow();
        row.classList.add('animate-slide-up');
        row.style.animationDelay = `${index * 0.1}s`;
        
        const rankCell = row.insertCell(0);
        rankCell.textContent = index + 1;
        rankCell.className = 'rank';
        
        row.insertCell(1).textContent = player.name;
        row.insertCell(2).textContent = player.streak;
        
        if (player.name === currentPlayer) {
          row.style.background = 'rgba(99, 102, 241, 0.1)';
        }
      });
    }
  
    pulseElement(element) {
      element.classList.remove('animate-pulse');
      void element.offsetWidth;
      element.classList.add('animate-pulse');
    }
  
    animateBotChoice(emoji) {
      const botChoice = this.elements.botChoice;
      botChoice.textContent = emoji;
      this.pulseElement(botChoice);
    }
  }