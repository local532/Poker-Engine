// table.js
const socket = io('http://localhost:3000'); // Connect to your local Node.js server
const urlParams = new URLSearchParams(window.location.search);
const gameId = urlParams.get('gameId');
const playerRole = urlParams.get('playerRole');

const communityCardsDiv = document.getElementById('communityCards');
const potDisplay = document.getElementById('potDisplay');
const playerArea = document.getElementById('playerArea');
const yourHandDiv = document.getElementById('yourHand');

const startHandBtn = document.getElementById('startHandBtn');
const dealFlopBtn = document.getElementById('dealFlopBtn');
const dealTurnBtn = document.getElementById('dealTurnBtn');
const dealRiverBtn = document.getElementById('dealRiverBtn');
const betBtn = document.getElementById('betBtn');
const checkBtn = document.getElementById('checkBtn');
const foldBtn = document.getElementById('foldBtn');

startHandBtn.addEventListener('click', () => {
  socket.emit('startHand', { gameId });
});
dealFlopBtn.addEventListener('click', () => {
  socket.emit('dealFlop', { gameId });
});
dealTurnBtn.addEventListener('click', () => {
  socket.emit('dealTurn', { gameId });
});
dealRiverBtn.addEventListener('click', () => {
  socket.emit('dealRiver', { gameId });
});
betBtn.addEventListener('click', () => {
  const amount = parseInt(prompt("Enter bet amount:"));
  if (!isNaN(amount)) {
    socket.emit('bet', { gameId, amount });
  }
});
checkBtn.addEventListener('click', () => {
  socket.emit('check', { gameId });
});
foldBtn.addEventListener('click', () => {
  socket.emit('fold', { gameId });
});

socket.on('gameState', (state) => {
  // Update community cards with animations
  communityCardsDiv.innerHTML = '';
  state.communityCards.forEach(card => {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';
    cardDiv.innerText = card.rank + card.suit;
    communityCardsDiv.appendChild(cardDiv);
  });
  potDisplay.innerText = 'Pot: $' + state.pot;
  // Update players area
  playerArea.innerHTML = '';
  state.players.forEach(player => {
    const pDiv = document.createElement('div');
    pDiv.className = 'playerInfo';
    pDiv.innerText = `${player.name}: $${player.chips} ${player.status === 'folded' ? '(Folded)' : ''}`;
    playerArea.appendChild(pDiv);
  });
});

socket.on('yourHand', (hand) => {
  yourHandDiv.innerHTML = '<h3>Your Hand</h3>';
  hand.forEach(card => {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';
    cardDiv.innerText = card.rank + card.suit;
    yourHandDiv.appendChild(cardDiv);
  });
});

socket.on('errorMessage', (msg) => {
  alert(msg);
});
