// lobby.js
const socket = io('http://localhost:3000'); // Connect to your local Node.js server

const hostGameBtn = document.getElementById('hostGameBtn');
const hostNameInput = document.getElementById('hostName');
const gameNameInput = document.getElementById('gameName');
const playerNameInput = document.getElementById('playerName');
const gameListDiv = document.getElementById('gameList');

hostGameBtn.addEventListener('click', () => {
  const hostName = hostNameInput.value || "Host";
  const gameName = gameNameInput.value || "Untitled Game";
  socket.emit('hostGame', { gameName, playerName: hostName });
});

socket.on('hostedGame', (data) => {
  // Redirect the host to the game table page
  window.location.href = 'table.html?gameId=' + data.gameId + '&playerRole=host';
});

socket.on('gameList', (games) => {
  // Render the list of join-able games
  gameListDiv.innerHTML = '';
  games.forEach(game => {
    const gameItem = document.createElement('div');
    gameItem.className = 'gameItem';
    gameItem.innerHTML = `<strong>${game.name}</strong> - ${game.players} players ${game.inHand ? '(Hand in progress)' : ''}`;
    gameItem.addEventListener('click', () => {
      const playerName = playerNameInput.value || "Player";
      socket.emit('joinGame', { gameId: game.id, playerName });
      window.location.href = 'table.html?gameId=' + game.id + '&playerRole=player';
    });
    gameListDiv.appendChild(gameItem);
  });
});

socket.on('errorMessage', (msg) => {
  alert(msg);
});
