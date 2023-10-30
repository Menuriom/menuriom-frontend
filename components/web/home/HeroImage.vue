<style scoped>
.flip {
    transform: rotateY(180deg);
}
</style>

<template>
    <div class="relative self-end w-full sm:w-auto 1.5xl:-mt-14">
        <div class="relative flex flex-col items-center w-full sm:w-screen max-w-[480px] h-[690px] isolate">
            <span class="absolute rounded-[4rem] mt-4 bg-neutral-50" style="width: calc(100% - 1rem); height: calc(100vh - 2rem);"></span>
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
            class="absolute bottom-16 -start-4 lg:-start-28 flex flex-col items-center justify-center gap-2 w-44 p-4 md:p-6 rounded-3xl border border-bgSecondary border-opacity-5 bg-fgPrimary bg-opacity-80 backdrop-blur-md"
        >
            <NuxtImg class="object-contain rounded-2xl shadow-mr25" src="/img/qr.png" width="200px" height="200px" />
            <strong class="text-2xl text-bgPrimary text-center">{{ $t("home.Check The Demo") }}</strong>
        </div>
    </div>
</template>

<script setup>
const { localeProperties } = useI18n();
</script>
