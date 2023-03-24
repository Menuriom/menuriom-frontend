<style scoped></style>

<template>
    <div class="flex flex-col items-center w-screen bg-white overflow-hidden" id="app">
        <NuxtLoadingIndicator />
        <Header />
        <main class="w-full mt-24">
            <slot />
        </main>
        <Footer class="mt-80" />
    </div>
</template>

<script setup>
import Header from "~/components/web/Header.vue";
import Footer from "~/components/web/Footer.vue";
</script>
