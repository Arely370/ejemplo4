import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ejemplo03_0';

  listatareas: string[] = [];
  tarea = new FormControl(''); // Inicializamos el FormControl con un valor vacío

  constructor() {
    if (typeof localStorage !== 'undefined') {
      const datos = localStorage.getItem('tareas');
      if (datos) {
        this.listatareas = JSON.parse(datos) || [];
      }
    }
  }
  
  agregarTarea() {
    const tareaValor = this.tarea.value?.trim();
    if (tareaValor) {
      this.listatareas.push(tareaValor);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('tareas', JSON.stringify(this.listatareas));
      }
      this.tarea.setValue(''); // Limpiamos el campo de entrada
    } else {
      alert('Por favor, ingresa una tarea válida.');
    }
  }
  
  borrarTarea(posicion: number) {
    if (posicion > -1 && posicion < this.listatareas.length) {
      this.listatareas.splice(posicion, 1);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('tareas', JSON.stringify(this.listatareas));
      }
    }
  }
  
  borrarTareas() {
    this.listatareas = [];
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('tareas');
    }
  }}