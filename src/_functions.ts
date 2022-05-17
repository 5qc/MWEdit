const request = (url, func) => {
    const client = new XMLHttpRequest()
    client.onreadystatechange = func
    client.open("GET", url, true)
    return client.send()
}

const typeInTextarea = (newText, el = <HTMLInputElement>document.activeElement) => {
    const start = el.selectionStart
    const end = el.selectionEnd
    const text = el.value
    const before = text.substring(0, start)
    const after  = text.substring(end, text.length)
    el.value = (before + newText + after)
    el.selectionStart = el.selectionEnd = start + newText.length
    el.focus()
}

const convert = (text) => {
    text = text.replace(/'''(.*?)'''/g, "<b>$1</b>")
    text = text.replace(/''(.*?)''/g, "<i>$1</i>")
    text = text.replace(/\[\[(.*?)\|(.*?)\]\]/g, "<span class=\"link\" title=\"Links to: $1\">$2</span>")
    text = text.replace(/\[\[(.*?)\]\]/g, "<span class=\"link\" title=\"Links to: $1\">$1</span>")

    return text
}