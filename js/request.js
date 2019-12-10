var request = new XMLHttpRequest();
const url = "http://localhost:3000/artist";
const getMethod = 'GET';
const postMethod = 'POST';

// -------- FUNCTION DEFINITION --------

//GET REQUEST

var res;

function getAllArtist() {
    request.open(getMethod,url);

    request.onload = function () {
        var data = request.response;  
        res = JSON.parse(request.response);
    };
    request.send();
    return res;
}


// -------- TEST AIN--------

//get reference from html
var btn = document.getElementById("btn");


var cardName1 = document.getElementById("title1");
var cardAbstarct1 = document.getElementById("text1");

var cardName2 = document.getElementById("title2");
var cardAbstarct2 = document.getElementById("text2");


//add listener
btn.addEventListener("click",function call() {
    var data = new Object(getAllArtist());
    console.log(data);


    var name1 = data.artists[1].name;
    var currentAffiliattion1 = data.artists[1].currentAffiliattion;

    cardName1.insertAdjacentHTML('beforeend',name1);
    cardAbstarct1.insertAdjacentHTML('beforeend',currentAffiliattion1);
    

    var name2 = data.artists[2].name;
    var currentAffiliattion2 = data.artists[2].currentAffiliattion;

    cardName2.insertAdjacentHTML('beforeend',name2);
    cardAbstarct2.insertAdjacentHTML('beforeend',currentAffiliattion2);
    
});