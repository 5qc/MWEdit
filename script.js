var request = function (url, func) {
    var client = new XMLHttpRequest();
    client.onreadystatechange = func;
    client.open("GET", url, true);
    return client.send();
};
var typeInTextarea = function (newText, el) {
    if (el === void 0) { el = document.activeElement; }
    var start = el.selectionStart;
    var end = el.selectionEnd;
    var text = el.value;
    var before = text.substring(0, start);
    var after = text.substring(end, text.length);
    el.value = (before + newText + after);
    el.selectionStart = el.selectionEnd = start + newText.length;
    el.focus();
};
var convert = function (text) {
    text = text.replace(/'''(.*?)'''/g, "<b>$1</b>");
    text = text.replace(/''(.*?)''/g, "<i>$1</i>");
    text = text.replace(/\[\[(.*?)\|(.*?)\]\]/g, "<span class=\"link\" title=\"Links to: $1\">$2</span>");
    text = text.replace(/\[\[(.*?)\]\]/g, "<span class=\"link\" title=\"Links to: $1\">$1</span>");
    return text;
};
var i18n;
request("../i18n.json", function () {
    if (this.readyState === 4 && this.status === 200)
        i18n = JSON.parse(this.responseText);
});
var i18nTags = document.querySelectorAll("i18n");
for (var i = 0; i < i18nTags.length; i++) {
    var tag = i18nTags[i];
    var text = tag.innerText;
}
var content = document.getElementById("content");
var preview = document.querySelector(".preview");
var previewFile = document.getElementById("preview-file");
content.onkeydown = function (e) {
    if (e.keyCode === 66 && e.ctrlKey) {
        typeInTextarea("''''''", content);
        content.setSelectionRange(content.selectionStart, content.selectionStart - 3);
    }
    else if (e.keyCode === 73 && e.ctrlKey) {
        typeInTextarea("''''", content);
        content.setSelectionRange(content.selectionStart, content.selectionStart - 2);
    }
    else if (e.keyCode === 75 && e.ctrlKey) {
        typeInTextarea("[[]]", content);
        content.setSelectionRange(content.selectionStart, content.selectionStart - 2);
    }
};
content.onkeyup = function () {
    preview.innerHTML = convert(content.value);
};
previewFile.onclick = function () {
    if (preview.style.display === "none") {
        preview.style.display = "block";
        content.style.display = "none";
    }
    else {
        preview.style.display = "none";
        content.style.display = "block";
    }
};
document.onkeydown = function (e) {
    if (e.keyCode === 80 && e.ctrlKey && e.altKey)
        previewFile.click();
};
