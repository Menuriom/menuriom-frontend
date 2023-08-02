<style scoped></style>

<template>
    <Wrapper class="flex flex-col gap-2 w-full p-4 bg-white rounded-lg shadow-nr5" :defaultState="1">
        <template #title>
            <div class="flex items-center justify-between gap-2 w-full">
                <h3 class="font-bold">{{ $t("panel.menu-style.Header Section") }}</h3>
                <span class="h-0.5 bg-neutral-200 grow"></span>
                <Icon class="w-5 h-5 bg-pencil-tip -rotate-90" name="caret-left.svg" folder="icons/tabler" size="20px" />
            </div>
        </template>
        <div class="flex flex-col gap-4 overflow-hidden">
            <div class="flex flex-wrap items-center gap-2">
                <h5>{{ $t("panel.menu-style.Header Type") }}</h5>
                <ul class="flex flex-wrap items-center gap-2">
                    <li
                        class="flex items-center gap-2 p-1.5 rounded-full border-2 border-neutral-500 border-opacity-25 shadow-nr5 cursor-pointer"
                        :class="{ 'bg-pencil-tip text-white': headerOptions.component == item }"
                        @click="headerOptions.component = item"
                        v-for="item in headerOptions.componentList"
                    >
                        <span class="flex items-center justify-center w-5 h-5 p-0.5 rounded-full border-2 border-neutral-500 border-opacity-50">
                            <b
                                class="inline-block w-full h-full rounded-full"
                                :class="{ 'bg-violet shadow-xl shadow-violet': headerOptions.component == item }"
                            ></b>
                        </span>
                        <span class="text-sm me-2">{{ $t(`panel.menu-style.${item}`) }}</span>
                    </li>
                </ul>
            </div>
            <div class="flex flex-wrap items-center gap-2">
                <h5>{{ $t("panel.menu-style.Logo Radius") }}</h5>
                <input class="input-range light w-40" type="range" max="50" step="5" v-model="headerOptions.logoRadius" />
            </div>
            <div class="flex flex-wrap lg:flex-nowrap gap-4 w-full">
                <div class="flex flex-col gap-2 p-2 w-full rounded-lg border borde-neutral-500 border-opacity-50">
                    <div class="flex flex-wrap items-center gap-2">
                        <div class="flex items-center gap-2">
                            <h5>{{ $t("panel.menu-style.Background Pattern") }}</h5>
                            <Switch_Light v-model:value="headerOptions.withPattern" />
                        </div>
                        <span class="w-1 border border-neutral-500 opacity-25 grow"></span>
                        <ul class="flex items-center gap-2">
                            <li
                                class="p-1 px-2 text-xs rounded-md border border-violet cursor-pointer"
                                :class="[patternMode == 'upload' ? 'bg-pencil-tip text-white ' : 'text-pencil-tip']"
                                @click="patternMode = 'upload'"
                            >
                                {{ $t("panel.menu.File Upload") }}
                            </li>
                            <li
                                class="p-1 px-2 text-xs rounded-md border border-violet cursor-pointer"
                                :class="[patternMode == 'list' ? 'bg-pencil-tip text-white' : 'text-pencil-tip']"
                                @click="patternMode = 'list'"
                            >
                                {{ $t("panel.menu.Select From List") }}
                            </li>
                        </ul>
                    </div>
                    <div class="flex flex-col gap-2" v-if="headerOptions.withPattern">
                        <hr class="w-full border-neutral-500 opacity-25" />
                        <div
                            class="flex flex-col justify-center gap-2 w-full h-28"
                            v-show="patternMode === 'upload'"
                            v-if="checkLimitations([['customizable-category-logo', true]], brand)"
                        >
                            <small class="text-xs opacity-75">{{ $t("panel.Images must be less than nMB", { size: 1 }) }}</small>
                            <div
                                class="relative flex items-center justify-center w-full rounded-lg border-2 border-dashed border-neutral-400 hover:border-violet grow"
                            >
                                <div class="flex flex-col items-center justify-center gap-2 w-full">
                                    <Icon class="w-5 h-5 bg-violet" name="images.svg" folder="icons/light" size="20px" />
                                    <span class="text-sm text-violet">{{ $t("panel.Drag & drop your logo or click to select") }}</span>
                                </div>
                                <input
                                    class="absolute inset-0 opacity-0 cursor-pointer"
                                    ref="image"
                                    type="file"
                                    accept=".jpg,.jpeg,.png,.webp"
                                    @change="selectPatternImage()"
                                />
                            </div>
                        </div>
                        <div class="flex flex-col items-center justify-center gap-1 h-28" v-show="patternMode === 'upload'" v-else>
                            <span class="opacity-75 text-sm">{{ $t("panel.This feature is for the pro plan only") }}.</span>
                            <nuxt-link class="text-violet text-sm underline underline-offset-4" :to="localePath(`/panel/${route.params.brandID}/billing`)">
                                {{ $t("panel.Upgrade your plan to get this feature") }}.
                            </nuxt-link>
                        </div>
                        <div class="flex flex-col justify-center gap-4 w-full h-28" v-show="patternMode === 'list'">
                            <ul class="flex flex-wrap items-start gap-2 w-full h-full overflow-auto">
                                <li
                                    class="bg-pencil-tip p-2 rounded-md border-4 cursor-pointer"
                                    :class="[headerOptions.bgImage === pattern ? 'border-violet' : 'border-transparent']"
                                    v-for="(pattern, i) in patterns"
                                    :key="i"
                                    @click="selectPatternFromList(pattern)"
                                >
                                    <img class="w-12 h-12 object-contain" :src="pattern" alt="" />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col gap-2" v-if="headerOptions.withPattern">
                    <div class=" flex flex-col items-start gap-1">
                        <label class="text-sm">{{$t("panel.menu-style.Background Pattern Opacity")}}</label>
                        <input class="input-range light w-44" type="range" min="10" max="100" step="10" v-model="headerOptions.bgImageOpacity" />
                    </div>
                    <div class=" flex flex-col items-start gap-1">
                        <label class="text-sm">{{$t("panel.menu-style.Background Pattern Rotations")}}</label>
                        <input class="input-range light w-44" type="range" min="0" max="360" step="10" v-model="headerOptions.bgImageRotation" />
                    </div>
                </div>
            </div>
            <div class="flex flex-col gap-2">
                <div class="flex flex-wrap gap-2">
                    <ColorPicker :label="$t('panel.menu-style.text color')" v-model:color="headerOptions.textColor" :baseColor="baseColors.textColor" />
                    <ColorPicker
                        :label="$t('panel.menu-style.background main')"
                        v-model:color="headerOptions.bgMainColor"
                        :baseColor="baseColors.bgMainColor"
                    />
                    <ColorPicker
                        :label="$t('panel.menu-style.background accent')"
                        v-model:color="headerOptions.bgSecondaryColor"
                        :baseColor="baseColors.bgSecondaryColor"
                    />
                    <ColorPicker
                        :label="$t('panel.menu-style.primary color')"
                        v-model:color="headerOptions.primaryColor"
                        :baseColor="baseColors.primaryColor"
                    />
                    <ColorPicker :label="$t('panel.menu-style.accent color')" v-model:color="headerOptions.accentColor" :baseColor="baseColors.accentColor" />
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
    headerOptions: { type: Object },
});

const patternMode = ref("list");
const selectedPatternMode = ref("list");

const image = ref(""); // Dom Ref
const selectPatternImage = () => {
    props.headerOptions.bgImage;
    if (!image.value.files[0]) return;
    props.headerOptions.bgImage = URL.createObjectURL(image.value.files[0]);
    selectedPatternMode.value = "upload";
};
const selectPatternFromList = (pattern) => {
    props.headerOptions.bgImage = pattern;
    selectedPatternMode.value = "list";
};
</script>
