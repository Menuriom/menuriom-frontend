<style scoped></style>

<template>
    <Wrapper class="flex flex-col gap-4 w-full p-4 bg-bgAccent rounded-2xl shadow-mr15">
        <template #title>
            <div class="flex items-center justify-between gap-2 w-full group">
                <h3 class="font-bold text-primary">{{ $t("panel.menu-style.Suggestions Section") }}</h3>
                <span class="h-0.5 bg-primary bg-opacity-40 group-hover:bg-opacity-100 transition-all grow"></span>
                <Icon class="w-5 h-5 bg-primary -rotate-90" name="caret-left.svg" folder="icons/tabler" size="20px" />
            </div>
        </template>
        <div class="flex flex-col gap-6 overflow-hidden">
            <div class="flex flex-wrap items-center gap-2">
                <h5 class="text-sm opacity-80">{{ $t("panel.menu-style.Corner Radius") }}</h5>
                <input class="input-range w-40" type="range" max="50" step="5" v-model="suggestionsOptions.cornerRadius" />
            </div>
            <hr class="w-full border-bgSecondary" />
            <div class="flex flex-wrap lg:flex-nowrap gap-4 w-full">
                <div class="flex flex-col gap-4 p-4 w-full rounded-2xl bg-bgSecondary bg-opacity-30">
                    <div class="flex flex-wrap items-center gap-2">
                        <div class="flex items-center gap-2">
                            <h5 class="text-sm opacity-80">{{ $t("panel.menu-style.Background Pattern") }}</h5>
                            <Switch v-model:value="suggestionsOptions.withPattern" />
                        </div>
                        <span class="w-1 border border-neutral-500 opacity-25 grow"></span>
                        <ul class="flex items-center gap-2">
                            <li
                                class="p-1.5 px-2 text-xs rounded-lg border-2 cursor-pointer"
                                :class="[patternMode == 'upload' ? 'bg-bgSecondary  border-primary ' : 'border-bgSecondary']"
                                @click="patternMode = 'upload'"
                            >
                                {{ $t("panel.menu.File Upload") }}
                            </li>
                            <li
                                class="p-1.5 px-2 text-xs rounded-lg border-2 cursor-pointer"
                                :class="[patternMode == 'list' ? 'bg-bgSecondary  border-primary' : 'border-bgSecondary']"
                                @click="patternMode = 'list'"
                            >
                                {{ $t("panel.menu.Select From List") }}
                            </li>
                        </ul>
                    </div>
                    <div class="flex flex-col gap-4" v-if="suggestionsOptions.withPattern">
                        <div
                            class="flex flex-col justify-center gap-2 w-full h-28"
                            v-show="patternMode === 'upload'"
                            v-if="checkLimitations([['customizable-category-logo', true]], brand)"
                        >
                            <small class="text-xs opacity-75">{{ $t("panel.Images must be less than nMB", { size: 1 }) }}</small>
                            <div
                                class="relative flex items-center justify-center w-full rounded-lg border-2 border-dashed border-neutral-400 hover:border-primary grow"
                            >
                                <div class="flex flex-col items-center justify-center gap-2 w-full">
                                    <Icon class="w-5 h-5 bg-primary" name="images.svg" folder="icons/light" size="20px" />
                                    <span class="text-sm text-primary">{{ $t("panel.Drag & drop your logo or click to select") }}</span>
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
                            <nuxt-link class="text-primary text-sm underline underline-offset-4" :to="localePath(`/panel/${route.params.brandID}/billing`)">
                                {{ $t("panel.Upgrade your plan to get this feature") }}.
                            </nuxt-link>
                        </div>
                        <div class="flex flex-col justify-center gap-4 w-full h-28" v-show="patternMode === 'list'">
                            <ul class="flex flex-wrap items-start gap-2.5 w-full h-full overflow-auto">
                                <li
                                    class="bg-pencil-tip p-2 rounded-xl border-4 cursor-pointer"
                                    :class="[suggestionsOptions.bgImage === pattern ? 'border-primary' : 'border-transparent']"
                                    v-for="(pattern, i) in patterns"
                                    :key="i"
                                    @click="selectPatternFromList(pattern)"
                                >
                                    <img class="w-11 h-11 object-contain" :src="pattern" alt="" />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col gap-2" v-if="suggestionsOptions.withPattern">
                    <div class="flex flex-col items-start gap-1">
                        <label class="text-sm">{{ $t("panel.menu-style.Pattern Opacity") }}</label>
                        <input class="input-range w-44" type="range" min="10" max="100" step="10" v-model="suggestionsOptions.bgImageOpacity" />
                    </div>
                    <div class="flex flex-col items-start gap-1">
                        <label class="text-sm">{{ $t("panel.menu-style.Pattern Rotations") }}</label>
                        <input class="input-range w-44" type="range" min="-180" max="180" step="5" v-model="suggestionsOptions.bgImageRotation" />
                    </div>
                    <div class="flex flex-col items-start gap-1">
                        <label class="text-sm">{{ $t("panel.menu-style.Pattern Size") }}</label>
                        <input class="input-range w-44" type="range" min="10" max="100" step="10" v-model="suggestionsOptions.bgImageSize" />
                    </div>
                </div>
            </div>
            <hr class="w-full border-bgSecondary" />
            <div class="flex flex-col gap-2">
                <div class="flex flex-wrap gap-2">
                    <ColorPicker :label="$t('panel.menu-style.text color')" v-model:color="suggestionsOptions.textColor" :baseColor="baseColors.textColor" />
                    <ColorPicker
                        :label="$t('panel.menu-style.background main')"
                        v-model:color="suggestionsOptions.bgMainColor"
                        :baseColor="baseColors.bgMainColor"
                    />
                    <ColorPicker
                        :label="$t('panel.menu-style.background accent')"
                        v-model:color="suggestionsOptions.bgSecondaryColor"
                        :baseColor="baseColors.bgSecondaryColor"
                    />
                    <ColorPicker
                        :label="$t('panel.menu-style.background accent')"
                        v-model:color="suggestionsOptions.accentColor"
                        :baseColor="baseColors.accentColor"
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
    suggestionsOptions: { type: Object },
});

const patternMode = ref("list");
const selectedPatternMode = ref("list");

const image = ref(""); // Dom Ref
const selectPatternImage = () => {
    props.suggestionsOptions.bgImage;
    if (!image.value.files[0]) return;
    props.suggestionsOptions.bgImageFile = image.value.files[0];
    props.suggestionsOptions.bgImage = URL.createObjectURL(image.value.files[0]);
    props.suggestionsOptions.bgImageMode = selectedPatternMode.value = "upload";
};
const selectPatternFromList = (pattern) => {
    props.suggestionsOptions.bgImage = pattern;
    props.suggestionsOptions.bgImageMode = selectedPatternMode.value = "list";
};
</script>
