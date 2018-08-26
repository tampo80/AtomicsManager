import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig  } from '@angular/material';

import { MessageBoxDialogComponent } from '../shared/message-box-dialog/message-box-dialog.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageboxService {

  constructor(private dialog: MatDialog) { }

  /**
   * ShowMessage
titre:string,message:string   */
  public ShowMessage(titre: string, message: string, information: any, button = 0, allow_outside_click = false,
    style = 0, width = '200px', messageboxType= 'info', color= 'primary'): Observable<boolean> {

    let dialogRef: MatDialogRef<MessageBoxDialogComponent>;
    dialogRef = this.dialog.open(MessageBoxDialogComponent, {
      data: {
        titre: titre || 'Alert',
        message: message,
        information: information,
        button: button || 0,
        style: style || 0,
        messageboxType: messageboxType || 'info',
        color: color || 'primary',
        allow_outside_click: allow_outside_click || false


      },
      panelClass: 'atomics-dialog-container',
      width: width
    });
    dialogRef.componentInstance.titre = titre;
    dialogRef.componentInstance.message = message;


    return dialogRef.afterClosed();
  }


}
export  enum MessageBoxButton {
  Ok = 0,
  OkCancel = 1,
  YesNo = 2,
  AcceptReject = 3
}

export  enum MessageBoxStyle {
  Simple = 0,
  Full = 1
}
