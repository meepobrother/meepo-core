import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CoreService } from '../../src/app/app';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(
    public core: CoreService
  ) { }

  ngOnInit() {
    this.core.addToast({
      title: '网络错误',
      message: '请检查您的网络链接',
      type: 'warning',
      position: ''
    });

    setTimeout(()=>{
      this.core.addToast({
        title: '网络错误',
        message: '请检查您的网络链接',
        type: 'info'
      });
    },1000)
  }

  onHome() {
    this.core.showMenu({ show: true });
  }
}
