<style scoped></style>

<template>
    <div class="flex gap-4 w-full pb-2 overflow-auto">
        <ul class="flex gap-6 w-full pb-2 overflow-auto">
            <li
                class="relative flex flex-col items-center justify-center w-48 h-48 p-4 rounded-2xl group bg-bgSecondary bg-opacity-50 shadow-mr25 overflow-hidden shrink-0"
                v-for="n in 4"
                :key="n"
            >
                <div class="flex flex-col items-center justify-center gap-2 w-36 h-36 bg-bgSecondary shadow-mr25 rounded-xl">
                    <div class="skeleton w-16 h-16 rounded-xl mt-2" />
                    <h4 class="skeleton w-10/12 h-4 rounded-full px-2" />
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup></script>
