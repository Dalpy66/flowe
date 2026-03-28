import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Nav } from "../../share/nav/nav";
import { Footer } from "../../share/footer/footer";
import { AgCharts } from 'ag-charts-angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoricoMisure } from '../../../responce/storicoMisure';
import { Sensore } from '../../../responce/sensore';
import { Sensoriservice } from '../../../service/sensoriservice';

interface ChartConfig {
  label: string;
  key: keyof StoricoMisure;
  unit: string;
  color: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [Nav, Footer, AgCharts, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class Dashboard implements OnInit {

  sensoriService = inject(Sensoriservice);

  sensors: Sensore[] = [];

  availableSensors = [
    { id: 1, name: 'Sensor 1', id_convertitore: 'CONVERTER-M001' },
    { id: 2, name: 'Sensor 2', id_convertitore: 'CONVERTER-M002' },
  ];

  selectedSensorId: number = 1;

  readonly chartConfigs: ChartConfig[] = [
    { label: 'Temperatura', key: 'temperatura', unit: '°C', color: '#e07b39' },
    { label: 'Umidità', key: 'umidita', unit: '%', color: '#4a9eda' },
    { label: 'Conducibilità', key: 'conducibilita', unit: 'µS/cm', color: '#9b59b6' },
    { label: 'pH', key: 'ph', unit: '', color: '#27ae60' },
    { label: 'Azoto', key: 'azoto', unit: 'mg/L', color: '#2ecc71' },
    { label: 'Fosforo', key: 'fosforo', unit: 'mg/L', color: '#e74c3c' },
    { label: 'Potassio', key: 'potassio', unit: 'mg/L', color: '#f39c12' },
  ];

  constructor(private cdr: ChangeDetectorRef){

  }

  ngOnInit() {
    this.loadSensorHistory(this.selectedSensorId);
  }

  loadSensorHistory(sensorId: number) {
    this.sensoriService.getStoricoBySensoreId(sensorId).subscribe({
      next: (data: Sensore) => {
        console.log(data);
        this.sensors = [data];
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('Errore caricamento sensore:', err);
      }
    });
  }

  onSensorChange() {
    this.loadSensorHistory(this.selectedSensorId);
  }

  getChartOptions(config: ChartConfig): any {

    if (!this.sensors.length) return {};

    const storico = this.sensors[0].storico_misure;

    const data = Array.isArray(storico)
      ? storico.map((m: any, idx: number) => ({
        label: `Misura ${idx + 1}`,
        value: m[config.key]
      }))
      : [{
        label: 'Misura 1',
        value: storico[config.key]
      }];

    return {
      data,
      series: [
        {
          type: 'bar',
          xKey: 'label',
          yKey: 'value',
          yName: `${config.label}${config.unit ? ' (' + config.unit + ')' : ''}`,
          fill: config.color,
          cornerRadius: 6,
        },
      ],
      axes: [
        { type: 'category', position: 'bottom' },
        {
          type: 'number',
          position: 'left',
          label: {
            formatter: (p: any) => `${p.value} ${config.unit}`
          },
        },
      ],
      background: { fill: 'transparent' },
    };
  }

  trackByKey(index: number, item: any) {
    return item.key;
  }
}