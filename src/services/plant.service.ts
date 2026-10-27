import type { PlantModel } from "@/models/plant.model";
import axios from "axios"

const client = axios.create({
    baseURL: "https://plants.pequla.com/api/plants",
    headers: {
        "X-Name": "LK-PDKI",
        "Accept": "application/json"
    }
})

export class PlantService {
    static async getPlantsList() {
        const rsp = client.request<PlantModel[]>({
            method: "GET",
            url: ""
        })
        return (await rsp).data;
    }

    static async getIndividualPlant(id: number) {
        const rsp = client.request<PlantModel>({
            method: "GET",
            url: `${id}`
        })
        return (await rsp).data;
    }
}