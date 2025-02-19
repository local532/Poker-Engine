<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Poker Table</title>
  <!-- Allow images from self, data URLs, and your GitHub Pages domain -->
  <meta http-equiv="Content-Security-Policy" content="default-src 'self' data:; img-src 'self' data: https://local532.github.io;">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div id="gameArea">
    <div id="pokerTable">
      <div id="communityCards"></div>
      <div id="potDisplay">Pot: $0</div>
      <div id="playerArea"></div>
    </div>
    <div id="actions">
      <button id="startHandBtn">Start Hand</button>
      <button id="dealFlopBtn">Deal Flop</button>
      <button id="dealTurnBtn">Deal Turn</button>
      <button id="dealRiverBtn">Deal River</button>
      <button id="betBtn">Bet</button>
      <button id="checkBtn">Check</button>
      <button id="foldBtn">Fold</button>
    </div>
    <div id="yourHand"></div>
  </div>

  <!-- Socket.IO client library -->
  <script src="https://cdn.socket.io/4.5.4/socket.io.min.js" crossorigin="anonymous"></script>
  <script src="table.js"></script>
</body>
</html>
