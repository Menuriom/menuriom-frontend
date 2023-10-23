<style scoped></style>

<template>
    <div class="flex flex-col gap-6 w-full">
        <header class="flex flex-wrap items-center justify-between gap-4">
            <div class="flex flex-col gap-2">
                <div class="flex items-center gap-2">
                    <Icon class="w-9 h-9 gradient" name="qrcode.svg" folder="icons/duo" size="36px" />
                    <h1 class="text-2xl md:text-4xl/tight font-bold">{{ $t("panel.qrcode.QR Code Editor") }}</h1>
                </div>
                <small class="hidden sm:flex text-sm opacity-75">
                    {{ $t("panel.qrcode.Build and customize your QR code") }}
                </small>
            </div>
        </header>
        <!-- <hr class="w-full border-bgSecondary" /> -->
        <!-- TODO : design at least 10 ~ 20 templates to activate the next tab -->
        <!-- <ul class="scroll-thin flex items-center gap-2 w-full pb-2 -my-1 -mb-3 overflow-auto shrink-0">
            <li
                class="flex items-center gap-2 text-sm p-1 px-2 border-2 rounded-lg shrink-0 cursor-pointer"
                :class="{ 'border-dolphin bg-pencil-tip text-white': selectedTab === 'qrcode' }"
                @click="selectedTab = 'qrcode'"
            >
                <Icon
                    class="w-4 h-4 shrink-0"
                    :class="[selectedTab === 'qrcode' ? 'bg-white' : 'bg-black']"
                    name="brush.svg"
                    folder="icons/light"
                    size="16px"
                />
                {{ $t("panel.qrcode.QR Code Style") }}
            </li>
            <li
                class="flex items-center gap-2 text-sm p-1 px-2 border-2 rounded-lg shrink-0 cursor-pointer"
                :class="{ 'border-dolphin bg-pencil-tip text-white': selectedTab === 'qrcode-stand' }"
                @click="selectedTab = 'qrcode-stand'"
            >
                <Icon
                    class="w-4 h-4 shrink-0"
                    :class="[selectedTab === 'qrcode-stand' ? 'bg-white' : 'bg-black']"
                    name="scanner-touchscreen.svg"
                    folder="icons/light"
                    size="16px"
                />
                {{ $t("panel.qrcode.QR Code Stand Frame") }}
            </li>
        </ul> -->
        <hr class="w-full border-bgSecondary" />
        <div class="flex flex-wrap-reverse items-end gap-6">
            <div class="flex flex-col items-start gap-4 w-full max-w-4xl">
                <div class="flex flex-wrap items-center justify-between gap-4 w-full">
                    <div class="flex flex-wrap items-center gap-2 p-2 rounded-xl bg-fgPrimary text-bgPrimary">
                        <span class="text-sm text-primary">{{ $t("panel.qrcode.Link to your menu") }}:</span>
                        <a
                            class="btn rounded-lg text-sm p-1 hover:px-4 hover:bg-secondary hover:bg-opacity-30 hover:underline underline-offset-2"
                            :href="link"
                            target="_blank"
                        >
                            {{ link }}
                        </a>
                    </div>
                    <button
                        class="btn flex items-center justify-center gap-2 p-3 hover:px-6 bg-fgPrimary text-bgPrimary rounded-xl text-sm"
                        @click="saveSettings()"
                    >
                        <span class="flex items-center gap-2" v-if="!saving">
                            <Icon class="w-5 h-5 gradient" name="floppy-disk.svg" folder="icons/light" size="20px" />
                            {{ $t("panel.qrcode.Save Settings") }}
                        </span>
                        <Loading v-else />
                    </button>
                </div>

                <Wrapper class="flex flex-col gap-4 w-full p-4 rounded-2xl bg-bgAccent shadow-nr25" :defaultState="1">
                    <template #title>
                        <div class="flex items-center justify-between gap-2 w-full">
                            <h3 class="flex items-center gap-2 text-lg font-bold">
                                <Icon class="w-5 h-5 gradient-re" name="square.svg" folder="icons/light" size="20px" />
                                {{ $t("panel.qrcode.Background Color") }}
                            </h3>
                            <span class="h-0.5 bg-fgPrimary bg-opacity-20 grow"></span>
                            <Icon class="w-5 h-5 bg-primary -rotate-90" name="caret-left.svg" folder="icons/tabler" size="20px" />
                        </div>
                    </template>
                    <div class="flex flex-wrap items-center gap-4 overflow-hidden">
                        <div class="flex items-center gap-2 p-3 bg-bgSecondary rounded-xl">
                            <small>{{ $t("panel.qrcode.Mono Color") }}</small>
                            <Switch v-model:value="backgroundGradient" @update:value="renderAll()" />
                            <small>{{ $t("panel.qrcode.Gradient") }}</small>
                        </div>
                        <div class="flex items-center gap-2 p-2 bg-bgSecondary rounded-xl" v-if="backgroundGradient">
                            <div class="flex flex-col">
                                <small class="text-xs">{{ $t("panel.qrcode.Gradient Type") }}</small>
                                <small class="text-xxs text-secondary">{{ backgroundGradientType }}</small>
                            </div>
                            <div class="flex items-center gap-1">
                                <span
                                    class="flex items-center gap-1 p-1.5 rounded-lg border border-fgPrimary border-opacity-20 cursor-pointer"
                                    :class="[backgroundGradientType == 'Linear' ? 'bg-fgPrimary' : '']"
                                    @click="switchBgGradientType('Linear')"
                                >
                                    <Icon
                                        class="w-5 h-5"
                                        :class="[backgroundGradientType == 'Linear' ? 'bg-primary' : 'bg-fgPrimary bg-opacity-30']"
                                        name="gradient-linear.svg"
                                        folder="icons/light"
                                        size="20px"
                                    />
                                </span>
                                <span
                                    class="flex items-center gap-1 p-1.5 rounded-lg border border-fgPrimary border-opacity-20 cursor-pointer"
                                    :class="[backgroundGradientType == 'Radial' ? 'bg-fgPrimary' : '']"
                                    @click="switchBgGradientType('Radial')"
                                >
                                    <Icon
                                        class="w-5 h-5"
                                        :class="[backgroundGradientType == 'Radial' ? 'bg-primary' : 'bg-fgPrimary bg-opacity-30']"
                                        name="gradient-radial.svg"
                                        folder="icons/light"
                                        size="20px"
                                    />
                                </span>
                            </div>
                        </div>
                        <div class="flex items-center gap-2 p-2 bg-bgSecondary rounded-xl" v-if="backgroundGradient && backgroundGradientType == 'Linear'">
                            <small class="text-xs">{{ $t("panel.qrcode.Gradient Angle") }}</small>
                            <div
                                class="flex items-center gap-1 p-2 py-1 rounded-lg border border-fgPrimary border-opacity-20 cursor-pointer"
                                @click="switchBgGradientAngle()"
                            >
                                <Icon class="w-4 h-4 bg-primary" name="angle.svg" folder="icons/light" size="18px" />
                                <small class="w-3.5"> {{ backgroundGradientAngle }} </small>°
                            </div>
                        </div>
                        <div class="flex flex-wrap items-center gap-3 p-3 bg-bgSecondary rounded-xl">
                            <div class="flex items-center gap-2">
                                <label class="text-xs">{{ $t("panel.qrcode.Background Color") }}</label>
                                <div class="relative flex items-center justify-center">
                                    <span
                                        class="inline-block w-24 h-[34px] border border-fgPrimary border-opacity-20 rounded-lg"
                                        :style="`background-color: ${backgroundColor1};`"
                                    ></span>
                                    <input
                                        class="absolute inset-0 w-full h-full rounded-full opacity-0"
                                        type="color"
                                        v-model="backgroundColor1"
                                        @input="renderOverlays()"
                                    />
                                </div>
                            </div>
                            <span class="w-0.5 h-6 bg-fgPrimary bg-opacity-20" v-if="backgroundGradient"></span>
                            <div class="flex items-center gap-2" v-if="backgroundGradient">
                                <label class="text-xs">{{ `${$t("panel.qrcode.Background Color")} 2` }}</label>
                                <div class="relative flex items-center justify-center">
                                    <span
                                        class="inline-block w-24 h-[34px] border border-fgPrimary border-opacity-20 rounded-lg"
                                        :style="`background-color: ${backgroundColor2};`"
                                    ></span>
                                    <input
                                        class="absolute inset-0 w-full h-full rounded-full opacity-0"
                                        type="color"
                                        v-model="backgroundColor2"
                                        @input="renderOverlays()"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </Wrapper>

                <Wrapper class="flex flex-col gap-4 w-full p-4 rounded-2xl bg-bgAccent shadow-nr25" :defaultState="1">
                    <template #title>
                        <div class="flex items-center justify-between gap-2 w-full">
                            <h3 class="flex items-center gap-2 text-lg font-bold">
                                <Icon class="w-5 h-5 gradient-re" name="qrcode.svg" folder="icons/light" size="20px" />
                                {{ $t("panel.qrcode.Barcode Color") }}
                            </h3>
                            <span class="h-0.5 bg-fgPrimary bg-opacity-20 grow"></span>
                            <Icon class="w-5 h-5 bg-primary -rotate-90" name="caret-left.svg" folder="icons/tabler" size="20px" />
                        </div>
                    </template>
                    <div class="flex flex-wrap items-center gap-4 overflow-hidden">
                        <div class="flex items-center gap-2 p-3 bg-bgSecondary rounded-xl">
                            <small>{{ $t("panel.qrcode.Mono Color") }}</small>
                            <Switch v-model:value="foregroundGradient" @update:value="renderAll()" />
                            <small>{{ $t("panel.qrcode.Gradient") }}</small>
                        </div>
                        <div class="flex items-center gap-2 p-2 bg-bgSecondary rounded-xl" v-if="foregroundGradient">
                            <div class="flex flex-col">
                                <small class="text-xs">{{ $t("panel.qrcode.Gradient Type") }}</small>
                                <small class="text-xxs text-secondary">{{ foregroundGradientType }}</small>
                            </div>
                            <div class="flex items-center gap-1">
                                <span
                                    class="flex items-center gap-1 p-1.5 rounded-lg border border-fgPrimary border-opacity-20 cursor-pointer"
                                    :class="[foregroundGradientType == 'Linear' ? 'bg-fgPrimary' : '']"
                                    @click="switchFgGradientType('Linear')"
                                >
                                    <Icon
                                        class="w-5 h-5"
                                        :class="[foregroundGradientType == 'Linear' ? 'bg-primary' : 'bg-fgPrimary bg-opacity-30']"
                                        name="gradient-linear.svg"
                                        folder="icons/light"
                                        size="20px"
                                    />
                                </span>
                                <span
                                    class="flex items-center gap-1 p-1.5 rounded-lg border border-fgPrimary border-opacity-20 cursor-pointer"
                                    :class="[foregroundGradientType == 'Radial' ? 'bg-fgPrimary' : '']"
                                    @click="switchFgGradientType('Radial')"
                                >
                                    <Icon
                                        class="w-5 h-5"
                                        :class="[foregroundGradientType == 'Radial' ? 'bg-primary' : 'bg-fgPrimary bg-opacity-30']"
                                        name="gradient-radial.svg"
                                        folder="icons/light"
                                        size="20px"
                                    />
                                </span>
                            </div>
                        </div>
                        <div class="flex items-center gap-2 p-2 bg-bgSecondary rounded-xl" v-if="foregroundGradient && foregroundGradientType == 'Linear'">
                            <small class="text-xs">{{ $t("panel.qrcode.Gradient Angle") }}</small>
                            <div
                                class="flex items-center gap-1 p-2 py-1 rounded-lg border border-fgPrimary border-opacity-20 cursor-pointer"
                                @click="switchFgGradientAngle()"
                            >
                                <Icon class="w-4 h-4 bg-primary" name="angle.svg" folder="icons/light" size="18px" />
                                <small class="w-3.5"> {{ foregroundGradientAngle }} </small>°
                            </div>
                        </div>
                        <div class="flex flex-wrap items-center gap-3 p-3 bg-bgSecondary rounded-xl">
                            <div class="flex items-center gap-2">
                                <label class="text-xs">{{ $t("panel.qrcode.Barcode Color") }}</label>
                                <div class="relative flex items-center justify-center">
                                    <span
                                        class="inline-block w-24 h-[34px] border border-fgPrimary border-opacity-20 rounded-lg"
                                        :style="`background-color: ${foregroundColor1};`"
                                    ></span>
                                    <input
                                        class="absolute inset-0 w-full h-full rounded-full opacity-0"
                                        type="color"
                                        v-model="foregroundColor1"
                                        @input="renderOverlays()"
                                    />
                                </div>
                            </div>
                            <span class="w-0.5 h-6 bg-fgPrimary bg-opacity-20" v-if="foregroundGradient"></span>
                            <div class="flex items-center gap-2" v-if="foregroundGradient">
                                <label class="text-xs">{{ `${$t("panel.qrcode.Barcode Color")} 2` }}</label>
                                <div class="relative flex items-center justify-center">
                                    <span
                                        class="inline-block w-24 h-[34px] border border-fgPrimary border-opacity-20 rounded-lg"
                                        :style="`background-color: ${foregroundColor2};`"
                                    ></span>
                                    <input
                                        class="absolute inset-0 w-full h-full rounded-full opacity-0"
                                        type="color"
                                        v-model="foregroundColor2"
                                        @input="renderOverlays()"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </Wrapper>

                <Wrapper class="flex flex-col gap-4 w-full p-4 rounded-2xl bg-bgAccent shadow-nr25" :defaultState="1">
                    <template #title>
                        <div class="flex items-center justify-between gap-2 w-full">
                            <h3 class="flex items-center gap-2 text-lg font-bold">
                                <Icon class="w-5 h-5 gradient-re" name="grid.svg" folder="icons/light" size="20px" />
                                {{ $t("panel.qrcode.Pixles") }}
                            </h3>
                            <span class="h-0.5 bg-fgPrimary bg-opacity-20 grow"></span>
                            <Icon class="w-5 h-5 bg-primary -rotate-90" name="caret-left.svg" folder="icons/tabler" size="20px" />
                        </div>
                    </template>
                    <div class="flex flex-col gap-4 overflow-hidden">
                        <div class="flex flex-wrap items-center gap-4" v-if="checkLimitations([['menu-templates', true]], brand)">
                            <div class="flex items-center gap-2">
                                <small class="text-xs">{{ $t("panel.qrcode.Randomize Dot Size") }}</small>
                                <Switch v-model:value="randomSize" @update:value="renderAll()" />
                            </div>
                            <div class="flex items-center gap-2">
                                <small class="text-xs">{{ $t("panel.qrcode.Rotate The Barcode") }}</small>
                                <Switch v-model:value="rotateTheCode" @update:value="renderAll()" />
                            </div>
                        </div>
                        <ul class="flex flex-wrap items-start justify-start gap-3.5 w-full max-h-44 overflow-auto">
                            <li
                                class="relative flex items-center justify-center w-16 h-16 rounded-xl shadow-nr10 cursor-pointer"
                                :class="[dotImage === item.image ? 'gradient' : 'bg-fgPrimary', currentPlan.lvl >= item.lvl ? '' : 'opacity-60']"
                                v-for="(item, i) in dotImageList"
                                :key="i"
                                @click="changeDotImage(item)"
                            >
                                <div
                                    class="absolute top-1.5 end-1.5 flex items-center justify-center p-1 bg-bgAccent rounded-lg z-2"
                                    v-if="currentPlan.lvl < item.lvl"
                                >
                                    <Icon class="w-4 h-4 gradient" name="lock-keyhole.svg" folder="icons" size="16px" />
                                </div>
                                <img
                                    class="w-full aspect-square p-2 object-contain rounded-lg"
                                    :class="[dotImage === item.image ? 'gradient' : 'bg-fgPrimary', currentPlan.lvl >= item.lvl ? '' : 'opacity-50']"
                                    :src="item.image"
                                    loading="lazy"
                                />
                            </li>
                        </ul>
                    </div>
                </Wrapper>

                <div class="flex flex-col gap-4 w-full p-4 rounded-2xl bg-bgAccent shadow-nr25">
                    <div class="flex flex-wrap items-center gap-2 w-full">
                        <h3 class="flex items-center gap-2 text-lg font-bold">
                            <Icon class="w-5 h-5 gradient-re" name="expand-wide.svg" folder="icons/light" size="20px" />
                            {{ $t("panel.qrcode.Custom Corners") }}
                        </h3>
                        <Switch v-model:value="customCorner" @update:value="renderOverlays()" />
                        <span class="w-2 grow h-0.5 bg-neutral-500 bg-opacity-20"></span>
                    </div>
                    <div class="flex flex-wrap gap-4 overflow-hidden" v-if="customCorner">
                        <div class="flex flex-wrap items-center gap-3 p-3 bg-bgSecondary rounded-xl w-max">
                            <div class="flex items-center gap-2">
                                <label class="text-xs">{{ `${$t("panel.qrcode.Ring Color")}` }}</label>
                                <div class="relative flex items-center justify-center">
                                    <span
                                        class="inline-block w-24 h-[34px] border border-fgPrimary border-opacity-20 rounded-lg"
                                        :style="`background-color: ${cornerRingColor};`"
                                    ></span>
                                    <input
                                        class="absolute inset-0 w-full h-full rounded-full opacity-0"
                                        type="color"
                                        v-model="cornerRingColor"
                                        @input="renderOverlays()"
                                    />
                                </div>
                            </div>
                            <span class="w-0.5 h-6 bg-fgPrimary bg-opacity-20"></span>
                            <div class="flex items-center gap-2">
                                <label class="text-xs">{{ `${$t("panel.qrcode.Center Color")}` }}</label>
                                <div class="relative flex items-center justify-center">
                                    <span
                                        class="inline-block w-24 h-[34px] border border-fgPrimary border-opacity-20 rounded-lg"
                                        :style="`background-color: ${cornerCenterColor};`"
                                    ></span>
                                    <input
                                        class="absolute inset-0 w-full h-full rounded-full opacity-0"
                                        type="color"
                                        v-model="cornerCenterColor"
                                        @input="renderOverlays()"
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-wrap items-center gap-4 p-3 bg-bgSecondary rounded-xl">
                            <div class="flex items-center gap-1">
                                <small class="text-xs">{{ $t("panel.qrcode.Ring Radius") }}</small>
                                <input class="input-range w-24" type="range" max="3.5" step="0.1" v-model="cornerRingRadius" @input="renderOverlays()" />
                            </div>
                            <div class="flex items-center gap-1">
                                <small class="text-xs">{{ $t("panel.qrcode.Center Radius") }}</small>
                                <input class="input-range w-24" type="range" max="2" step="0.1" v-model="cornerCenterRadius" @input="renderOverlays()" />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex flex-col gap-4 w-full p-4 rounded-2xl bg-bgAccent shadow-nr25">
                    <div class="flex flex-wrap items-center gap-2 w-full">
                        <h3 class="flex items-center gap-2 text-lg font-bold">
                            <Icon class="w-5 h-5 gradient-re" name="square-dashed-circle-plus.svg" folder="icons/light" size="20px" />
                            {{ $t("panel.qrcode.Add Restaurant Logo") }}
                        </h3>
                        <Switch v-model:value="withLogo" @update:value="renderOverlays()" />
                        <span class="w-2 grow h-0.5 bg-neutral-500 bg-opacity-20"></span>
                    </div>
                    <div class="flex flex-wrap gap-4" v-if="withLogo">
                        <small
                            class="flex flex-wrap items-center gap-1 w-full max-w-lg p-3 rounded-xl bg-bgSecondary text-fgPrimary"
                            v-if="!checkLimitations([['logo-in-qr', true]], brand)"
                        >
                            <span class="opacity-80 text-sm">{{ $t("panel.This feature is for the pro plan only") }}.</span>
                            <nuxt-link class="text-primary hover:underline underline-offset-4" :to="localePath(`/panel/${route.params.brandID}/billing`)">
                                {{ $t("panel.Upgrade your plan to get this feature") }}.
                            </nuxt-link>
                        </small>
                        <div class="flex flex-wrap items-center gap-4 p-3 bg-bgSecondary rounded-xl" v-if="checkLimitations([['logo-in-qr', true]], brand)">
                            <div class="flex items-center gap-2">
                                <small class="text-xs">{{ $t("panel.qrcode.Padding") }}</small>
                                <input class="input-range w-24" type="range" max="3" step="1" v-model="logoPadding" @input="renderOverlays()" />
                            </div>
                            <span class="w-0.5 h-6 bg-fgPrimary bg-opacity-20"></span>
                            <div class="flex items-center gap-2">
                                <small class="text-xs">{{ $t("panel.qrcode.Radius") }}</small>
                                <input class="input-range w-24" type="range" min="1" max="7" step="1" v-model="logoBorderRadius" @input="renderOverlays()" />
                            </div>
                        </div>
                        <div class="flex flex-wrap items-center gap-4 p-3 bg-bgSecondary rounded-xl" v-if="checkLimitations([['logo-in-qr', true]], brand)">
                            <div class="flex items-center gap-2">
                                <small class="text-xs">{{ $t("panel.qrcode.Shadow") }}</small>
                                <Switch v-model:value="logoShadow" @update:value="renderOverlays()" />
                            </div>
                            <span class="w-0.5 h-6 bg-fgPrimary bg-opacity-20"></span>
                            <div class="flex items-center gap-2">
                                <small class="text-xs">{{ $t("panel.qrcode.Shadow Intensity") }}</small>
                                <input class="input-range w-24" type="range" max="9" step="1" v-model="logoShadowIntensity" @input="renderOverlays()" />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- <button class="btn flex items-center justify-center gap-2 p-3 bg-primary text-white rounded-md text-sm" @click="saveSettings()">
                    <span class="flex items-center gap-2" v-if="!saving">
                        <Icon class="w-4 h-4 bg-white" name="floppy-disk.svg" folder="icons/light" size="16px" />
                        {{ $t("panel.qrcode.Save Settings") }}
                    </span>
                    <Loading v-else />
                </button> -->
            </div>
            <div class="sticky @7xl:top-0 flex flex-col items-center gap-4 w-full md:max-w-screen-xs p-4 md:p-6 rounded-2xl bg-bgAccent shadow-nr25">
                <small class="w-full opacity-75 text-justify">
                    {{ $t("panel.qrcode.Make sure the colors have good contrast so that the code is easily scannable") }}
                </small>
                <canvas class="w-full max-w-screen-xs aspect-square shadow-nr15 rounded-xl" ref="canvasEl"></canvas>
                <button class="btn w-full text-sm p-3 hover:px-6 rounded-xl bg-primary grow" @click="saveCanvas()">
                    {{ $t("panel.qrcode.Download QR Code") }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import Input from "~/components/form/Input.vue";
import Switch from "~/components/form/Switch.vue";
import Wrapper from "~/components/form/Wrapper.vue";
import QR from "~/composables/qrcodegen";
import axios from "axios";
import { useToast } from "vue-toastification";
import { usePanelStore } from "@/stores/panel";
import { useUserStore } from "@/stores/user";

const { localeProperties, t } = useI18n();
const nuxtApp = useNuxtApp();
const route = useRoute();
const runtimeConfig = useRuntimeConfig();
const toast = useToast();
const panelStore = usePanelStore();
const userStore = useUserStore();

// const title = computed(() => `${t("panel.qrcode.QR Code Editor")} - ${t("panel.Your Menuriom Panel")}`);
useHead({ title: `${t("panel.qrcode.QR Code Editor")} - ${t("panel.Your Menuriom Panel")}` });

const brand = computed(() => userStore.brands.list[panelStore.selectedBrandId] || {});
const allowLogoInQR = checkLimitations([["logo-in-qr", true]], brand.value);

const responseMessage = ref("");
const errorField = ref("");

const selectedTab = ref("qrcode");

const link = `${runtimeConfig.public.MENU_BASE_URL}/${brand.value.username}`;
const borderMargin = ref(4);
const rotateTheCode = ref(false);
const size = 1024;

const backgroundGradient = ref(false);
const backgroundGradientType = ref("Linear"); // Linear | Radial
const switchBgGradientType = (type) => {
    if (type) backgroundGradientType.value = type;
    else backgroundGradientType.value = backgroundGradientType.value === "Linear" ? "Radial" : "Linear";
    renderOverlays();
};
const backgroundGradientAngle = ref(0); // 0 | 45 | 90
const switchBgGradientAngle = () => {
    if (backgroundGradientAngle.value == 0) backgroundGradientAngle.value = 45;
    else if (backgroundGradientAngle.value == 45) backgroundGradientAngle.value = 90;
    else if (backgroundGradientAngle.value == 90) backgroundGradientAngle.value = 0;
    renderOverlays();
};
const backgroundColor1 = ref("#ffffff");
const backgroundColor2 = ref("#ffffff");

const foregroundGradient = ref(false);
const foregroundGradientType = ref("Linear"); // Linear | Radial
const switchFgGradientType = (type) => {
    if (type) foregroundGradientType.value = type;
    else foregroundGradientType.value = foregroundGradientType.value === "Linear" ? "Radial" : "Linear";
    renderOverlays();
};
const foregroundGradientAngle = ref(0); // 0 | 45 | 90
const switchFgGradientAngle = () => {
    if (foregroundGradientAngle.value == 0) foregroundGradientAngle.value = 45;
    else if (foregroundGradientAngle.value == 45) foregroundGradientAngle.value = 90;
    else if (foregroundGradientAngle.value == 90) foregroundGradientAngle.value = 0;
    renderOverlays();
};
const foregroundColor1 = ref("#000000");
const foregroundColor2 = ref("#000000");

const dotImageList = ref([
    { for: "Basic Plan", lvl: 0, image: "/icons/qr-dots/Square.svg" },
    { for: "Basic Plan", lvl: 0, image: "/icons/qr-dots/Square-Dot.svg" },
    { for: "Basic Plan", lvl: 0, image: "/icons/qr-dots/Dot.svg" },

    { for: "Standard Plan", lvl: 1, image: "/icons/qr-dots/Windows.svg" },
    { for: "Standard Plan", lvl: 1, image: "/icons/qr-dots/Bars.svg" },
    { for: "Standard Plan", lvl: 1, image: "/icons/qr-dots/Sparkle.svg" },
    { for: "Standard Plan", lvl: 1, image: "/icons/qr-dots/Star.svg" },
    { for: "Standard Plan", lvl: 1, image: "/icons/qr-dots/Tile.svg" },
    { for: "Standard Plan", lvl: 1, image: "/icons/qr-dots/Panel.svg" },
    { for: "Standard Plan", lvl: 1, image: "/icons/qr-dots/Octagon.svg" },
    { for: "Standard Plan", lvl: 1, image: "/icons/qr-dots/Squares.svg" },
    { for: "Standard Plan", lvl: 1, image: "/icons/qr-dots/Squares2.svg" },
    { for: "Standard Plan", lvl: 1, image: "/icons/qr-dots/Rectangle-Fade.svg" },
    { for: "Standard Plan", lvl: 1, image: "/icons/qr-dots/Favorite.svg" },
    { for: "Standard Plan", lvl: 1, image: "/icons/qr-dots/Ring-Dot.svg" },
    { for: "Standard Plan", lvl: 1, image: "/icons/qr-dots/Arc.svg" },
    { for: "Standard Plan", lvl: 1, image: "/icons/qr-dots/Balls.svg" },
    { for: "Standard Plan", lvl: 1, image: "/icons/qr-dots/Circle-Dot.svg" },
    { for: "Standard Plan", lvl: 1, image: "/icons/qr-dots/Pages.svg" },

    { for: "Pro Plan", lvl: 2, image: "/icons/qr-dots/Coffee.svg" },
    { for: "Pro Plan", lvl: 2, image: "/icons/qr-dots/Puzzle.svg" },
    { for: "Pro Plan", lvl: 2, image: "/icons/qr-dots/Baseball.svg" },
    { for: "Pro Plan", lvl: 2, image: "/icons/qr-dots/Egg.svg" },
    { for: "Pro Plan", lvl: 2, image: "/icons/qr-dots/Egg-Fried.svg" },
    { for: "Pro Plan", lvl: 2, image: "/icons/qr-dots/Circle-Heart.svg" },
    { for: "Pro Plan", lvl: 2, image: "/icons/qr-dots/Square-Rounded.svg" },
    { for: "Pro Plan", lvl: 2, image: "/icons/qr-dots/Skull.svg" },
    { for: "Pro Plan", lvl: 2, image: "/icons/qr-dots/Sushi-Roll.svg" },
    { for: "Pro Plan", lvl: 2, image: "/icons/qr-dots/Pizza.svg" },
    { for: "Pro Plan", lvl: 2, image: "/icons/qr-dots/Burger.svg" },
    { for: "Pro Plan", lvl: 2, image: "/icons/qr-dots/Taco.svg" },
    { for: "Pro Plan", lvl: 2, image: "/icons/qr-dots/Pie-Cake.svg" },
    { for: "Pro Plan", lvl: 2, image: "/icons/qr-dots/Pie.svg" },
    { for: "Pro Plan", lvl: 2, image: "/icons/qr-dots/Paw.svg" },
    { for: "Pro Plan", lvl: 2, image: "/icons/qr-dots/Moon.svg" },
    { for: "Pro Plan", lvl: 2, image: "/icons/qr-dots/Fire.svg" },
]);
const dotImage = ref("/icons/qr-dots/Square.svg");
const changeDotImage = (item) => {
    if (currentPlan.lvl >= item.lvl) img.src = dotImage.value = item.image;
};
const radius = ref(1);
const randomSize = ref(false);

const customCorner = ref(true);
const cornerRingColor = ref("#000");
const cornerCenterColor = ref("#000");
const cornerRingRadius = ref("0"); // 0 - 2 : .1
const cornerCenterRadius = ref("0"); // 0 - 2 : .1

let logoImg;
const withLogo = ref(false);
const logoPadding = ref("2");
const logoBorderRadius = ref("2"); // 0 - 7 : 1
const logoShadow = ref(true);
const logoShadowIntensity = ref("5"); // 2 - 9 : 1

let img;
const cellNumbers = ref(0);
const cellLength = ref(0);

let IMCctx;
const cells = QR.QrCode.encodeText(link, QR.QrCode.Ecc.QUARTILE).getModules();
const canvasEl = ref(); // Dom Ref

const drawQR = () => {
    const canvas = canvasEl.value;
    const ctx = canvas.getContext("2d");

    const margin = borderMargin.value;
    cellLength.value = cells.length;
    cellNumbers.value = cells.length + margin * 2;

    const devicePixelRatio = window.devicePixelRatio || 1;
    const canvasScale = (size / cellNumbers.value) * devicePixelRatio;
    canvas.width = canvas.height = size * devicePixelRatio;
    ctx.scale(canvasScale, canvasScale);

    const imageModuleCanvas = document.createElement("canvas");
    imageModuleCanvas.width = imageModuleCanvas.height = canvas.width * 6;
    IMCctx = imageModuleCanvas.getContext("2d");
    IMCctx.scale(canvasScale * 6, canvasScale * 6);
    IMCctx.imageSmoothingQuality = "high";
    IMCctx.globalCompositeOperation = "luminosity";

    renderAll();
};

const renderAll = () => {
    drawModules();
    renderOverlays();
};

const drawModules = () => {
    IMCctx.clearRect(0, 0, cellNumbers.value, cellNumbers.value);
    cells.forEach((row, rdx) => {
        row.forEach((cell, cdx) => {
            if (!cell) return;
            const dotSize = randomSize.value ? radius.value * Math.max(Math.random(), 0.65) : radius.value;
            if (rotateTheCode.value) IMCctx.drawImage(img, rdx, cdx, dotSize + 0.025, dotSize + 0.025);
            else IMCctx.drawImage(img, cdx, rdx, dotSize + 0.025, dotSize + 0.025);
        });
    });
};

const renderOverlays = () => {
    const ctx = canvasEl.value.getContext("2d");
    const margin = borderMargin.value;

    const foregroundFillStyle = foregroundGradient.value
        ? gradientGenerator({
              type: foregroundGradientType.value,
              color1: foregroundColor1.value,
              color2: foregroundColor2.value,
              angle: foregroundGradientAngle.value,
          })
        : foregroundColor1.value;

    const backgroundFillStyle = backgroundGradient.value
        ? gradientGenerator({
              type: backgroundGradientType.value,
              color1: backgroundColor1.value,
              color2: backgroundColor2.value,
              angle: backgroundGradientAngle.value,
          })
        : backgroundColor1.value;

    // draw the code
    ctx.globalCompositeOperation = "destination-atop";
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(IMCctx.canvas, 0, 0, IMCctx.canvas.width, IMCctx.canvas.width, margin, margin, cellNumbers.value, cellNumbers.value);

    // draw foreground
    ctx.globalCompositeOperation = "source-in";
    ctx.fillStyle = foregroundFillStyle;
    ctx.fillRect(margin, margin, cellLength.value, cellLength.value);

    // draw background
    ctx.globalCompositeOperation = "destination-over";
    ctx.fillStyle = backgroundFillStyle;
    ctx.roundRect(0, 0, cellNumbers.value, cellNumbers.value, 2);
    ctx.fill();

    ctx.globalCompositeOperation = "source-over";
    if (customCorner.value) drawCorners(backgroundFillStyle);
    if (withLogo.value) drawLogo(backgroundFillStyle);
};

const drawLogo = (backgroundFillStyle) => {
    const ctx = canvasEl.value.getContext("2d");

    const imageSize = Math.min(link.length / 3.5, 11);
    const pos = cellNumbers.value / 2 - imageSize / 2;

    ctx.fillStyle = backgroundFillStyle;

    if (logoShadow.value) {
        ctx.shadowColor = `#000${logoShadowIntensity.value}`;
        ctx.shadowOffsetY = 15;
        ctx.shadowBlur = 20;
    }
    ctx.beginPath();
    ctx.roundRect(
        pos - Number(logoPadding.value) / 2,
        pos - Number(logoPadding.value) / 2,
        imageSize + Number(logoPadding.value),
        imageSize + Number(logoPadding.value),
        Number(logoBorderRadius.value)
    );
    ctx.fill();

    ctx.shadowColor = `#0000`;
    ctx.beginPath();
    ctx.roundRect(pos, pos, imageSize, imageSize, Math.max(Number(logoBorderRadius.value) - 1, 0));
    ctx.fill();

    logoImg.onload = () => {
        ctx.save();
        ctx.clip();
        ctx.drawImage(logoImg, pos, pos, imageSize, imageSize);
        ctx.restore();
    };
    if (allowLogoInQR) logoImg.src = brand.value.logo;
    else logoImg.src = "/logo.svg";
    // TODO : we dont need to draw logo image over and over : make it so that it draw once
};

const drawCorners = (backgroundFillStyle) => {
    const ctx = canvasEl.value.getContext("2d");
    const margin = borderMargin.value;
    let offset = margin - 0.2;

    // hide the corners
    ctx.fillStyle = backgroundFillStyle;
    ctx.beginPath();
    ctx.rect(0 + offset, 0 + offset, 8, 8);
    ctx.rect(cellNumbers.value - (7.9 + offset), 0 + offset, 8.2, 8);
    ctx.rect(0 + offset, cellNumbers.value - (8 + offset), 8, 8.2);
    ctx.fill();

    offset = margin + radius.value / 2.5;

    // corner rings
    ctx.strokeStyle = cornerRingColor.value;
    ctx.beginPath();
    ctx.roundRect(0 + offset, 0 + offset, 6, 6, cornerRingRadius.value);
    ctx.roundRect(cellNumbers.value - (6 + offset), 0 + offset, 6, 6, cornerRingRadius.value);
    ctx.roundRect(0 + offset, cellNumbers.value - (6 + offset), 6, 6, cornerRingRadius.value);
    ctx.stroke();

    // corner centers
    ctx.fillStyle = cornerCenterColor.value;
    ctx.beginPath();
    ctx.roundRect(1.5 + offset, 1.5 + offset, 3, 3, cornerCenterRadius.value);
    ctx.roundRect(cellNumbers.value - (4.5 + offset), 1.5 + offset, 3, 3, cornerCenterRadius.value);
    ctx.roundRect(1.5 + offset, cellNumbers.value - (4.5 + offset), 3, 3, cornerCenterRadius.value);
    ctx.fill();
};

const gradientGenerator = (options = { type: "Linear", color1: "", color2: "", angle: 0 }) => {
    if (!options.color2) return options.color1;
    const width = cellNumbers.value;
    const ctx = canvasEl.value.getContext("2d");

    let grd;
    switch (options.type) {
        case "Linear":
            if (options.angle === 0) grd = ctx.createLinearGradient(0, width / 2, width, width / 2);
            if (options.angle === 45) grd = ctx.createLinearGradient(0, 0, width, width);
            if (options.angle === 90) grd = ctx.createLinearGradient(width / 2, 0, width / 2, width);
            break;
        case "Radial":
            grd = ctx.createRadialGradient(width / 2, width / 2, width / 5, width / 2, width / 2, width / 1.8);
            break;
    }
    grd.addColorStop(0, options.color1);
    grd.addColorStop(1, options.color2);

    return grd;
};

onMounted(() => {
    // TODO : add more svg for pro
    logoImg = new Image();

    img = new Image();
    img.src = dotImage.value;
    img.onload = () => drawQR();

    // setTimeout(() => renderAll(), 2000);
});

// download qr code as png -------------------------------------------------
const saveCanvas = () => {
    const dataURL = canvasEl.value.toDataURL("image/png");

    // scaling down the image
    // const resizeCanvas = document.createElement("canvas");
    // resizeCanvas.width = resizeCanvas.height = 256;
    // resizeCanvas.getContext("2d").drawImage(canvasEl.value, 0, 0, 1024, 1024, 0, 0, 256, 256);
    // const dataURL = resizeCanvas.toDataURL("image/png");

    const a = document.createElement("a");
    a.download = "QR-Code.png";
    a.href = dataURL;
    a.click();
};
// -------------------------------------------------

// save qr code settings -------------------------------------------------
const saving = ref(false);
const saveSettings = async () => {
    if (saving.value) return;
    saving.value = true;

    responseMessage.value = "";
    errorField.value = "";

    const data = {
        link,
        backgroundGradient: backgroundGradient.value,
        backgroundGradientType: backgroundGradientType.value,
        backgroundGradientAngle: backgroundGradientAngle.value,
        backgroundColor1: backgroundColor1.value,
        backgroundColor2: backgroundColor2.value,
        foregroundGradient: foregroundGradient.value,
        foregroundGradientType: foregroundGradientType.value,
        foregroundGradientAngle: foregroundGradientAngle.value,
        foregroundColor1: foregroundColor1.value,
        foregroundColor2: foregroundColor2.value,
        dotImage: dotImage.value,
        randomSize: randomSize.value,
        customCorner: customCorner.value,
        cornerRingColor: cornerRingColor.value,
        cornerCenterColor: cornerCenterColor.value,
        cornerRingRadius: Number(cornerRingRadius.value),
        cornerCenterRadius: Number(cornerCenterRadius.value),
        withLogo: withLogo.value,
        logoPadding: Number(logoPadding.value),
        logoBorderRadius: Number(logoBorderRadius.value),
        logoShadow: logoShadow.value,
        logoShadowIntensity: Number(logoShadowIntensity.value),
    };

    await axios
        .post(`/api/v1/panel/menu-qrcode`, data, { headers: { brand: route.params.brandID } })
        .then((response) => {
            toast.success(t(`panel.qrcode.QR code settings has been saved`), { timeout: 3000, rtl: localeProperties.value.dir == "rtl" });
        })
        .catch((err) => {
            if (typeof err.response !== "undefined" && err.response.data) {
                const errors = err.response.data.errors || err.response.data.message;
                if (typeof errors === "object") {
                    responseMessage.value = errors[0].errors[0];
                    errorField.value = errors[0].property;
                }
            } else responseMessage.value = t("Something went wrong!");
            if (process.server) console.log({ err });
            toast.error(responseMessage.value, { timeout: 3000, rtl: localeProperties.value.dir == "rtl" });
        })
        .finally(() => (saving.value = false));
};
// -------------------------------------------------

// loadQRCodeSettings -------------------------------------------------
// const loadQRCodeSettings_results = await useLazyAsyncData(() => loadQRCodeSettings(route.params.brandID));
const loadQRCodeSettings_results = await useFetch("/api/v1/panel/menu-qrcode", { lazy: process.client, headers: { brand: route.params.brandID } });
const loadingQRCodeSettings = computed(() => loadQRCodeSettings_results.pending.value);

const handleLoadingQRCodeSettings_results = (data) => {
    if (!data) return;
    backgroundGradient.value = data.qrSettings?.backgroundGradient || backgroundGradient.value;
    backgroundGradientType.value = data.qrSettings?.backgroundGradientType || backgroundGradientType.value;
    backgroundGradientAngle.value = data.qrSettings?.backgroundGradientAngle || backgroundGradientAngle.value;
    backgroundColor1.value = data.qrSettings?.backgroundColor1 || backgroundColor1.value;
    backgroundColor2.value = data.qrSettings?.backgroundColor2 || backgroundColor2.value;
    foregroundGradient.value = data.qrSettings?.foregroundGradient || foregroundGradient.value;
    foregroundGradientType.value = data.qrSettings?.foregroundGradientType || foregroundGradientType.value;
    foregroundGradientAngle.value = data.qrSettings?.foregroundGradientAngle || foregroundGradientAngle.value;
    foregroundColor1.value = data.qrSettings?.foregroundColor1 || foregroundColor1.value;
    foregroundColor2.value = data.qrSettings?.foregroundColor2 || foregroundColor2.value;
    dotImage.value = data.qrSettings?.dotImage || dotImage.value;
    randomSize.value = data.qrSettings?.randomSize || randomSize.value;
    customCorner.value = data.qrSettings?.customCorner || customCorner.value;
    cornerRingColor.value = data.qrSettings?.cornerRingColor || cornerRingColor.value;
    cornerCenterColor.value = data.qrSettings?.cornerCenterColor || cornerCenterColor.value;
    cornerRingRadius.value = data.qrSettings?.cornerRingRadius || cornerRingRadius.value;
    cornerCenterRadius.value = data.qrSettings?.cornerCenterRadius || cornerCenterRadius.value;
    withLogo.value = data.qrSettings?.withLogo || withLogo.value;
    logoPadding.value = data.qrSettings?.logoPadding || logoPadding.value;
    logoBorderRadius.value = data.qrSettings?.logoBorderRadius || logoBorderRadius.value;
    logoShadow.value = data.qrSettings?.logoShadow || logoShadow.value;
    logoShadowIntensity.value = data.qrSettings?.logoShadowIntensity || logoShadowIntensity.value;
    try {
        renderAll();
    } catch (e) {}
};
handleLoadingQRCodeSettings_results(loadQRCodeSettings_results.data.value);
watch(loadQRCodeSettings_results.data, (val) => handleLoadingQRCodeSettings_results(val));
// watch(loadQRCodeSettings_results.data, (val) => handleLoadingQRCodeSettings_results(val), { immediate: process.server || nuxtApp.isHydrating });
// -------------------------------------------------

// getCurrentPlan -------------------------------------------------
const currentPlan = reactive({ plan: { icon: "", name: "", translation: {} }, lvl: 0 });
const getCurrentPlan_results = await useLazyAsyncData(() => getCurrentPlan(route.params.brandID));
const loadingCurrentPlan = computed(() => getCurrentPlan_results.pending.value);

const handleCurrentPlan_results = (data) => {
    if (!data) return;
    currentPlan.plan = data._currentPlan.plan;
    switch (currentPlan.plan.translation.en.name) {
        case "Pro Plan":
            currentPlan.lvl = 2;
            break;
        case "Standard Plan":
            currentPlan.lvl = 1;
            break;
        default:
            currentPlan.lvl = 0;
    }
};
watch(getCurrentPlan_results.data, (val) => handleCurrentPlan_results(val), { immediate: process.server || nuxtApp.isHydrating });
// -------------------------------------------------
</script>
