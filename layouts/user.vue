<style scoped></style>

<template>
    <div class="flex flex-col items-center w-screen bg-white overflow-hidden" id="app">
        <NuxtLoadingIndicator />
        <!-- TODO : add header and side menu for user's panel -->
        <main class="w-full">
            <slot />
        </main>
    </div>
</template>

<script setup>
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const userState = useUserStore();
const user = storeToRefs(userState);

onMounted(async () => {
    if (user.name.value === "" || user.family.value === "") await userState.getUserInfo();
    userState.setRefreshInterval();
});
</script>
