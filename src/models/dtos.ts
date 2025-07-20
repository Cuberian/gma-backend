export interface CarCreateDto {
    brand_id: number;
    model_id: number;
    color: string;
    engine_volume: number;
    mileage: number | null;
    year: number;
}

export interface CarUpdateDto extends Partial<Omit<CarCreateDto, "brand_id" | "model_id">> {
    id: number;
}


export interface CarBrandCreateDto {
    name: string;
}

export interface CarBrandUpdateDto extends CarBrandCreateDto {
    id: number;
}


export interface CarModelCreateDto {
    name: string;
    brand_id: number;
}

export interface CarModelUpdateDto extends Omit<CarModelCreateDto, "brand_id"> {
    id: number;
}




