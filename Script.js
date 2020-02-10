let currentQuestion = 0;

function createElement (elementType, appendTo, id, innerText, onclickaction) {
    let element = document.createElement(elementType);
    document.getElementById(appendTo).appendChild(element);
    element.id = id;
    if(innerText){
        element.innerText = innerText;
    }
    if(onclickaction){
        element.onclick = onclickaction;
    }
}

document.getElementById("startButton").onclick = function () {
    this.remove();
    nextQuestion(currentQuestion);
    createElement("button", "container", "BTNeens", "mee eens", nextQuestion());
    createElement("button", "container", "BTNgeenMening", "geen mening", null);
    createElement("button", "container", "BTNoneens", "niet mee eens", null);
};

function nextQuestion(Question) {
    document.getElementById("title").innerHTML = subjects[currentQuestion].title;
    document.getElementById("statement").innerHTML = subjects[currentQuestion].statement;
    currentQuestion +=1;
}