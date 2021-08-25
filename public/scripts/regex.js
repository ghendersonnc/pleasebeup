function checkInput(event) {

    let url = document.getElementById("url-input").value;

    url = "https://" + url;

    var pattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

    if (!pattern.test(url)) {
        event.preventDefault();
        alert("Enter a valid URL");
    }

}