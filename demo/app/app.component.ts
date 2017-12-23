import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';
import { CoreService } from '../../src/app/app';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  @ViewChild('postTask') postTask: TemplateRef<any>;
  title = 'app';
  constructor(
    public core: CoreService
  ) { }

  ngOnInit() {
    console.log(this.postTask);
  }

  onHome(e: any) {
    this.core.showMenu({ show: true });
  }

  onFinish(e: any) {
    this.core.showPopover({ tpl: this.postTask });
  }
}
