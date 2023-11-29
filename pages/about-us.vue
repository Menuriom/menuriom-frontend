<style scoped>
.flip {
    transform: rotateY(180deg) rotateZ(-15deg);
}

.bar {
    width: 90%;
    /* top: -10%; */
    inset-inline-start: -2%;
    transform-origin: top left;
    /* z-index: -1; */
    mix-blend-mode: screen;
}

@media (min-width: 768px) {
    .bar {
        width: 50%;
        /* top: -12%; */
        inset-inline-start: -7%;
    }
}
</style>

<template>
    <div class="flex flex-col items-center gap-10 w-full max-w-screen-2xl mx-auto p-4">
        <section class="flex flex-col isolate me-auto">
            <header
                class="relative flex flex-col gap-4 md:gap-6 w-full md:w-screen max-w-5xl xl:max-w-6xl p-6 md:p-10 rounded-2xl bg-fgPrimary text-bgAccent isolate"
            >
                <div
                    class="bar absolute h-24 rounded-2xl bg-gradient-to-r from-primary to-secondary shadow-mr25"
                    :class="[localeProperties.dir == 'rtl' ? 'rotate-[14deg] -top-24' : '-rotate-[14deg] top-12']"
                ></div>
                <h1 class="text-4xl md:text-6xl font-extrabold mb-2">{{ $t("about-us.About Us") }}.</h1>
                <div class="flex flex-col gap-1 font-semibold">
                    <p class="opacity-90">{{ $t("about-us.desc1") }}</p>
                    <p class="opacity-90">{{ $t("about-us.desc2") }}</p>
                </div>
                <p class="w-full max-w-3xl xl:max-w-4xl text-lg font-semibold">{{ $t("about-us.desc3") }}</p>
                <div class="flex flex-col items-end md:-mt-10">
                    <img class="w-auto h-8 object-contain mix-blend-difference -rotate-6" src="~/assets/images/signature2.png" alt="" />
                    <img class="w-auto h-12 object-contain mix-blend-difference rotate-[-1deg]" src="~/assets/images/signature.png" alt="" />
                </div>
            </header>
        </section>

        <section
            class="relative flex flex-col items-center justify-center gap-6 md:gap-10 w-full max-w-4xl p-6 md:p-12 ms-auto rounded-3xl bg-bgAccent shadow-mr35"
        >
            <img
                class="absolute -top-20 -start-52 hidden lg:flex w-36 mix-blend-difference"
                :class="[localeProperties.dir == 'rtl' ? 'flip' : '-rotate-[15deg]']"
                src="/img/arrow.svg"
            />

            <h2 class="text-4xl font-extrabold">{{ $t("about-us.Our Humble Team") }}.</h2>
            <div class="flex flex-wrap md:flex-nowrap items-center justify-center gap-4 w-full">
                <div class="flex items-center gap-4 w-full max-w-screen-2sm p-4 rounded-2xl bg-bgSecondary bg-opacity-40 shadow-mr15">
                    <img class="w-20 h-20 rounded-full shadow-mr15" width="100px" height="100px" src="/img/Amin.png" alt="Amin" />
                    <div class="flex flex-col gap-1">
                        <b class="text-lg">{{ $t("about-us.Amin Khalili") }}</b>
                        <span class="opacity-75">{{ $t("about-us.Owner & Co Founder") }}</span>
                    </div>
                </div>
                <div class="flex items-center gap-4 w-full max-w-screen-2sm p-4 rounded-2xl bg-bgSecondary bg-opacity-40 shadow-mr15">
                    <img class="w-20 h-20 rounded-full shadow-mr15" width="100px" height="100px" src="/img/Kasra.png" alt="Kasra" />
                    <div class="flex flex-col gap-1">
                        <b class="text-lg">{{ $t("about-us.Kasra Keshvardoost") }}</b>
                        <span class="opacity-75">{{ $t("about-us.Tech Lead & Co Founder") }}</span>
                    </div>
                </div>
            </div>
        </section>

        <section class="flex flex-col gap-4 w-full max-w-6xl md:my-10">
            <h3 class="flex items-center gap-2 w-full -mb-4">
                <span class="text-lg">{{ $t("about-us.Our Goals") }}</span>
                <span class="w-0.5 h-0.5 bg-bgAccent grow"></span>
            </h3>
            <h2 class="text-3xl/normal md:text-5xl/tight font-bold mb-6 gradient-text">
                {{ $t("about-us.We want to build everything you need to manage your restaurant") }}!
            </h2>
            <div class="flex flex-col items-start gap-4 p-6 md:p-8 rounded-3xl bg-bgAccent shadow-mr15">
                <div class="flex items-center gap-2">
                    <span class="flex items-center justify-center h-8 w-8"> <img class="h-8 animate-pulse" src="/img/check.png" alt="check" /> </span>
                    <h4 class="text-xl font-bold">{{ $t("about-us.We added these features so far") }}...</h4>
                </div>
                <ul class="flex flex-wrap items-start gap-4 ps-4 md:p-6 border-s-4 ms-3">
                    <li class="flex items-center gap-2 bg-bgSecondary bg-opacity-50 rounded-xl p-2 px-4 text-sm md:text-base shadow-mr15" v-for="item in weBuilt">
                        <span class="relative flex items-center justify-center w-3 h-3 rounded-full bg-secondary"></span> {{ $t(`about-us.${item}`) }}
                    </li>
                </ul>
            </div>
            <div class="flex flex-col items-start gap-4 p-6 md:p-8 rounded-3xl bg-bgAccent shadow-mr15">
                <div class="flex items-center gap-2">
                    <span class="flex items-center justify-center h-8 w-8"> <img class="h-8 animate-pulse" src="/img/hourglass.png" alt="hourglass" /> </span>
                    <h4 class="text-xl font-bold">{{ $t("about-us.What we plan to add next") }}...</h4>
                </div>
                <ul class="flex flex-wrap items-start gap-4 ps-4 md:p-6 border-s-4 ms-3">
                    <li class="flex items-center gap-2 bg-bgSecondary bg-opacity-50 rounded-xl p-2 px-4 text-sm md:text-base shadow-mr15" v-for="item in wePlan">
                        <span class="relative flex items-center justify-center w-3 h-3 rounded-full bg-secondary grayscale"></span> {{ $t(`about-us.${item}`) }}
                    </li>
                </ul>
            </div>
        </section>

        <hr class="w-full max-w-screen-xl opacity-20" />

        <section
            class="flex flex-wrap md:flex-nowrap items-center justify-center gap-6 w-full max-w-5xl p-6 md:p-8 rounded-3xl bg-fgPrimary text-bgPrimary shadow-mr25"
        >
            <img class="w-32" src="/img/mail.png" alt="contact-us" />
            <span class="flex flex-col gap-1 w-full">
                <p class="text-2xl font-bold">{{ $t("about-us.We are open to your suggestions") }}!</p>
                <p class="text-xl">{{ $t("about-us.openToSuggestion") }}</p>
            </span>
            <nuxt-link class="btn p-4 hover:px-8 rounded-xl bg-primary text-fgPrimary text-xl shrink-0" :to="localePath(`/contact-us`)">
                {{ $t("footer.Request Feature") }}
            </nuxt-link>
        </section>
    </div>
</template>

<script setup>
useHead({ title: `About Us - Menuriom` });
definePageMeta({ layout: "default" });

const { localeProperties } = useI18n();
const localePath = useLocalePath();

const weBuilt = [
    "Menu management service",
    "QR code for menus",
    "Branch management",
    "Staff management",
    "Analytics and reports",
    "Customizations and templates for menu and QR codes",
];
const wePlan = [
    "Orders management",
    "Ordering app for waiters",
    "in menu ordering for your customers",
    "reservation system",
    "customer feedback system",
    "bills and factor management system",
    "CRM system & customers club",
];
</script>
