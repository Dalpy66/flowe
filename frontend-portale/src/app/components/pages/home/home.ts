import { Component } from '@angular/core';
import { Carousel } from "../../share/carousel/carousel";
import { Nav } from "../../share/nav/nav";
import { Footer } from "../../share/footer/footer";
import { Weather } from "../../shared/weather/weather";

@Component({
  selector: 'app-home',
  imports: [Carousel, Nav, Footer, Weather],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  readonly name: string;

  constructor(){
    this.name = sessionStorage.getItem('user') ?? '';
  }
}
