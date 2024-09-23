const {app,BrowserWindow,globalShortcut,nativeImage,Menu,Tray,ipcMain} = require('electron');
const path = require('path')
const fs = require('fs');
const process = require('process')
const Screenshots = require("electron-screenshots");
// const debug = require("electron-debug");

function createWindow(){
    if (!fs.existsSync(path.join(process.cwd(), './json.json'))) {
        fs.writeFileSync(path.join(process.cwd(), './json.json'),'{"x":"0","y":"0"}')
    }

  // 获取根目录下的json.json内容并转换为js数组
    const BrowserWindowDate = JSON.parse(fs.readFileSync(path.join(process.cwd(), './json.json')).toString())
    const win = new BrowserWindow({
      // 窗口创建时x y的坐标
        x: parseInt(BrowserWindowDate.x),
        y: parseInt(BrowserWindowDate.y),
        width:400,
        height:300,
        autoHideMenuBar:true,
        frame: false,
        resizable: false,
        transparent: true,
        webPreferences: {
            // 配置预加载脚本
            preload: path.resolve(__dirname, './preload.js')
        }
    })
    
    if(BrowserWindowDate.AlwaysOnTop){
      win.setAlwaysOnTop(BrowserWindowDate.AlwaysOnTop, "screen-saver")
    }else{
      win.setAlwaysOnTop(BrowserWindowDate.AlwaysOnTop)
    }

    win.loadFile('./src/index.html')

    ipcMain.on('saveBrowserWindowBtn', (_,data)=>{fs.writeFileSync(path.join(process.cwd(), './json.json'), data)});

  // 鼠标操作转发
    ipcMain.on('set-ignore-mouse-events', (event, ignore, options) => {
      const win = BrowserWindow.fromWebContents(event.sender)
      win.setIgnoreMouseEvents(ignore, options)
    })

    return win
}

function createTray(win){
  const tray = new Tray(nativeImage.createFromPath(path.join(__dirname, './minLogo.png')));
     
    //新建菜单内容
      const trayContextMenu = Menu.buildFromTemplate([
          {
            label: '保存当前设置',
              click: () => {
                win.webContents.send('setBrowserWindowBtn', {AlwaysOnTop: win.isAlwaysOnTop()})
              }
          },
          {
              label: '显示',
              click: () => {
                //显示的方法
                win.show()
              }
          }, 
          {
              label: '隐藏',
              click: () => {
                //隐藏的方法
                win.hide()
              }
          }, 
          {
              label: '置顶',
              click: () =>{
                win.setAlwaysOnTop(true, "screen-saver")
              }
          },
          {
              label: '取消置顶',
              click: () =>{              
                win.setAlwaysOnTop(false)
              }
          },
          {
              label: '移动',
              click: () => {
                //
                win.webContents.send('setUserselectBtn',"drag")
              }
          },
          {
            label: '锁定',
            click: () => {
              //
              win.webContents.send('setUserselectBtn',"none")
            }
          },
            {
              label: '退出',
              click: () => {
                //退出的方法
                app.quit()
             }
          }
      ]);
       
      //鼠标移入显示内容
      tray.setToolTip('阿巴阿巴');
       
      //  单击显示窗口
      tray.on('click', () => {
        win.show()
      });

      //  添加菜单到托盘
      tray.setContextMenu(trayContextMenu)


}

function createScreenshots(){
  const screenshots = new Screenshots();
  globalShortcut.register("Ctrl+Alt+a", () => {
    screenshots.startCapture();
    globalShortcut.register("esc", () => {
      if (screenshots.$win?.isFocused()) {
        screenshots.endCapture();
      }
      globalShortcut.unregister("esc")
    });
    // screenshots.$view.webContents.openDevTools();
  });
  // 点击确定按钮回调事件
  screenshots.on("ok", (e, buffer, bounds) => {
    console.log("capture", buffer, bounds);
  });
  // 点击取消按钮回调事件
  screenshots.on("cancel", () => {
    console.log("capture", "cancel1");
  });
  screenshots.on("cancel", (e) => {
    // 执行了preventDefault
    // 点击取消不会关闭截图窗口
    e.preventDefault();
    console.log("capture", "cancel2");
  });
  // 点击保存按钮回调事件
  screenshots.on("save", (e, buffer, bounds) => {
    console.log("capture", buffer, bounds);
  });
  // 保存后的回调事件
  screenshots.on("afterSave", (e, buffer, bounds, isSaved) => {
    console.log("capture", buffer, bounds);
    console.log("isSaved", isSaved) // 是否保存成功
  });
}


app.on('ready', ()=>{    
    const win = createWindow()

    createTray(win)

    createScreenshots()


    
    app.commandLine.appendSwitch('wm-window-animations-disabled');

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
