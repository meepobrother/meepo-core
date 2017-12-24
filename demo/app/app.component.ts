import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef, ChangeDetectorRef } from '@angular/core';
// import { CoreService } from 'meepo-core';
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
  post: any;
  constructor(
    public core: CoreService,
    public cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    console.log(this.postTask);
  }

  onHome(e: any) {
    this.core.showMenu({ show: true });
  }

  onFinish(e: any) {
    this.post = e;
    console.log(this.post);
    this.core.showPopover({ tpl: this.postTask });
    this.cd.markForCheck();
  }
}
