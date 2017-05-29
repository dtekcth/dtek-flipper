/*
    This file is part of dtek-flipper.

    dtek-flipper is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    dtek-flipper is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with dtek-flipper.  If not, see <http://www.gnu.org/licenses/>.
*/

'use strict';

var loginBtn = document.getElementById('login');
var gameArea = document.getElementById('games');
var loggedIn = document.getElementById('logged-in');
var loggedOut = document.getElementById('logged-out');
var cost = '2.50'; // Must be a string to properly display decimals.
var gameConfirmUrl = '#letsPlay='; // TODO

document.getElementById('cost').innerText = cost;

loggedOut.style.setProperty('display', 'block');

loginBtn.onclick = function() {
    loggedOut.style.setProperty('display', 'none');
    loggedIn.style.setProperty('display', 'block');
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                console.log('WOOP WOOP!');
                gameArea.innerHTML = '<button id="game-1">Junk Yard</button>';
            } else {
                console.log('STATUS:', httpRequest.status);
                gameArea.innerHTML = '<button id="game-1">Junk Yard</button>';
            }
            var games = gameArea.getElementsByTagName('button');
            console.log(games);
            var preformattedFunction = function() {
                areYouSure(this.textContent, gameConfirmUrl + this.id);
            }
            for(var i = 0, ii = games.length; i < ii; i++) {
                games[i].onclick = preformattedFunction;
            }
        }
    };
    httpRequest.open('GET', 'fetch-servers', true);
    httpRequest.send();
};

function areYouSure(gameName, confirmUrl) {
    console.log(gameName, confirmUrl);
    if(window.confirm('Do you really want to play "' + gameName + '"? It will cost you '+cost+'kr.')) {
        var httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = function() {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 200) {
                    // TODO: visual confirmation!
                    console.log('Game paid!');
                } else {
                    console.log('STATUS:', httpRequest.status);
                }
            }
        };
        httpRequest.open('GET', confirmUrl, true);
        httpRequest.send();
    }
}
