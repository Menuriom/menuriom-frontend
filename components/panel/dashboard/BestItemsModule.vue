<style scoped>
.swiper-slide {
    width: auto;
    /* max-width: 4.5rem; */
    display: flex !important;
}
</style>

<template>
    <section class="flex flex-col gap-4 w-full max-w-xl lg:max-w-[420px] p-4 bg-bgAccent rounded-3xl" ref="section">
        <header class="flex flex-wrap md:flex-nowrap items-center justify-between gap-4 w-full">
            <ul class="flex items-center gap-1 shrink-0">
                <li
                    class="text-[11px] py-1.5 px-2 rounded-lg bg-opacity-20 border border-bgSecondary cursor-pointer"
                    :class="{ 'px-2 bg-fgPrimary': tab == 'MostViewed' }"
                    @click="tab = 'MostViewed'"
                >
                    {{ $t("panel.dashboard.Most Viewed") }}
                </li>
                <li
                    class="text-[11px] py-1.5 px-2 rounded-lg bg-opacity-20 border border-bgSecondary cursor-pointer"
                    :class="{ 'px-2 bg-fgPrimary': tab == 'MostOrdered' }"
                    @click="tab = 'MostOrdered'"
                >
                    {{ $t("panel.dashboard.Most Ordered") }}
                </li>
                <li
                    class="text-[11px] py-1.5 px-2 rounded-lg bg-opacity-20 border border-bgSecondary cursor-pointer"
                    :class="{ 'px-2 bg-fgPrimary': tab == 'MostLiked' }"
                    @click="tab = 'MostLiked'"
                >
                    {{ $t("panel.dashboard.Most Liked") }}
                </li>
            </ul>
            <SelectDropDown
                class="w-32 cursor-pointer"
                customPadding="px-2 py-1 text-xs"
                :formHtmlObject="section"
                :options="dateRanges.list"
                v-slot="{ option }"
                v-model:selected-option="selectedDateRange.option"
            >
                <span class="text-xs" :value="option.value">{{ option.name }}</span>
            </SelectDropDown>
        </header>
        <Swiper
            class="w-full h-auto"
            wrapper-tag="ul"
            slides-per-view="auto"
            :dir="localeProperties.dir"
            @swiper="getSwiper"
            v-if="itemsList.length && !getTheBestOf.pending.value"
        >
            <SwiperSlide tag="li" class="relative shadow-mr25 me-3 group" v-for="item in itemsList">
                <div class="relative w-44 h-44 rounded-2xl overflow-hidden border-2 border-bgSecondary select-none isolate">
                    <img class="absolute w-full aspect-square object-cover rounded-xl" :src="item.menuItem.images[0]" />
                    <div
                        class="absolute -bottom-6 group-hover:bottom-0 flex flex-col gap-1 w-full p-2 bg-bgAccent bg-opacity-80 rounded-lg shadow-mr15 backdrop-blur-sm transition-all"
                    >
                        <span class="flex items-center justify-center gap-2 w-full overflow-hidden overflow-ellipsis font-bold">
                            <Icon class="w-5 h-5 gradient" name="heart.svg" folder="icons/tabler" size="22px" />
                            {{ Intl.NumberFormat(locale).format(item.totalCount) }}
                        </span>
                        <span class="w-full overflow-hidden overflow-ellipsis text-center text-sm"> {{ item.menuItem.name }} </span>
                    </div>
                </div>
            </SwiperSlide>
        </Swiper>
        <div class="flex items-center justify-center w-full h-44 border-2 border-bgSecondary bg-bgSecondary rounded-2xl" v-if="!itemsList.length && !getTheBestOf.pending.value">
            <span>{{ $t("panel.dashboard.Not enough data") }}</span>
        </div>
        <div class="flex items-center justify-center w-full h-44 border-2 border-bgSecondary bg-bgSecondary rounded-2xl" v-if="getTheBestOf.pending.value">
            <Loading />
        </div>
    </section>
</template>

<script setup>
import SelectDropDown from "~/components/form/SelectDropDown.vue";

const { t, localeProperties, locale } = useI18n();
const route = useRoute();

const section = ref(); // Dom Ref
const tab = ref("MostViewed");
const selectedDateRange = reactive({ option: { name: t("panel.dashboard.This Month"), value: "ThisMonth" } });
const dateRanges = reactive({
    list: [
        { name: t("panel.dashboard.This Month"), value: "ThisMonth" },
        { name: t("panel.dashboard.Last Month"), value: "LastMonth" },
        { name: t("panel.dashboard.This Year"), value: "ThisYear" },
    ],
});
const period = ref("ThisMonth");
watch(
    () => selectedDateRange.option.value,
    (val) => (period.value = val)
);

const swiperInstance = ref();
const getSwiper = (swiper) => {
    swiperInstance.value = swiper;
    watch(localeProperties, (v) => swiper.changeLanguageDirection(v.dir));
};

// getCounts -------------------------------------------------
const itemsList = ref([]);
const getTheBestOf = await useFetch(`/api/v1/panel/analytics/best-of`, {
    lazy: process.client,
    headers: { brand: route.params.brandID },
    query: { period: period, tab: tab },
    watch: [period, tab],
});
if (getTheBestOf.error.value && getTheBestOf.error.value.statusCode >= 500 && process.server) {
    console.error({ err: getTheBestOf.error.value });
}

if (getTheBestOf.data.value) itemsList.value = getTheBestOf.data.value || [];
watch(getTheBestOf.data, (val) => (itemsList.value = val || []));
// -------------------------------------------------
</script>
