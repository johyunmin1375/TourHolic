/* 
<div class="area_list_place">
    <div class="place_img">
        <img src="<%=json.firstimage%>">
    </div>
    <div class="place_content">
        <div class="place_title"><%=json.title%></div>
        <button onclick="sub()" id="add_tourbtn"><i class="fas fa-plus"></i></button>
    </div>
</div> 
*/
class Place{
    constructor(container, src, title, mapy, mapx, addr){
        this.container=container;
        this.wrapper = document.createElement("div");
        this.imgWrapper = document.createElement("div");
        this.img = document.createElement("img");
        this.src = src;
        this.contentWrapper = document.createElement("div");
        this.titleDiv = document.createElement("div") ;
        this.title = title
        this.button = document.createElement("button");
        this.i = document.createElement("i");
        this.mapy = mapy;
        this.mapx = mapx;
        this.addr = addr;

        // 전달해줄 파라미터
        let me=this;
        let myTitle = this.title;
        let mySrc = this.src;
        let lat = this.mapy
        let lng = this.mapx
        let addr1 = this.addr

        //style 
        this.wrapper.classList.add('area_list_place');
        this.imgWrapper.classList.add("place_img");
        this.img.src = this.src;
        this.contentWrapper.classList.add("place_content");
        this.titleDiv.classList.add("place_title");
        this.titleDiv.innerText = this.title;
        this.i.classList.add("fas");
        this.i.classList.add("fa-plus");

        //조립 
        this.container.appendChild(this.wrapper);
        this.wrapper.appendChild(this.imgWrapper);
        this.imgWrapper.appendChild(this.img);
        this.wrapper.appendChild(this.contentWrapper);
        this.contentWrapper.appendChild(this.titleDiv);
        this.contentWrapper.appendChild(this.button);
        this.button.appendChild(this.i)

        //이벤트  
        this.button.addEventListener("click", function(){
            var index = placeArray.indexOf(me);
            // alert(index + "를 선택");
            addList(index, myTitle, mySrc, lat, lng, addr1);
        });
    }
}