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
  ngOnInit() { }

  onHome() {
    this.core.showMenu({ show: true });
  }
}
