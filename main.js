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
    let changed = false;
    Object.keys(params).forEach(function (key) {
        value = params[key];
        key = "osupps_1.3_key_" + key + "_mode_osu";
        if (readCookie(key) != value) {
            document.cookie = key + "=" + value + "; path=/;";
            changed = true;
        }
    });
    if (changed) {
        window.location.reload();
    }
}

function readCookie(name) {
    name += "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return null;
}
