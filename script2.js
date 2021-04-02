// on load, this displays scores method
window.onload = function() {
    displayScores();
    
}
// gets the initials and scores from local storage and if there are no initials, it returns out of the function. 
// then if it has data, then we iterate through those users and we display their names and scores in the dom. 
function displayScores() {
    var initials = JSON.parse(window.localStorage.getItem('userInitials'));
    if (!initials) {
        return;
    }
    initials.forEach(user => {
        var _users = document.querySelector('#users');
        var userP = document.createElement('p');
        var scoreP = document.createElement('p');
        userP.textContent = user.userInitials;
        scoreP.textContent = user.userScore;
        users.append(userP);
        users.append(scoreP);

        return _users;
    });
    
}
// this removes scores from the dom, and clears local storage.
function clearScores() {
    var usersClass = document.querySelector('#users');
    usersClass.innerHTML = '';
    window.localStorage.clear();

}
// this, onclick, routes back to home screen/start screen. 
function routeHome() {
    window.location.href = 'index.html'; 
}