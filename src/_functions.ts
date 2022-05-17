const request = (url: string, func) => {
    const client = new XMLHttpRequest()
    client.onreadystatechange = func
    client.open("GET", url, false)
    return client.send()
}

const typeInTextarea = (newText: string, el = <HTMLInputElement>document.activeElement) => {
    const start = el.selectionStart
    const end = el.selectionEnd
    const text = el.value
    const before = text.substring(0, start)
    const after  = text.substring(end, text.length)
    el.value = (before + newText + after)
    el.selectionStart = el.selectionEnd = start + newText.length
    el.focus()
}

const pad = (num: Number) => {
    if (num < 10) return `0${num}`
    else return num
}

const convert = (text: string) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const dow = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    text = text.replace(/\n/g, "<br />")

    text = text.replace(/(?<!<nowiki>)'''(.*?)'''/gm, "<b>$1</b>")
    text = text.replace(/(?<!<nowiki>)''(.*?)''/gm, "<i>$1</i>")
    text = text.replace(/(?<!<nowiki>)\[\[(.*?)\|(.*?)\]\]/gm, "<span class=\"link\" title=\"Links to: $1\">$2</span>")
    text = text.replace(/(?<!<nowiki>)\[\[(.*?)\]\]/gm, "<span class=\"link\" title=\"Links to: $1\">$1</span>")

    text = text.replace(/(?<!<nowiki>)====== (.*?) ======/gm, "<h6>$1</h6>")
    text = text.replace(/(?<!<nowiki>)===== (.*?) =====/gm, "<h5>$1</h5>")
    text = text.replace(/(?<!<nowiki>)==== (.*?) ====/gm, "<h4>$1</h4>")
    text = text.replace(/(?<!<nowiki>)=== (.*?) ===/gm, "<h3>$1</h3>")
    text = text.replace(/(?<!<nowiki>)== (.*?) ==/gm, "<h2>$1</h2>")
    text = text.replace(/(?<!<nowiki>)= (.*?) =/gm, "<h1>$1</h1>")
    
    text = text.replace(/(?<!<nowiki>)----/gm, "<hr />")

    text = text.replace(/(?<!<nowiki>)^ (.*)/gm, "<pre>$1</pre>")

    text = text.replace(/(?<!<nowiki>)<!--(.*?)-->/g, "")

    // List
    text = text.replace(/^\*(.*)/gm, "<ul><li>$1</li></ul>")

    // Magic Words
    const d = new Date()
    text = text.replace(/{{CURRENTYEAR}}/g, () => `${d.getUTCFullYear()}`)

    text = text.replace(/{{CURRENTMONTH}}/g, () => `${pad(d.getUTCMonth() + 1)}`)
    text = text.replace(/{{CURRENTMONTH1}}/g, () => `${d.getUTCMonth() + 1}`)
    // {{CURRENTMONTHNAMEGEN}} placeholder
    text = text.replace(/{{CURRENTMONTHABBREV}}/g, () => `${months[d.getUTCMonth()]}`)

    text = text.replace(/{{CURRENTDAY}}/g, () => `${d.getUTCDate()}`)
    text = text.replace(/{{CURRENTDAY2}}/g, () => `${pad(d.getUTCDate())}`)
    text = text.replace(/{{CURRENTDOW}}/g, () => `${d.getUTCDay()}`)
    text = text.replace(/{{CURRENTDAYNAME}}/g, () => `${dow[d.getUTCDay()]}`)

    // Return Text
    return text
}

const displayMessage = (type: string, text: string) => {
    const el = <HTMLElement>document.querySelector(".message")
    
    el.classList.add(type)
    el.innerHTML = text
    el.style.display = "block"
    return setTimeout(() => {
        el.classList.add("fade-out")

        setTimeout(() => {
            el.style.display = "none"
            el.classList.remove("fade-out")
            el.classList.remove("success")
            el.classList.remove("fail")
        }, 950)
    }, 2500)
}

const newFile = () => {
    document.getElementById("window__new-file").style.display = "none";
    (<HTMLInputElement>document.getElementById("content")).value = "";
    (<HTMLInputElement>document.getElementById("file-name")).value = ""
    document.querySelector(".preview").innerHTML = ""
}

const hideAllWindows = () => {
    const windows = document.querySelectorAll(".window")
    for (let i = 0; i < windows.length; i++) (<HTMLElement>windows[i]).style.display = "none"
}

const setWarning = (html: string) => document.querySelector("#window__warning .window-content").innerHTML = html