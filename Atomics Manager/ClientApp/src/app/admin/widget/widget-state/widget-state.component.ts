import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-widget-state',
  templateUrl: './widget-state.component.html',
  styleUrls: ['./widget-state.component.scss']
})
export class WidgetStateComponent implements OnInit {


  @Input() icon: string;
  @Input() backgroundcolor: string;
  @Input() changeicon: string;
  @Input() changepercent: string;
  @Input() property: string;
  @Input() textcolor: string;
  @Input() value: string;
  @Input() valueprefix: string;
  constructor() { }

  ngOnInit() {
  }

}
