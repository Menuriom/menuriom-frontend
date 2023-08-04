<style scoped></style>

<template>
    <Wrapper class="flex flex-col gap-2 w-full p-4 bg-white rounded-lg shadow-nr5" :defaultState="1">
        <template #title>
            <div class="flex items-center justify-between gap-2 w-full">
                <h3 class="font-bold">{{ $t("panel.menu-style.Navbar Section") }}</h3>
                <span class="h-0.5 bg-neutral-200 grow"></span>
                <Icon class="w-5 h-5 bg-pencil-tip -rotate-90" name="caret-left.svg" folder="icons/tabler" size="20px" />
            </div>
        </template>
        <div class="flex flex-col gap-4 overflow-hidden">
            <div class="flex flex-wrap items-center gap-2">
                <h5>{{ $t("panel.menu-style.Navbar Type") }}</h5>
                <ul class="flex flex-wrap items-center gap-2">
                    <li
                        class="flex items-center gap-2 p-1.5 rounded-full border-2 border-neutral-500 border-opacity-25 shadow-nr5 cursor-pointer"
                        :class="{ 'bg-pencil-tip text-white': navbarOptions.component == item }"
                        @click="navbarOptions.component = item"
                        v-for="item in navbarOptions.componentList"
                    >
                        <span class="flex items-center justify-center w-5 h-5 p-0.5 rounded-full border-2 border-neutral-500 border-opacity-50">
                            <b
                                class="inline-block w-full h-full rounded-full"
                                :class="{ 'bg-violet shadow-xl shadow-violet': navbarOptions.component == item }"
                            ></b>
                        </span>
                        <span class="text-sm me-2">{{ $t(`panel.menu-style.${item}`) }}</span>
                    </li>
                </ul>
            </div>
            <div class="flex flex-wrap items-center gap-2">
                <h5>{{ $t("panel.menu-style.Show text") }}</h5>
                <Switch_Light v-model:value="navbarOptions.withText" />
            </div>
            <div class="flex flex-wrap items-center gap-2" v-if="navbarOptions.component != 'Navbar1'">
                <h5>{{ $t("panel.menu-style.Corner Radius") }}</h5>
                <input class="input-range light w-40" type="range" max="50" step="5" v-model="navbarOptions.radius" />
            </div>
            <div class="flex flex-col gap-2">
                <div class="flex flex-wrap gap-2">
                    <ColorPicker :label="$t('panel.menu-style.text color')" v-model:color="navbarOptions.textColor" :baseColor="baseColors.textColor" />
                    <ColorPicker
                        :label="$t('panel.menu-style.background main')"
                        v-model:color="navbarOptions.bgMainColor"
                        :baseColor="baseColors.bgMainColor"
                    />
                    <ColorPicker
                        :label="$t('panel.menu-style.background accent')"
                        v-model:color="navbarOptions.bgSecondaryColor"
                        :baseColor="baseColors.bgSecondaryColor"
                    />
                    <ColorPicker
                        :label="$t('panel.menu-style.primary color')"
                        v-model:color="navbarOptions.primaryColor"
                        :baseColor="baseColors.primaryColor"
                    />
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

const route = useRoute();

const props = defineProps({
    brand: { type: Object },
    patterns: { type: Array },
    baseColors: { type: Object },
    navbarOptions: { type: Object },
});
</script>
