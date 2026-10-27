<script setup lang="ts">
import type { OrderModel } from '@/models/order.model';
import { UserService } from '@/services/user.service';
import { ref } from 'vue';

const orders = ref<OrderModel[]>();

refresh()
function refresh(){
    const user = UserService.getActiveUser();
    if(!user) return;
    orders.value = user.orders;
}
</script>

<template>
<div>
    <pre v-for="order in orders"><code>{{ order }}</code></pre>
</div>
</template>