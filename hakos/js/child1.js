// child1

const { remote, ipcRenderer } = require('electron')

const fs = require("fs");

// did-finish-load --------------------------------------------------

ipcRenderer.on('path', (_ , message) => {
    const path = message
    if(check(path)){
        fs.readFile(path, (error, text) => {
            if(error!=null){
                alert("error : " + error);
                return;
            }
            document.getElementById("input").innerHTML = text
        });
    }
})

// --------------------------------------------------


// every --------------------------------------------------

document.getElementById('close1').addEventListener('click',closeWindow);

function closeWindow(){
    var text = document.getElementById("input")
    ipcRenderer.send('save_child1', text.innerHTML)
    window.close()
}

// --------------------------------------------------