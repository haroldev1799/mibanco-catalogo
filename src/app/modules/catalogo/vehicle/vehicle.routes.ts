import { Routes } from '@angular/router';
import { ROUTE_NAMES_GNL } from '@core/enums/routes-gnl.enum';

export const routes: Routes = [
	{
		path: ROUTE_NAMES_GNL.LIST,
		loadComponent: () => import('./presentation/pages/vehicle-list/vehicle-list.component').then((m) => m.VehicleListComponent),
	},
	{
		path: '',
		redirectTo: ROUTE_NAMES_GNL.LIST,
		pathMatch: 'full',
	},
];
