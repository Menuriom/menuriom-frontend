<style scoped>
.swiper {
    overflow: initial;
}
.swiper-slide {
    width: auto;
    display: flex !important;
}
</style>

<template>
    <div class="flex flex-col items-center gap-10 w-full p-2 sm:p-4 md:p-8">
        <div class="relative flex items-center gap-6 p-4 rounded-2xl bg-bgAccent isolate">
            <span
                class="absolute w-36 h-10 shadow-md bg-bgSecondary rounded-xl transition-all -z-10"
                :class="[priceType == 'monthly' ? 'start-2' : 'start-40']"
            ></span>
            <span class="flex items-center justify-center gap-1 w-32 cursor-pointer" @click="togglePriceType('monthly')">{{ $t("pricing.Monthly") }}</span>
            <div class="flex items-center justify-center gap-1 w-32 cursor-pointer" @click="togglePriceType('annual')">
                <span>{{ $t("pricing.Annual") }}</span>
                <small class="f-inter p-0.5 px-2 rounded-full text-xs bg-black text-secondary"> {{ annualOffPercent }}% {{ $t("pricing.Off") }} </small>
            </div>
        </div>
        <Swiper
            class="w-full max-w-[1230px] h-auto"
            wrapper-tag="ul"
            :auto-height="false"
            slides-per-view="auto"
            :dir="localeProperties.dir"
            @swiper="getSwiper"
        >
            <SwiperSlide
                tag="li"
                class="flex flex-col gap-2 w-full md:w-screen max-w-[355px] md:max-w-sm rounded-4xl shadow-mr35 me-6 sm:me-12"
                v-for="(item, i) in plans"
                :key="i"
            >
                <div class="flex flex-col gap-2 rounded-4xl shadow-mr35" :class="[i === 1 ? 'gradient-re p-3' : 'bg-fgPrimary']">
                    <div class="flex flex-col gap-6 w-full p-6 md:p-8 rounded-3xl bg-fgPrimary text-bgPrimary">
                        <div class="flex items-center gap-2">
                            <img class="w-12 p-2 rounded-xl bg-bgSecondary bg-opacity-10" :src="item.icon" :alt="item.name" />
                            <h3 class="f-inter text-2xl font-extrabold">{{ item.translation?.[locale]?.name || item.name }}</h3>
                        </div>
                        <p class="text-base min-h-[3rem]">{{ item.translation?.[locale]?.desc || item.desc }}</p>
                        <div class="flex items-baseline gap-1 text-pencil-tip rounded-lg" v-if="item.monthlyPrice > 0">
                            <span class="flex items-baseline f-inter text-3xl/normal font-extrabold gradient-text" dir="auto" v-if="priceType == 'monthly'">
                                {{ Intl.NumberFormat(locale).format(item.monthlyPrice >= 1000 ? item.monthlyPrice / 1000 : item.monthlyPrice) }}
                                <small v-if="item.monthlyPrice >= 1000">,{{ Intl.NumberFormat(locale).format(1000).substring(2) }}</small>
                            </span>
                            <span class="flex items-baseline f-inter text-3xl/normal font-extrabold gradient-text" dir="auto" v-else>
                                {{ Intl.NumberFormat(locale).format(item.yearlyPrice >= 1000 ? item.yearlyPrice / 1000 : item.yearlyPrice) }}
                                <small v-if="item.yearlyPrice >= 1000">,{{ Intl.NumberFormat(locale).format(1000).substring(2) }}</small>
                            </span>
                            <b class="f-inter">{{ $t("pricing.Toman") }}</b>
                            <span class="">/ {{ priceType == "monthly" ? $t("pricing.Monthly") : $t("pricing.Annual") }}</span>
                        </div>
                        <div class="flex items-baseline gap-1 text-pencil-tip rounded-lg" v-else>
                            <b class="f-inter text-3xl/normal font-extrabold gradient-text rounded-lg"> {{ $t("pricing.Free") }} </b>
                            <span class="">/ {{ $t("pricing.Always") }}</span>
                        </div>
                        <hr class="border-spacing-0.5 border-bgPrimary opacity-10" />
                        <ul class="flex flex-col gap-4 flex-grow">
                            <li class="flex items-center gap-2" v-if="i > 0">
                                <Icon class="relative w-5 h-5 bg-primary" name="plus.svg" folder="icons" size="16px" />
                                <p class="opacity-90 text-primary">{{ $t("pricing.Everything on previous plan") }}</p>
                            </li>
                            <li class="flex items-center gap-2" v-for="(feature, j) in item.listings" :key="j">
                                <Icon class="relative w-5 h-5 bg-secondary" name="check.svg" folder="icons" size="18px" />
                                <p class="opacity-90">{{ item.translation?.[locale]?.listings[j] || feature }}</p>
                            </li>
                        </ul>
                        <a
                            class="btn flex items-center justify-center mx-auto p-4 px-8 hover:px-12 mt-4 bg-bgAccent text-fgPrimary rounded-xl hover:translate-y-1"
                            href="#"
                        >
                            {{ $t("pricing.Get Started") }}
                        </a>
                    </div>
                </div>
            </SwiperSlide>
        </Swiper>
        <!-- <ul class="flex flex-wrap justify-center gap-12 w-full max-w-screen-xl">
            <li class="flex flex-col gap-2 rounded-4xl shadow-mr35" :class="[i === 1 ? 'gradient-re p-3' : 'bg-fgPrimary']" v-for="(item, i) in plans" :key="i">
                <div class="flex flex-col gap-6 w-screen max-w-sm h-full p-6 md:p-8 rounded-3xl bg-fgPrimary text-bgPrimary">
                    <div class="flex items-center gap-2">
                        <img class="w-12 p-2 rounded-xl bg-bgSecondary bg-opacity-10" :src="item.icon" :alt="item.name" />
                        <h3 class="f-inter text-2xl font-extrabold">{{ item.translation?.[locale]?.name || item.name }}</h3>
                    </div>
                    <p class="text-base min-h-[3rem]">{{ item.translation?.[locale]?.desc || item.desc }}</p>
                    <div class="flex items-baseline gap-1 text-pencil-tip rounded-lg" v-if="item.monthlyPrice > 0">
                        <span class="flex items-baseline f-inter text-4xl font-extrabold gradient-text" dir="auto" v-if="priceType == 'monthly'">
                            {{ Intl.NumberFormat(locale).format(item.monthlyPrice >= 1000 ? item.monthlyPrice / 1000 : item.monthlyPrice) }}
                            <small v-if="item.monthlyPrice >= 1000">,{{ Intl.NumberFormat(locale).format(1000).substring(2) }}</small>
                        </span>
                        <span class="flex items-baseline f-inter text-4xl font-extrabold gradient-text" dir="auto" v-else>
                            {{ Intl.NumberFormat(locale).format(item.yearlyPrice >= 1000 ? item.yearlyPrice / 1000 : item.yearlyPrice) }}
                            <small v-if="item.yearlyPrice >= 1000">,{{ Intl.NumberFormat(locale).format(1000).substring(2) }}</small>
                        </span>
                        <b class="f-inter">{{ $t("pricing.Toman") }}</b>
                        <span class="">/ {{ priceType == "monthly" ? $t("pricing.Monthly") : $t("pricing.Annual") }}</span>
                    </div>
                    <div class="flex items-baseline gap-1 text-pencil-tip rounded-lg" v-else>
                        <b class="f-inter text-3xl font-extrabold gradient-text rounded-lg"> {{ $t("pricing.Free") }} </b>
                        <span class="">/ {{ $t("pricing.Always") }}</span>
                    </div>
                    <hr class="border-spacing-0.5 border-bgPrimary opacity-10" />
                    <ul class="flex flex-col gap-4 flex-grow">
                        <li class="flex items-center gap-2" v-if="i > 0">
                            <Icon class="relative w-5 h-5 bg-primary" name="plus.svg" folder="icons" size="16px" />
                            <p class="opacity-90 text-primary">{{ $t("pricing.Everything on previous plan") }}</p>
                        </li>
                        <li class="flex items-center gap-2" v-for="(feature, j) in item.listings" :key="j">
                            <Icon class="relative w-5 h-5 bg-secondary" name="check.svg" folder="icons" size="18px" />
                            <p class="opacity-90">{{ item.listings[j].translation?.[locale]?.listings[j] || feature }}</p>
                        </li>
                    </ul>
                    <a
                        class="btn flex items-center justify-center mx-auto p-4 px-8 hover:px-12 mt-4 bg-bgAccent text-fgPrimary rounded-xl hover:translate-y-1"
                        href="#"
                    >
                        {{ $t("pricing.Get Started") }}
                    </a>
                </div>
            </li>
        </ul> -->
    </div>
