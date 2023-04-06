<style scoped>
.wrapper {
    background-image: url("~/assets/images/pattern-black.webp");
    background-repeat: repeat;
}
</style>

<template>
    <section class="wrapper relative flex items-center justify-evenly gap-4 w-screen bg-pencil-tip text-white p-4 md:p-8 lg:p-16  ">
        <Blob class="absolute left-0 -top-16" width="300px" height="300px" />
        <Blob class="absolute right-20 -bottom-16" width="300px" height="300px" />
        <div class="relative"></div>
        <div class="relative flex flex-col items-center gap-4">
            <img class="w-20 mb-4" src="~/assets/images/icons/gold-card.png" alt="features" />
            <h1 class="f-inter text-6xl font-extrabold">Core Features</h1>
            <h2 class="text-3xl text-center opacity-60">Get familiar with Menutiom features</h2>
        </div>
        <div class="relative"></div>
    </section>
</template>

<script setup>
import Blob from "~/components/web/Blob.vue";
</script>
