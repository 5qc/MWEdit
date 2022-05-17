const resetBtn = document.getElementById("reset-btn")
resetBtn.onclick = () => {
    for (let i = 0; i < Object.keys(localStorage).length; i++) {
        const item: string = Object.keys(localStorage)[i]
        if (item.startsWith("MWEdit-mih7sf5eep.")) localStorage.removeItem(item)
    }
    location.reload()
}