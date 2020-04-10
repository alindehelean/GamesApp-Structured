var apiURL = "https://games-world.herokuapp.com";

function getGamesList(callbackFunction){
    fetch(apiURL + "/games", {
        method: "GET",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        } // 1. De ce este nevoie aici de headers->content-type?
    }).then(function(response){
        return response.json();
    }).then(function(arrayOfGames){
        console.log(arrayOfGames);
        callbackFunction(arrayOfGames);
    });
}


function deleteGame(gameID, callbackFunction) {
    console.log(gameID);
    fetch(apiURL + "/games/" + gameID, {
        method: "DELETE"
    }).then(function(r){
        console.log(r);
        return r.text(); //3. De ce .text si nu .json?
        
    }).then(function(apiresponse){
        
        console.log(apiresponse);
        callbackFunction(apiresponse);
    });

}

function createGameRequest(gameObj, callbackCreateGame){
    fetch(apiURL + "/games", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: gameObj //4. De ce este necesar aici si body?
    }).then(function(response){
        console.log(response);
        return response.json();
    }).then(function(createdGame){
        console.log(createdGame);
        callbackCreateGame(createdGame);
    });
}


function updateGameRequest(gameid,updatedGameObj, callbackUpdateGame){
    fetch(apiURL + "/games/", + gameid,  {
        method: "PUT",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: updatedGameObj
    }).then(function(response){
        return response.json();
    }).then(function(updatedResponse){
        console.log(updatedResponse);
        callbackUpdateGame(updatedResponse);
    });
}


// "application/json"
// {"cheie": "valoare", "cheie2": "valoare2"}

//application/x-www-form-urlencoded
// cheie=valoare&cheie2=valoare2