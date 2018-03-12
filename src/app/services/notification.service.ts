import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class NotificationService {

    notifications: INotification[] = [];

    subject: Subject<INotification> = new Subject();

    isOpen = false;
    type: string;
    message: string;

    push(data: INotification) {
        if (this.notifications.length === 1) {
            this.notifications.pop();
        }
        this.notifications.push(data);
    }
}

interface INotification {
    type: string;
    message: string;
    isOpen: boolean;
}
