function createAlert(message, status = 'primary', title = '') {
    const alert = document.getElementById('alert')
    try {
        message = JSON.parse(message);
    } catch (e) {
        
    }
    
    if (typeof message == 'object') {
        if (Object.keys(message).length == 1) {
            message = message[Object.keys(message)[0]];
        } else {
            ul = document.createElement('ul');
            Object.keys(message).forEach(key => {
                li = document.createElement('li').innerHTML = message[key];
                ul.append(li);
            });
            message = ul.innerHTML;
        }
    } else if (typeof message == 'array') {
        if (message.length == 1) {
            message = message[0];
        } else {
            ul = document.createElement('ul');
            message.forEach(key => {
                li = document.createElement('li').innerHTML = message[key];
                ul.append(li);
            });
            message = ul.innerHTML;
        }
    }

    tmp = document.createElement('div');
    tmp.innerHTML = `<div class="alert alert-${status} alert-dismissible fade show" role="alert"><strong>${title}</strong> ${message}<button type="button" class="btn-close" data-dismiss="alert" aria-label="Close"></button></div>`;
    alert.append(tmp.firstChild);
}