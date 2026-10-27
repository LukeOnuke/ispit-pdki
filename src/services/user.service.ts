import { OrderStatus } from "@/models/order-status.model"
import type { OrderModel } from "@/models/order.model"
import type { RatingModel } from "@/models/rating.model"
import type { UserModel } from "@/models/user.model"

const USERS_KEY = 'pki_2026_users'
const ACTIVE_USER_KEY = 'pki_2026_active'

export class UserService {

    static getUsers(): UserModel[] {
        if (localStorage.getItem(USERS_KEY) == null) {
            localStorage.setItem(USERS_KEY, JSON.stringify([
                {
                    email: 'user@example.com',
                    password: 'user123',
                    orders: [],
                    ratings: []
                }
            ]))
        }

        return JSON.parse(localStorage.getItem(USERS_KEY)!)
    }

    static login(email: string, password: string): boolean {
        const users = this.getUsers()

        for (let user of users) {
            if (user.email == email && user.password == password) {
                localStorage.setItem(ACTIVE_USER_KEY, email)
                return true
            }
        }

        return false
    }

    static getActiveUser(): UserModel | undefined {
        for (let user of this.getUsers()) {
            if (user.email == localStorage.getItem(ACTIVE_USER_KEY)) {
                return user
            }
        }

        return undefined
    }

    static logout() {
        localStorage.removeItem(ACTIVE_USER_KEY)
    }

    static addOrder(order: OrderModel) {
        const activeUser = this.getActiveUser()
        const users = this.getUsers()

        if (activeUser) {
            for (let user of users) {
                if (user.email === activeUser.email) {
                    user.orders.push(order)
                }
            }

            localStorage.setItem(USERS_KEY, JSON.stringify(users))
        }
    }

    static pay() {
        const activeUser = this.getActiveUser()
        const users = this.getUsers()

        if (activeUser) {
            for (let user of users) {
                if (user.email === activeUser.email) {
                    for (let order of user.orders) {
                        if(order.paidAt) continue;
                        if(order.orderStatus === OrderStatus.CANCELED) continue;
                        
                        order.paidAt = new Date()
                        order.orderStatus = OrderStatus.ARRIVED
                    }
                }
            }

            localStorage.setItem(USERS_KEY, JSON.stringify(users))
        }
    }

    static removeOrder(order: OrderModel) {
        const activeUser = this.getActiveUser()
        const users = this.getUsers()

        if (activeUser) {
            for (let user of users) {
                if (user.email === activeUser.email) {
                    for (let obj of user.orders) {
                        if (order.createdAt == obj.createdAt) {
                            obj.deletedAt = new Date()
                        }
                    }
                }
            }

            localStorage.setItem(USERS_KEY, JSON.stringify(users))
        }
    }

    static changePassword(newPassword: string) {
        const activeUser = this.getActiveUser()
        const users = this.getUsers()

        if (activeUser) {
            for (let user of users) {
                if (user.email === activeUser.email) {
                    user.password = newPassword
                }
            }

            localStorage.setItem(USERS_KEY, JSON.stringify(users))
        }
    }

    static createUser(email: string, password: string, address: string, tel: string) {
        const users = this.getUsers()

        for (let user of users) {
            if (user.email === email) {
                return 'Email already in use!'
            }
        }

        if (password.length < 8) {
            return 'Password must be at least 8 chars long!'
        }

        users.push({
            email, password, orders: [], ratings: [], favouriteSpecies: [], address: address, tel: tel
        } as UserModel)

        localStorage.setItem(USERS_KEY, JSON.stringify(users))
        return undefined
    }

    static addRating(plantId: number, rating: number) {
        const activeUser = this.getActiveUser()
        const users = this.getUsers()

        if (activeUser) {
            for (let user of users) {
                if (user.email === activeUser.email) {
                    user.ratings.push({
                        plantId: plantId,
                        ratingScore: rating
                    } as RatingModel)
                }
            }

            localStorage.setItem(USERS_KEY, JSON.stringify(users))
        }
    }

    static removeRating(plantId: number) {
        const activeUser = this.getActiveUser()
        const users = this.getUsers()

        if (activeUser) {
            for (let user of users) {
                if (user.email === activeUser.email) {
                    for(let rating of user.ratings){
                        if(rating.plantId === plantId){
                            rating.deletedAt = new Date()
                        }
                    }
                }
            }

            localStorage.setItem(USERS_KEY, JSON.stringify(users))
        }
    }

    static getRating(plantId: number): RatingModel | undefined{
        const activeUser = this.getActiveUser();
        if(!activeUser) return;
        const ratings = activeUser.ratings;
        for(let rating of ratings){
            if(rating.deletedAt) continue;
            if(rating.plantId === plantId) return rating;
        }
        return undefined;
    }

    static doRatingsExist(): boolean{
        const activeUser = this.getActiveUser();
        if(!activeUser) return false;
        const ratings = activeUser.ratings;

        let flag = false;

        for(let rating of ratings){
            if (!rating.deletedAt) flag = true;
        }
        
        return ratings.length > 0 && flag;
    }
}