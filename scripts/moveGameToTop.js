let btnGameToTop = document.getElementById("btn-game-to-top");

btnGameToTop.addEventListener('click', function() {
  let thisIndex = cbGames.selectedIndex
  let optSelectedGame = cbGames[thisIndex];

  //Remove the selected game and add it back at the top of the options
  cbGames.removeChild(optSelectedGame);
  cbGames.insertBefore(optSelectedGame, cbGames.firstChild);

  setGameComboBoxLocalStorage();
});
