import { Component } from '@angular/core';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-diferred-side-panel',
  templateUrl: './diferred-side-panel.component.html',
  styleUrl: './diferred-side-panel.component.css'
})
export class DiferredSidePanelComponent {
  isOpen = false;

  constructor(private commonService: CommonService) {}

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }

  logout() {
    this.commonService.logout();
  }
}
