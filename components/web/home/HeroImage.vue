<style scoped>
.flip {
    transform: rotateY(180deg);
}

.scene {
    perspective: 1200px;
    perspective-origin: center;
}

.phone {
    animation: rotate-swing 5s ease infinite alternate;
    transition: all 0.2s;
}
@keyframes rotate-swing {
    100% {
        transform: rotateY(20deg) rotateX(3deg);
    }
}
</style>

<template>
    <div class="scene relative self-end w-full sm:w-auto 1.5xl:-mt-5">
        <div class="phone relative flex flex-col items-center lg:-mb-64 w-full sm:w-screen max-w-[468px] aspect-[1/2] overflow-hidden isolate">
            <span class="absolute top-2 rounded-[3rem] mx-auto bg-neutral-50" style="width: calc(100% - 1rem); height: calc(100% - 1.25rem)"></span>
            <!-- <NuxtImg class="relative w-full px-6 mt-12 grayscale" src="/img/menu.png" sizes="100% 620px" alt="" /> -->
            <img class="absolute w-full" src="~/assets/images/Xmockup2.svg" alt="" />
        </div>
        <NuxtImg
            class="absolute top-32 lg:top-40 start-10 lg:-start-32 hidden lg:flex"
            :class="{ flip: localeProperties.dir == 'rtl' }"
            src="/img/arrow.svg"
            width="80px"
            alt=""
        />
        <div
            class="absolute bottom-16 -start-4 lg:-start-28 flex flex-col items-center justify-center gap-2 w-52 p-4 md:p-6 rounded-3xl border border-bgSecondary border-opacity-5 bg-fgPrimary bg-opacity-80 backdrop-blur-md"
        >
            <NuxtImg class="object-contain rounded-2xl shadow-mr25" src="/img/qr2.png" format="webp" width="200px" height="200px" />
            <strong class="text-2xl text-bgPrimary text-center">{{ $t("home.Check The Demo") }}</strong>
        </div>
    </div>
</template>

<script setup>
const { localeProperties } = useI18n();
</script>
