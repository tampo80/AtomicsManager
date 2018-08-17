import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { buttonAction } from '../../config';

@Component({
  selector: 'app-new-edition-dialog',
  templateUrl: './new-edition-dialog.component.html',
  styleUrls: ['./new-edition-dialog.component.scss']
})
export class NewEditionDialogComponent implements OnInit {

  public titre: string;
  public icone: string;
  public color: string;
  public helpHint: string;
  public button: number;
  public allow_outside_click: boolean;

  constructor(public dialogRef: MatDialogRef<NewEditionDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

    this.titre = data.titre;

    this.button = data.button;
    this.dialogRef.disableClose = !data.allow_outside_click || false;
    this.icone = data.messageboxType;
    this.color = data.color;
  }

  ngOnInit() {
  }
  onOk() {
    this.dialogRef.close({result: buttonAction.yes});
  }
  onCancel() {
    this.dialogRef.close({result: buttonAction.cancel});
  }
  onMore() {
    this.dialogRef.close({result: buttonAction.more});
  }
  onNo() {
    this.dialogRef.close({result: buttonAction.no});
  }
}
