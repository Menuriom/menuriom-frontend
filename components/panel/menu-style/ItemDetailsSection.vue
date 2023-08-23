<style scoped></style>

<template>
    <div class="flex flex-col gap-6 w-full p-4 bg-bgAccent rounded-2xl shadow-mr15">
        <div class="flex flex-wrap items-center gap-2">
            <h5 class="text-sm">{{ $t("panel.menu-style.Frame Style") }}</h5>
            <ul class="flex flex-wrap items-center gap-2">
                <li
                    class="flex items-center gap-2 p-1.5 rounded-full border-2 border-neutral-500 border-opacity-25 shadow-nr5 cursor-pointer"
                    :class="{ 'bg-pencil-tip text-white': itemsDialogStyleOptions.frameComponent == item }"
                    @click="itemsDialogStyleOptions.frameComponent = item"
                    v-for="item in itemsDialogStyleOptions.frameComponentList"
                >
                    <span class="flex items-center justify-center w-5 h-5 p-0.5 rounded-full border-2 border-neutral-500 border-opacity-50">
                        <b
                            class="inline-block w-full h-full rounded-full"
                            :class="{ 'bg-primary shadow-xl shadow-primary': itemsDialogStyleOptions.frameComponent == item }"
                        ></b>
                    </span>
                    <span class="text-sm me-2">{{ $t(`panel.menu-style.item-details-${item}`) }}</span>
                </li>
            </ul>
        </div>
        <div class="flex flex-wrap items-center gap-2">
            <h5 class="text-sm">{{ $t("panel.menu-style.Content Style") }}</h5>
            <ul class="flex flex-wrap items-center gap-2">
                <li
                    class="flex items-center gap-2 p-1.5 rounded-full border-2 border-neutral-500 border-opacity-25 shadow-nr5 cursor-pointer"
                    :class="{ 'bg-pencil-tip text-white': itemsDialogStyleOptions.bodyComponent == item }"
                    @click="itemsDialogStyleOptions.bodyComponent = item"
                    v-for="item in itemsDialogStyleOptions.bodyComponentList"
                >
                    <span class="flex items-center justify-center w-5 h-5 p-0.5 rounded-full border-2 border-neutral-500 border-opacity-50">
                        <b
                            class="inline-block w-full h-full rounded-full"
                            :class="{ 'bg-primary shadow-xl shadow-primary': itemsDialogStyleOptions.bodyComponent == item }"
                        ></b>
                    </span>
                    <span class="text-sm me-2">{{ $t(`panel.menu-style.item-details-${item}`) }}</span>
                </li>
            </ul>
        </div>
        <hr class="w-full border-bgSecondary">
        <div class="flex flex-wrap items-center gap-2">
            <h5 class="text-sm">{{ $t("panel.menu-style.Corner Radius") }}</h5>
            <input class="input-range w-40" type="range" max="24" step="2" v-model="itemsDialogStyleOptions.cornerRadius" />
        </div>
        <div class="flex flex-wrap items-center gap-2" v-if="itemsDialogStyleOptions.bodyComponent == 'Body1'">
            <h5 class="text-sm">{{ $t("panel.menu-style.Thumbnail Overflow") }}</h5>
            <input class="input-range w-40" type="range" max="20" step="5" v-model="itemsDialogStyleOptions.imageMargin" />
        </div>
        <hr class="w-full border-bgSecondary">
        <div class="flex flex-col gap-2">
            <div class="flex flex-wrap gap-2">
                <ColorPicker :label="$t('panel.menu-style.text color')" v-model:color="itemsDialogStyleOptions.textColor" :baseColor="baseColors.textColor" />
                <ColorPicker
                    :label="$t('panel.menu-style.background main')"
                    v-model:color="itemsDialogStyleOptions.bgMainColor"
                    :baseColor="baseColors.bgMainColor"
                />
                <ColorPicker
                    :label="$t('panel.menu-style.background accent')"
                    v-model:color="itemsDialogStyleOptions.bgSecondaryColor"
                    :baseColor="baseColors.bgSecondaryColor"
                />
                <ColorPicker
                    :label="$t('panel.menu-style.primary color')"
                    v-model:color="itemsDialogStyleOptions.primaryColor"
                    :baseColor="baseColors.primaryColor"
                />
                <ColorPicker
                    :label="$t('panel.menu-style.accent color')"
                    v-model:color="itemsDialogStyleOptions.accentColor"
                    :baseColor="baseColors.accentColor"
                />
            </div>
            <small class="text-xs text-secondary opacity-80">
                {{ $t("panel.menu-style.you can change colors for each section (make sure to unlock the color sync first)") }}
            </small>
        </div>
    </div>
</template>

<script setup>
import ColorPicker from "@/components/form/ColorPicker.vue";
import Switch from "~/components/form/Switch.vue";

const props = defineProps({
    baseColors: { type: Object },
    itemsDialogStyleOptions: { type: Object },
});
</script>
