<style scoped></style>

<template>
    <!-- overflow-hidden is missing here -->
    <div class="flex flex-col items-center w-screen bg-white overflow-clip" id="app">
        <NuxtLoadingIndicator />
        <Header />
        <main class="w-full mt-18 md:mt-24">
            <slot />
        </main>
        <Footer class="mt-64 lg:mt-80" />
    </div>
</template>

<script setup>
import Header from "~/components/web/Header.vue";
import Footer from "~/components/web/Footer.vue";
import { useUserStore } from "@/stores/user";

const userState = useUserStore();

onMounted(async () => {
    await userState.getUserInfo().then(() => {
        userState.setRefreshInterval();
    });
});
</script>
