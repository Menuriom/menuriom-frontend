<style scoped></style>

<template>
    <div class="flex flex-col items-center w-screen min-h-screen bg-white dark:bg-black1 overflow-hidden" id="app">
        <NuxtLoadingIndicator />
        <Header />
        <main class="mt-24">
            <slot />
        </main>
        <Footer class="mt-56" />
    </div>
</template>

<script setup>
import Header from "~/components/web/Header.vue";
import Footer from "~/components/web/Footer.vue";
</script>
