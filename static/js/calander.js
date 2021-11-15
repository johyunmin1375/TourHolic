var cellSize=50; //가로*세로 100인 사각형
var wrapper;
var dayArray=["Sun","Mon","Tue","Wed","Thur","Fri","Sat"];
var boxArray=[]; //42개의 날짜 박스를 접근하기 위한 배열
var d; //현재 사용중인 날짜 객체
var selectedIndex=0;  //현재 보고 있는 데이트 객체의 boxArray에서의 index

function init(){
    wrapper=document.getElementById("cal_wrapper"); // document 객체의 createElement() 메서드
    createWrapper();
    createDays(); //요일 박스 생성
    createDate(); //날짜 박스 생성
    getCurrentDate();//달력제목으로 오늘 날짜를 기본적으로 출력하자
}

//현재 날짜 구해오기
function getCurrentDate(){
    d = new Date(); //이전, 다음, 기타 여러 기능들 때문에라도 전역변수이면 좋다!!
    //출력할때는 언제나 1을 더해서 출력하자!!
    printDate(); //날짜 출력
}

//각월의 시작 요일을 알아야, 날짜의 시작 위치를 결정짓는다!!
function getFirstDayOfMonth(year, month){
    //원리: 각월의 1일로 날짜를 조작한 후, 해당 요일을 물어보자!!
    var d2 = new Date(year, month, 1);//넘겨받은 매개변수로 날짜를 조작함
    return d2.getDay(); //요일 반환!!
}

//각월이 몇일까지 있는지 (5월-31일까지, 6-30일까지...구하기)
function getLastDate(year , month){
    var d2 = new Date(year, month+1, 0);
    return d2.getDate(); //말일의 날짜 반환
}

function createWrapper(){
    wrapper.style.width=cellSize*7+"px";
    wrapper.style.height=50+50+cellSize*6+"px";
    wrapper.style.background="#fff";
    wrapper.style.margin="auto";
    wrapper.style.overflow="hidden";
    wrapper.style.position="absolute";
}

//일, 월,화..... 박스 생성
function createDays(){
    //constructor(container, width, height, text, bg)
    for(var i=0;i<dayArray.length;i++){
        var box = new DateBox(document.getElementById("day_area"), cellSize,cellSize, dayArray[i], "#fff");
    }
}
//날짜 박스 생성
function createDate(){
    //constructor(container, width, height, text, bg)
    for(var i=0;i<dayArray.length*6;i++){
        var dateBox=new DateBox(document.getElementById("date_area"),cellSize, cellSize, i, "#FFFFFF");
        //생성된 날짜 박스를 배열에 차곡 차곡 쌓아놓자!! 왜? 그래야 나중에 접근한다
        boxArray.push(dateBox);
    }
}
//달력의 날짜는 변경이 자주 일어나므로, 함수로 정의해놓겠다!!
function setTitle(){
    var yy=d.getFullYear(); //오늘의 연도
    var mm=d.getMonth();//오늘의 월 0부터~11까지
    var str = yy+"년 "+getZeroString(mm+1)+"월";

    document.getElementById("cal_title").innerText=str;
}

//이전월
function prevMonth(){
    d.setDate(1);//1일로 초기화
    d.setMonth(d.getMonth()-1);//현재 사용중인 월에 - 1
    printDate();
}
//다음월
function nextMonth(){
    //기존 객체를 이용하기 때문에, 날짜도 함께 변경 
    d.setDate(1);//1일로 돌려놓고
    d.setMonth(d.getMonth()+1);//월 증가 
    printDate();
}

//현재 화면에 날짜칸 div에 출력된 텍스트를 지우기
function resetDate(){
    for(var i=0;i<boxArray.length;i++){
        boxArray[i].div.innerText="";//초기화
    }    
}

//날짜를 출력하는 함수 
function printDate(){
    resetDate();//싹~~지우기
    setTitle();
    
    var n=1;
    for(var i=0;i<boxArray.length;i++){

        //단, 이 날짜는 i가 각 월의 시작요일을 지날때부터
        if(i >=getFirstDayOfMonth(d.getFullYear() , d.getMonth())){
            //아래의 출력은 또다른 조건을 걸어야 한다. 각 월의 말일까지만...
            if(n <=getLastDate(d.getFullYear(), d.getMonth())){ //말일에 도달할때까지만 출력
                boxArray[i].div.innerText=n;
                n++;
            }
        }
    }
}

window.addEventListener("load", function(){
    init();
});