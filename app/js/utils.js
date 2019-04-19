// 创建新窗口并关闭当前窗口
function creatWin(url) {
    // 创建新窗口
    const BrowserWindow = require('electron').remote.BrowserWindow
    const path = require('path')

    const modalPath = path.join('file://', __dirname, url)
    let lognWin = new BrowserWindow({
        show: false,
        autoHideMenuBar: false
    })
    lognWin.maximize()
    lognWin.show()

    lognWin.loadURL(modalPath)
    lognWin.show()
        // 关闭当前窗口
    const currentWindow = require('electron').remote.getCurrentWindow()
        // currentWindow.hide()
    currentWindow.close()
}