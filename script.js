if (!localStorage.getItem("MWEdit-mih7sf5eep.lang"))
    localStorage.setItem("MWEdit-mih7sf5eep.lang", "en");
const request = (url, func) => {
    const client = new XMLHttpRequest();
    client.onreadystatechange = func;
    client.open("GET", url, false);
    return client.send();
};
const typeInTextarea = (newText, el = document.activeElement) => {
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const text = el.value;
    const before = text.substring(0, start);
    const after = text.substring(end, text.length);
    el.value = (before + newText + after);
    el.selectionStart = el.selectionEnd = start + newText.length;
    el.focus();
};
const pad = (num) => {
    if (num < 10)
        return `0${num}`;
    else
        return num;
};
const convert = (text) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dow = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    text = text.replace(/\n/g, "<br />");
    text = text.replace(/(?<!<nowiki>)'''(.*?)'''/gm, "<b>$1</b>");
    text = text.replace(/(?<!<nowiki>)''(.*?)''/gm, "<i>$1</i>");
    text = text.replace(/(?<!<nowiki>)\[\[(.*?)\|(.*?)\]\]/gm, "<span class=\"link\" title=\"Links to: $1\">$2</span>");
    text = text.replace(/(?<!<nowiki>)\[\[(.*?)\]\]/gm, "<span class=\"link\" title=\"Links to: $1\">$1</span>");
    text = text.replace(/(?<!<nowiki>)====== (.*?) ======/gm, "<h6>$1</h6>");
    text = text.replace(/(?<!<nowiki>)===== (.*?) =====/gm, "<h5>$1</h5>");
    text = text.replace(/(?<!<nowiki>)==== (.*?) ====/gm, "<h4>$1</h4>");
    text = text.replace(/(?<!<nowiki>)=== (.*?) ===/gm, "<h3>$1</h3>");
    text = text.replace(/(?<!<nowiki>)== (.*?) ==/gm, "<h2>$1</h2>");
    text = text.replace(/(?<!<nowiki>)= (.*?) =/gm, "<h1>$1</h1>");
    text = text.replace(/(?<!<nowiki>)----/gm, "<hr />");
    text = text.replace(/(?<!<nowiki>)^ (.*)/gm, "<pre>$1</pre>");
    text = text.replace(/(?<!<nowiki>)<!--(.*?)-->/g, "");
    // List
    text = text.replace(/^\*(.*)/gm, "<ul><li>$1</li></ul>");
    // Magic Words
    const d = new Date();
    text = text.replace(/{{CURRENTYEAR}}/g, () => `${d.getUTCFullYear()}`);
    text = text.replace(/{{CURRENTMONTH}}/g, () => `${pad(d.getUTCMonth() + 1)}`);
    text = text.replace(/{{CURRENTMONTH1}}/g, () => `${d.getUTCMonth() + 1}`);
    // {{CURRENTMONTHNAMEGEN}} placeholder
    text = text.replace(/{{CURRENTMONTHABBREV}}/g, () => `${months[d.getUTCMonth()]}`);
    text = text.replace(/{{CURRENTDAY}}/g, () => `${d.getUTCDate()}`);
    text = text.replace(/{{CURRENTDAY2}}/g, () => `${pad(d.getUTCDate())}`);
    text = text.replace(/{{CURRENTDOW}}/g, () => `${d.getUTCDay()}`);
    text = text.replace(/{{CURRENTDAYNAME}}/g, () => `${dow[d.getUTCDay()]}`);
    // Return Text
    return text;
};
const displayMessage = (type, text) => {
    const el = document.querySelector(".message");
    el.classList.add(type);
    el.innerHTML = text;
    el.style.display = "block";
    return setTimeout(() => {
        el.classList.add("fade-out");
        setTimeout(() => {
            el.style.display = "none";
            el.classList.remove("fade-out");
            el.classList.remove("success");
            el.classList.remove("fail");
        }, 950);
    }, 2500);
};
const newFile = () => {
    document.getElementById("window__new-file").style.display = "none";
    document.getElementById("content").value = "";
    document.getElementById("file-name").value = "";
    document.querySelector(".preview").innerHTML = "";
};
const hideAllWindows = () => {
    const windows = document.querySelectorAll(".window");
    for (let i = 0; i < windows.length; i++)
        windows[i].style.display = "none";
};
const setWarning = (html) => document.querySelector("#window__warning .window-content").innerHTML = html;
const message = document.querySelector(".message");
const fileName = document.getElementById("file-name");
let i18n;
request("../i18n.json", function () {
    if (this.readyState === 4 && this.status === 200)
        i18n = JSON.parse(this.responseText);
});
const i18nTags = document.querySelectorAll("i18n");
for (let i = 0; i < i18nTags.length; i++) {
    const tag = i18nTags[i];
    const text = tag.innerText;
    tag.innerText = i18n[localStorage.getItem("MWEdit-mih7sf5eep.lang")]["text"][text];
}
document.getElementById("file-name").setAttribute("placeholder", i18n[localStorage.getItem("MWEdit-mih7sf5eep.lang")]["text"]["New File"]);
const navbarNewFile = document.getElementById("new-file");
navbarNewFile.onclick = () => {
    hideAllWindows();
    const file = document.getElementById("file-name");
    const givenContent = document.getElementById("content").value;
    if (localStorage.getItem(`MWEdit-mih7sf5eep.file_${file}`)) {
        const content = localStorage.getItem(`MWEdit-mih7sf5eep.file_${file}`);
        if (content !== givenContent)
            document.getElementById("window__new-file").style.display = "block";
        else
            newFile;
    }
    else {
        if (givenContent !== "")
            document.getElementById("window__new-file").style.display = "block";
        else
            newFile;
    }
};
const navbarSaveFile = document.getElementById("save-file");
navbarSaveFile.onclick = () => {
    hideAllWindows();
    document.getElementById("window__save-file").style.display = "block";
};
const navbarOpenFile = document.getElementById("open-file");
navbarOpenFile.onclick = () => {
    hideAllWindows();
    document.getElementById("window__open-file").style.display = "block";
};
const navbarReset = document.getElementById("reset-storage");
navbarReset.onclick = () => {
    hideAllWindows();
    document.getElementById("window__reset").style.display = "block";
};
const newFileWindow = document.getElementById("window__new-file");
const yesBtn = document.getElementById("unsaved-yes");
const noBtn = document.getElementById("unsaved-no");
yesBtn.onclick = () => {
    newFileWindow.style.display = "none";
    newFile();
};
noBtn.onclick = () => newFileWindow.style.display = "none";
const openFile = document.getElementById("window__open-file");
const openFileStorage = document.getElementById("window__open-file-storage");
const openLocally = document.getElementById("open-locally");
openLocally.onclick = () => {
    openFile.style.display = "none";
    openFileStorage.style.display = "block";
};
for (let i = 0; i < Object.keys(localStorage).length; i++) {
    const item = Object.keys(localStorage)[i];
    if (item.startsWith("MWEdit-mih7sf5eep.file_")) {
        const fileName = item.replace("MWEdit-mih7sf5eep.file_", "");
        openFileStorage.querySelector(".window-content").innerHTML += `<span class="file link" open-file="${fileName}">${fileName}</span><br />`;
        const a = document.querySelector(`[open-file="${fileName}"]`);
        a.onclick = () => {
            document.getElementById("file-name").value = fileName;
            document.getElementById("content").value = `${localStorage.getItem(item)}`;
            document.querySelector(".preview").innerHTML = convert(document.getElementById("content").value);
            openFileStorage.style.display = "none";
        };
    }
}
const resetBtn = document.getElementById("reset-btn");
resetBtn.onclick = () => {
    for (let i = 0; i < Object.keys(localStorage).length; i++) {
        const item = Object.keys(localStorage)[i];
        if (item.startsWith("MWEdit-mih7sf5eep."))
            localStorage.removeItem(item);
    }
    location.reload();
};
const saveFile = document.getElementById("w-save-file");
saveFile.onclick = () => {
    hideAllWindows();
    const file = fileName.value ? fileName.value : i18n[localStorage.getItem("MWEdit-mih7sf5eep.lang")]["text"]["New File"];
    const a = document.createElement("a");
    a.href = `data:text/txt;base64,${btoa(document.getElementById("content").value)}`;
    a.setAttribute("download", `${file}.mediawiki`);
    a.click();
};
const saveLocally = document.getElementById("save-locally");
saveLocally.onclick = () => {
    hideAllWindows();
    const file = fileName.value ? fileName.value : i18n[localStorage.getItem("MWEdit-mih7sf5eep.lang")]["text"]["New File"];
    if (localStorage.getItem(`MWEdit-mih7sf5eep.file_${file}`)) {
        document.getElementById("window__save-file").style.display = "none";
        document.getElementById("window__warning").style.display = "block";
        setWarning(`${i18n[localStorage.getItem("MWEdit-mih7sf5eep.lang")]["text"]["{file} already exists locally."].replace("{file}", file)}<br />
        ${i18n[localStorage.getItem("MWEdit-mih7sf5eep.lang")]["text"]["Do you want to overwrite this file?"]}
        <div class="button-container" style="padding-top: 5px;">
            <button id="overwrite-yes"><i18n>Yes</i18n></button>
            <button id="overwrite-no"><i18n>No</i18n></button>
        </div>`);
        document.getElementById("overwrite-yes").onclick = () => {
            document.getElementById("window__warning").style.display = "none";
            localStorage.removeItem(`MWEdit-mih7sf5eep.file_${file}`);
            saveLocally.click();
        };
        document.getElementById("overwrite-no").onclick = () => document.getElementById("window__warning").style.display = "none";
    }
    else {
        displayMessage("success", i18n[localStorage.getItem("MWEdit-mih7sf5eep.lang")]["text"]["Successfully saved to {file}!"].replace("{file}", file));
        localStorage.setItem(`MWEdit-mih7sf5eep.file_${file}`, document.getElementById("content").value);
    }
};
const windows = document.querySelectorAll(".window");
for (let i = 0; i < windows.length; i++) {
    const window = windows[i];
    const x = window.querySelector(".window-x");
    x.onclick = () => window.style.display = "none";
}
const content = document.getElementById("content");
const preview = document.querySelector(".preview");
const previewFile = document.getElementById("preview-file");
const closeChars = new Map([
    ["{", "}"],
    ["[", "]"],
    ["(", ")"],
    ["'", "'"],
    ["\"", "\""]
]);
content.onkeydown = (e) => {
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
    else if (e.keyCode === 191 && e.ctrlKey) {
        typeInTextarea("<!--  -->", content);
        content.setSelectionRange(content.selectionStart, content.selectionStart - 4);
    }
    else if (e.keyCode === 85 && e.ctrlKey) {
        return typeInTextarea("<u></u>", content), content.setSelectionRange(content.selectionStart, content.selectionStart - 4), false;
    }
    else if (e.keyCode === 83 && e.ctrlKey) {
        return typeInTextarea("<s></s>", content), content.setSelectionRange(content.selectionStart, content.selectionStart - 4), false;
    }
    else if (e.keyCode === 68 && e.ctrlKey) {
        return typeInTextarea("<del></del>", content), content.setSelectionRange(content.selectionStart, content.selectionStart - 6), false;
    }
    else if (e.keyCode === 81 && e.ctrlKey) {
        typeInTextarea("<q></q>", content);
        content.setSelectionRange(content.selectionStart, content.selectionStart - 4);
    }
};
content.onkeyup = () => {
    preview.innerHTML = convert(content.value);
};
content.oninput = (e) => {
    const pos = content.selectionStart;
    const val = [...content.value];
    const char = val.slice(pos - 1, pos)[0];
    const closeChar = closeChars.get(char);
    if (closeChar) {
        val.splice(pos, 0, closeChar);
        content.value = val.join("");
        content.selectionEnd = pos;
    }
};
previewFile.onclick = () => {
    if (preview.style.display === "none") {
        preview.style.display = "block";
        content.style.display = "none";
    }
    else {
        preview.style.display = "none";
        content.style.display = "block";
    }
};
document.onkeydown = (e) => {
    if (e.keyCode === 80 && e.ctrlKey && e.altKey)
        previewFile.click();
    else if (e.keyCode === 83 && e.ctrlKey) {
        document.getElementById("window__save-file").style.display = "block";
        return false;
    }
    else if (e.keyCode === 78 && e.ctrlKey && e.altKey) {
        return document.getElementById("new-file").click(), false;
    }
    else if (e.keyCode === 82 && e.ctrlKey && e.shiftKey) {
        return document.getElementById("reset-storage").click(), false;
    }
};
