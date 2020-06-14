const { app, BrowserWindow, Menu, ipcMain } = require('electron');

const url = require('url');
const path = require('path');
const fs = require("fs");


let mainWindow;
let child1=null;
const ws = 200;
const hs = 200;

var child1_path = app.getPath('userData')+'/child1.txt';

function createMainWindow(){
  mainWindow = new BrowserWindow({
    width: ws, 
    height: hs,

    resizable:false,
    "frame": false,
    "backgroundColor": "#white",
    webPreferences: {
      nodeIntegration: true
    },
    'icon': 'build/icon.ico',
  });

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'html/parent.html'),
    protocol: 'file:',
    slashes: true,
  }));

  // Dev
  //mainWindow.webContents.openDevTools();

  Menu.setApplicationMenu(null);

  mainWindow.on('closed', function() {
    
      mainWindow = null;
  });
}

function createSubWindow(main_x, main_y){
  child1 = new BrowserWindow({ 
    parent: mainWindow,

    width: ws, 
    height: hs,

    x:main_x-ws,
    y:main_y+hs,

    "frame": false,
    "backgroundColor": "#white",
    webPreferences: {
      nodeIntegration: true
    },
  });

  child1.loadURL(url.format({
    pathname: path.join(__dirname, 'html/child1.html'),
    protocol: 'file:',
    slashes: true,
  }));

  // Dev
  //child1.webContents.openDevTools();

  child1.on('closed', function() {

    child1 = null;

  });

  child1.webContents.on('did-finish-load', () => {
    child1.webContents.send('path', child1_path)
  });
}
let child1_bool = true;

app.on('ready', () => {
  createMainWindow()

  // child1
  ipcMain.on('button1', () => {
    if(child1_bool){
      let main_x = mainWindow.webContents.getOwnerBrowserWindow().getBounds().x;
      let main_y = mainWindow.webContents.getOwnerBrowserWindow().getBounds().y;
      createSubWindow(main_x, main_y);
      child1_bool = false;
    }
    
  })

  ipcMain.on('save_child1', (_, arg) => {
    if(check(child1_path)){
      writeFile(child1_path, arg)
    }
    child1_bool = true
    mainWindow.webContents.send('fin_child1', 'fin')
  })

});

// functions
function check(filePath) {
  let isExist = false;
  try {
    fs.readFileSync(filePath);
    isExist = true;
  } catch(err) {
    isExist = false;
  }
  return isExist;
  }

function writeFile(path, data) {
  fs.writeFile(path, data, function (err) {
    if (err) {
        console.log(err);
    }
  });
}