<style scoped></style>

<template>
    <Wrapper class="flex flex-col gap-4 w-full p-4 bg-bgAccent rounded-2xl shadow-mr15" :defaultState="0">
        <template #title>
            <div class="flex items-center justify-between gap-2 w-full group">
                <h3 class="font-bold text-primary">{{ $t("panel.menu-style.Search Section") }}</h3>
                <span class="h-0.5 bg-primary bg-opacity-40 group-hover:bg-opacity-100 transition-all grow"></span>
                <Icon class="w-5 h-5 bg-primary -rotate-90" name="caret-left.svg" folder="icons/tabler" size="20px" />
            </div>
        </template>
        <div class="flex flex-col gap-6 overflow-hidden">
            <div class="flex flex-wrap items-center gap-2">
                <h5 class="text-sm opacity-80">{{ $t("panel.menu-style.Show search section") }}</h5>
                <Switch v-model:value="searchOptions.active" />
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

const props = defineProps({
    brand: { type: Object },
    patterns: { type: Array },
    baseColors: { type: Object },
    searchOptions: { type: Object },
});
</script>
