const { remote, ipcRenderer } = require('electron')

const buttonIds = [ 
    'doh_button', 'default_button', 'danger_button', 'dropdown_button',
    'dropdown_active', 'dropdown_1', 'dropdown_item2', 'dropdown_item3',
    'dropdown_item4', 'hover_click_button', 'model_open_button',
    'model_cancel_button','model_save_button'
]

window.onload = function(e) {
    console.log('renderer.js to the rescue!')
    const alertBox = document.getElementById('alert-box')
    buttonIds.forEach((id) => {
        const next = document.getElementById(id);
        if(next) { 
            next.onclick = () => { 
                ipcRenderer.invoke(id, 'clicked').then( (result) => {
                    const msg = 'button ' + id + ' returned ' + result
                    console.log(msg)
                    alertBox.innerHTML = msg
                })
            }
        } else {
            console.log(id +' not found')
        }
    })
}