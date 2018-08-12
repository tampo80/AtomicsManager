import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../services/navigation.service';
import { MessageboxService } from '../services/messagebox.service';

@Component({
  selector: 'app-under-construction',
  templateUrl: './under-construction.component.html',
  styleUrls: ['./under-construction.component.scss']
})
export class UnderConstructionComponent implements OnInit {
  public result: any;
  constructor(
    public navigationService: NavigationService, public messageboxService: MessageboxService
  ) { }

  ngOnInit() {
  }


  public openDialog() {
    this.messageboxService
      .ShowMessage('Avertissment', 'ok?', 'oooo', 2, false, 1, '600px', 'warning', 'warn')
      .subscribe(res => {this.result = res;

      console.log(res);

      });
  }
}
