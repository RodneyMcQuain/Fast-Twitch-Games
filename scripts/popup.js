function apiRequest(gameName) {
  let request = new XMLHttpRequest();
  request = openRequest(request, gameName);
  request.setRequestHeader('Client-ID', API_KEY);

  request.onload = function () {
    let data = JSON.parse(this.response);

    if (request.status >= 200 && request.status < 400) {
      if (data.streams.length == 0) {
        //Called when there is no one streaming the specified game.
        createDivForNoStream();
      } else {
        for (var i = 0; i < data.streams.length; i++) {
          let divStream = createDivForStream();
          let divHover = createDivOnHover(divStream, data, i);

          let h1DisplayName = createDisplayName(data, i);
          let pTitle = createTitle(data, i);
          let pViewers = createViewers(data, i);
          let imgThumbnail = createThumbnail(data, i);
          let aStreamerUrl = createStreamerUrl(data, i);

          divStream.appendChild(imgThumbnail);
          divStream.appendChild(h1DisplayName);
          divStream.appendChild(pTitle);
          divStream.appendChild(pViewers);
          divStream.appendChild(divHover);
          aStreamerUrl.appendChild(divStream);
          divContainer.appendChild(aStreamerUrl);
        }
      }
    } else {
      let divError = document.createElement('div');
      divError.className = "noStream";
      divError.textContent = "Sorry there was an error, " + request.status;
      divContainer.appendChild(divError);
    }
  }

  request.send();
}

function openRequest(request, gameName) {
  let gameNameSplit = gameName.split(" ");
  let gameUrl = gameNameSplit.join("%20");

  request.open("GET", "https://api.twitch.tv/kraken/streams/?game=" + gameUrl, true);

  return request;
}

//Called when there is no one streaming the specified game.
function createDivForNoStream() {
  let divNoStream = document.createElement("div");
  let h1NoStream = document.createElement("h1");
  h1NoStream.className = "noStream";
  divNoStream.className = "noStream divToRemove";

  h1NoStream.textContent = "Invalid game name or no one is streaming this game";
  divNoStream.appendChild(h1NoStream);
  divContainer.appendChild(divNoStream);
}

function createDivForStream() {
  let divStream = document.createElement("div");
  divStream.className = "divToRemove";

  return divStream;
}

function createDivOnHover(divStream, data, index) {
  let divHoverParent = document.createElement("div");
  divHoverParent.className = "streamHoverParent";

  let divHoverChild = document.createElement("div");
  divHoverChild.className = "streamHoverChild";

  let title = data.streams[index].channel.status;
  divHoverChild.textContent = title;
  divHoverParent.appendChild(divHoverChild);

  addStreamHoverListeners(divStream, divHoverParent);

  return divHoverParent;
}

function addStreamHoverListeners(divStream, divHover) {
  let timer;

  divStream.addEventListener("mouseenter", function(event) {
    timer = setTimeout(function() {
      divHover.style.opacity = ".85";
      divHover.style.filter = "none";
    }, 750);
  });

  divStream.addEventListener("mouseleave", function(event) {
    clearTimeout(timer);
    divHover.style.opacity = "0";
    divHover.style.filter = "alpha(opacity = 0)";
  });
}

function createDisplayName(data, index) {
  let displayName = data.streams[index].channel.display_name;
  let h1DisplayName = document.createElement("h1");
  h1DisplayName.textContent = displayName;

  return h1DisplayName;
}

function createTitle(data, index) {
  let title = data.streams[index].channel.status;
  let pTitle = document.createElement("p");
  pTitle.textContent = title;

  return pTitle;
}

function createViewers(data, index) {
  let viewers = data.streams[index].viewers;
  let pViewers = document.createElement("p");
  pViewers.textContent = "\u00A0- " + viewers + " viewers";

  return pViewers;
}

function createThumbnail(data, index) {
  let thumbnail = data.streams[index].preview.small;
  let imgThumbnail = document.createElement("img");
  imgThumbnail.src = thumbnail;

  return imgThumbnail;
}

function createStreamerUrl(data, index) {
  let streamerUrl = data.streams[index].channel.url;
  let aStreamerUrl = document.createElement("a");
  aStreamerUrl.href = streamerUrl;
  aStreamerUrl.target = "_blank";

  return aStreamerUrl;
}
