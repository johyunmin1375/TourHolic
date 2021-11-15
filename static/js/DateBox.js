/*
달력의 셀 하나를 표현하는 사각형
일정 등록 및 날짜 표가 가능한 객체
*/
class DateBox{
    constructor(container, width, height, text, bg){
        this.container=container;
        this.div=document.createElement("div");
        this.width=width;
        this.height=height;
        this.div.innerText=text; //인수로 넘겨받은 문자열을 div에 출력
        this.bg=bg;//배경색을 인수로 넘겨받자!!
        this.title; //제목 보관용
        this.content;//내용 보관용
        this.init();
    }    
    init(){
        this.div.style.width=this.width+"px";        
        this.div.style.height=this.height+"px"; 
        this.div.style.background=this.bg;
        this.div.style.boxSizing="border-box";
        this.div.style.float="left"; //block 이니깐 
        this.container.appendChild(this.div);//부모에 부착
        var bg=this.bg;
        var me=this;//이 클래스로부터 장차 미래에 메모리에 올라갈 인스턴스 자신을 말함

        //이벤트 구현 
        this.div.addEventListener("mouseover", function(){
            this.style.background="#203341";
            this.style.color="#FFF";
        });
        this.div.addEventListener("mouseout", function(){
            this.style.background=bg;
            this.style.color="#000"
        });
        this.div.addEventListener("click", function(){
            // $("#calander").val();
            $("#cal_wrapper").hide();
        });
    }
}