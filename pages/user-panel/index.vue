<style scoped></style>

<template>
    <div class="flex flex-col gap-4 w-full">
        <!-- TODO : if user registers with google then in the panel ask for phone number and company size -->
        <!-- TODO : user must verify phone number (if possible) then create menu and use the system -->
    </div>
</template>

<script setup>
useHead({ title: `Your Menuriom Panel` });
definePageMeta({ layout: "user", middleware: ["user-panel-gate"] });
</script>
