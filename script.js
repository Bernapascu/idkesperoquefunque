let currentStreak = 0;
let playerName = localStorage.getItem('playerName');
let rankings = JSON.parse(localStorage.getItem('rankings')) || [];

function saveName() {
    const nameInput = document.getElementById('player-name');
    const name = nameInput.value.trim();
    
    if (name) {
        playerName = name;
        localStorage.setItem('playerName', name);
        document.getElementById('player-setup').classList.add('hidden');
        document.getElementById('game-section').classList.remove('hidden');
        document.getElementById('player-display').textContent = name;
        updateRankings();
    }
}

function updateStreak(won) {
    if (won) {
        currentStreak++;
    } else {
        updateRankings();
        currentStreak = 0;
    }
    
    const streakElement = document.getElementById('streak');
    streakElement.textContent = currentStreak;
    
    // Pulse animation on streak change
    streakElement.classList.remove('animate-pulse');
    void streakElement.offsetWidth; // Trigger reflow
    streakElement.classList.add('animate-pulse');
}

function updateRankings() {
    if (currentStreak > 0) {
        const existingPlayer = rankings.find(r => r.name === playerName);
        if (existingPlayer) {
            existingPlayer.streak = Math.max(existingPlayer.streak, currentStreak);
        } else {
            rankings.push({ name: playerName, streak: currentStreak });
        }
        
        rankings.sort((a, b) => b.streak - a.streak);
        localStorage.setItem('rankings', JSON.stringify(rankings));
        displayRankings();
    }
}

function displayRankings() {
    const tbody = document.getElementById('ranking-body');
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
        
        if (player.name === playerName) {
            row.style.background = 'rgba(99, 102, 241, 0.1)';
        }
    });
}

function animateBotChoice(emoji) {
    const botChoice = document.getElementById('bot-choice');
    botChoice.textContent = emoji;
    botChoice.classList.remove('animate-pulse');
    void botChoice.offsetWidth; // Trigger reflow
    botChoice.classList.add('animate-pulse');
}

function play(playerChoice) {
    const choices = ['rock', 'paper', 'scissors'];
    const computerChoice = choices[Math.floor(Math.random() * 3)];
    
    const result = document.getElementById('result');
    const emojis = {
        rock: '✊',
        paper: '✋',
        scissors: '✌️'
    };
    
    animateBotChoice(emojis[computerChoice]);
    
    result.classList.remove('win', 'lose', 'draw');
    
    if (playerChoice === computerChoice) {
        result.textContent = `¡Empate! ${emojis[playerChoice]} vs ${emojis[computerChoice]}`;
        result.classList.add('draw');
        updateStreak(false);
    } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        result.textContent = `¡Victoria! ${emojis[playerChoice]} vence a ${emojis[computerChoice]}`;
        result.classList.add('win');
        updateStreak(true);
    } else {
        result.textContent = `¡Derrota! ${emojis[computerChoice]} vence a ${emojis[playerChoice]}`;
        result.classList.add('lose');
        updateStreak(false);
    }
}

// Initialize the game
if (playerName) {
    document.getElementById('player-setup').classList.add('hidden');
    document.getElementById('game-section').classList.remove('hidden');
    document.getElementById('player-display').textContent = playerName;
}

displayRankings();