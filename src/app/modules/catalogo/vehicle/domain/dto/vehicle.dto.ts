import { HttpListResponse } from "@shared/types/response-http.type";

export interface Vehicle {
	id: string;
	brand: string;
	model: string;
	year: string;
	useType: string;
	basePrice: number;
	description: string;
	img: string;
}

export type VehicleListResponse = HttpListResponse<Vehicle>;