</template>

<script setup>
import Icon from "~/components/Icon.vue";

const { locale, localeProperties } = useI18n();

const swiperInstance = ref();
const getSwiper = (swiper) => {
    swiperInstance.value = swiper;
    watch(localeProperties, (v) => {
        swiper.changeLanguageDirection(v.dir);
    });
};

const priceType = ref("monthly");
const annualOffPercent = ref(10);

const pricing = reactive({
    list: [
        {
            highlight: false,
            icon: "/pricing/basic-g.png",
            title: "Basic",
            desc: "For individuals or small restaurants and small coffee shops",
            monthlyPrice: 0,
            features: [
                "Unlimited QR scans",
                "Fully customizable",
                "Unlimited Category and menu items",
                "Brand logo and name in the menu",
                "Multiple language option",
                "Ticketing and support system",
            ],
        },
        {
            highlight: true,
            icon: "/pricing/standard-g.png",
            title: "Standard",
            desc: "For businesses and restaurants with more than one branch",
            monthlyPrice: 50000,
            features: [
                "Multiple menu templates",
                "Create up to 3 branches",
                "Customizable QR code",
                "Restaurant info at bottom of menu",
                "Menu item like option",
                "Analytics for scans and reviews",
                "Item highlight and sold out options",
            ],
        },
        {
            highlight: false,
            icon: "/pricing/pro-g.png",
            title: "Pro",
            desc: "For businesses that need more than a digital menu",
            monthlyPrice: 100000,
            features: [
                "Unlimited branches",
                "Ordering system",
                "Server call button in the menu",
                "Restaurant logo in the QR code",
                "Menu item coupling",
                "Discount tags on menu items",
                "Customizable category logos",
                "Customer review option",
            ],
        },
    ],
});

const togglePriceType = (type) => {
    priceType.value = type;
};

const handleError = (err) => {
    if (!err) return;
};
const handleData = (data) => {
    if (!data) return;
    plans.value = data.plans;
};

// getPlans =====================================
const plans = ref([]);
const plansResults = await useFetch("/api/v1/pricing/purchasable-plans", { lazy: process.client });
const plansLoading = computed(() => plansResults.pending.value);

handleError(plansResults.error.value);
watch(plansResults.error, (err) => handleError(err));

handleData(plansResults.data.value);
watch(plansResults.data, (data) => handleData(data));
//  =====================================
</script>
