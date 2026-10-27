import type { OrderStatus } from "./order-status.model"
import type { PlantModel } from "./plant.model"

export interface OrderModel {
    createdAt: Date
    paidAt: Date | undefined
    deletedAt: Date | undefined
    orderStatus: OrderStatus
    plant: PlantModel
}