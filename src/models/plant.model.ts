import type { IntendedUse } from "./intended-use.model";
import type { LightRequirement } from "./light-requirement.model";
import type { PlantType } from "./plant-type.model";
import type { TargetAudience } from "./target-audience.model";
import type { Watering } from "./watering.model";

export interface PlantModel{
    id: number,
    name: string,
    latin_name: string,
    description: string,
    planting_instructions: string,
    care_instructions: string,
    plant_type: PlantType,
    target_audience: TargetAudience, //enum jednog dana
    light_requirement: LightRequirement, //isto
    watering: Watering, //isto
    intended_use: IntendedUse, //isto
    production_date: string,
    price: number,
    currency: string,
    image_url: string,
    image_alt: string,
    is_available: boolean,
    stock_quantity: number,
    category_id: number,
    category: string,
    climate_id: number,
    climate: string,
    season_id: number,
    season: string
}