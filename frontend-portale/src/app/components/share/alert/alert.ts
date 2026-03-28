import { Component, Input } from '@angular/core';
import { CommonComponents } from '../commonComponents';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert',
  imports: [CommonModule],
  templateUrl: './alert.html',
  styleUrl: './alert.css',
})
export class Alert {
  @Input()
  message: string|null = null;

  constructor(){
    this.showError()
  }

  // Mostra l'alert
  showError() {
    // Facoltativo: scompare automaticamente dopo 5 secondi
    setTimeout(() => {
      this.message = null;
    }, 5000);
  }

  // Chiudi manualmente
  closeError() {
    this.message = null;
  }
}
