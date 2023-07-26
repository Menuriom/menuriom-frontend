<style scoped>
*::-webkit-scrollbar {
    width: 0px;
    height: 0px;
}
* {
    scrollbar-width: none;
}

.insta-gradient {
    background-image: linear-gradient(87.28deg, #e2d55a -2.39%, #cb30e5 36.32%, rgba(248, 65, 163, 0.88) 75.04%, rgba(235, 97, 97, 0.94) 109.79%);
    background-image: linear-gradient(60deg, rgba(180, 119, 221, 1) 0%, rgba(224, 57, 57, 1) 55%, rgba(250, 202, 135, 1) 100%);

    background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #6328eb 90%);
}
</style>

<template>
    <div class="flex flex-col items-center justify-evenly gap-8 w-full h-full">
        <span class="mt-2"></span>

        <div class="flex flex-col items-center gap-4">
            <div class="flex items-center justify-center w-24 h-24 p-4 bg-dolphin rounded-full shadow-nr25">
                <img class="w-full h-full object-contain rounded-full shadow-nr15" :src="brand.logo" alt="" />
            </div>
            <div class="flex flex-col items-center">
                <h3 class="text-white font-bold text-xl">{{ brand.name }}</h3>
                <small class="text-white opacity-60 text-xxs">{{ brand.slogan }}</small>
            </div>
        </div>

        <ul class="flex items-center gap-2 w-full overflow-auto">
            <li
                class="flex items-center gap-1 p-2 mt-1 bg-pencil-tip shadow-nr15 border border-neutral-200 border-opacity-10 rounded-md"
                v-for="i in 4"
                :key="i"
            >
                <Icon class="w-4 h-4 shrink-0 bg-red-400" name="map-pin-filled.svg" folder="icons/tabler" size="16px" />
                <span class="w-16 h-1.5 bg-white opacity-90 rounded"></span>
            </li>
        </ul>

        <div class="flex flex-col items-center gap-1 p-4 rounded-lg bg-pencil-tip bg-opacity-60 backdrop-blur-sm">
            <Icon class="w-7 h-7 shrink-0 bg-stone-400" name="building-store.svg" folder="icons/tabler" size="28px" />
            <span class="text-sm text-white"><b class="text-stone-400">Sunday</b> through <b class="text-stone-400">Friday</b></span>
            <span class="text-sm text-white" dir="ltr">9:00 AM - 12:00 PM</span>
        </div>

        <div class="flex flex-col items-center gap-2">
            <!-- <Icon class="w-6 h-6 shrink-0 bg-stone-400" name="phone-call.svg" folder="icons/tabler" size="24px" /> -->
            <a class="text-lg/none" href="tel:0212345678" dir="ltr">021 <span class="inline-block w-20 h-3 bg-white rounded-sm"></span></a>
            <a class="text-lg/none" href="tel:0212345678" dir="ltr">021 <span class="inline-block w-20 h-3 bg-white rounded-sm"></span></a>
        </div>

        <a class="flex items-center gap-1 text-sm" href="" title="Follow Us On Instagram" dir="ltr">
            <div class="insta-gradient flex items-center justify-center rounded-lg">
                <Icon class="w-6 h-6 bg-white" name="brand-instagram.svg" folder="icons/tabler" size="24px" />
            </div>
            @{{ brand.name }}
        </a>
    </div>
</template>

<script setup>
const props = defineProps({
    brand: { type: Object },
});
</script>
