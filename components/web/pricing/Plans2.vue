<style scoped></style>

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
        <ul class="flex flex-nowrap lg:flex-wrap lg:justify-center gap-4 lg:gap-8 w-full overflow-auto">
            <li
                class="flex flex-col gap-2 w-[91%] md:w-screen max-w-xs 2sm:max-w-[355px] lg:max-w-sm rounded-4xl shadow-mr35 shrink-0 lg:shrink"
                v-for="(item, i) in plans"
                :key="i"
            >
                <div class="flex flex-col gap-2 w-full h-full rounded-4xl shadow-mr35" :class="[i === 1 ? 'gradient-re p-2 sm:p-3' : 'bg-fgPrimary']">
                    <div class="flex flex-col gap-3 sm:gap-6 w-full h-full p-6 md:p-8 rounded-3xl bg-fgPrimary text-bgPrimary">
                        <div class="flex items-center gap-3">
                            <img class="w-12 p-2 rounded-xl bg-bgSecondary bg-opacity-10" :src="item.icon" :alt="item.name" />
                            <h3 class="f-inter text-2xl md:text-3xl font-extrabold">{{ item.translation?.[locale]?.name || item.name }}</h3>
                        </div>
                        <p class="text-sm sm:text-base sm:min-h-[3rem]">{{ item.translation?.[locale]?.desc || item.desc }}</p>
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
                        <ul class="flex flex-col gap-3 flex-grow">
                            <li class="flex items-center gap-2" v-if="i > 0">
                                <Icon class="relative w-5 h-5 bg-primary" name="plus.svg" folder="icons" size="16px" />
                                <p class="text-sm sm:text-base opacity-90 text-primary">{{ $t("pricing.Everything on previous plan") }}</p>
                            </li>
                            <li class="flex items-center gap-2" v-for="(feature, j) in item.listings" :key="j">
                                <Icon class="relative w-5 h-5 bg-secondary" name="check.svg" folder="icons" size="18px" />
                                <p class="text-sm sm:text-base opacity-90">{{ item.translation?.[locale]?.listings[j] || feature }}</p>
                            </li>
                        </ul>
                        <nuxt-link
                            class="btn flex items-center justify-center w-full sm:w-auto mx-auto p-4 px-8 hover:px-12 mt-4 bg-bgAccent text-fgPrimary rounded-xl hover:translate-y-1"
                            :to="localePath('panel')"
                        >
                            {{ $t("pricing.Get Started") }}
                        </nuxt-link>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup>
import Icon from "~/components/Icon.vue";

const props = defineProps({
    plans: { type: Object },
});

const { locale, localeProperties } = useI18n();
const localePath = useLocalePath();

const swiperInstance = ref();
const getSwiper = (swiper) => {
    swiperInstance.value = swiper;
    watch(localeProperties, (v) => {
        swiper.changeLanguageDirection(v.dir);
    });
};

const priceType = ref("monthly");
const annualOffPercent = ref(10);

const togglePriceType = (type) => {
    priceType.value = type;
};
</script>
