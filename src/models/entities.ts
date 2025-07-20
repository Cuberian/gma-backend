export interface CarBrandEntity {
    id: number;
    name: string;
}

export interface CarModelEntity {
    id: number;
    name: string;
    brand_id: number;
}

export interface CarEntity {
    id: number;
    brand_id: CarBrandEntity['id'];
    model_id: CarModelEntity['id'];
    color: string;
    engine_volume: number;
    mileage: number;
    year: number;
}