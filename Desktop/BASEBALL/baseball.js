var count = 1;
//전역변수


function gameStart(){
    var layer = document.getElementById("game");
    layer.style.display = 'block';
    var startBtn = document.getElementById("startBtn");
    startBtn.style.display = 'none';

    const answer = [];
    let i = 0;
    while (i < 3) {
        let n = Math.floor(Math.random() * 10);
        if (! sameNum(n)){
            answer.push(n)
            i++;
        }
    }
    function sameNum(n){
        for (var i = 0; i < answer.length; i++){
            if (n === answer[i]){
                return true
            }
        }
        return false;
    }
    return document.getElementById("answer").innerHTML = answer;
}

//closer 함수안에 함수!!

function addAnswer(el) {
    if( document.getElementById("first_num").innerText.length == 0){
    return document.getElementById("first_num").innerHTML = el;
    } else if(document.getElementById("second_num").innerText.length == 0 && document.getElementById("first_num").innerText !== el) {
        return document.getElementById("second_num").innerHTML = el
    } else if( document.getElementById("third_num").innerText.length == 0 && document.getElementById("second_num").innerText !== el && document.getElementById("first_num").innerText !== el){
        document.getElementById("third_num").innerHTML = el
    } else {
        return false;
    }
}


function eraseAnswer(){
    document.getElementById("first_num").innerText = '';
    document.getElementById("second_num").innerText = '';
    document.getElementById("third_num").innerText = '';
}


function checkAnswer(){
    var firstNum = document.getElementById("first_num").innerText;
    var secondNum = document.getElementById("second_num").innerText;
    var thirdNum = document.getElementById("third_num").innerText;
    var inputArray = [firstNum, secondNum, thirdNum];
    var strike = 0;
    var ball = 0;

    if(firstNum == '' || secondNum == '' || thirdNum == '') {
        return window.alert("3칸을 모두 채우세요");
    }

    var answerNum = document.getElementById("answer").innerText.split(',');
    

    if( inputArray.toString() === answerNum.toString() ) {
        count += 1;
        var line = document.createElement("div");
        line.className = "box";
        var index = document.createElement("p");
        index.innerHTML = count-1;
        index.className = "index";
        var title = document.createElement("h3");
        title.innerHTML = inputArray;
        title.className = "title";
        var outcome = document.createElement("p");
        outcome.innerHTML =  'Home Run';
        outcome.className = "outcome"

        line.appendChild(index);
        line.appendChild(title);
        line.appendChild(outcome);

        document.getElementById("record").appendChild(line);
        setTimeout(function(){alert("성공하였습니다. 정답은"+ answerNum+"입니다.");}, 2000);
        

    } else {
        var strike = 0;
        var ball = 0;
        count += 1;
        if (count > 10) {
            setTimeout(function(){alert("실패하였습니다. 정답은"+ answerNum+"입니다.");}, 2000);
            // window.alert("실패");
        } else {
            for (var i = 0; i < 3; i++){
                for (var j = 0; j < 3; j++) {
                    if (answerNum[i] == inputArray[j]){
                        if ( i === j) {
                            strike++;
                        } else {
                            ball++;
                        }
                        break;
                        }
                    }
                    
                }
        }
        var line = document.createElement("div");
        line.className = "box";
        var index = document.createElement("p");
        index.innerHTML = count-1;
        index.className = "index";
        var title = document.createElement("h3");
        title.innerHTML = inputArray;
        title.className = "title";
        var outcome = document.createElement("p");
        outcome.innerHTML = strike +'S ' + ball + 'B';
        outcome.className = "outcome"

        line.appendChild(index);
        line.appendChild(title);
        line.appendChild(outcome);

        document.getElementById("record").appendChild(line);

        document.getElementById("first_num").innerText = '';
        document.getElementById("second_num").innerText = '';
        document.getElementById("third_num").innerText = '';
    }         
    
}

function reset(){
    return location.reload();
}

//들여쓰기!!!!!