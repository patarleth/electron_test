const { app, BrowserWindow, nativeImage, ipcMain } = require('electron')
const { Tray, Menu } = require('electron/main')
const { icons } = require('./icons')
const path = require('path')

//const nodeConsole = require('console');
//const logger = new nodeConsole.Console(process.stdout, process.stderr);

logger = console

let tray

global.doh_button_clicked = async function() { 
  logger.log('doh_button_clicked') 
  return 'doh_button_clicked'
}
global.default_button_clicked = async function() { 
  logger.log('default_button_clicked') 
  return 'default_button_clicked'
}
global.danger_button_clicked = async function() { 
  logger.log('danger_button_clicked')  
  return 'danger_button_clicked'
}
global.dropdown_button_clicked = async function() { 
  logger.log('dropdown_button_clicked')  
  return 'dropdown_button_clicked'
}
global.dropdown_active_clicked = async function() { 
  logger.log('dropdown_active_clicked')  
  return 'dropdown_active_clicked'
}
global.dropdown_1_clicked = async function() { 
  logger.log('dropdown_1_clicked')  
  return 'dropdown_1_clicked'
}
global.dropdown_item2_clicked = async function() { 
  logger.log('dropdown_item2_clicked')  
  return 'dropdown_item2_clicked'
}
global.dropdown_item3_clicked = async function() { 
  logger.log('dropdown_item3_clicked')  
  return 'dropdown_item3_clicked'
}
global.dropdown_item4_clicked = async function() { 
  logger.log('dropdown_item4_clicked')  
  return 'dropdown_item4_clicked'
}
global.hover_click_button_clicked = async function() { 
  logger.log('hover_click_button_clicked')  
  return 'hover_click_button_clicked'
}
global.model_open_button_clicked = async function() { 
  logger.log('model_open_button_clicked')  
  return 'model_open_button_clicked'
}
global.model_cancel_button_clicked = async function() { 
  logger.log('model_cancel_button_clicked')  
  return 'model_cancel_button_clicked'
}
global.model_save_button_clicked = async function() { 
  logger.log('model_save_button_clicked')  
  return 'model_save_button_clicked'
}

ipcMain.handle('doh_button', async (event, data) => { return await global.doh_button_clicked() })
ipcMain.handle('default_button', async (event, data) => { return await global.default_button_clicked() })
ipcMain.handle('danger_button', async (event, data) => { return await global.danger_button_clicked() })
ipcMain.handle('dropdown_button', async (event, data) => { return await global.dropdown_button_clicked() })
ipcMain.handle('dropdown_active', async (event, data) => { return await global.dropdown_active_clicked() })
ipcMain.handle('dropdown_1', async (event, data) => { return await global.dropdown_1_clicked() })
ipcMain.handle('dropdown_item2', async (event, data) => { return await global.dropdown_item2_clicked() })
ipcMain.handle('dropdown_item3', async (event, data) => { return await global.dropdown_item3_clicked() })
ipcMain.handle('dropdown_item4', async (event, data) => { return await global.dropdown_item4_clicked() })
ipcMain.handle('hover_click_button', async (event, data) => { return await global.hover_click_button_clicked() })
ipcMain.handle('model_open_button', async (event, data) => { return await global.model_open_button_clicked() })
ipcMain.handle('model_cancel_button', async (event, data) => { return await global.model_cancel_button_clicked() })
ipcMain.handle('model_save_button', async (event, data) => { return await global.model_save_button_clicked() })


const createWindow = () => {
  const win = new BrowserWindow({
    width: 1024,
    height: 800,
    icon: nativeImage.createFromDataURL(icons.app),
    webPreferences: {
      preload: path.join(app.getAppPath(), 'renderer.js'),
      nodeintegration: true,
      contextIsolation: false
    }
  })
  
  win.setIcon(nativeImage.createFromDataURL(icons.app))
  win.loadFile('index.html')
  //win.webContents.openDevTools()

  global.win = win
}

global.trayListener = function(e) {
  const msg = "message for tray menu select " + e.label
  console.log(msg)
  global.win.webContents.send('tray_menu_change', e.label, msg)
}

app.whenReady().then(() => {

  tray = new Tray(nativeImage.createFromDataURL(icons.tray))

  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio', click: global.trayListener },
    { label: 'Item2', type: 'radio', click: global.trayListener },
    { label: 'Item3', type: 'radio', checked: true, click: global.trayListener },
    { label: 'Item4', type: 'radio', click: global.trayListener }
  ])

  tray.setToolTip('go ducks')
  tray.setContextMenu(contextMenu)
  tray.setIgnoreDoubleClickEvents(true)
  
  createWindow()
})
