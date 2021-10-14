
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
        return;
    }
}


function dragBoxStart(num){
    boxNum = document.getElementById("answerBox-"+num);
    boxValue = boxNum.innerHTML;

    if(boxValue !== ''){
        boxNum.setAttribute('draggable', 'false');
        boxNum.innerHTML = '';
    } else {
        return;
    }
}


function dragOver(event) {
    event.preventDefault();
}

function drop(index){
    var dropList = document.getElementById("num"+index);
    var presentListValue = dropList.innerHTML;

    if (presentListValue === '') {
        if (boxValue !==''){
            // 박스값에서 왼쪽 빈리스트로 갈떄
            dropList.innerHTML = boxValue;
            dropList.setAttribute('draggable', 'true');
            console.log(1)
        } else {
            // 리스트에서 빈 리스트로 가는경우
            dropList.innerHTML = listValue;
            dropList.setAttribute('draggable','true');
            console.log(2)
        }
    } else {
        if (boxValue !== ''){
            dropList.innerHTML = listValue;
            listNum.innerHTML = presentListValue;
            listNum.setAttribute('draggable','true');
            listValue ='';
            boxValue = '';
            console.log(3);

            // 왼쪽 값에서 왼쪽 값이랑 바꿀때
        } else {
            // 오른쪽 박스 값에서 왼쪽 값이랑 바꿀때
            dropList.innerHTML = boxValue;
            boxNum.innerHTML = presentListValue;
            boxNum.setAttribute('draggable','true');
            console.log(4)
        }
    }
    
}

var boxValue ;
var listValue ;
var listNum ;
var boxNum ;



// drop the value where we need
function dropBox(index) {
    var dropBox = document.getElementById("answerBox-"+index);
    var presentValue = dropBox.innerHTML;
    console.log(presentValue);
    console.log(boxValue);

    if (presentValue === '') {
        if ( boxValue !== '' && listValue === ''){
                console.log(5);
                dropBox.innerHTML = boxValue;
                // 박스안에서 빈박스 값으로 갈때
            } else {
                //리스트에 값이 오른쪽 박스로 없는 값으로 이동할
                console.log(6);
                dropBox.innerHTML = listValue;
                dropBox.setAttribute('draggable', 'true');
            }
    } else {
        if ( boxValue !== '' && listValue === '')  {
            //박스안에서 박스 값 이동
            console.log(7);
            dropBox.innerHTML = boxValue;
            boxNum.innerHTML = presentValue;
            dropBox.setAttribute('draggable','true');
            boxNum.setAttribute('draggable', 'true');
        } else {
            // 왼쪽 값이 오른쪽 값으로 이동할때
            console.log(8);
            dropBox.innerHTML = listValue;
            listNum.innerHTML = presentValue;
            listNum.setAttribute('draggable','true');
        }

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
