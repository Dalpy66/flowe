import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Sensore } from '../../../responce/sensore';
import { Alert } from '../alert/alert';
import { Sensoriservice } from '../../../service/sensoriservice';

@Component({
  selector: 'app-carousel',
  imports: [CommonModule, Alert],
  templateUrl: './carousel.html',
  styleUrl: './carousel.css',
})
export class Carousel implements OnInit{
  sensors: Sensore[] = [];
  msg: string = "ciao"

  currentIndex = 0; // indice attuale del carosello
  isSliding = false; // evita click multipli veloci

  sensoriService: Sensoriservice = inject(Sensoriservice);
  
  ngOnInit(): void {
    this.sensoriService.getStoricoBySensoreId(1).subscribe((data: Sensore) => {
      console.log(data)
      this.sensors.push(data)
    })

    this.sensoriService.getStoricoBySensoreId(2).subscribe((data: Sensore) => {
      console.log(data)
      this.sensors.push(data)
    })
  }

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
