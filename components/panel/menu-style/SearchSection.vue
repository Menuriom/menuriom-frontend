<style scoped></style>

<template>
    <Wrapper class="flex flex-col gap-2 w-full p-4 bg-white rounded-lg shadow-nr5" :defaultState="1">
        <template #title>
            <div class="flex items-center justify-between gap-2 w-full">
                <h3 class="font-bold">{{ $t("panel.menu-style.Search Section") }}</h3>
                <span class="h-0.5 bg-neutral-200 grow"></span>
                <Icon class="w-5 h-5 bg-pencil-tip -rotate-90" name="caret-left.svg" folder="icons/tabler" size="20px" />
            </div>
        </template>
        <div class="flex flex-col gap-4 overflow-hidden">
            <div class="flex flex-wrap items-center gap-2">
                <h5>{{ $t("panel.menu-style.Show search section") }}</h5>
                <Switch_Light v-model:value="searchOptions.active" />
            </div>
            <div class="flex flex-col gap-2">
                <div class="flex flex-wrap gap-2">
                    <ColorPicker :label="$t('panel.menu-style.text color')" v-model:color="searchOptions.textColor" :baseColor="baseColors.textColor" />
                    <ColorPicker
                        :label="$t('panel.menu-style.background main')"
                        v-model:color="searchOptions.bgMainColor"
                        :baseColor="baseColors.bgMainColor"
                    />
                    <ColorPicker
                        :label="$t('panel.menu-style.background accent')"
                        v-model:color="searchOptions.bgSecondaryColor"
                        :baseColor="baseColors.bgSecondaryColor"
                    />
                    <ColorPicker
                        :label="$t('panel.menu-style.primary color')"
                        v-model:color="searchOptions.primaryColor"
                        :baseColor="baseColors.primaryColor"
                    />
                    <ColorPicker :label="$t('panel.menu-style.accent color')" v-model:color="searchOptions.accentColor" :baseColor="baseColors.accentColor" />
                </div>
                <small class="text-xs">
                    {{ $t("panel.menu-style.you can change colors for each section (make sure to unlock the color sync first)") }}
                </small>
            </div>
        </div>
    </Wrapper>
</template>

<script setup>
import ColorPicker from "@/components/form/ColorPicker.vue";
import Switch_Light from "~/components/form/Switch_Light.vue";
import Wrapper from "~/components/form/Wrapper.vue";

const props = defineProps({
    brand: { type: Object },
    patterns: { type: Array },
    baseColors: { type: Object },
    searchOptions: { type: Object },
});
</script>
