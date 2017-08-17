import { ipcMain,dialog,app } from 'electron'
import * as DbWrapper from './dbWrapper'

ipcMain.on('open-file-dialog', e => {
    dialog.showOpenDialog({
        properties: ['openFile']
    }, files => {
        e.sender.send('selected-file', files)
    })
})

ipcMain.on('login', (e,arg) => {
    DbWrapper.default.getUser(arg.password, (result) => {
        if(result) {
            e.sender.send('login-result', "OK")
        } else {
            e.sender.send('login-result',"Failed")
        }
    })
})

ipcMain.on('modify-password', (e,arg) => {
    DbWrapper.default.setPassword(arg.password, (result) => {
        if(result) {
            e.sender.send('modify-result', "OK")
        } else {
            e.sender.send('modify-result',"Failed")
        }
    })
})

ipcMain.on('chk-login', (e,arg) => {
    DbWrapper.default.getUser(arg.password, (result) => {
        if(result) {
            e.sender.send('chk-login-result', "OK")
        } else {
            e.sender.send('chk-login-result',"Failed")
        }
    })
})

ipcMain.on('add-history', (e, arg) => {
    DbWrapper.default.addHistory(arg.data, (result) => {
        e.returnValue = result ? "OK" : "Failed"
    })
})

ipcMain.on('get-history', (e, arg) => {
    console.log('get-history')
    DbWrapper.default.getHistory( (result) => {
        e.returnValue = result 
    })
})

ipcMain.on('save-dialog', (event, file) => {
    const options = {
        title: '保存文件',
        defaultPath: file.substring(0, file.lastIndexOf('.')),
        filters: [
            { name: 'CSV文件', extensions: ['csv'] }
        ]
    }
    dialog.showSaveDialog(options, (filename) => {
        event.sender.send('file-saved', filename)
    })
})

ipcMain.on('close-window', (e,arg) => {
    app.quit()
})