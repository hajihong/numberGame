var timer;
var clickedTime;
var newTime;
var nowTime;
var dragValue;
var dragPlace;

function randomSort() {
    var layer = document.getElementById("container");
    layer.style.display = 'flex';
    var start = document.getElementById("start");
    start.style.display = 'none';


    var array = [1,2,3,4,5,6,7,8,9];
    array.sort(()=> Math.random() - 0.5);
    for (var i=0; i < 9; i++) {
        var newDiv = document.createElement("div");
        newDiv.id="num" + (i+1);
        newDiv.className="randomNum";
        newDiv.innerHTML = array[i];
        newDiv.setAttribute('draggable','false');
        newDiv.setAttribute('ondragstart','dragStart('+(i+1)+')');
        newDiv.setAttribute('ondragover','dragOver(event)');
        newDiv.setAttribute('ondrop','drop('+(i+1)+')');
        var tag = document.getElementById("randomList");
        tag.appendChild(newDiv);
    }
}
// drag start and get the value to send


function dragStart(num) {
   if (num > 10) {
       dragValue = document.getElementById('answerBox-'+ (num-10)).innerHTML;
   } else {
       dragValue = document.getElementById('num'+ num).innerHTML;
   }
   dragPlace = num;
}


function dragOver(event) {
    event.preventDefault();
}

function drop(num) {
    if (num < 10) {
        if (dragPlace < 10) {
            // 리스트에서 리스트로 이동
            document.getElementById('num' + dragPlace).innerHTML = document.getElementById('num' + num).innerHTML;
        } else {
            // 박스에서 리스트로 값이 이동
            document.getElementById('answerBox-' + (dragPlace -10)).innerHTML = document.getElementById('num'+num).innerHTML;
        }
        document.getElementById('num'+ num).innerHTML = dragValue
    } else {
        if (dragPlace < 10) {
            // 리스트에서 박스로 값이 이동
            document.getElementById('num'+ dragPlace).innerHTML = document.getElementById('answerBox-' + (num-10)).innerHTML;
        } else {
            // 박스에서 박스로 이동
            document.getElementById('answerBox-'+(dragPlace - 10)).innerHTML = document.getElementById('answerBox-'+ (num -10)).innerHTML;
        }
        document.getElementById('answerBox-' + (num -10)).innerHTML = dragValue
    }
}


function startTime() {
    for (var i=1; i < 10; i++){
        var enableListGame = document.getElementById("num"+i);
        var enableBoxGame = document.getElementById('answerBox-'+i);
        enableListGame.setAttribute('draggable', 'true');
        enableBoxGame.setAttribute('draggable', 'true');
    }

    var clearBox = document.getElementById("resultAlert");
    clearBox.style.display = 'none';

    if (newTime == null){
        clickedTime = new Date().getTime();
    } else {
        nowTime = new Date().getTime();
        clickedTime = new Date(nowTime - newTime).getTime();
    }
    timer = setInterval(function() {
        var nowTime = new Date().getTime();
        newTime = new Date(nowTime - clickedTime);
        

        var min = newTime.getMinutes();
        var sec = newTime.getSeconds();
        var mSec = newTime.getMilliseconds();

        var time = document.getElementById("time");
        time.innerHTML = min + ":" + sec + ":" + mSec ;
    }, 1);

}


function checkAnswer() {
    clearInterval(timer);
    clickedTime = new Date().getTime();

    for (var i=1; i < 10; i++){
        var enableListGame = document.getElementById("num"+i);
        var enableBoxGame = document.getElementById('answerBox-'+i);
        enableListGame.setAttribute('draggable', 'false');
        enableBoxGame.setAttribute('draggable', 'false');
    }
    var inputArray= [];
    var answerArray = [1,2,3,4,5,6,7,8,9];

    for (var i=1; i< 10; i++) {
        var inputNum = parseInt(document.getElementById("answerBox-"+i).innerHTML);        
        inputArray.push(inputNum)
    };
    

    if(JSON.stringify(inputArray) === JSON.stringify(answerArray)){
        var resultTime = document.getElementById("time").innerHTML
        
        setTimeout(function(){alert("성공하였습니다" + resultTime+"만에 성공하였습니다!");}, 10);
    } else {
        resultAlert.style.display = 'flex';
    }
}

function reStart() {
    return location.reload();
}
