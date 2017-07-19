
const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const url  = require('url');


var win;


var menu_template = [
    {
        label: 'Edit',
        submenu: [
            {role: 'undo'},
            {role: 'redo'},
            {type: 'separator'},
            {role: 'cut'},
            {role: 'copy'},
            {role: 'paste'},
            {role: 'pasteandmatchstyle'},
            {role: 'delete'},
            {role: 'selectall'}
        ]
    },
    {
        label: 'View',
        submenu: [
            {role: 'reload'},
            {role: 'forcereload'},
            {role: 'toggledevtools'},
            {type: 'separator'},
            {role: 'resetzoom'},
            {role: 'zoomin'},
            {role: 'zoomout'},
            {type: 'separator'},
            {role: 'togglefullscreen'}
        ]
    },
    {
        role: 'window',
        submenu: [
            {role: 'minimize'},
            {role: 'close'}
        ]
    },
    {
        role: 'help',
        submenu: [
            {
                label: 'View Adipisici on Github',
                click () { require('electron').shell.openExternal('https://github.com/rpbeltran/Adipisici-CMS') }
            },
            {
                label: 'View Adipisici Dashboard on Github',
                click () { require('electron').shell.openExternal('https://github.com/rpbeltran/Adipisici-Dashboard') }
            }
        ]
    }
];


if (process.platform === 'darwin') {
    menu_template.unshift({
        label: app.getName(),
        submenu: [
            {role: 'about'},
            {type: 'separator'},
            {role: 'services', submenu: []},
            {type: 'separator'},
            {role: 'hide'},
            {role: 'hideothers'},
            {role: 'unhide'},
            {type: 'separator'},
            {role: 'quit'}
        ]
    });

    // Edit menu
    menu_template[1].submenu.push(
        {type: 'separator'},
        {
            label: 'Speech',
            submenu: [
                {role: 'startspeaking'},
                {role: 'stopspeaking'}
            ]
        }
    );

    // Window menu
    menu_template[3].submenu = [
        {role: 'close'},
        {role: 'minimize'},
        {role: 'zoom'},
        {type: 'separator'},
        {role: 'front'}
    ];
}


var menu = Menu.buildFromTemplate(menu_template);


function createWindow() {
    win = new BrowserWindow( {
        title  : 'Adipisici',
        width  : 1600,
        height : 1100
    } );

    win.loadURL( url.format({
        pathname: path.join(__dirname, './views/login.html'),
        protocol: 'file:',
        slashes: true
    }));

    win.on( 'closed', () => {
        win = null
    });

    Menu.setApplicationMenu(menu);

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

