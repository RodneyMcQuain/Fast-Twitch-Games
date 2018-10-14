let btnGameToRemove = document.getElementById("btn-game-to-remove");

btnGameToRemove.addEventListener("click", function() {
  removeSelectedGame();

  /* If cb is empty add default no game text and
  and return so it doesn't make an API call */
  let cbGamesLength = cbGames.options.length;
  if (cbGamesLength == 0) {
    createNoGameOption(cbGamesLength);
    createAddAGameDiv();
  } else
    fireGameComboBoxEvent();

    setGameComboBoxLocalStorage();
});

function removeSelectedGame() {
  let thisIndex = cbGames.selectedIndex
  cbGames.removeChild(cbGames[thisIndex]);
  removeAllByClass();
}

function createNoGameOption(cbGamesLength) {
  let newOption =  new Option(NO_GAMES, NO_GAMES);
  newOption.id = "cb-initial-option";
  cbGames.options[cbGamesLength] = newOption;
}
