
getGamesList(function(arrayOfGames){
    for(var i = 0; i < arrayOfGames.length; i++) {
        createDomElement(arrayOfGames[i]);
    }
});

function createDomElement(gameObj){
    var container1 = document.querySelector('.container');
    const gameELement = document.createElement("div");
    gameELement.setAttribute("id", gameObj._id)
    gameELement.innerHTML = `<h1>${gameObj.title}</h1> 
                            <img src="${gameObj.imageUrl}" />
                            <p>${gameObj.description}</p> 
                            <button class="delete-btn">Delete Game</button>
                            <button class="update-btn">Edit Game</button>`; 
                        
    const updateGameElement = document.createElement("div");
    updateGameElement.innerHTML = `<form class="updateForm">
                                    <label for="gameTitle">Title *</label>
                                    <input type="text" value="" name="gameTitle" id="gameTitle"/>
                                    <label for="gameDescription">Description</label>
                                    <textarea name="gameDescription" id="gameDescription"></textarea>
                                    <label for="gameImageUrl">Image URL *</label>
                                    <input type="text" name="gameImageUrl" id="gameImageUrl"/>
                                    <button class="editBtn">Save Changes</button>
                                    <button class="cancelBtn">Cancel</button>
                                  </form>`;

    container1.appendChild(gameELement);

    function clone() {
        const copiedGameTitle = gameELement.childNodes[0].innerText; 
        const copiedGameDescription = gameELement.childNodes[4].innerText;
        const copiedGameUrl = gameELement.childNodes[2].getAttribute("src");
        //console.log(copiedGameUrl);
        //console.log(copiedGameDescription);
        //console.log(copiedGameTitle);
        const newGameTitle = updateGameElement.childNodes[0][0]; 
        newGameTitle.value += copiedGameTitle; 
        const newGameDescription = updateGameElement.childNodes[0][1];
        newGameDescription.value += copiedGameDescription;
        const newImageUrl = updateGameElement.childNodes[0][2];
        newImageUrl.value += copiedGameUrl;
    }
    
    document.getElementById(`${gameObj._id}`).addEventListener("click", function(event){
        console.log(event.target);
        if(event.target.classList.contains('delete-btn')){
            deleteGame(gameELement.getAttribute("id"), function(apiResponse){
                console.log(event.target);
            console.log(apiResponse);
            removeDeletedElementFromDOM(event.target.parentElement);
            })
        } else if(event.target.classList.contains('update-btn')){
            gameELement.appendChild(updateGameElement);
            clone();
            //console.log('ceva');
            //console.log(updateGameElement);
        } else if(event.target.classList.contains('cancelBtn')){
            removeDeletedElementFromDOM(updateGameElement);
        } else if(event.target.classList.contains('editBtn')){
            event.preventDefault();
    
        const updatedGameTitle = updateGameElement.querySelector('#gameTitle').value;
        const updatedGameDescription = updateGameElement.querySelector('#gameDescription').value;
        const updatedGameImage = updateGameElement.querySelector('#gameImageUrl').value;
        
        function editedDom(){
        gameELement.querySelector('h1').innerHTML = updatedGameTitle;
        gameELement.querySelector('p').innerHTML = updatedGameDescription;
        gameELement.querySelector('img').src = updatedGameImage;
        }
    
        var urlEncoded = new URLSearchParams();
        urlEncoded.append("title", updatedGameTitle);
        urlEncoded.append("description", updatedGameDescription);
        urlEncoded.append("imageUrl", updatedGameImage);
         
            updateGameRequest(gameELement.getAttribute("id"), urlEncoded,editedDom);  
            //container1.removeChild(container1.lastChild);
            removeDeletedElementFromDOM(updateGameElement); 

        }
    });
}


function removeDeletedElementFromDOM(domElement){
    domElement.remove();
}

function validateFormElement(inputElement, errorMessage){
    if(inputElement.value === "") {
        if(!document.querySelector('[rel="' + inputElement.id + '"]')){
            buildErrorMessage(inputElement, errorMessage);
        }
    } else {
        if(document.querySelector('[rel="' + inputElement.id + '"]')){
            console.log("the error is erased!");
            document.querySelector('[rel="' + inputElement.id + '"]').remove();
            inputElement.classList.remove("inputError");
        }
    }
}

function validateReleaseTimestampElement(inputElement, errorMessage){
    if(isNaN(inputElement.value) && inputElement.value !== "") {
        buildErrorMessage(inputElement, errorMessage);
    }
}

function buildErrorMessage(inputEl, errosMsg){
    inputEl.classList.add("inputError");
    const errorMsgElement = document.createElement("span");
    errorMsgElement.setAttribute("rel", inputEl.id);
    errorMsgElement.classList.add("errorMsg");
    errorMsgElement.innerHTML = errosMsg;c
    inputEl.after(errorMsgElement);
}


document.querySelector(".submitBtn").addEventListener("click", function(event){
    event.preventDefault();

    const gameTitle = document.getElementById("gameTitle");
    const gameDescription = document.getElementById("gameDescription");
    const gameGenre = document.getElementById("gameGenre");
    const gamePublisher = document.getElementById("gamePublisher");
    const gameImageUrl = document.getElementById("gameImageUrl");
    const gameRelease = document.getElementById("gameRelease");

    validateFormElement(gameTitle, "The title is required!");
    validateFormElement(gameGenre, "The genre is required!");
    validateFormElement(gameImageUrl, "The image URL is required!");
    validateFormElement(gameRelease, "The release date is required!");

    validateReleaseTimestampElement(gameRelease, "The release date you provided is not a valid timestamp!");

    if(gameTitle.value !== "" && gameGenre.value !== "" && gameImageUrl.value !== "" && gameRelease.value !== "") {
        var urlencoded = new URLSearchParams();
        urlencoded.append("title", gameTitle.value);
        urlencoded.append("releaseDate", gameRelease.value);
        urlencoded.append("genre", gameGenre.value);
        urlencoded.append("publisher", gamePublisher.value);
        urlencoded.append("imageUrl", gameImageUrl.value);
        urlencoded.append("description", gameDescription.value);

        createGameRequest(urlencoded, createDomElement);
    }
})
