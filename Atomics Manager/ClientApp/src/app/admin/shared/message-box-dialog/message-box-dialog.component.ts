import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { messageBoxType } from '../../domain/messagebox.enum';

@Component({
  selector: 'app-message-box-dialog',
  templateUrl: './message-box-dialog.component.html',
  styleUrls: ['./message-box-dialog.component.scss']
})
export class MessageBoxDialogComponent implements OnInit {
public titre :string;
public message :string;
//public messageboxType :messageBoxType;
public icone:string;
public style: number;
public color:string;
public information: string;
public button: number;
public allow_outside_click: boolean;

  constructor(public dialogRef: MatDialogRef<MessageBoxDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { 

    this.style = data.style || 0;
    this.titre = data.titre;
    this.message = data.message;
    this.information = data.information;
    this.button = data.button;
    this.dialogRef.disableClose = !data.allow_outside_click || false;
    this.icone = data.messageboxType;
    this.color=data.color;
  }

  ngOnInit() {
         
    
  }

 

onOk() {
  this.dialogRef.close({result: "ok"});
}
onCancel() {
  this.dialogRef.close({result: "cancel"});
}
onYes() {
  this.dialogRef.close({result: "yes"});
}
onNo() {
  this.dialogRef.close({result: "no"});
}
onAccept() {
  this.dialogRef.close({result: "accept"});
}
onReject() {
  this.dialogRef.close({result: "reject"});
}
}
