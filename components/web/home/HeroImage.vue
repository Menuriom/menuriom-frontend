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
    transition: all 1.75s ease;
}
.list_tr {
    transition: all 5s ease;
}
</style>

<template>
    <div class="scene relative self-end w-full sm:w-auto 1.5xl:-mt-10">
        <div class="phone relative flex flex-col items-center lg:-mb-52 w-full sm:w-screen max-w-[428px] aspect-[1/2] overflow-hidden isolate">
            <div
                class="relative top-2 flex flex-col items-center rounded-[3rem] mx-auto bg-neutral-50 overflow-hidden isolate"
                style="width: calc(100% - 1rem); height: calc(100% - 1.25rem)"
                dir="ltr"
                ref="screen"
            >
                <div class="absolute top-1/4 inset-0 pattern opacity-10"></div>

                <span name="toolbar" ref="toolbar" class="toolbar_tr sticky top-2 inline-block w-full pb-10 mb-2 bg-primary z-10"> </span>

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
                        <input class="w-full p-0.5 text-sm outline-none text-black" inputmode="search" />
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
                    <ul class="flex items-center gap-3 w-full">
                        <li class="relative rounded-xl bg-white cursor-pointer shadow-nr10 shrink-0">
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
                        <li class="relative rounded-xl bg-white cursor-pointer shadow-nr10 shrink-0" v-for="i in 3">
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
                    <div name="header-title" class="flex flex-col gap-2 w-full">
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
                                <NuxtImg
                                    class="w-full aspect-square object-cover rounded-xl shadow-mr10"
                                    :src="`/hero-img/${i}`"
                                    format="webp"
                                    width="180px"
                                    loading="lazy"
                                />
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
                    <div name="header-title" class="flex flex-col gap-2 w-full">
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
                                <NuxtImg
                                    class="w-full aspect-square object-cover rounded-xl shadow-mr10"
                                    :src="`/hero-img/${i}`"
                                    format="webp"
                                    width="180px"
                                    loading="lazy"
                                />
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

                <div name="navbar" class="sticky bottom-6 flex items-center justify-center gap-6 py-3 px-6 rounded-2xl bg-neutral-50 shadow-mr25 mt-10">
                    <span class="flex flex-col items-center justify-center gap-2 rounded-full transition-all hover:scale-125 hover:rotate-6">
                        <Icon class="w-7 h-7 bg-black shrink-0" name="bell-ringing.svg" folder="icons/tabler" size="28px" />
                        <span class="inline-block w-10 h-1.5 rounded-md bg-bgSecondary opacity-20"></span>
                    </span>
                    <span class="flex flex-col items-center justify-center gap-2 rounded-full transition-all hover:scale-125 hover:-rotate-6">
                        <Icon class="w-7 h-7 bg-black shrink-0" name="building-store.svg" folder="icons/tabler" size="28px" />
                        <span class="inline-block w-10 h-1.5 rounded-md bg-bgSecondary opacity-20"></span>
                    </span>
                    <span class="relative flex flex-col items-center justify-center gap-2 rounded-full transition-all hover:scale-125 hover:rotate-6">
                        <div class="relative flex items-center justify-center w-7 h-7 isolate">
                            <div class="absolute w-9 h-9 rounded-full bg-secondary opacity-40"></div>
                            <Icon class="w-7 h-7 bg-black shrink-0" name="receipt-2.svg" folder="icons/tabler" size="28px" />
                        </div>
                        <span class="inline-block w-10 h-1.5 rounded-md bg-bgSecondary opacity-20"></span>
                        <span class="absolute top-0 start-0 flex items-center justify-center w-3 h-3 bg-red-400 rounded-full shadow-nr15" />
                    </span>
                </div>
            </div>

            <img class="absolute w-full z-10" src="~/assets/images/Xmockup2.svg" alt="" />
        </div>
        <NuxtImg
            class="absolute top-24 lg:top-32 start-10 lg:-start-32 hidden lg:flex"
            :class="{ flip: localeProperties.dir == 'rtl' }"
            src="/img/arrow.svg"
            width="100px"
            alt=""
        />
        <div
            class="absolute bottom-6 -start-4 lg:-start-28 flex flex-col items-center justify-center gap-4 w-52 p-4 md:p-6 rounded-3xl border border-bgSecondary border-opacity-5 bg-fgPrimary bg-opacity-60 backdrop-blur-md"
        >
            <NuxtImg class="object-contain rounded-2xl shadow-mr25" src="/img/qr2.png" format="webp" width="200px" height="200px" />
            <strong class="text-2xl text-bgPrimary text-center font-extrabold">{{ $t("home.Check The Demo") }}</strong>
        </div>
    </div>
</template>

<script setup>
const { localeProperties } = useI18n();

const categories = ["dish3.webp", "fish.webp", "salad2.webp", "drink6.webp", "icecream.png"];
const item1foods = ["food1.jpg", "food2.jpg", "food5.jpg", "food4.jpg"];
const item2foods = ["food12.jpg", "food11.jpg", "food7.jpg", "food8.jpg", "food9.jpg", "food10.jpg"];

const screen = ref(); // Dom Ref

const toolbar = ref(); // Dom Ref
const header = ref(); // Dom Ref
const search = ref(); // Dom Ref
const category = ref(); // Dom Ref
const list = ref(); // Dom Ref

const animate = () => {
    setTimeout(() => {
        toolbar.value.style.transform = `translateY(0px)`;
        header.value.style.transform = `translateY(-100px)`;

        search.value.style.transform = `translateY(-100px)`;
        category.value.style.transform = `translateY(-100px)`;

        list.value.style.transform = `translateY(-300px)`;
    }, 1000);

    setTimeout(() => {
        list.value.style.transform = `translateY(-650px)`;
    }, 4000);

    // setTimeout(() => {
    //     list.value.style.transform = `translateY(-1100px)`;
    // }, 7000);

    setTimeout(() => {
        list.value.style.transform = `translateY(0px)`;
    }, 11000);

    setTimeout(() => {
        toolbar.value.style.transform = `translateY(-3rem)`;
        header.value.style.transform = `translateY(0px)`;

        search.value.style.transform = `translateY(0px)`;
        category.value.style.transform = `translateY(0px)`;
    }, 14000);
};

onMounted(() => {
    animate();
    setInterval(() => {
        animate();
    }, 17000);
});
</script>
