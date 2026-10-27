import type { OrderModel } from "./order.model"
import type { RatingModel } from "./rating.model"

export interface UserModel {
    email: string
    password: string
    orders: OrderModel[]
    ratings: RatingModel[]
    favouriteSpecies: string[]
    address: string
    tel: string
}