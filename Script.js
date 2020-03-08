let currentQuestion = 0;
let votes = [];

function createElement(elementType, appendTo, id, innerText, properties = {}) {
    let element = document.createElement(elementType);
    document.getElementById(appendTo).appendChild(element);
    element.id = id;
    if (innerText) {
        element.innerText = innerText;
    }
}

document.getElementById("startButton").onclick = function () {
    this.remove();
    document.getElementById("title").innerHTML = subjects[0].title;
    document.getElementById("statement").innerHTML = subjects[0].statement;
    let txt = ["Terug", "Sla deze vraag over", "Eens", "Oneens", "Geen mening"];
    for (let i=0; i<5; i++) {
        createElement("button", "BTNcontainer", "btn" + i, txt[i]);
        if(i<=4 && i>=1){
            document.getElementById("btn" + i).onclick = function(){onclickBTNsetup(i)};
            function onclickBTNsetup(index) {
                for (var a=1; a<5; a++){
                    if(votes[index] !== txt[a]){
                        votes.push(txt[index]);
                        break
                    }else {
                        votes[index] = txt[index];
                    }
                }
                if (currentQuestion === subjects.length) {
                    alert("show answers");
                } else {
                    document.getElementById("title").innerHTML = subjects[currentQuestion].title;
                    document.getElementById("statement").innerHTML = subjects[currentQuestion].statement;
                    currentQuestion += 1;
                }
            }
        }else if(i===0){
            document.getElementById("btn" + i).onclick = function(){
                if(currentQuestion>0){
                    currentQuestion-=1;
                    document.getElementById("title").innerHTML = subjects[currentQuestion].title;
                    document.getElementById("statement").innerHTML = subjects[currentQuestion].statement;
                }
            }
        }
        // document.getElementById("btn0").onclick = function () {
        //
        // }
    }
};