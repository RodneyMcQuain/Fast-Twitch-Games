let cbGames = document.getElementById("cb-game-to-add");
const NO_GAMES = "No Games to Show";

cbGames.addEventListener("change", function() {
  removeAllByClass();

  let gameName = cbGames.options[cbGames.selectedIndex].value;
  if (gameName != NO_GAMES);
  apiRequest(gameName);
});

function fireGameComboBoxEvent() {
  let changeEvent = new Event('change');
  cbGames.dispatchEvent(changeEvent);
}

function setGameComboBoxLocalStorage() {
  let toStore = [];
  let options = cbGames.options;
  for (let i = 0; i < options.length; i++)
    toStore.push(options[i].value);

  let toStoreString = toStore.join(",;:!");
  localStorage.setItem('games', JSON.stringify(toStoreString));
}

function removeAllByClass() {
  let elements = document.getElementsByClassName("divToRemove");

  while (elements[0])
    elements[0].parentNode.removeChild(elements[0]);
}

function createAddAGameDiv() {
  let divNoStream = document.createElement("div");
  let h1NoStream = document.createElement("h1");
  h1NoStream.className = "noStream";
  divNoStream.className = "noStream divToRemove";

  h1NoStream.textContent = "Add A Game!";
  divNoStream.appendChild(h1NoStream);
  divContainer.appendChild(divNoStream);
}
