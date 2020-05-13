const { app, BrowserWindow } = require("electron");

function createWindow() {
  // Erstelle das Browser-Fenster.
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // and load the index.html of the app.
  win.loadFile(__dirname + "/index.html");
  win.webContents.openDevTools();
}

app.on("ready", createWindow);
