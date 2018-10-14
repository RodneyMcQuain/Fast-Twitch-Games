let btnGameToAdd = document.getElementById("btn-game-to-add");

btnGameToAdd.addEventListener("click", function() {
  let tfGameToAdd = document.getElementById("tf-game-to-add");
  let gameToAdd = tfGameToAdd.value;
  let status = document.getElementById("status-game-to-add");

  //currently no way to access API to check for valid game???
  let option = cbGames.querySelector('[value="' + gameToAdd + '"]');
  if (option == null) {
    checkInitialOption();

    let cbGamesLength = cbGames.options.length;
    let newOption = createGameOption(cbGamesLength, gameToAdd);

    setSuccessfulSatus(status);
    tfGameToAdd.value = "";

    cbGames.options[cbGamesLength].selected = true;
    fireGameComboBoxEvent();

    setGameComboBoxLocalStorage();
  } else {
    setFailureStatus(status);
  }

  status.classList.remove("disappear");
  setStatusTimeout(status);
});

function checkInitialOption() {
  let initialOption = document.getElementById("cb-initial-option");
  if (initialOption != null)
    cbGames.removeChild(initialOption);
}

function createGameOption(cbGamesLength, gameToAdd) {
  let newOption = new Option(gameToAdd, gameToAdd);
  cbGames.options[cbGamesLength] = newOption;

  return newOption;
}

function setSuccessfulSatus(status) {
  status.textContent = "Successful";
  status.style.color = "green";
}

function setFailureStatus(status) {
  status.textContent = "Duplicate, Nothing Added";
  status.style.color = "red";
}

function setStatusTimeout(status) {
  setTimeout(function() {
    status.className = "disappear";
  }, 3000);

  setTimeout(function() {
    status.innerHTML = "";
  }, 3150);
}
