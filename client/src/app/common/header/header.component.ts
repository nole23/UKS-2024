import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { DiferredSidePanelComponent } from './diferred-side-panel/diferred-side-panel.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements AfterViewInit {
  @ViewChild(DiferredSidePanelComponent) sidePanel: DiferredSidePanelComponent | undefined;

  ngAfterViewInit() {
    // Ovaj kod će biti izvršen kada Angular završi sa inicijalizacijom child komponenti
    console.log(this.sidePanel);  // Sada će biti inicijalizovano
  }

  openPanel() {
    if (this.sidePanel !== undefined) {
      this.sidePanel.open();  // Poziva metodu za otvaranje panela
    }
  }
}
