<template>
    <div class="sticky top-7 flex items-center gap-2 w-full bg-pencil-tip z-2 p-2">
        <button class="flex items-center justify-center p-2 border border-neutral-200 border-opacity-20 rounded-lg shadow-nr35" title="Show All Categories">
            <Icon class="w-5 h-5 shrink-0 bg-white" name="layout-2.svg" folder="icons/tabler" size="20px" />
        </button>
        <div class="flex items-center gap-2 w-full bg-white p-2 rounded-lg shadow-nr35">
            <Icon class="w-5 h-5 shrink-0 bg-dolphin" name="search.svg" folder="icons/tabler" size="20px" />
            <input class="w-full text-sm text-black outline-0" placeholder=". . . . ." />
        </div>
    </div>
</template>

<script setup>
import Input from "~/components/form/Input.vue";
</script>
