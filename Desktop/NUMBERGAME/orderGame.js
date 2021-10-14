
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
    listNum = document.getElementById("num" + num);
    listValue = listNum.innerHTML;

    if(listValue !== ''){
        listNum.setAttribute('draggable', 'false');
        listNum.innerHTML = '';
    } else {
        return false;
    }
}



function dragBoxStart(num){
    boxNum = document.getElementById("answerBox-"+num);
    boxValue = boxNum.innerHTML;

    if(boxValue !== ''){
        boxNum.setAttribute('draggable', 'false');
        boxNum.innerHTML = '';
    } else {
        return false;
    }
}


function dragOver(event) {
    event.preventDefault();
}

function drop(index){
    var dropList = document.getElementById("num"+index);
    var presentListValue = dropList.innerHTML;
    

    if (boxValue !== '' && presentListValue === ''){
        // 박스에서 왼쪽 빈 리스트로 값이 갈때
        console.log(1)
        listValue = boxValue;
        boxValue = '';
        dropList.innerHTML = listValue;
        dropList.setAttribute('draggable', 'true');
    } else if (boxValue !== '' && presentListValue !=='') {
        // 박스에서 왼쪽 값으로 두개가 같이 변경 할때
        console.log(2)
        boxNum.innerHTML = presentListValue;
        boxNum.setAttribute('draggable', 'true');
        dropList.innerHTML = boxValue;
        presentListValue = '';
        dropList.setAttribute('draggable','true');
    } else if (presentListValue !== '') {
        // 리스트안에서 값이 값으로 이동할때
        console.log(3)
        listNum.innerHTML = presentListValue;
        listNum.setAttribute('draggable','true');
        dropList.innerHTML = listValue;
    } else {
        // 
        dropList.innerHTML = listValue;
        dropList.setAttribute('draggable','true');
    }
}

// drop the value where we need
function dropBox(index) {
    var dropBox = document.getElementById("answerBox-"+index);
    var presentValue = dropBox.innerHTML;
    // 리스트에서 오른쪽 빈 박스로 값이 갈때
    if (listValue !== '' && presentValue ===''){
        console.log(10)
        boxValue = listValue
        listValue = '';
        dropBox.innerHTML = boxValue;
        // boxValue ='';
        dropBox.setAttribute('draggable','true');
        console.log(boxValue);
        console.log(listValue);
    } else if (listValue !== '' && presentValue !== ''){
        // 리스트에서 오른쪽으로 값들이 두개 변동될때
        console.log(11)
        listNum.innerHTML = presentValue;
        listNum.setAttribute('draggable', 'true');
        dropBox.innerHTML = listValue;
        presentValue = '';
        dropBox.setAttribute('draggable', 'true');
    }  else if (presentValue !== ''){
        console.log(12)
        // 박스안에서 값이 값으로 이동할때
        boxNum.innerHTML = presentValue;
        boxNum.setAttribute('draggable','true');
        dropBox.innerHTML = boxValue;  
    }
    // 박스 안에서 값이 빈값으로 이동할때
    else {
        console.log(13)
        dropBox.innerHTML = boxValue;
        dropBox.setAttribute('draggable','true');
    }
}
var timer;
var clickedTime;
var newTime;

function startTime() {
    for (var i=1; i < 10; i++){
        var enableGame = document.getElementById("num"+i);
        enableGame.setAttribute('draggable', 'true');
    }

    var clearBox = document.getElementById("resultAlert");
    clearBox.style.display = 'none';

    if (newTime == null){
        clickedTime = new Date().getTime();
        console.log(1);
    } else {
        nowTime = new Date().getTime();
        console.log(new Date(newTime).getTime());
        clickedTime = new Date(nowTime - newTime).getTime();
        console.log(2);
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
    
    var inputArray= [];
    var answerArray = [1,2,3,4,5,6,7,8,9];

    for (var i=1; i< 10; i++) {
        var inputNum = parseInt(document.getElementById("answerBox-"+i).innerHTML);        
        inputArray.push(inputNum)
    };
    console.log(inputArray);

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
