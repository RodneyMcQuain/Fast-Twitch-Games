document.addEventListener("DOMContentLoaded", function() {
  let games = JSON.parse(localStorage.getItem("games"));
  if (games != null) {
    let gamesArr = games.split(",;:!");

    for (let i = 0; i < gamesArr.length; i++) {
      let game = gamesArr[i];
      let option = new Option(game, game);

      /* Don't add this option because it is the default
         and return so it doesn't make an API call */
      if (game == NO_GAMES) {
        option.id = "cb-initial-option";
        createAddAGameDiv();
        return;
      }

      cbGames.options[i] = option;
    }

    fireGameComboBoxEvent();
  }
});
