import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServiciosService } from '../../../services/servicios.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-panel-servicios',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './panel-servicios.component.html',
  styleUrls: ['./panel-servicios.component.css']
})
export class PanelServiciosComponent implements OnInit {

  professionalId: string = '';
  servicios: Array<{ id: string, name: string, description: string, price: number }> = [];

  // Modal principal
  modalVisible = false;
  editingService: any = null;
  modalService = { name: '', description: '', price: 0 };

  // Modal de confirmación de eliminación
  confirmDeleteModalVisible = false;
  serviceToDelete: any = null;

  private checkIdSubscription: Subscription | null = null;

  constructor(private serviciosService: ServiciosService) {}

  ngOnInit(): void {
    this.tryLoadServices();

    this.checkIdSubscription = interval(500).subscribe(() => {
      this.tryLoadServices();
    });
  }

  private tryLoadServices(): void {
    const id = localStorage.getItem('professional_id');
    if (id) {
      this.professionalId = id;
      this.cargarServicios(id);
      if (this.checkIdSubscription) {
        this.checkIdSubscription.unsubscribe();
        this.checkIdSubscription = null;
      }
    }
  }

  cargarServicios(id: string): void {
    this.serviciosService.getProfessionalWithServices(id).subscribe({
      next: (res) => {
        const prof = res.data;
        this.servicios = prof.services?.map((s: any) => ({
          id: s.id,
          name: s.name || '',
          description: s.description || '',
          price: s.price || 0
        })) || [];
      },
      error: (err) => console.error('Error al cargar servicios:', err)
    });
  }

  // ================= Modal =================
  abrirModal(service?: any) {
    if (service) {
      this.editingService = service;
      this.modalService = { ...service };
    } else {
      this.editingService = null;
      this.modalService = { name: '', description: '', price: 0 };
    }
    this.modalVisible = true;
  }

  cerrarModal() {
    this.modalVisible = false;
    this.modalService = { name: '', description: '', price: 0 };
    this.editingService = null;
  }

  guardarModal() {
    if (!this.modalService.name || !this.modalService.description || this.modalService.price <= 0) return;

    if (this.editingService) {
      // Editar servicio existente
      this.serviciosService.updateService(this.professionalId, this.editingService.id, this.modalService)
        .subscribe({
          next: () => this.cargarServicios(this.professionalId),
          error: (err) => console.error('Error al actualizar servicio:', err)
        });
    } else {
      // Crear nuevo servicio
      const dataService = {
        idProfessional: this.professionalId,
        ...this.modalService
      };
      console.log(dataService);
      this.serviciosService.createService(dataService).subscribe({
        next: () => this.cargarServicios(this.professionalId),
        error: (err) => console.error('Error al crear servicio:', err)
      });
    }

    this.cerrarModal();
  }

  // ================= Eliminar =================
  abrirConfirmDelete(service: any) {
    this.serviceToDelete = service;
    this.confirmDeleteModalVisible = true;
  }

  cerrarConfirmDelete() {
    this.serviceToDelete = null;
    this.confirmDeleteModalVisible = false;
  }

  confirmarEliminarServicio() {
    if (this.serviceToDelete) {
      this.serviciosService.deleteService(this.professionalId, this.serviceToDelete.id)
        .subscribe({
          next: () => this.cargarServicios(this.professionalId),
          error: (err) => console.error('Error al eliminar servicio:', err)
        });
      this.cerrarConfirmDelete();
    }
  }
}
