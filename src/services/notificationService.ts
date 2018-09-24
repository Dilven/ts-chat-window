declare const window: any;

interface INotification {
  content: string;
  duration?: number;
}

const Notification = window.Notification;

class NotificationService {
  notificationsSupported = !!Notification;
  
  requestDesktopNotificationPermission = () => {
    if(Notification && Notification.permission === 'default') {
      Notification.requestPermission(permission => {
        if(!('permission' in Notification)) {
          Notification.permission = permission;
        }
      });
    }
  }

  desktopNotification = (payload: INotification) => {
    if (this.notificationsSupported && Notification.permission === "granted") {
      this.sendDesktopNotification(payload);
      this.playSound()
    }
  }

  playSound = () => {
    const sound = <HTMLAudioElement>document.getElementById('sound');
    if (sound) {
      sound.play();
    }
  }

  sendDesktopNotification = (payload: INotification) => {
    const notification = new Notification("TS Chat", {
      body: payload.content,
      tag: "new message"
    });

    notification.onclick = function() {
      parent.focus();
      window.focus();
      this.close();
    };
    setTimeout(notification.close.bind(notification), payload.duration || 3000);
  }
}

export default new NotificationService();
