var http = require("http");
var express = require("express"); //외부-설치
var fs=require("fs");
var ejs =require("ejs"); //외부-설치
var mysql=require("mysql");
var static = require("serve-static"); //정적자원을 처리하기위한 모듈
var request = require("request");

var app = express();

// mysql 접속 정보
var conStr = {
    url : "localhost:3306",
    user : "root",
    password : "1234",
    database : "nodejs"
};

//미들웨어 등록 
app.use(static(__dirname+"/static")); //정적자원의 루트 디렉토리 등록!!!
app.use(express.urlencoded({extended:true})); //post방식 데이터 처리 

app.set("view engine", "ejs");//뷰엔진 등록 (서버 스크립트 선택..)
//일단 뷰엔진이 등록되고 나면, 확장자를 명시할 필요 없다..왜?? views라는 정해진 
//디렉토리를 참조할거고, 그 안에 있는 모든 파일은 다 ejs이기 때문에...

const api_key = "iv%2Bc2NUnbDA5iGABUd7YsA5cjQjpf3gZpaHyrcv6T32P2HF5PMD60k79VY8dvDwvP6lyhvlfP4UbPNY%2B2Tekyw%3D%3D";

// 일정 생성 요청
app.get("/tour/list", function(req, res){
    let url = "http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList?serviceKey=" +api_key+
    "&pageNo=1&numOfRows=130&MobileApp=AppTest&MobileOS=ETC&arrange=O&cat1=&contentTypeId=12&cat2=&cat3=&listYN=Y&modifiedtime=&_type=json";
    request({
        url: url,
        method: 'GET'
    }, function (error, response, body) {
        // console.log(body);
        res.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});
        res.end(body);
    });
});

// 검색 요청
app.get("/tour/search", function(req, res){
    let tour_name = req.query.tour_name;
    let name = encodeURI(tour_name);
    console.log(tour_name);
    let url = "http://api.visitkorea.or.kr/openapi/service/rest/KorService/searchKeyword?serviceKey="+api_key+"&MobileApp=AppTest&MobileOS=ETC&pageNo=1&numOfRows=130&listYN=Y&arrange=O&contentTypeId=12&cat1=&cat2=&cat3=&keyword="+name+"&_type=json";
    
    request({
        url: url,
        method: 'GET'
    }, function (error, response, body) {
        res.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});
        // console.log(error);
        // console.log(body);
        res.end(body);
    });
});

//등록 요청!
app.post("/tour/detail", function(req, res){
    console.log(req.body);
    // 파라미터 받기
    let spot = req.body.title;
    let addr = req.body.addr;
    let spot1 = req.body.title1;
    let addr1 = req.body.addr1;
    let spot2 = req.body.title2;
    let addr2 = req.body.addr2;
    let spot3 = req.body.title3;
    let addr3 = req.body.addr3;
    let spot4 = req.body.title4;
    let addr4 = req.body.addr4;
    let spot5 = req.body.title5;
    let addr5 = req.body.addr5;
    let lat = req.body.mapy;
    let lng = req.body.mapx;
    // mysql 접속
    let con = mysql.createConnection(conStr);
    // 쿼리문 실행
    // let sql = "insert into tour(title, spot, addr, lat, lng) values('나의여행',?,?,?,?)";
    let sql = "insert into tour2(title, spot1, spot2, spot3, spot4, spot5, addr1, addr2, addr3, addr4, addr5) values('나의여행',?,?,?,?,?,?,?,?,?,?)";

    // con.query(sql,[spot, addr, lat, lng], function(err, fields){
    con.query(sql,[spot1, spot2, spot3, spot4, spot5, addr1, addr2, addr3, addr4, addr5], function(err, fields){
        if(err){
            console.log(err);
        }else{
            con.query("select * from tour2 where tour_id=1", function(error, result, fields){
                if(error){
                    console.log(error);
                }else{
                    fs.readFile("./views/tour/detail.ejs", "utf8", function(error, data){
                        if(error){
                            console.log(error);
                        }else{
                            res.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});
                            res.end(ejs.render(data, {
                                //result는 한건이라 할지라도 배열이므로, 배열에서 꺼내서 보내주자
                                record : result[0]
                            }));
                        }
                        con.end();
                    });
                }
            })
        }
    });
});

var server = http.createServer(app);

server.listen(8888, function(){
    console.log("The Server is running at 8888 port...");
    console.log("Welcome to 'TourHolic'")
    // 메인 페이지 접속 url  http://localhost:8888/html/main.html
});