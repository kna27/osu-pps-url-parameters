window.onload = function() {
    if (document.getElementsByClassName("form-control").length > 0)
    {
        document.getElementsByClassName("apply")[0].onclick = function() { addUrlParams(); };
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
    window.location.href = url.href;
}