import { Injectable, signal, computed, effect, untracked, inject } from "@angular/core"
import { ToyModel } from "../models/toy.model"
import { OrderService } from "./order.service"


export interface CartItem {
    toy: ToyModel
    quantity: number
}
@Injectable({
    providedIn: 'root',
})
export class CartService {
    private get userKey(): string {
        const email = localStorage.getItem("active")
        return `cart_${email}`
    }

    orderService = inject(OrderService)

    private cartItems = signal<CartItem[]>(this.loadCart())
    items = this.cartItems.asReadonly()

    totalPrice = computed(() =>
        this.cartItems().reduce((acc, item) => acc + (item.toy.price * item.quantity), 0)
    )

    constructor() {
        effect(() => {
            const items = this.cartItems()
            const key = untracked(() => this.userKey)
            localStorage.setItem(key, JSON.stringify(items))
        })
    }

    checkout() {
        const currentItems = this.items()
        const total = this.totalPrice()

        if (currentItems.length === 0) return

        this.orderService.createOrder(currentItems, total)
        this.clearCart()
    }

    refreshUserCart() {
        this.cartItems.set(this.loadCart())
    }

    private loadCart(): CartItem[] {
        const savedCart = localStorage.getItem(this.userKey)
        return savedCart ? JSON.parse(savedCart) : []
    }

    addToCart(product: ToyModel) {
        this.cartItems.update(prev => {
            const existing = prev.find(i => i.toy.toyId === product.toyId)
            if (existing) {
                return prev.map(i => i.toy.toyId === product.toyId
                    ? { ...i, quantity: i.quantity + 1 } : i
                )
            }
            return [...prev, { toy: product, quantity: 1 }]
        })
    }

    increaseQuantity(productId: number) {
        this.cartItems.update(prev =>
            prev.map(item =>
                item.toy.toyId === productId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        )
    }

    decreaseQuantity(productId: number) {
        this.cartItems.update(prev => {
            const itemToChange = prev.find(i => i.toy.toyId === productId)

            if (itemToChange && itemToChange.quantity > 1) {
                return prev.map(item =>
                    item.toy.toyId === productId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
            } else {
                return prev.filter(item => item.toy.toyId !== productId)
            }
        })
    }

    removeFromCart(productId: number) {
        this.cartItems.update(prev => prev.filter(item => item.toy.toyId !== productId))
    }

    clearCart() {
        this.cartItems.set([])
    }
}
