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
    /* animation: v-bind("splashScreenOptions.transition"); */
    animation-name: v-bind("transitionAnimation");
    animation-duration: 2s;
    animation-timing-function: ease;
}
</style>

<template>
    <div
        class="absolute flex items-center justify-center px-2.5 z-20 overflow-hidden"
        style="width: calc(360px - 1rem); height: calc(715px - 1rem); border-radius: 3.25rem"
    >
        <div
            class="splash-screen relative flex flex-col items-center justify-center gap-4 w-full h-full rounded-2xl isolate overflow-hidden"
            :style="`background-color: ${splashScreenOptions.bgMainColor};`"
            :class="{ off: showAnimation }"
            @click="beginAnimation()"
        >
            <!-- <img class="absolute -z-10 rotate-0 w-[30rem] max-w-none opacity-10 pointer-events-none" src="/patterns/pattern6.webp" alt="" /> -->
            <div class="absolute flex items-center justify-center w-full h-full overflow-hidden">
                <div
                    class="bg-repeat absolute -z-10 w-[40rem] max-w-none aspect-square pointer-events-none"
                    :style="`
                    background-image: url('${splashScreenOptions.bgImage}');
                    background-size: ${splashScreenOptions.bgImageSize}%;
                    background-color: ${splashScreenOptions.bgMainColor};
                    opacity: ${splashScreenOptions.bgImageOpacity}%;
                    rotate: ${splashScreenOptions.bgImageRotation}deg;`"
                    v-if="splashScreenOptions.withPattern"
                ></div>
            </div>

            <div
                class="flex items-center justify-center w-36 h-36 p-6 shadow-nr25"
                :style="`background-color: ${splashScreenOptions.bgSecondaryColor}; border-radius: ${splashScreenOptions.cornerRadius}px;`"
            >
                <img
                    class="w-full h-full object-contain shadow-nr15"
                    :style="`border-radius: ${splashScreenOptions.cornerRadius - 10}px;`"
                    :src="brand.logo"
                    alt=""
                />
            </div>
            <div class="flex flex-col items-center">
                <h3 class="rounded font-bold text-2xl" :style="`color: ${splashScreenOptions.textColor};`">{{ brand.name }}</h3>
                <small class="opacity-75 text-xs" :style="`color: ${splashScreenOptions.textColor};`">{{ brand.slogan }}</small>
            </div>

            <LineScroll class="absolute start-0 top-1/2 -z-10 -mt-16 opacity-40" :options="splashScreenOptions" v-if="splashScreenOptions.withLine" />
        </div>
    </div>
</template>

<script setup>
import LineScroll from "./LineScroll.vue";

const props = defineProps({
    brand: { type: Object },
    baseColors: { type: Object },
    splashScreenOptions: { type: Object },
});

let showAnimation = ref(false);
let timeout;

const transitionAnimation = computed(() => {
    showAnimation.value = false;
    clearTimeout(timeout);
    return `SPLASH_${props.splashScreenOptions.transition}`;
});

const beginAnimation = () => {
    if (showAnimation.value !== false) return;
    showAnimation.value = true;
    timeout = setTimeout(() => (showAnimation.value = false), 3000);
};
</script>
