import { Injectable } from '@angular/core';
import { NgbAlertConfig, NgbAlert } from '@ng-bootstrap/ng-bootstrap';

interface Alert {
  type: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private alert: Alert;
  public visible: Boolean;

  constructor(private alertConfig: NgbAlertConfig) {
    this.alert = null;
    this.visible = false;
   }

  triggerAlert(_type: string, _message: string, _dismissable: boolean = true) {
    this.alert = {
      type: _type,
      message: _message,
    };

    this.alertConfig.dismissible = _dismissable;

    this.visible = true;
      setTimeout(() => {
        this.resetAlert();
      }, 10000);
  }

  getMessage(): string {
    return this.alert.message;
  }

  getType(): string {
    return this.alert.type;
  }

  closeAlert() {
    this.resetAlert();
  }

  resetAlert() {
    this.alert = null;
    this.visible = false;
  }
}
