import { Component, OnInit } from '@angular/core';
import { Nav } from "../../share/nav/nav";
import { Footer } from "../../share/footer/footer";
import { AgCharts } from 'ag-charts-angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoricoMisure } from '../../../responce/storicoMisure';
import { Sensore } from '../../../responce/sensore';

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
  styleUrls: ['./dashboard.css'], // ✅ corretto
})
export class Dashboard implements OnInit {

  // storico completo di tutti i sensori
  fullSensorsHistory: Sensore[] = [];

  sensors: Sensore[] = []; // quello mostrato nel grafico

  availableSensors = [
    { id: 1, name: 'Sensor 1', id_convertitore: 'CONVERTER-M001' },
    { id: 2, name: 'Sensor 2', id_convertitore: 'CONVERTER-M002' },
    { id: 3, name: 'Sensor 3', id_convertitore: 'CONVERTER-M003' },
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

  ngOnInit() {
    this.loadSensorHistory(this.selectedSensorId);
  }

  getChartOptions(config: ChartConfig): any {
    const data = this.sensors.map((s, idx) => ({
      label: `Misura ${idx + 1}`,
      value: s.storico_misure[config.key as any] as any,
    }));

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
          label: { formatter: (p: any) => `${p.value} ${config.unit}` },
        },
      ],
      background: { fill: 'transparent' },
    };
  }

  onSensorChange() {
    this.loadSensorHistory(this.selectedSensorId);
  }

  loadSensorHistory(sensorId: number) {
    const filtered = this.fullSensorsHistory.filter(s => s.id_sensore === sensorId);
    this.sensors = [...filtered]; // crea un nuovo array, AG Charts lo aggiornerà
  }
}