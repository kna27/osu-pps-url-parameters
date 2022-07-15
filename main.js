const FORM_INPUTS = {
    "text": 0,
    "ppmin": 1,
    "ppmax": 2,
    "dt": 3,
    "hd": 4,
    "hr": 5,
    "fl": 6,
    "lenmmin": 7,
    "lenmmax": 8,
    "bpmmin": 9,
    "bpmmax": 10,
    "diffmin": 11,
    "diffmax": 12,
}

window.onload = function () {
    if (document.getElementsByClassName("form-control").length > 0) {
        document.getElementsByClassName("apply")[0].onclick = function () { addUrlParams(); };
        if (window.location.href.split('?').length > 1) {
            applyParams();
        }
    }
}

function addUrlParams() {
    let cookies = decodeURIComponent(document.cookie).split('; ');
    url = new URL(window.location.href);
    cookies.forEach(param => {
        let [key, value] = param.split('=');
        key = key.substring(15, key.length - 9);
        url.searchParams.set(key, value);
    })
    finalUrl = url.href.split("?")
    url.href = finalUrl[0] + "#/osu/maps?" + finalUrl[1].substring(0, finalUrl[1].length - 10)
    window.location.replace(url.href);
}

function applyParams() {
    let paramString = window.location.href.split('?')[1];
    let queryString = new URLSearchParams(paramString);
    let params = {}
    for (let pair of queryString.entries()) {
        if (pair[0] && pair[1] && pair[0] != "mode") {
            params[pair[0]] = pair[1];
        }
    }
    Object.keys(params).forEach(function(key) {
        value = params[key];
        if (key == "genre" || key =="language" || key == "rankeddate")
        {
            
        }
        else if (key == "lenmmin" || key == "lenmmax" || key == "lensmin" || key == "lensmax") {

        }
        else {
            document.getElementsByClassName("form-control")[FORM_INPUTS[key]].value = value;
        }
     });
}