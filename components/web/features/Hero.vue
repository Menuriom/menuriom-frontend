<style scoped>
.wrapper {
    background-image: url("~/assets/images/pattern-black.webp");
    background-repeat: repeat;
}
</style>

<template>
    <section
        class="wrapper relative flex items-center justify-evenly gap-4 w-screen max-w-screen-2xl rounded-3xl bg-pencil-tip text-white p-4 md:p-8 lg:p-16 shadow-nr25"
    >
        <div class="absolute top-36 lg:top-auto scale-75 md:scale-100 -start-20 md:start-10 grid grid-cols-2 gap-10 w-96">
            <span class="absolute -top-16 rotate-12 gradient-re flex items-center justify-center p-1 rounded-xl">
                <div class="flex items-center justify-center p-4 bg-pencil-tip rounded-lg">
                    <img class="w-10 h-10 object-contain" src="/gradient-icons/light/object-intersect.png" alt="combo" />
                </div>
            </span>
            <span class="absolute -top-20 start-64 scale-150 rotate-45 gradient-re flex items-center justify-center p-1 rounded-xl">
                <div class="flex items-center justify-center p-4 bg-pencil-tip rounded-lg">
                    <img class="w-10 h-10 object-contain" src="/gradient-icons/light/palette.png" alt="Customization" />
                </div>
            </span>
            <span class="absolute top-20 start-10 scale-75 rotate-6 gradient-re flex items-center justify-center p-1 rounded-xl">
                <div class="flex items-center justify-center p-4 bg-pencil-tip rounded-lg">
                    <img class="w-10 h-10 object-contain" src="/gradient-icons/light/fire.png" alt="Specialazation" />
                </div>
            </span>
            <span class="absolute top-40 start-52 scale-125 -rotate-12 gradient-re flex items-center justify-center p-1 rounded-xl">
                <div class="flex items-center justify-center p-4 bg-pencil-tip rounded-lg">
                    <img class="w-10 h-10 object-contain" src="/gradient-icons/light/store.png" alt="branch" />
                </div>
            </span>
        </div>
        <div class="relative flex flex-col items-center gap-4 w-full max-w-xl rounded-lg py-6 my-8 bg-pencil-tip bg-opacity-30 backdrop-blur-sm z-2 shrink-0">
            <h1 class="f-inter text-6xl font-extrabold text-center">Core Features</h1>
            <h2 class="text-3xl text-center opacity-60">Get familiar with Menutiom features</h2>
        </div>
        <div class="absolute top-36 lg:top-auto scale-75 md:scale-100 -end-20 md:end-10 grid grid-cols-2 gap-10 w-96">
            <span class="absolute -top-32 end-64 rotate-12 gradient-re flex items-center justify-center p-1 rounded-xl">
                <div class="flex items-center justify-center p-4 bg-pencil-tip rounded-lg">
                    <img class="w-10 h-10 object-contain" src="/gradient-icons/light/earth-america.png" alt="Translation" />
                </div>
            </span>
            <span class="absolute -start-10 -rotate-6 scale-90 gradient-re flex items-center justify-center p-1 rounded-xl">
                <div class="flex items-center justify-center p-4 bg-pencil-tip rounded-lg">
                    <img class="w-10 h-10 object-contain" src="/gradient-icons/light/comments-question-check.png" alt="Customer Feedback" />
                </div>
            </span>
            <span class="absolute -top-24 end-10 -rotate-12 scale-75 gradient-re flex items-center justify-center p-1 rounded-xl">
                <div class="flex items-center justify-center p-4 bg-pencil-tip rounded-lg">
                    <img class="w-10 h-10 object-contain" src="/gradient-icons/light/clipboard-list-check.png" alt="ordering" />
                </div>
            </span>
            <span class="absolute top-16 end-16 rotate-45 scale-125 gradient-re flex items-center justify-center p-1 rounded-xl">
                <div class="flex items-center justify-center p-4 bg-pencil-tip rounded-lg">
                    <img class="w-10 h-10 object-contain" src="/gradient-icons/light/qrcode.png" alt="qrcode" />
                </div>
            </span>
            <span class="absolute top-44 end-56 rotate-3 gradient-re flex items-center justify-center p-1 rounded-xl">
                <div class="flex items-center justify-center p-4 bg-pencil-tip rounded-lg">
                    <img class="w-10 h-10 object-contain" src="/gradient-icons/light/bell-on.png" alt="call" />
                </div>
            </span>
        </div>
    </section>
</template>

<script setup>
import Blob from "~/components/web/Blob.vue";
</script>
