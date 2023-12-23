<style scoped>
.flip {
    transform: rotateY(180deg);
}

.scene {
    perspective: 1200px;
    perspective-origin: center;
}

.pattern {
    background-image: linear-gradient(180deg, #0000 -10%, #000f 120%);
    mask: url("~/assets/images/pattern2.png");
    mask-size: 200px;
    mask-position: 20px 20px;
}

.phone {
    /* animation: rotate-swing 5s ease infinite alternate; */
    transition: all 0.2s;
}
@keyframes rotate-swing {
    100% {
        transform: rotateY(16deg) rotateX(3deg);
    }
}

.no-scrl {
    scrollbar-width: none;
}
.no-scrl::-webkit-scrollbar {
    width: 0px;
    height: 0px;
}

.toolbar_tr {
    transform: translateY(-3rem);
    transition: all 1s ease;
}
.header_tr {
    transition: all 1s ease;
}
.search_tr {
    transition: all 1.45s ease;
}
.category_tr {
    transition: all 1.55s ease;
}
.list_tr {
    transition: all 4s ease-out;
}
.backdrop_tr {
    opacity: 0;
    z-index: -1;
    transition: all 1s ease;
}
.itemDetails_tr {
    transform: translateY(700px);
    transition: all 2s ease;
}
</style>

<template>
    <div class="scene relative flex flex-col items-center gap-4 self-end w-full sm:w-auto 1.5xl:-mt-10">
        <div class="phone relative flex flex-col items-center lg:-mb-52 w-full sm:w-screen max-w-[420px] aspect-[1/2] overflow-hidden isolate">
            <div
                class="relative top-2 flex flex-col items-center rounded-[3rem] mx-auto bg-neutral-50 overflow-hidden no-scrl isolate"
                style="width: calc(100% - 1rem); height: calc(100% - 1.25rem)"
                dir="ltr"
            >
                <div class="absolute top-1/4 inset-0 pattern opacity-10"></div>

                <span
                    name="toolbar"
                    ref="toolbar"
                    class="toolbar_tr sticky top-1 sm:top-2 inline-block w-full pb-7 sm:pb-10 sm:mb-2 bg-gradient-to-tr from-secondary to-primary z-10"
                />

                <div name="header" ref="header" class="header_tr relative w-full pt-0 px-6 z-4 isolate">
                    <div class="absolute inset-0 w-full h-28 -mt-10 bg-gradient-to-tr from-secondary to-primary shadow-mr15 -z-10"></div>
                    <div class="flex items-center gap-2 w-full mt-4">
                        <NuxtImg class="shadow-mr15 rounded-full" src="/hero-img/logo.png" width="80px" height="80px" format="webp" />
                        <div class="flex flex-col gap-2 w-full -mt-6">
                            <span class="inline-block w-5/12 h-4 rounded-md bg-white opacity-60"></span>
                            <span class="inline-block w-8/12 h-2 rounded-md bg-white opacity-60"></span>
                        </div>
                        <div class="flex flex-col items-center gap-1 w-7 p-1.5 -mb-4 rounded-lg bg-bgSecondary shadow-mr10 shrink-0">
                            <img class="w-full" src="/flags/en.png" alt="" />
                            <span class="inline-block w-full h-1 rounded-md bg-white opacity-60"></span>
                        </div>
                    </div>
                    <div class="absolute start-28 bottom-0 flex items-center gap-2">
                        <span class="relative w-2.5 h-2.5 bg-green-500 rounded-full">
                            <span class="absolute inset-0 w-2.5 h-2.5 bg-green-500 rounded-full animate-ping"></span>
                        </span>
                        <small class="text-green-700">Ready for orders</small>
                    </div>
                </div>

                <div name="search" ref="search" class="search_tr sticky top-11 flex items-center gap-2 w-full px-6 pt-3 pb-1 bg-neutral-50 z-3">
                    <button
                        class="flex items-center justify-center p-2.5 bg-bgAccent border border-neutral-500 border-opacity-20 rounded-xl shadow-nr15"
                        title="Show All Categories"
                    >
                        <Icon class="w-5 h-5 bg-white shrink-0" name="layout-2.svg" folder="icons/tabler" size="20px" />
                    </button>
                    <form class="flex items-center gap-1 w-full p-2.5 rounded-xl bg-white border border-neutral-500 border-opacity-10 shadow-mr15">
                        <button class="p-0.5" type="button">
                            <Icon class="w-5 h-5 bg-black shrink-0" name="search.svg" folder="icons/tabler" size="20px" />
                        </button>
                        <input class="w-full p-0.5 text-sm outline-none text-black" placeholder="" inputmode="search" />
                    </form>
                </div>

                <div
                    name="category"
                    ref="category"
                    class="category_tr sticky top-28 flex flex-col gap-1 px-6 pb-2 w-full bg-neutral-50 select-none shrink-0 z-2"
                >
                    <h2 class="flex items-center gap-2 w-full font-bold text-sm text-black overflow-hidden transition-all">
                        Categories <span class="w-0.5 h-0.5 bg-bgSecondary opacity-5 grow"></span>
                    </h2>
                    <ul class="flex items-center gap-3 w-full overflow-x-clip no-scrl">
                        <li class="relative rounded-xl bg-white border border-neutral-500 border-opacity-10 cursor-pointer shadow-nr10 shrink-0">
                            <div class="flex items-center justify-center gap-3 w-full overflow-hidden p-2">
                                <span class="flex items-center justify-center w-10 h-10 p-1 rounded-xl bg-bgSecondary bg-opacity-10 shrink-0">
                                    <img class="w-full aspect-square object-contain" width="40px" :src="`/file/categoryIcons/${categories[0]}`" />
                                </span>
                                <span class="inline-block w-8 h-2 rounded-md bg-bgSecondary opacity-30"></span>
                            </div>
                        </li>
                        <li class="relative rounded-xl bg-secondary cursor-pointer shadow-nr10 shrink-0">
                            <div class="flex items-center justify-center gap-3 w-full overflow-hidden p-2">
                                <span class="flex items-center justify-center w-10 h-10 p-1 rounded-xl bg-fgPrimary bg-opacity-80 shrink-0">
                                    <img class="w-full aspect-square object-contain" width="40px" :src="`/file/categoryIcons/${categories[1]}`" />
                                </span>
                                <span class="inline-block w-8 h-2 rounded-md bg-neutral-100 opacity-60"></span>
                            </div>
                        </li>
                        <li class="relative rounded-xl bg-white border border-neutral-500 border-opacity-10 cursor-pointer shadow-nr10 shrink-0" v-for="i in 3">
                            <div class="flex items-center justify-center gap-3 w-full overflow-hidden p-2">
                                <span class="flex items-center justify-center w-10 h-10 p-1 rounded-xl bg-bgSecondary bg-opacity-10 shrink-0">
                                    <img class="w-full aspect-square object-contain" width="40px" :src="`/file/categoryIcons/${categories[i + 1]}`" />
                                </span>
                                <span class="inline-block w-8 h-2 rounded-md bg-bgSecondary opacity-30"></span>
                            </div>
                        </li>
                    </ul>
                </div>

                <div name="list" ref="list" class="list_tr flex flex-col gap-4 w-full px-6">
                    <div name="headerTitle" class="flex flex-col gap-2 w-full">
                        <div class="flex items-center gap-2 w-full">
                            <span class="flex items-center justify-center w-9 h-9 p-2 rounded-full shadow-nr25 shrink-0"
                                ><img class="w-10 h-10 object-contain" :src="`/file/categoryIcons/fish.webp`"
                            /></span>
                            <div class="inline-block w-3/12 h-2 rounded-md bg-bgSecondary opacity-20"></div>
                            <hr class="opacity-50 w-1 border bg-bgSecondary grow" />
                        </div>
                    </div>
                    <div name="items" class="flex flex-col items-center w-full">
                        <ul class="grid gap-4 w-full" style="grid-template-columns: repeat(auto-fill, minmax(160px, 1fr))">
                            <li class="relative flex flex-col gap-2 w-full p-2.5 rounded-2xl bg-white shadow-mr15" v-for="i in item1foods">
                                <NuxtImg class="w-full aspect-square object-cover rounded-xl shadow-mr10" :src="`/hero-img/${i}`" format="webp" width="180px" />
                                <span class="inline-block w-6/12 h-4 rounded-md bg-bgSecondary opacity-30 mb-1"></span>
                                <span class="inline-block w-full h-1.5 -mt-0.5 rounded-md bg-bgSecondary opacity-10"></span>
                                <span class="inline-block w-full h-1.5 -mt-0.5 rounded-md bg-bgSecondary opacity-10"></span>
                                <span class="inline-block w-8/12 h-1.5 -mt-0.5 rounded-md bg-bgSecondary opacity-10"></span>
                                <button
                                    class="flex items-center justify-center w-7 h-7 p-1 rounded-full shadow-mr35 bg-primary transition-all hover:scale-125 shrink-0"
                                >
                                    <Icon class="w-5 h-5 bg-white shrink-0" name="plus.svg" folder="icons/tabler" size="20px" />
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div name="headerTitle" class="flex flex-col gap-2 w-full">
                        <div class="flex items-center gap-2 w-full">
                            <span class="flex items-center justify-center w-9 h-9 p-2 rounded-full shadow-nr25 shrink-0"
                                ><img class="w-10 h-10 object-contain" :src="`/file/categoryIcons/icecream.png`"
                            /></span>
                            <div class="inline-block w-3/12 h-2 rounded-md bg-bgSecondary opacity-20"></div>
                            <hr class="opacity-50 w-1 border bg-bgSecondary grow" />
                        </div>
                    </div>
                    <div name="items" class="flex flex-col items-center w-full">
                        <ul class="grid gap-4 w-full" style="grid-template-columns: repeat(auto-fill, minmax(160px, 1fr))">
                            <li class="relative flex flex-col gap-2 w-full p-2.5 rounded-2xl bg-white shadow-mr15" v-for="i in item2foods">
                                <NuxtImg class="w-full aspect-square object-cover rounded-xl shadow-mr10" :src="`/hero-img/${i}`" format="webp" width="180px" />
                                <span class="inline-block w-6/12 h-4 rounded-md bg-bgSecondary opacity-30 mb-1"></span>
                                <span class="inline-block w-full h-1.5 -mt-0.5 rounded-md bg-bgSecondary opacity-10"></span>
                                <span class="inline-block w-full h-1.5 -mt-0.5 rounded-md bg-bgSecondary opacity-10"></span>
                                <span class="inline-block w-8/12 h-1.5 -mt-0.5 rounded-md bg-bgSecondary opacity-10"></span>
                                <button
                                    class="flex items-center justify-center w-7 h-7 p-1 rounded-full shadow-mr35 bg-primary transition-all hover:scale-125 shrink-0"
                                >
                                    <Icon class="w-5 h-5 bg-white shrink-0" name="plus.svg" folder="icons/tabler" size="20px" />
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

                <div name="navbar" class="sticky bottom-6 flex items-center justify-center gap-6 py-3 px-6 rounded-2xl bg-bgAccent shadow-mr35 mt-10">
                    <span class="flex flex-col items-center justify-center gap-2 rounded-full transition-all hover:scale-125 hover:rotate-6">
                        <Icon class="w-7 h-7 bg-neutral-200 shrink-0" name="bell-ringing.svg" folder="icons/tabler" size="28px" />
                        <span class="inline-block w-10 h-1.5 rounded-md bg-white opacity-30"></span>
                    </span>
                    <span class="flex flex-col items-center justify-center gap-2 rounded-full transition-all hover:scale-125 hover:-rotate-6">
                        <Icon class="w-7 h-7 bg-neutral-200 shrink-0" name="building-store.svg" folder="icons/tabler" size="28px" />
                        <span class="inline-block w-10 h-1.5 rounded-md bg-white opacity-30"></span>
                    </span>
                    <span class="relative flex flex-col items-center justify-center gap-2 rounded-full transition-all hover:scale-125 hover:rotate-6">
                        <div class="relative flex items-center justify-center w-7 h-7 isolate">
                            <!-- <div class="absolute w-9 h-9 rounded-full bg-secondary opacity-40"></div> -->
                            <Icon class="w-7 h-7 bg-secondary shrink-0" name="receipt-2.svg" folder="icons/tabler" size="28px" />
                        </div>
                        <span class="inline-block w-10 h-1.5 rounded-md bg-white opacity-30"></span>
                        <span class="absolute top-0 start-0 flex items-center justify-center w-3 h-3 bg-red-400 rounded-full shadow-nr15" />
                    </span>
                </div>

                <div name="backdrop" ref="backdrop" class="backdrop_tr absolute inset-0 bg-bgSecondary transition-all"></div>
                <div
                    name="itemDetails"
                    ref="itemDetails"
                    class="itemDetails_tr absolute bottom-0 flex flex-col items-center gap-4 rounded-3xl bg-neutral-50 z-10"
                    style="width: calc(100% - 2rem)"
                >
                    <span class="handle w-3/12 h-1.5 mt-4 -mb-4 rounded-full bg-neutral-300 bg-opacity-75 mix-blend-difference shrink-0"></span>
                    <div class="flex flex-col items-center gap-4 w-full h-full mt-4 sm:mt-6 px-4 overflow-auto">
                        <div class="flex items-start gap-4 w-full">
                            <div class="flex flex-col items-start gap-2 grow">
                                <span class="inline-block w-6/12 h-5 rounded-md bg-bgSecondary opacity-30 mb-1"></span>
                                <span class="hidden sm:inline-block w-full h-2 rounded-md bg-bgSecondary opacity-10"></span>
                                <span class="inline-block w-10/12 h-2 rounded-md bg-bgSecondary opacity-10"></span>
                                <span class="hidden sm:inline-block w-full h-2 rounded-md bg-bgSecondary opacity-10"></span>
                                <span class="inline-block w-8/12 h-2 rounded-md bg-bgSecondary opacity-10"></span>
                            </div>
                            <div class="flex flex-col items-end gap-2">
                                <button class="p-2 border border-neutral-500 border-opacity-20 bg-white rounded-2xl shadow-mr25">
                                    <div class="flex flex-col items-center gap-1">
                                        <Icon class="w-5 h-5 bg-rose-400 shrink-0" name="heart.svg" folder="icons/tabler" size="20px" />
                                        <small class="text-xs text-bgPrimary">278</small>
                                    </div>
                                </button>
                                <button
                                    class="hidden sm:flex flex-col items-center gap-1 p-2 border border-neutral-500 border-opacity-20 bg-white rounded-2xl shadow-mr25"
                                >
                                    <Icon class="w-5 h-5 bg-bgPrimary shrink-0" name="message.svg" folder="icons/tabler" size="20px" />
                                </button>
                            </div>
                        </div>
                        <div class="flex flex-col items-center gap-4 w-full">
                            <div class="flex items-center gap-4 w-full">
                                <NuxtImg
                                    class="w-40 sm:w-64 aspect-square object-cover rounded-2xl shadow-mr5"
                                    :src="`/hero-img/food12.jpg`"
                                    width="100% sm:256px"
                                    format="webp"
                                />
                                <NuxtImg
                                    class="w-40 sm:w-64 aspect-square object-cover rounded-2xl shadow-mr5"
                                    :src="`/hero-img/food8.jpg`"
                                    width="100% sm:256px"
                                    format="webp"
                                />
                            </div>
                            <div class="flex items-center gap-1">
                                <span class="w-5 h-2.5 rounded-full bg-primary"></span>
                                <span class="w-2.5 h-2.5 rounded-full bg-neutral-300"></span>
                                <span class="w-2.5 h-2.5 rounded-full bg-neutral-300"></span>
                            </div>
                        </div>
                        <div class="flex flex-col gap-1 w-full">
                            <!-- <span class="inline-block w-20 h-3 rounded-md bg-bgSecondary opacity-20 mb-1"></span> -->
                            <ul class="flex flex-col items-start gap-1 w-full">
                                <li class="flex items-baseline gap-2 w-full cursor-pointer" v-for="i in 3">
                                    <span class="rounded opacity-80 border-bgSecondary bg-bgSecondary border-2">
                                        <Icon class="w-3.5 h-3.5 bg-white shrink-0" name="check.svg" folder="icons/tabler" size="16px" />
                                    </span>
                                    <span class="inline-block w-20 h-3 rounded-md bg-bgSecondary opacity-20 mb-1"></span>
                                    <div class="flex items-baseline justify-center gap-1 ms-auto">
                                        <span class="inline-block w-12 h-2 rounded-md bg-bgSecondary opacity-20 mb-1"></span>
                                        <small class="text-xl text-bgSecondary">$</small>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="sticky bottom-0 flex flex-wrap items-center justify-between gap-3 md:gap-4 pb-4 w-full bg-neutral-50 rounded-b-md">
                            <hr class="w-full border-neutral-500 opacity-25" />
                            <div class="flex flex-col text-base/none">
                                <div class="flex flex-wrap items-center gap-1.5" style="color: rgb(252, 252, 253)">
                                    <span class="text-sm sm:text-xl bg-rose-600 bg-opacity-75 p-1 px-2 rounded-xl">12%</span>
                                </div>
                                <div class="flex flex-wrap items-baseline gap-1">
                                    <span class="inline-block w-20 h-4 rounded-md bg-bgAccent opacity-30"></span>
                                    <b class="text-2xl opacity-75 text-bgAccent">$</b>
                                </div>
                            </div>
                            <div class="flex items-center gap-2">
                                <button class="flex items-center justify-center gap-2 py-2.5 bg-primary rounded-full shadow-nr25 shrink-0 px-4">
                                    <span class="text-sm sm:text-base text-white">Add To Orders</span>
                                    <Icon class="w-5 h-5 bg-white shrink-0" name="plus.svg" folder="icons/tabler" size="24px" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <img class="absolute w-full z-10 pointer-events-none" src="~/assets/images/Xmockup2.svg" alt="frame" width="420px" />
        </div>
        <NuxtImg
            class="absolute top-24 lg:top-28 start-10 lg:-start-32 hidden lg:flex"
            :class="{ flip: localeProperties.dir == 'rtl' }"
            src="/img/arrow.svg"
            width="100px"
            alt="arrow"
            loading="lazy"
        />
        <nuxt-link
            class="md:absolute bottom-6 -start-4 md:-start-28 flex flex-col items-center justify-center gap-4 w-52 p-4 md:p-6 rounded-2xl md:rounded-3xl border border-bgSecondary border-opacity-5 bg-fgPrimary md:bg-opacity-60 backdrop-blur-md"
            :to="`${$config.public.MENU_BASE_URL}/Menuriom`"
            :alt="$t('home.Check The Demo')"
        >
            <NuxtImg
                class="hidden md:inline-block object-contain rounded-2xl shadow-mr25"
                src="/img/qr2.png"
                alt="sample menu demo"
                format="webp"
                width="200px"
                height="200px"
            />
            <strong class="text-xl md:text-2xl text-bgPrimary text-center font-extrabold">{{ $t("home.Check The Demo") }}</strong>
        </nuxt-link>
    </div>
</template>

<script setup>
const { localeProperties } = useI18n();

const categories = ["dish3.webp", "fish.webp", "salad2.webp", "drink6.webp", "icecream.png"];
const item1foods = ["food1.jpg", "food2.jpg", "food5.jpg", "food4.jpg"];
const item2foods = ["food12.jpg", "food11.jpg", "food7.jpg", "food8.jpg", "food9.jpg", "food10.jpg"];

const toolbar = ref(); // Dom Ref
const header = ref(); // Dom Ref
const search = ref(); // Dom Ref
const category = ref(); // Dom Ref
const list = ref(); // Dom Ref
const backdrop = ref(); // Dom Ref
const itemDetails = ref(); // Dom Ref

const animate = () => {
    setTimeout(() => {
        if (toolbar.value) toolbar.value.style.transform = `translateY(0px)`;
        if (header.value) header.value.style.transform = `translateY(-100px)`;
        if (search.value) search.value.style.transform = `translateY(-100px)`;
        if (category.value) category.value.style.transform = `translateY(-100px)`;
        if (list.value) list.value.style.transform = `translateY(-300px)`;
    }, 1000);

    setTimeout(() => {
        if (list.value) list.value.style.transform = `translateY(-650px)`;
    }, 4000);

    setTimeout(() => {
        if (backdrop.value) backdrop.value.style.zIndex = `10`;
        if (backdrop.value) backdrop.value.style.opacity = `0.3`;
        if (itemDetails.value) itemDetails.value.style.transform = `translateY(0px)`;
    }, 7000);

    setTimeout(() => {
        if (backdrop.value) backdrop.value.style.zIndex = `-1`;
        if (backdrop.value) backdrop.value.style.opacity = `0`;
        if (itemDetails.value) itemDetails.value.style.transform = `translateY(700px)`;
    }, 13_000);

    setTimeout(() => {
        if (list.value) list.value.style.transform = `translateY(0px)`;
    }, 15_000);

    setTimeout(() => {
        if (toolbar.value) toolbar.value.style.transform = `translateY(-3rem)`;
        if (header.value) header.value.style.transform = `translateY(0px)`;
        if (search.value) search.value.style.transform = `translateY(0px)`;
        if (category.value) category.value.style.transform = `translateY(0px)`;
    }, 17_000);
};

let animationLoop;
onMounted(() => {
    animate();
    animationLoop = setInterval(() => animate(), 22_000);
});

onBeforeUnmount(() => {
    clearInterval(animationLoop);
});
</script>
