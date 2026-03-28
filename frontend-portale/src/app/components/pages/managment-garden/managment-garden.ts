import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Footer } from "../../share/footer/footer";
import { Nav } from "../../share/nav/nav";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Sensore } from '../../../responce/sensore';
import { Sensoriservice } from '../../../service/sensoriservice';

@Component({
  selector: 'app-managment-garden',
  imports: [Nav, Footer, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './managment-garden.html',
  styleUrl: './managment-garden.css',
})
export class ManagmentGarden implements OnInit{
  
  sensoriService: Sensoriservice = inject(Sensoriservice);
  sensors: Sensore[] = [];

  selectedSensor: any = null;
  newPlantName: string = '';

  newSensor: any = {
    codice_sensore: '',
    nome_pianta: '',
    latitudine: null,
    longitudine: null
  };

  constructor(private cdr: ChangeDetectorRef){

  }

  ngOnInit(): void {
    this.sensoriService.getStoricoBySensoreId(1).subscribe((data: Sensore) => {
      console.log(data)
      this.sensors.push(data)
      this.cdr.detectChanges(); 
    })

    this.sensoriService.getStoricoBySensoreId(2).subscribe((data: Sensore) => {
      console.log(data)
      this.sensors.push(data)
      this.cdr.detectChanges(); 
    })
  }
  

  setSelectedSensor(sensor: any) {
    this.selectedSensor = sensor;
  }

  addPlant() {
    if (this.newPlantName && this.selectedSensor) {
      this.selectedSensor.nome_pianta.push({
        common_name: this.newPlantName,
        scientific_name: this.newPlantName,
        image_url: null
      });

      this.newPlantName = '';

      // chiudi modale
      const modalEl = document.getElementById('addPlantModal');
      const modal = (window as any).bootstrap.Modal.getInstance(modalEl);
      modal?.hide();
    }
  }

  addSensor() {
    if (!this.newSensor.codice_sensore) return;

    this.sensors.push({
      codice_sensore: this.newSensor.codice_sensore,
      stato_pianta: 'assets/sano.svg',
      latitudine: this.newSensor.latitudine,
      longitudine: this.newSensor.longitudine,
      nome_pianta: "",
      report: "",
      id_sensore: 0,
      storico_misure: []
    });

    // reset form
    this.newSensor = {
      codice_sensore: '',
      nome_pianta: '',
      latitudine: null,
      longitudine: null
    };

    // chiudi modale
    const modalEl = document.getElementById('addSensorModal');
    const modal = (window as any).bootstrap.Modal.getInstance(modalEl);
    modal?.hide();
  }
}
