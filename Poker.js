// poker.js (client-side)
const socket = io('http://localhost:3000'); // Connect to your locally running server

const lobby = document.getElementById('lobby');
const joinGameBtn = document.getElementById('joinGameBtn');
const startGameBtn = document.getElementById('startGameBtn');
const playerNameInput = document.getElementById('playerName');
const playerListDiv = document.getElementById('playerList');

const gameArea = document.getElementById('gameArea');
const communityCardsDiv = document.getElementById('communityCards');
const potDisplay = document.getElementById('potDisplay');
const playerArea = document.getElementById('playerArea');
const yourHandDiv = document.getElementById('yourHand');

const betBtn = document.getElementById('betBtn');
const checkBtn = document.getElementById('checkBtn');
const foldBtn = document.getElementById('foldBtn');

let yourHand = [];

// --- Lobby Actions ---
joinGameBtn.addEventListener('click', () => {
  const name = playerNameInput.value || "Player";
  socket.emit('joinGame', { name: name });
});

startGameBtn.addEventListener('click', () => {
  socket.emit('startGame');
});

// --- Server Event Listeners ---
socket.on('playerList', (players) => {
  playerListDiv.innerHTML = '<h3>Players:</h3>' + players.map(p => `<div>${p.name} - $${p.chips}</div>`).join('');
});

socket.on('gameState', (state) => {
  console.log('Game state update:', state);
  // Transition from lobby to game area
  lobby.style.display = 'none';
  gameArea.style.display = 'block';
  
  // Update community cards with an animated deal
  communityCardsDiv.innerHTML = '';
  state.communityCards.forEach(card => {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';
    cardDiv.innerText = card.rank + card.suit;
    communityCardsDiv.appendChild(cardDiv);
  });
  
  // Update pot
  potDisplay.innerText = 'Pot: $' + state.pot;
  
  // Update player information (names and chips)
  playerArea.innerHTML = state.players.map(p => `<div>${p.name}: $${p.chips}</div>`).join('');
});

socket.on('yourHand', (hand) => {
  yourHand = hand;
  yourHandDiv.innerHTML = '<h3>Your Hand</h3>';
  hand.forEach(card => {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';
    cardDiv.innerText = card.rank + card.suit;
    yourHandDiv.appendChild(cardDiv);
  });
});

// --- Action Buttons (Bet/Check/Fold) ---
// (These events would be handled by an expanded game engine)
betBtn.addEventListener('click', () => {
  const amount = prompt("Enter bet amount:");
  if (amount) {
    socket.emit('bet', { amount: parseInt(amount) });
  }
});

checkBtn.addEventListener('click', () => {
  socket.emit('check');
});

foldBtn.addEventListener('click', () => {
  socket.emit('fold');
});
