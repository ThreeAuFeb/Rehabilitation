const electron = require('electron'); // 控制应用生命周期的模块
const { app } = electron; // 创建本地浏览器窗口的模块
const { BrowserWindow } = electron;

// 指向窗口对象的一个全局引用，如果没有这个引用，那么当该javascript对象被垃圾回收的// 时候该窗口将会自动关闭
let win;

function createWindow() {
    // 创建一个新的浏览器窗口
    // win = new BrowserWindow({ width: 1104, height: 620 }); //570+50
    win = new BrowserWindow({ show: false });
    win.maximize()
    win.show()

    // 并且装载应用的index.html页面
    win.loadURL(`file://${__dirname}/html/index.html`);

    // 打开开发工具页面//   win.webContents.openDevTools();

    // 当窗口关闭时调用的方法
    win.on('closed', () => {
        // 解除窗口对象的引用，通常而言如果应用支持多个窗口的话，你会在一个数组里
        // 存放窗口对象，在窗口关闭的时候应当删除相应的元素。
        win = null;
    });
}
// 当Electron完成初始化并且已经创建了浏览器窗口，则该方法将会被调用。// 有些API只能在该事件发生后才能被使用。
app.on('ready', createWindow);
// 当所有的窗口被关闭后退出应用
app.on('window-all-closed', () => {
    // 对于OS X系统，应用和相应的菜单栏会一直激活直到用户通过Cmd + Q显式退出
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // 对于OS X系统，当dock图标被点击后会重新创建一个app窗口，并且不会有其他
    // 窗口打开
    if (win === null) {
        createWindow();
    }
});
// 在这个文件后面你可以直接包含你应用特定的由主进程运行的代码。// 也可以把这些代码放在另一个文件中然后在这里导入。
const ipc = require('electron').ipcMain
const url = require('url')
const path = require('path')
let user_login = null
ipc.on('user_login', () => {
    if (win) {
        win.hide();
    }
    user_login = new BrowserWindow({
        show: false, //是否显示边框
        // width: 1104,
        // height: 620,
    })
    user_login.maximize()
    user_login.show()
    const user_url = url.format({
        pathname: path.join(__dirname, '/html/subHome.html'),
        protocol: 'file',
        slashes: true
    })
    user_login.loadURL(user_url)
    user_login.on('closed', () => {
        user_login = null
    })
})