const newFileWindow = document.getElementById("window__new-file")
const yesBtn = document.getElementById("unsaved-yes")
const noBtn = document.getElementById("unsaved-no")

yesBtn.onclick = () => {
    newFileWindow.style.display = "none"
    newFile()
}
noBtn.onclick = () => newFileWindow.style.display = "none"