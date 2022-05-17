const windows = document.querySelectorAll(".window")
for (let i = 0; i < windows.length; i++) {
    const window = <HTMLElement>windows[i]
    const x = <HTMLElement>window.querySelector(".window-x")
    x.onclick = () => window.style.display = "none"
}