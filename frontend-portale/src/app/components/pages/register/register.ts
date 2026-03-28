import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CommonComponents } from '../../share/commonComponents';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class Register extends CommonComponents {

  private fb: FormBuilder = inject(FormBuilder);

  step = 1;

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    hotspotUuid: ['', [Validators.required]],
    sensorUuid: ['', [Validators.required]]
  });

  // getter comodi
  get f() {
    return this.form.controls;
  }

  // simulazioni check connessione
  checkHotspotConnection(): boolean {
    return true;
  }

  checkSensorConnection(): boolean {
    return true
  }

  // gestione step
  nextStep() {
    if (this.step === 1) {
      if (this.f['name'].invalid || this.f['email'].invalid || this.f['password'].invalid) {
        this.form.markAllAsTouched();
        alert('Compila correttamente tutti i campi');
        return;
      }
    }

    if (this.step === 2 && !this.checkHotspotConnection()) {
      alert('Hotspot non valido');
      return;
    }

    if (this.step === 3 && !this.checkSensorConnection()) {
      alert('Sensore non valido');
      return;
    }

    this.step++;
  }

  prevStep() {
    if (this.step > 1) this.step--;
  }
}