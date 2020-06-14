// parent

const { remote, ipcRenderer } = require('electron')

document.getElementById('button1').addEventListener('click', () => {
    ipcRenderer.send('button1', 'Open child1')
    document.getElementById("button1").innerHTML = ''
});

ipcRenderer.on('fin_child1', () => {
    document.getElementById("button1").innerHTML = 'o'
})

// every --------------------------------------------------

document.getElementById('close').addEventListener('click',closeWindow);

function closeWindow(){
    var window = remote.getCurrentWindow();
    window.close()
}

// --------------------------------------------------