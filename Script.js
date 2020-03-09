const zetels = 15;
let partiesShown = "none";
let currentQuestion = 0;
let votes = [];
let weight = [];
let txt = ["Terug", "Sla deze vraag over", "Eens", "Geen van beide", "Oneens"];

function createElement(elementType, appendTo, id, innerText, Class) {
    let element = document.createElement(elementType);
    document.getElementById(appendTo).appendChild(element);
    element.id = id;
    if (innerText) {
        element.innerText = innerText;
    }
    if (Class) {
        element.className = Class;
    }
}

document.getElementById("startButton").onclick = function () {
    this.style.display = "none";
    document.getElementById("startMenu").style.display = "none";
    document.getElementById("container").style.display = "block";
    document.getElementById("title").innerHTML = subjects[0].title;
    document.getElementById("statement").innerHTML = subjects[0].statement;
    for (let i = 0; i < 5; i++) {
        createElement("button", "BTNcontainer", "btn" + i, txt[i], null);
        document.getElementById("btn0").innerHTML = "";
        document.getElementById("btn0").style.backgroundImage = "url(images/arrow.png)";
        if (i <= 4 && i >= 1) {
            document.getElementById("btn" + i).onclick = function () {
                onclickBTNsetup()
            };

            function onclickBTNsetup() {
                for (let a = 1; a < 5; a++) {
                    if (votes[currentQuestion == null]) {
                        votes.push(txt[a])
                    } else {
                        votes[currentQuestion] = txt[i];
                    }
                }
                currentQuestion++;
                if (currentQuestion >= subjects.length) {
                    showQ();
                } else {
                    document.getElementById("title").innerHTML = subjects[currentQuestion].title;
                    document.getElementById("statement").innerHTML = subjects[currentQuestion].statement;
                }
            }
        } else if (i === 0) {
            document.getElementById("btn" + i).onclick = function () {
                if (currentQuestion > 0) {
                    currentQuestion--;
                    document.getElementById("title").innerHTML = subjects[currentQuestion].title;
                    document.getElementById("statement").innerHTML = subjects[currentQuestion].statement;
                } else if (currentQuestion === 0) {
                    document.getElementById("startButton").style.display = "block";
                    document.getElementById("startMenu").style.display = "inline-block";
                    document.getElementById("voteContainer").style.display = "none";
                }
            }
        }
    }
    document.getElementById("startButton").onclick = function () {
        document.getElementById("voteContainer").style.display = "block";
        document.getElementById("startButton").style.display = "none";
        document.getElementById("startMenu").style.display = "none";
    }
};

function showQ() {
    document.getElementById("title").innerHTML = "Zijn er onderwerpen die u extra belangrijkt vindt?";
    document.getElementById("statement").innerHTML = "Aangevinkte sellingen tellen extra mee bij het berekenen van het resultaat.";
    for (let i = 0; i < subjects.length; i++) {
        weight.push(1);
        createElement("P", "feedbackContainer", "Question " + i, subjects[i].title, "Qtitle");
        createElement("IMG", "feedbackContainer", "Toggle " + i, false, "Qbox");
        var element = document.getElementById("Toggle " + i);
        element.src = "images/box.png";
        element.onclick = function () {
            changeOnclickBox(i)
        };
    }
    document.getElementById("BTNcontainer").style.display = "none";
    createElement("BUTTON", "voteContainer", "NextButton", "Volgende", "Qbox");
    document.getElementById("NextButton").onclick = function () {partiesPickList()};
}

function changeOnclickBox(i) {
    document.getElementById("Toggle " + i).src = "images/checkmark.png";
    document.getElementById("Toggle " + i).onclick = function () {
        changeOnclickCheckmark(i)
    };
    weight[i] = 2;
}

function changeOnclickCheckmark(i) {
    document.getElementById("Toggle " + i).src = "images/box.png";
    document.getElementById("Toggle " + i).onclick = function () {
        changeOnclickBox(i)
    };
    weight[i] = 1;
}

function partiesPickList() {
    document.getElementById("feedbackContainer").style.display = "none";
    document.getElementById("title").innerHTML = "Welke partijen wilt u meenemen in het resultaat?";
    document.getElementById("statement").innerHTML = "U kunt kiezen voor grote partijen(deze hebben minimaal " + zetels + "). Ook kunt u kiezen of u alleen seculiere partijen wilt zien.";
    document.getElementById("NextButton").onclick = function () {showList()};
    createElement("BUTTON", "voteContainer", "btnPartiesHuge", "grote partijen", "btnPartiesHuge");
    document.getElementById("btnPartiesHuge").onclick = function (){
        partiesShown = "BigParties"
    };
    createElement("BUTTON", "voteContainer", "btnPartiesSmall", "seculiere partijen", "btnPartiesSmall");
    document.getElementById("btnPartiesSmall").onclick = function (){
        partiesShown = "SecunParties"
    };
}
//"Eens", "Geen van beide", "Oneens"
function showList() {
    let scores = [{"VVD":0, "CDA":0, "PVV":0, "D66":0, "GroenLinks":0, "SP":0, "PvdA":0, "ChristenUnie":0, "Partij voor de Dieren":0, "SGP":0, "DENK":0, "Forum voor Democratie":0, "Lokaal in de Kamer":0, "OndernemersPartij":0, "VNL":0, "Nieuwe Wegen":0, "De Burger Beweging":0, "Piratenpartij":0, "Artikel 1":0, "Libertarische Partij":0, "50Plus":0, "Vrijzinnige Partij":0, "Niet Stemmers":0}];
    console.log(scores);
    document.getElementById("title").innerHTML = "Hier ziet u de partijen die passen bij uw keuzes";
    document.getElementById("statement").style.display = "none";
    document.getElementById("btnPartiesHuge").style.display = "none";
    document.getElementById("btnPartiesSmall").style.display = "none";
    if(partiesShown === "none"){
        for (var i=0; i<subjects.length; i++){
            if(votes[i] === txt[2]){
                for(var a=0; a<parties.length; a++){
                    console.log(subjects[0].parties[0].position);
                    if(subjects[0].parties[0].position === "pro"){
                        scores[subjects[0].parties[0].name]++;
                    }
                }
                console.log(subjects[i].parties[a]);
            }else if(votes[i] === txt[3]){

            }else if(votes[i] === txt[4]){

            }
        }
    }else if(partiesShown === "BigParties"){

    }else if(partiesShown === "SecunParties"){

    }
}