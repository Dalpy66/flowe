import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { WeatherService } from '../../../service/weather';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather',
  imports: [CommonModule, CommonModule],
  templateUrl: './weather.html',
  styleUrl: './weather.css',
})
export class Weather implements OnInit {
  weatherData: any = null;

  constructor(
    private weatherService: WeatherService,
    private cdr: ChangeDetectorRef
  ) { }


  ngOnInit(): void {
    this.weatherService.getWeather('Vicenza,IT').subscribe({
      next: (data) => {
        this.weatherData = data;
        this.cdr.detectChanges(); 
      },
      error: (err) => console.error('Errore meteo', err)
    });
  }
}