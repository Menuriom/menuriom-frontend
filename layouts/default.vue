<style scoped></style>

<template>
    <div class="flex flex-col items-center w-screen min-h-screen bg-white dark:bg-black1 overflow-hidden" id="app">
        <NuxtLoadingIndicator />
        <Header />
        <main class="">
            <slot />
        </main>
        <Footer class="my-8 mt-40" />
        <span class="mb-8 f-josefin text-xs md:text-base text-black1 dark:text-white">Default.Co © {{ year }}. All rights reserved.</span>
    </div>
</template>

<script setup>
import Header from "~/components/web/Header.vue";
import Footer from "~/components/web/Footer.vue";

const year = new Date(Date.now()).getFullYear();
</script>
