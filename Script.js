const zetels = 15;
let partiesShown = "none";
let currentQuestion = 0;
let votes = [];
let weight = [];
let txt = ["terug", "skip", "pro", "none", "contra"];
let txtBTN = ["terug", "Sla deze vraag over", "Eens", "Geen mening", "Oneens"];
//this holds the end scores
let person = {'VVD':0, 'CDA':0, 'PVV':0, 'D66':0, 'GroenLinks':0, 'SP':0, 'PvdA':0, 'ChristenUnie':0, 'Partij voor de Dieren':0, 'SGP':0, 'DENK':0, 'Forum voor Democratie':0, 'Lokaal in de Kamer':0, 'OndernemersPartij':0, 'VNL':0, 'Nieuwe Wegen':0, 'De Burger Beweging':0, 'Piratenpartij':0, 'Artikel 1':0, 'Libertarische Partij':0, '50Plus':0, 'Vrijzinnige Partij':0, 'Niet Stemmers':0};
let scores = [{
    name: "VVD",
    points: 0
}, {
    name: "CDA",
    points: 0
}, {
    name: "PVV",
    points: 0
}, {
    name: "D66",
    points: 0
}, {
    name: "GroenLinks",
    points: 0
}, {
    name: "SP",
    points: 0
}, {
    name: "PvdA",
    points: 0
}, {
    name: "ChristenUnie",
    points: 0
}, {
    name: "Partij voor de Dieren",
    points: 0
}, {
    name: "SGP",
    points: 0
}, {
    name: "DENK",
    points: 0
}, {
    name: "Forum voor Democratie",
    points: 0
}, {
    name: "Lokaal in de Kamer",
    points: 0
}, {
    name: "OndernemersPartij",
    points: 0
}, {
    name: "VNL",
    points: 0
}, {
    name: "Nieuwe Wegen",
    points: 0
}, {
    name: "De Burger Beweging",
    points: 0
}, {
    name: "Piratenpartij",
    points: 0
}, {
    name: "Artikel 1",
    points: 0
}, {
    name: "Libertarische Partij",
    points: 0
}, {
    name: "50Plus",
    points: 0
}, {
    name: "Vrijzinnige Partij",
    points: 0
}, {
    name: "Niet Stemmers",
    points: 0
}];

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

//sorting functions for jsons, will see near the end
function predicateBy(prop){
    return function(a,b){
        if (a[prop] > b[prop]){
            return 1;
        } else if(a[prop] < b[prop]){
            return -1;
        }
        return 0;
    }
}



document.getElementById("startButton").onclick = function () {
    this.style.display = "none";
    document.getElementById("startMenu").style.display = "none";
    document.getElementById("container").style.display = "block";
    document.getElementById("title").innerHTML = subjects[0].title;
    document.getElementById("statement").innerHTML = subjects[0].statement;
    for (let i = 0; i < 5; i++) {
        createElement("button", "BTNcontainer", "btn" + i, txtBTN[i], null);
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
                    resetButtons();
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
                    blueQuestionButton(votes[currentQuestion]);
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
    document.getElementById("statement").innerHTML = "U kunt kiezen voor grote partijen(deze hebben minimaal " + zetels + " zetels). Ook kunt u kiezen of u alleen seculiere partijen wilt zien.";
    document.getElementById("NextButton").onclick = function () {endCalculation()};
    createElement("BUTTON", "voteContainer", "btnPartiesHuge", "grote partijen", "btnPartiesHuge");
    document.getElementById("btnPartiesHuge").onclick = function (){
        partiesShown = "BigParties";
        endCalculation();
    };
    createElement("BUTTON", "voteContainer", "btnPartiesSmall", "seculiere partijen", "btnPartiesSmall");
    document.getElementById("btnPartiesSmall").onclick = function (){
        partiesShown = "SecunParties";
        endCalculation();
    };
}

function resetButtons() {
    for (var i = 2; i <= 4; i++) {
        document.getElementById("btn" + i).style.backgroundColor = "black";

    }
}

function blueQuestionButton(answer) {
    resetButtons();
    switch (answer) {
        case "pro":
            document.getElementById("btn2").style.backgroundColor = "#01B4DC";
            break;
        case "none":
            document.getElementById("btn3").style.backgroundColor = "#01B4DC";
            break;
        case "contra":
            document.getElementById("btn4").style.backgroundColor = "#01B4DC";
            break;
    }
}

function removeSpaces (str) {
    return str.replace(/\s/g, '')
}

function endCalculation() {
    document.getElementById("title").innerHTML = "Hier ziet u de partijen die passen bij uw keuzes";
    document.getElementById("statement").style.display = "none";
    document.getElementById("btnPartiesHuge").style.display = "none";
    document.getElementById("btnPartiesSmall").style.display = "none";
    document.getElementById("NextButton").style.display = "none";
    for (let i=0; i<subjects.length; i++){
        console.log("question " + i);
        for (let x=0; x<subjects[i].parties.length; x++){
            if(votes[i] === "skip"){
                console.log("skipped");
                break;
            }else if (votes[i] === "none"){
                person["Niet Stemmers"] += parseInt(weight[i]);
                break;
            }else if(subjects[i].parties[x].position === votes[i]){
                console.log("added " + weight[i] + " to " + console.log(subjects[i].parties[x].name) + " cause their position is " + subjects[i].parties[x].position);
                person[subjects[i].parties[x].name] += parseInt(weight[i])
            }
        }
    }
    createElement("DIV", "container", "answerWrapper");
    showList();
}

function showList() {
    if(partiesShown === "none"){
        for (let x=0; x<scores.length; x++){
            createElement("P", "answerWrapper", "answer" + parties[x].name, parties[x].name + " heeft " + person[parties[x].name] + " punten op basis van uw keuzes.");
        }
    }else if(partiesShown === "BigParties"){
        for (let x=scores.length-1; x>0; x--){
            if (parties[x].secular === false || parties[x].secular !== undefined) {
                createElement("P", "answerWrapper", "answer" + scores[x].name, scores[x].name + " heeft " + scores[x].points + " punten op basis van uw keuzes.");
            }
        }
    }else if(partiesShown === "SecunParties"){
        scores.sort( predicateBy("points") );
        for (let x=23; x>0; x--){
            if(true){
                createElement("P", "answerWrapper", "answer" + scores[x].name, scores[x].name + " heeft " + scores[x].points + " punten, " + "");
            }
        }
    }
}