<style scoped></style>

<template>
    <Wrapper class="flex flex-col gap-4 w-full p-4 bg-bgAccent rounded-2xl shadow-mr15" :defaultState="0">
        <template #title>
            <div class="flex items-center justify-between gap-2 w-full group">
                <h3 class="font-bold text-primary">{{ $t("panel.menu-style.Categories Section") }}</h3>
                <span class="h-0.5 bg-primary bg-opacity-40 group-hover:bg-opacity-100 transition-all grow"></span>
                <Icon class="w-5 h-5 bg-primary -rotate-90" name="caret-left.svg" folder="icons/tabler" size="20px" />
            </div>
        </template>
        <div class="flex flex-col gap-6 overflow-hidden">
            <div class="flex flex-wrap items-center gap-2">
                <h5 class="text-sm opacity-80">{{ $t("panel.menu-style.Orientation") }}</h5>
                <ul class="flex flex-wrap items-center gap-2">
                    <li
                        class="flex items-center gap-2 p-1.5 rounded-full border border-bgSecondary shadow-nr15 cursor-pointer"
                        :class="{ 'bg-bgSecondary': categoriesOptions.orientation == orient }"
                        @click="categoriesOptions.orientation = orient"
                        v-for="orient in categoriesOptions.orientations"
                    >
                        <span class="flex items-center justify-center w-5 h-5 p-0.5 rounded-full border-2 border-neutral-500 border-opacity-50">
                            <b
                                class="inline-block w-full h-full rounded-full"
                                :class="{ 'bg-primary shadow-xl shadow-primary': categoriesOptions.orientation == orient }"
                            ></b>
                        </span>
                        <span class="text-sm me-2">{{ $t(`panel.menu-style.orient-${orient}`) }}</span>
                    </li>
                </ul>
            </div>
            <hr class="w-full border-bgSecondary" />
            <div class="flex flex-wrap items-center gap-2">
                <h5 class="text-sm opacity-80">{{ $t("panel.menu-style.Corner Radius") }}</h5>
                <input class="input-range w-40" type="range" max="50" step="5" v-model="categoriesOptions.cornerRadius" />
            </div>
            <div class="flex flex-wrap items-center gap-2">
                <h5 class="text-sm opacity-80">{{ $t("panel.menu-style.Show categories icons") }}</h5>
                <Switch v-model:value="categoriesOptions.withIcon" />
            </div>
            <hr class="w-full border-bgSecondary" />
            <div class="flex flex-col gap-2">
                <div class="flex flex-wrap gap-2">
                    <ColorPicker :label="$t('panel.menu-style.text color')" v-model:color="categoriesOptions.textColor" :baseColor="baseColors.textColor" />
                    <ColorPicker
                        :label="$t('panel.menu-style.background main')"
                        v-model:color="categoriesOptions.bgMainColor"
                        :baseColor="baseColors.bgMainColor"
                    />
                    <ColorPicker
                        :label="$t('panel.menu-style.background accent')"
                        v-model:color="categoriesOptions.bgSecondaryColor"
                        :baseColor="baseColors.bgSecondaryColor"
                    />
                    <ColorPicker
                        :label="$t('panel.menu-style.primary color')"
                        v-model:color="categoriesOptions.primaryColor"
                        :baseColor="baseColors.primaryColor"
                    />
                </div>
                <small class="text-xs text-secondary opacity-80">
                    {{ $t("panel.menu-style.you can change colors for each section (make sure to unlock the color sync first)") }}
                </small>
            </div>
        </div>
    </Wrapper>
</template>

<script setup>
import ColorPicker from "@/components/form/ColorPicker.vue";
import Switch from "~/components/form/Switch.vue";
import Wrapper from "~/components/form/Wrapper.vue";

const route = useRoute();

const props = defineProps({
    brand: { type: Object },
    patterns: { type: Array },
    baseColors: { type: Object },
    categoriesOptions: { type: Object },
});
</script>
