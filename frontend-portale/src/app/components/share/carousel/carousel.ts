import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Sensore } from '../../../responce/sensore';
import { Alert } from '../alert/alert';

@Component({
  selector: 'app-carousel',
  imports: [CommonModule, Alert],
  templateUrl: './carousel.html',
  styleUrl: './carousel.css',
})
export class Carousel {
  readonly sensors: Sensore[] = [];
  msg: string = "ciao"

  currentIndex = 0; // indice attuale del carosello
  isSliding = false; // evita click multipli veloci

  nextSlide() {
    if (this.isSliding) return;
    this.isSliding = true;

    this.currentIndex = (this.currentIndex + 1) % this.sensors.length;

    setTimeout(() => this.isSliding = false, 300); // debounce per evitare loop
  }

  prevSlide() {
    if (this.isSliding) return;
    this.isSliding = true;

    this.currentIndex =
      (this.currentIndex - 1 + this.sensors.length) % this.sensors.length;

    setTimeout(() => this.isSliding = false, 300);
  }
}
