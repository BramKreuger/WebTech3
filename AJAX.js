function sortByAuthor(){

}

function sortByPrice(){

}

function sortByGenre(){

}

function sortByPublisher(){
    
}

function get(url, fn){
    var req;
    if (window.XMLHttpRequest) {
        req = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
        req = new ActiveXObject("Microsoft.XMLHTPP");
    }
    else {
        alert("Your browser does not support XMLHTTP!");
    }

    req.open("GET", url, true);
    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
            fn(req);
            }
    }
    req.send(null);
}