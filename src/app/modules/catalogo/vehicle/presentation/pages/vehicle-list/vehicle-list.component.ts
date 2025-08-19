import { Component, inject, OnInit } from '@angular/core';
import { VEHICLE_LIST_IMPORTS } from './vehicle-list-constants';
import { InputData } from '@shared/interfaces/input.dto';
import { ButtonData, ButtonType } from '@shared/interfaces/button.dto';
import { Vehicle } from '@modules/catalogo/vehicle/domain/dto/vehicle.dto';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoaderService } from '@shared/services/loader.service';
import { VehicleRepository } from '@modules/catalogo/vehicle/domain/repository/vehicle.repository';

@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  imports: [...VEHICLE_LIST_IMPORTS],
  templateUrl: './vehicle-list.component.html',
  styleUrl: './vehicle-list.component.scss'
})
export class VehicleListComponent implements OnInit {
    
  private loaderService = inject(LoaderService);
  private vehiculeRepository = inject(VehicleRepository);

  searchInput: InputData = {
      label: 'Buscar factura',
      name: 'search',
      type: 'text',
      value: '',
      placeholder: 'Buscar factura',
      clear: true,
  };

  BUTTON_DATA: Record<'AGREGAR' | 'EDITAR' | 'ELIMINAR' | 'GUARDAR', ButtonData> = {
      AGREGAR: {
          text: 'Agregar',
          type: ButtonType.DARK,
      },
      EDITAR: {
          text: 'Editar',
          type: ButtonType.DARK,
      },
      ELIMINAR: {
          text: 'Borrar',
          type: ButtonType.LIGHT_BLACK,
      },    
      GUARDAR: {
          text: 'Guardar',
          type: ButtonType.DARK,
      },
  };

  vehicles: Vehicle[] = [];
  
  showModalForm: boolean = false;
  selectedFile: File | null = null;

  //modal
  modalTitle: string = 'Agregar vehículo';

  formGroup!: FormGroup;

  ngOnInit(): void {
	this.loaderService.requestLoaded(true);
    this.formGroup = new FormGroup({
        id: new FormControl(''),
        brand: new FormControl('', [Validators.required]),
        model: new FormControl('', [Validators.required]),
        year: new FormControl('', [Validators.required]),
        useType: new FormControl('', [Validators.required]),
        basePrice: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        img: new FormControl('asd'),
    });
    this.__getList();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        const previewUrl = reader.result;
        this.formGroup.patchValue({ img: previewUrl });
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  deleteFile = () => this.selectedFile = null;

  agregar(){
    this.formGroup.reset();
    this.selectedFile = null;
    this.formGroup.markAsUntouched();
    this.modalTitle = 'Agregar vehículo';
    this.showModalForm = true;
  }

  edit(item: Vehicle){
    this.modalTitle = 'Editar vehículo';
    this.selectedFile = new File([''], "imagen.jpg");
    this.formGroup.patchValue({
        id: item.id,
        brand: item.brand,
        model: item.model,
        year: item.year,
        useType: item.useType,
        basePrice: item.basePrice,
        description: item.description,
        img: item.img,
    });
    this.showModalForm = true;
  }

  delete(item: Vehicle){
    this._delete(item.id);
  }

  saveForm(){
    if(this.formGroup.valid) {
        if(this.formGroup.controls['id'].value)
            this._update();
        else
            this._save();
    }
  }

  private __getList(){
    this.vehiculeRepository.list().subscribe({
        next: (response) => {
            this.vehicles = [...response.data];
        },
        complete: () => this.loaderService.requestLoaded(false)
    });
  }

  private _save(){
    this.vehiculeRepository.create(this.formGroup.getRawValue()).subscribe({
        next: () => this.__getList(),
        complete: () => {
            this.loaderService.requestLoaded(false);
            this.showModalForm = false;
            this.formGroup.reset();
            this.formGroup.markAsUntouched();
        }
    });
  }

  private _update(){
    this.vehiculeRepository.update(this.formGroup.getRawValue()).subscribe({
        next: () => this.__getList(),
        complete: () => {
            this.loaderService.requestLoaded(false);
            this.showModalForm = false;
            this.formGroup.reset();
            this.formGroup.markAsUntouched();
        }
    });
  }

  private _delete(id: string){
    this.vehiculeRepository.delete(id).subscribe({
        next: () => this.__getList(),
        complete: () => this.loaderService.requestLoaded(false)
    });
  }


}
