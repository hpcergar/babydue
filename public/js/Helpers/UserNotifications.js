import $ from 'jquery';
import noty from 'noty';

class UserNotifications{

    static show(msg, type){
        noty({
            text: msg,
            type: type || 'notification',
            timeout:3000,
            layout:'bottomLeft'
        });
    }

    static showError(msg){
        UserNotifications.show(msg, 'error');
    }

    static showSuccess(msg){
        UserNotifications.show(msg, 'success');
    }

    static showInfo(msg){
        UserNotifications.show(msg, 'information');
    }
}

export default UserNotifications;