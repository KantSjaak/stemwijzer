const zetels = 15;
let partiesShown = "none";
let currentQuestion = 0;
let votes = [];
let weight = [];
let txt = ["terug", "skip", "pro", "none", "contra"];
let txtBTN = ["terug", "Sla deze vraag over", "Eens", "Geen mening", "Oneens"];
//this holds the end scores
for (var i=0; i<parties.length; i++){
    parties[i].points = 0;
}

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
    createElement("BUTTON", "voteContainer", "NextButton", "Alle partijen", "Qbox");
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
    createElement("BUTTON", "voteContainer", "btnPartiesSmall", "Seculiere partijen", "btnPartiesSmall");
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
    document.getElementById("btnPartiesSmall").style.display = "none";
    document.getElementById("NextButton").style.display = "none";
    for (let i=0; i<subjects.length; i++){
        for (let x=0; x<subjects[i].parties.length; x++){
            if(votes[i] === "skip"){
                console.log("skipped");
                break;
            }else if (votes[i] === "none"){
                parties.find(x => x.name === 'Niet Stemmers').points += parseInt(weight[i]);
                break;
            }else if(subjects[i].parties[x].position === votes[i]){
                var a = subjects[i].parties[x].name;
                parties.find(x => x.name === a).points += parseInt(weight[i]);
            }
        }
    }
    createElement("DIV", "container", "answerWrapper");
    sortList();
    showList();
}

function isSecular(x) {
    return x.secular === true;
}

function sortList() {
    parties.sort(function(a, b){return b.points - a.points});
}

function percentage(partialValue, totalValue) {
    return (100 * partialValue) / totalValue;
}

function calculateVotes() {
    let x=0;
    for (let i=0; i<weight.length; i++){
        x+= parseInt(weight[i]);
    }
    return x;
}

function roundToTwo(num) {
    return +(Math.round(num + "e+2")  + "e-2");
}

function showList() {
    if(partiesShown === "none"){
        for (let x=0; x<parties.length; x++){
            createElement("P", "answerWrapper", "answer" + parties[x].name, 'De partij "' + parties[x].name + '" past bij u voor ' + roundToTwo(percentage(parties[x].points, calculateVotes())) + '%.');
        }
    }else if(partiesShown === "SecunParties"){
        var filtered = parties.filter(isSecular);
        for (let x=0; x<filtered.length; x++){
            createElement("P", "answerWrapper", "answer" + parties[x].name, 'De partij "' + filtered[x].name + '" past bij u voor ' + roundToTwo(percentage(filtered[x].points, calculateVotes())) + '%.');
        }
    }
}