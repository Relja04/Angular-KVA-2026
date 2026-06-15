import { signal, Injectable } from "@angular/core"
import { OrderModel } from "../models/order.model"
import { CartItem } from "./cart.service"

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    orders = signal<OrderModel[]>([])

    constructor() {
        const saved = localStorage.getItem("ORDERS")
        if (saved)
            this.orders.set(JSON.parse(saved))

        setInterval(() => {
            this.checkDeliveryStatus()
        }, 1000)
    }

    createOrder(cartItems: CartItem[], total: number) {
        const now = Date.now()

        const deliveryTime = Math.floor(Math.random() * (120 - 45 + 1)) + 45
        const deliveryTimeMs = deliveryTime * 1000

        const newOrder: OrderModel = {
            orderId: Math.floor((Math.random() * (1000 - 0 + 1))),
            items: [...cartItems],
            status: "in delivery",
            total: total,
            createdAt: now,
            deliveryAt: now + deliveryTimeMs
        }
        const updatedOrders = [...this.orders(), newOrder]
        this.orders.set(updatedOrders)
        localStorage.setItem("ORDERS", JSON.stringify(updatedOrders))
    }

    cancelOrder(orderId: number) {
        const found=this.orders().find(e=>e.orderId==orderId)
        found!.status="cancelled"
        found!.timeRemaining=0
        found!.deliveryAt=found!.createdAt
    }

    checkDeliveryStatus() {
        let changed = false;
        const now = Date.now()

        const updatedOrders = this.orders().map(order => {
            const msLeft = order.deliveryAt - now;
            const secondsLeft = Math.max(0, Math.ceil(msLeft / 1000))

            let currentStatus = order.status

            if (now >= order.deliveryAt && order.status === "in delivery") {
                currentStatus = "delivered"
                changed = true
            }
            return { ...order, status: currentStatus, timeRemaining: secondsLeft }
        })
        if (changed || updatedOrders.some(o => o.timeRemaining !== this.orders().find(old => old.orderId === o.orderId)?.timeRemaining)) {
            this.orders.set(updatedOrders)

            localStorage.setItem("ORDERS", JSON.stringify(updatedOrders))
        }
    }
}