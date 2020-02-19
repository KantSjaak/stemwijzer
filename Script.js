let currentQuestion = 0;
let votes = [];

function createElement(elementType, appendTo, id, innerText) {
    let element = document.createElement(elementType);
    document.getElementById(appendTo).appendChild(element);
    element.id = id;
    if (innerText) {
        element.innerText = innerText;
    }
}

document.getElementById("startButton").onclick = function () {
    this.remove();
    nextQuestion(currentQuestion);
    createElement("button", "BTNcontainer", "BTNeens", "mee eens");
    document.getElementById("BTNeens").onclick = function () {
        nextQuestion(currentQuestion);
        votes.push("true");
    };
    createElement("button", "BTNcontainer", "BTNgeenMening", "geen mening");
    document.getElementById("BTNgeenMening").onclick = function () {
        votes.push("no opinion");
        nextQuestion(currentQuestion);
    };
    createElement("button", "BTNcontainer", "BTNoneens", "niet mee eens");
    document.getElementById("BTNoneens").onclick = function () {
        votes.push("false");
        nextQuestion(currentQuestion);
    };
};


function nextQuestion(Question) {
    console.log(currentQuestion);
    console.log(subjects.length);
    if (currentQuestion === subjects.length) {
        alert("monkaS");
    } else {
        document.getElementById("title").innerHTML = subjects[currentQuestion].title;
        document.getElementById("statement").innerHTML = subjects[currentQuestion].statement;
        currentQuestion += 1;
    }
}