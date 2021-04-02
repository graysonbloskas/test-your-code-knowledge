window.onload = function() {
    displayScores();
    
}
function displayScores() {
    var initials = JSON.parse(window.localStorage.getItem('userInitials'));
    if (!initials) {
        return;
    }
    console.log(initials);
    
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
function clearScores() {
    var usersClass = document.querySelector('#users');
    usersClass.innerHTML = '';
    window.localStorage.clear();

}