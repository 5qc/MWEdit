const content = <HTMLInputElement>document.getElementById("content")
const preview = <HTMLElement>document.querySelector(".preview")
const previewFile = <HTMLElement>document.getElementById("preview-file")

const closeChars = new Map([
    ["{", "}"],
    ["[", "]"],
    ["(", ")"],
    ["'", "'"],
    ["\"", "\""]
])

content.onkeydown = (e) => {
    if (e.keyCode === 66 && e.ctrlKey) {
        typeInTextarea("''''''", content)
        content.setSelectionRange(content.selectionStart, content.selectionStart - 3)
    } else if (e.keyCode === 73 && e.ctrlKey) {
        typeInTextarea("''''", content)
        content.setSelectionRange(content.selectionStart, content.selectionStart - 2)
    } else if (e.keyCode === 75 && e.ctrlKey) {
        typeInTextarea("[[]]", content)
        content.setSelectionRange(content.selectionStart, content.selectionStart - 2)
    } else if (e.keyCode === 191 && e.ctrlKey) {
        typeInTextarea("<!--  -->", content)
        content.setSelectionRange(content.selectionStart, content.selectionStart - 4)
    } else if (e.keyCode === 85 && e.ctrlKey) {
        return typeInTextarea("<u></u>", content), content.setSelectionRange(content.selectionStart, content.selectionStart - 4), false
    } else if (e.keyCode === 83 && e.ctrlKey) {
        return typeInTextarea("<s></s>", content), content.setSelectionRange(content.selectionStart, content.selectionStart - 4), false
    } else if (e.keyCode === 68 && e.ctrlKey) {
        return typeInTextarea("<del></del>", content), content.setSelectionRange(content.selectionStart, content.selectionStart - 6), false
    } else if (e.keyCode === 81 && e.ctrlKey) {
        typeInTextarea("<q></q>", content)
        content.setSelectionRange(content.selectionStart, content.selectionStart - 4)
    }
}
content.onkeyup = () => {
    preview.innerHTML = convert(content.value)
}
content.oninput = (e) => {
    const pos = content.selectionStart
    const val = [...content.value]

    const char = val.slice(pos - 1, pos)[0]
    const closeChar = closeChars.get(char)

    if (closeChar) {
        val.splice(pos, 0, closeChar)
        content.value = val.join("")
        content.selectionEnd = pos
    }
}

previewFile.onclick = () => {
    if (preview.style.display === "none") {
        preview.style.display = "block"
        content.style.display = "none"
    } else {
        preview.style.display = "none"
        content.style.display = "block"
    }
}

document.onkeydown = (e) => {
    if (e.keyCode === 80 && e.ctrlKey && e.altKey) previewFile.click()
    else if (e.keyCode === 83 && e.ctrlKey) {
        document.getElementById("window__save-file").style.display = "block"
        return false
    } else if (e.keyCode === 78 && e.ctrlKey && e.altKey) {
        return document.getElementById("new-file").click(), false
    } else if (e.keyCode === 82 && e.ctrlKey && e.shiftKey) {
        return document.getElementById("reset-storage").click(), false
    }
}