

const { app, BrowserWindow } = require('electron');
const path = require('path');
const url  = require('url');


var win;

function createWindow() {
    win = new BrowserWindow( { width : 1600, height : 1100 } );

    win.loadURL( url.format({
        pathname: path.join(__dirname, './views/login.html'),
        protocol: 'file:',
        slashes: true
    }));

    win.on( 'closed', () => {
        win = null
    });
}

app.on('ready', () => {

    createWindow()

});


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electron_app.quit()
    }
});


app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
});

