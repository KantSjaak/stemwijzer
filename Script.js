let currentQuestion = 0;
let names = {"PvdA":0, "PVV":0, "CDA":0, "ChristenUnie":0, "SGP":0, "VNL":0, "Nieuwe Wegen":0, "50Plus":0, "Niet Stemmers":0, "VVD":0, "SP":0, "D66":0, "GroenLinks":0, "Partij voor de Dieren":0, "OndernemersPartij":0, "DENK":0, "Forum voor Democratie":0, "De Burger Beweging":0, "Vrijzinnige Partij":0, "Piratenpartij":0, "Artikel 1":0, "Libertarische Partij":0, "Lokaal in de Kamer":0};

function createElement (elementType, appendTo, id, innerText) {
    let element = document.createElement(elementType);
    document.getElementById(appendTo).appendChild(element);
    element.id = id;
    if(innerText){
        element.innerText = innerText;
    }
}

document.getElementById("startButton").onclick = function () {
    this.remove();
    nextQuestion(currentQuestion);
    createElement("button", "BTNcontainer", "BTNeens", "mee eens");
    document.getElementById("BTNeens").onclick = function(){
        document.getElementById("title").innerHTML = subjects[currentQuestion].title;
        document.getElementById("statement").innerHTML = subjects[currentQuestion].statement;
        currentQuestion +=1;
    };
    createElement("button", "BTNcontainer", "BTNgeenMening", "geen mening");
    createElement("button", "BTNcontainer", "BTNoneens", "niet mee eens");
    for (var i=0; i<subjects[currentQuestion].parties.length; i++){
        if (subjects[currentQuestion].parties[i].position !== "contra" && subjects[0].parties[i].position !== "none") {
            console.log(names[i]);
            console.log(subjects[currentQuestion].parties[i].name);
        }
    }
};

function nextQuestion(Question) {
    document.getElementById("title").innerHTML = subjects[currentQuestion].title;
    document.getElementById("statement").innerHTML = subjects[currentQuestion].statement;
    currentQuestion +=1;
}