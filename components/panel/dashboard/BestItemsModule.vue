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
                    :class="{ 'px-2 bg-fgPrimary': tab == 'Most Viewed' }"
                    @click="tab = 'Most Viewed'"
                >
                    {{ $t("panel.dashboard.Most Viewed") }}
                </li>
                <li
                    class="text-[11px] py-1.5 px-2 rounded-lg bg-opacity-20 border border-bgSecondary cursor-pointer"
                    :class="{ 'px-2 bg-fgPrimary': tab == 'Most Ordered' }"
                    @click="tab = 'Most Ordered'"
                >
                    {{ $t("panel.dashboard.Most Ordered") }}
                </li>
                <li
                    class="text-[11px] py-1.5 px-2 rounded-lg bg-opacity-20 border border-bgSecondary cursor-pointer"
                    :class="{ 'px-2 bg-fgPrimary': tab == 'Most Liked' }"
                    @click="tab = 'Most Liked'"
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
        <div>
            <Swiper class="w-full h-auto" wrapper-tag="ul" slides-per-view="auto" :dir="localeProperties.dir" @swiper="getSwiper">
                <SwiperSlide tag="li" class="relative shadow-mr25 me-3 group" v-for="i in 5">
                    <div class="relative w-44 h-44 rounded-2xl overflow-hidden border-2 border-bgSecondary select-none isolate">
                        <img class="absolute w-full aspect-square object-cover rounded-xl" :src="`/sample-foods/sample-food${i}.webp`" />
                        <div
                            class="absolute -bottom-6 group-hover:bottom-0 flex flex-col gap-1 w-full p-2 bg-bgAccent bg-opacity-80 rounded-lg shadow-mr15 backdrop-blur-sm transition-all"
                        >
                            <span class="flex items-center justify-center gap-2 w-full overflow-hidden overflow-ellipsis font-bold">
                                <Icon class="w-5 h-5 gradient" name="heart.svg" folder="icons/tabler" size="22px" />
                                {{ Intl.NumberFormat(locale).format("3233") }}
                            </span>
                            <span class="w-full overflow-hidden overflow-ellipsis text-center text-sm"> namenam </span>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    </section>
</template>

<script setup>
import SelectDropDown from "~/components/form/SelectDropDown.vue";

const { t, localeProperties, locale } = useI18n();

const section = ref(); // Dom Ref
const tab = ref("Most Viewed");
const selectedDateRange = reactive({ option: { name: t("panel.dashboard.This Month"), value: "This Month" } });
const dateRanges = reactive({
    list: [
        { name: t("panel.dashboard.This Month"), value: "This Month" },
        { name: t("panel.dashboard.Last Month"), value: "Last Month" },
        { name: t("panel.dashboard.This Year"), value: "This Year" },
    ],
});

const swiperInstance = ref();
const getSwiper = (swiper) => {
    swiperInstance.value = swiper;
    watch(localeProperties, (v) => swiper.changeLanguageDirection(v.dir));
};
</script>
