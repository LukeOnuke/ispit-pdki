<script setup lang="ts">
import OrderCard from '@/components/OrderCard.vue';
import { useLogin } from '@/hooks/login.hook';
import { OrderStatus } from '@/models/order-status.model';
import type { OrderModel } from '@/models/order.model';
import { AlertService } from '@/services/alert.service';
import { UserService } from '@/services/user.service';
import { ref } from 'vue';

const orders = ref<OrderModel[]>();
    const paidOrders = ref<OrderModel[]>();

const enforceLogin = useLogin();

enforceLogin()
refresh()

const statusClasses = {
    [OrderStatus.ARRIVED]: 'text-bg-success',
    [OrderStatus.CANCELED]: 'text-bg-danger',
    [OrderStatus.RESERVED]: 'text-bg-info'
}

function refresh() {
    const user = UserService.getActiveUser();
    if (!user) return;
    orders.value = user.orders.filter((order) => {
        return !order.deletedAt && !order.paidAt;
    });

    paidOrders.value = user.orders.filter((order) => {
        return !order.deletedAt && order.paidAt;
    });
}

function getTotal(): number {
    if (!orders.value) return Number.NaN

    let total = 0;
    orders.value.forEach((order) => {
        if (order.orderStatus === OrderStatus.RESERVED) total += order.plant.price;
    })
    return total;
}

function removeOrder(order: OrderModel) {
    AlertService.confirm("Uklanjanje porudzbine", `Da li ste sigurni da želite da uklonite porudzbinu ${order.plant.name}`, () => {
        UserService.removeOrder(order);
        refresh()
    });
}

function checkout() {
    AlertService.confirm("Nastaviti sa plaćanjem", "Da li ste sigurni da želite da plaćate", () => {
        // Sucsessfull payment
        UserService.pay()
        refresh()
    }, () => {
        // Canceled
    })
}
</script>

<template>
    <div class="container-fluid">
        <div class="row" v-if="orders && orders.length > 0">
            <div class="col-12 col-md-8">
                <OrderCard v-for="order in orders" :order="order" :key="`${order.createdAt}`" @remove="removeOrder" class="mb-3"></OrderCard>
            </div>
            <div class="col-12 col-md-4">
                <div class="card sticky-md-top">
                    <div class="card-header">
                        <h1>Korpa</h1>
                    </div>
                    <div class="card-body">
                        <table class="table table-dark">
                            <thead>
                                <tr>
                                    <th>
                                        Ime stavke
                                    </th>
                                    <th>
                                        Cena
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="order in orders">
                                    <td>
                                        {{ order.plant.name }}
                                    </td>
                                    <td>
                                        {{ order.plant.price }} {{ order.plant.currency }}
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr class="text-info">
                                    <th>Ukupno</th>
                                    <td>{{ getTotal() }} RSD</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <div class="card-footer d-flex">
                        <button class="btn btn-success ms-auto" @click="checkout">Plati</button>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="card">
                <div class="card-header">
                    <h3>Nema neizmirenih porudžbina</h3>
                </div>
                <div class="card-body">
                    <p>Korpa je prazna</p>
                </div>
            </div>
        </div>
        <div>
            <hr>
            <h3>Plaćeno</h3>
            <div v-for="order in paidOrders">
                <OrderCard :order="order" :key="`paid-${order.createdAt}`" @remove="removeOrder" allow-rating class="mb-3"></OrderCard>
            </div>
        </div>
    </div>
</template>