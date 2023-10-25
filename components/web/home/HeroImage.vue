<style scoped>
.flip {
    transform: rotateY(180deg);
}
</style>

<template>
    <div class="relative self-end -mb-6 lg:-mb-10">
        <div class="relative w-screen max-w-lg h-[640px] overflow-hidden isolate">
            <img class="absolute w-full z-2" src="~/assets/images/Xmockup2.svg" alt="" />
            
        </div>
        <img
            class="absolute top-32 start-10 lg:-start-36 hidden lg:flex"
            :class="{ flip: localeProperties.dir == 'rtl' }"
            src="~/assets/images/arrow.png"
            alt=""
        />
        <div
            class="absolute bottom-16 -start-4 lg:-start-32 flex flex-col items-center justify-center gap-2 w-44 p-4 md:p-6 rounded-3xl border border-bgSecondary border-opacity-5 bg-fgPrimary bg-opacity-80 backdrop-blur-md"
        >
            <NuxtImg class="object-contain rounded-2xl shadow-mr25" src="/qr.png" width="128px" height="128px" format="webp" />
            <strong class="text-2xl text-bgPrimary text-center">Check The Demo</strong>
        </div>
    </div>
</template>

<script setup>
const { localeProperties } = useI18n();
</script>
