const content = <HTMLInputElement>document.getElementById("content")
const preview = <HTMLElement>document.querySelector(".preview")
const previewFile = <HTMLElement>document.getElementById("preview-file")

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
    }
}
content.onkeyup = () => {
    preview.innerHTML = convert(content.value)
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
}