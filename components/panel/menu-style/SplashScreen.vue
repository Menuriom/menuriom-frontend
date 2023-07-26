<style scoped>
*::-webkit-scrollbar {
    width: 0px;
    height: 0px;
}
* {
    scrollbar-width: none;
}

.splash-screen {
    opacity: 1;
}
.splash-screen.off {
    animation: opacity-swing 2s ease;
    animation: slide-up 2s ease;
    animation: slide-left 2s ease;
    animation: fall 2s ease;
    animation: zoom-fade 2s ease;
}

@keyframes opacity-swing {
    100% {
        opacity: 0;
    }
}
@keyframes slide-up {
    100% {
        transform: translateY(-100%);
    }
}
@keyframes slide-left {
    100% {
        transform: translateX(-100%);
    }
}
@keyframes fall {
    100% {
        transform: translate(100%, 150%) rotate(60deg);
    }
}
@keyframes zoom-fade {
    100% {
        opacity: 0;
        transform: scale(3, 3);
    }
}
</style>

<template>
    <div
        class="fixed flex items-center justify-center px-2.5 z-20 overflow-hidden"
        style="width: calc(360px - 1rem); height: calc(715px - 1rem); border-radius: 3.25rem"
    >
        <div
            class="splash-screen relative flex flex-col items-center justify-center gap-4 w-full h-full bg-pencil-tip rounded-2xl isolate overflow-hidden"
            :class="{ off: showAnimation }"
            @click="beginAnimation()"
        >
            <img class="absolute -z-10 rotate-45 w-[30rem] max-w-none opacity-10 pointer-events-none" src="~/assets/images/pattern2.png" alt="" />

            <div class="flex items-center justify-center w-36 h-36 p-6 bg-dolphin rounded-full shadow-nr25">
                <img class="w-full h-full object-contain rounded-full shadow-nr15" :src="brand.logo" alt="" />
            </div>
            <div class="flex flex-col items-center">
                <h3 class="text-white rounded font-bold text-2xl">{{ brand.name }}</h3>
                <small class="text-white opacity-75 text-xs">{{ brand.slogan }}</small>
            </div>

            <LineScroll class="absolute start-0 top-1/2 -z-10 -mt-16 opacity-40" :rotation="30" />
        </div>
    </div>
</template>

<script setup>
import LineScroll from "./LineScroll.vue";

const props = defineProps({
    brand: { type: Object },
});

let showAnimation = ref(false);
const beginAnimation = () => {
    if (showAnimation.value !== false) return;
    showAnimation.value = true;
    setTimeout(() => (showAnimation.value = false), 3000);
};
</script>
