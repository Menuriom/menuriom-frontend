<style scoped></style>

<template>
    <div class="flex flex-col items-center w-screen bg-white overflow-hidden" id="app">
        <NuxtLoadingIndicator />
        <main class="w-full">
            <slot />
        </main>
    </div>
</template>

<script setup>
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const user = storeToRefs(userStore);

onMounted(async () => {
    // if (user.name.value === "" || user.family.value === "") await userStore.getUserInfo();
    await userStore.refreshToken().catch((e) => {});
    userStore.setRefreshInterval();
});
</script>
