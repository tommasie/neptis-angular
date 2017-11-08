import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class NotificationService {

    notifications: notification[] = [];

    subject: Subject<notification> = new Subject();

    isOpen: boolean = false;
    type: string;
    message: string;

    push(data: notification) {
        if(this.notifications.length == 1) {
            this.notifications.pop();
        }
        this.notifications.push(data);
    }
}

interface notification {
    type: string;
    message: string;
    isOpen: boolean;
}
