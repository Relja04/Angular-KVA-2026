import { CartItem } from "../services/cart.service"

export interface OrderModel{
    orderId:number
    items:CartItem[]
    status:"in delivery" | "delivered" | "cancelled"
    total:number
    createdAt:number
    deliveryAt:number
    timeRemaining?:number
}