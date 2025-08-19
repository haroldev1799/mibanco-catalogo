import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of, Subject } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { VehicleListComponent } from './vehicle-list.component';
import { LoaderService } from '@shared/services/loader.service';
import { VehicleRepository } from '@modules/catalogo/vehicle/domain/repository/vehicle.repository';
import { Vehicle, VehicleListResponse } from '@modules/catalogo/vehicle/domain/dto/vehicle.dto';

describe('VehicleListComponent', () => {

  let component: VehicleListComponent;
  let fixture: ComponentFixture<VehicleListComponent>;
  let loaderServiceSpy: jasmine.SpyObj<LoaderService>;
  let vehicleRepoSpy: jasmine.SpyObj<VehicleRepository>;

  const vehicleMock: Vehicle = {
    id: '1',
    brand: 'Toyota',
    model: 'Corolla',
    year: '2020',
    useType: 'personal',
    basePrice: 10000,
    description: 'Sedán',
    img: 'data:image/png;base64,...'
  };

  const data: VehicleListResponse = {
    data: [],
    message: '',
    success: true,
  };


  beforeEach(async () => {
    loaderServiceSpy = jasmine.createSpyObj('LoaderService', ['requestLoaded']);
    vehicleRepoSpy = jasmine.createSpyObj('VehicleRepository', ['list']);
    vehicleRepoSpy.list.and.returnValue(of(data)); // simulamos respuesta vacía

    await TestBed.configureTestingModule({
      imports: [VehicleListComponent, ReactiveFormsModule],
      providers: [
        { provide: LoaderService, useValue: loaderServiceSpy },
        { provide: VehicleRepository, useValue: vehicleRepoSpy },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleListComponent);
    component = fixture.componentInstance;
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit and form init', () => {
    component.ngOnInit();

    expect(loaderServiceSpy.requestLoaded).toHaveBeenCalledWith(true);

    // 2. El formulario debe estar inicializado con todos los campos
    expect(component.formGroup.contains('brand')).toBeTrue();
    expect(component.formGroup.contains('model')).toBeTrue();
    expect(component.formGroup.contains('year')).toBeTrue();
    expect(component.formGroup.get('brand')?.validator).toBeTruthy();

    // 3. Debe llamar a __getList()
    expect(vehicleRepoSpy.list).toHaveBeenCalled();
  });

});