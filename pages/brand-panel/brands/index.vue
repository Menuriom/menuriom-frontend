<style scoped></style>

<template>
    <div class="flex flex-col gap-4 w-full h-96">
        <header class="flex flex-col gap-2">
            <div class="flex items-center gap-2">
                <img class="w-8" src="~/assets/images/panel-icons/fork-knife.png" alt="" />
                <h1 class="text-4xl font-bold">Brand Manager</h1>
            </div>
            <small class="text-sm">Create new brands, edit your brand details, or manage brands that you are staff of</small>
        </header>
        <hr class="w-full border-gray-300">
    </div>
</template>

<script setup>
useHead({ title: `Dashboard - Your Menuriom Panel` });
// definePageMeta({ layout: "brand-panel" });
</script>
