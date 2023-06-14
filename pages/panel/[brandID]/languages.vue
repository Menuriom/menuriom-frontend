<style scoped></style>

<template>
    <div class="flex flex-col gap-4 md:gap-6 w-full">
        <header class="flex flex-wrap items-center justify-between gap-4">
            <div class="flex flex-col gap-1">
                <div class="flex items-center gap-2">
                    <img class="w-9" src="~/assets/images/panel-icons/language-dark.png" alt="" />
                    <h1 class="text-2xl md:text-4xl/tight font-bold">{{ $t("panel.side-menu.Language Settings") }}</h1>
                </div>
                <!-- <small class="hidden sm:flex text-sm">
                    {{ $t("panel.languages.Select your menu languages and setup your currency unit") }}
                </small> -->
            </div>
            <button
                class="btn flex items-center justify-center gap-2 text-sm p-3 px-6 rounded-lg bg-violet text-white"
                :class="{ 'opacity-50 cursor-not-allowed': saving }"
                :disabled="saving"
                @click="saveSetting()"
                v-if="checkPermissions(['main-panel.settings'], brand)"
            >
                <Icon class="w-4 h-4 bg-white" name="floppy-disk.svg" folder="icons" size="16px" />
                {{ $t("panel.Save") }}
            </button>
        </header>
        <hr class="w-full border-gray-300 opacity-50" />
        <section class="flex flex-wrap items-start gap-4 w-full" ref="sec">
            <div class="flex flex-col gap-2 p-4 bg-white rounded-lg w-full max-w-3xl shadow-nr5 flex-grow">
                <h2 class="text-2xl/none font-bold">{{ $t("panel.languages.Menu Languages") }}</h2>
                <div class="flex flex-col">
                    <small>{{ $t("panel.languages.Choose which languages you want your menu to have") }}</small>
                    <small>{{ $t("panel.languages.You can translate your menu items and your restaurant info base on languages you choose") }}</small>
                </div>
                <hr class="w-full border-gray-300 opacity-50" />
                <ul class="grid gap-2" style="grid-template-columns: repeat(auto-fill, minmax(250px, 1fr))" v-if="!loadingLanguages">
                    <li
                        class="flex items-center justify-between gap-2 p-2 rounded-md group"
                        :class="[settings.languages.includes(code) ? 'bg-dolphin text-white' : 'bg-neutral-50']"
                        v-for="(language, code) in languages.list"
                        :key="code"
                        @click="toggleLang(code)"
                    >
                        <div class="flex items-center gap-2">
                            <img class="w-10" :src="`/flags/${code}.png`" alt="" />
                            <span class="first-letter:capitalize">{{ language }}</span>
                        </div>
                        <small class="p-2 text-rose-300 underline underline-offset-2 cursor-pointer" v-if="settings.languages.includes(code)">
                            {{ $t("panel.Delete") }}
                        </small>
                        <small class="p-2 hidden group-hover:flex underline underline-offset-2 cursor-pointer" v-else>{{ $t("panel.Select") }}</small>
                        <!-- <span class="flex items-center justify-center w-5 h-5 bg-violet rounded-full" v-if="settings.languages.includes(code)">
                            <Icon class="w-5 h-5 bg-dolphin" name="check.svg" folder="icons" size="14px" />
                        </span> -->
                    </li>
                </ul>
                <Loading v-else />
                <hr class="w-full border-gray-300 opacity-50" />
                <div class="flex flex-wrap items-center gap-1">
                    <small class="text-sm">{{ $t("panel.languages.You can choose up to n languages", { n: 2 }) }} -</small>
                    <nuxt-link class="text-xs hover:underline text-violet" :to="localePath(`/panel/${route.params.brandID}/billing/change-plan`)">
                        {{ $t("panel.languages.Upgrade your plan to support more languages") }}
                    </nuxt-link>
                </div>
            </div>
            <div class="flex flex-col gap-2 p-4 bg-white rounded-lg w-full md:w-max shadow-nr5 flex-shrink-0">
                <h2 class="text-2xl/none font-bold">{{ $t("panel.languages.Currency") }}</h2>
                <small>{{ $t("panel.languages.Select what currency you want to show for your prices") }}</small>
                <hr class="w-full border-gray-300 opacity-50" />
                <ul class="flex flex-col gap-2 w-full max-w-screen-sm" v-if="!loadingCurrencies">
                    <li
                        class="flex items-center justify-between gap-2 p-2 rounded-md cursor-pointer"
                        :class="[i == settings.currency ? 'bg-dolphin text-white' : 'bg-neutral-50']"
                        v-for="(currency, i) in currencies.list"
                        :key="i"
                        @click="settings.currency = i"
                    >
                        <span>{{ currency }}</span>
                        <span class="flex items-center justify-center w-5 h-5 bg-violet rounded-full" v-if="i == settings.currency">
                            <Icon class="w-5 h-5 bg-dolphin" name="check.svg" folder="icons" size="14px" />
                        </span>
                    </li>
                </ul>
                <Loading v-else />
            </div>
        </section>
        <!-- <small class="flex items-start gap-0.5 text-xs text-rose-500" v-if="errorField === 'data' && responseMessage !== ''">
            <Icon class="icon w-4 h-4 bg-rose-500 flex-shrink-0" name="Info-circle.svg" folder="icons/basil" size="16px" />{{ responseMessage }}
        </small> -->
    </div>
</template>

<script setup>
import Loading from "~/components/Loading.vue";
import { getBrandSettings, getLanguages, getCurrencies } from "~/composables/useApiCalls";
import axios from "axios";
import { useUserStore } from "@/stores/user";
import { usePanelStore } from "@/stores/panel";

const { t } = useI18n();
const route = useRoute();
const nuxtApp = useNuxtApp();
const localePath = useLocalePath();
const panelStore = usePanelStore();
const userStore = useUserStore();

const title = computed(() => `${t("panel.side-menu.Language Settings")} - ${t("panel.Your Menuriom Panel")}`);
useHead({ title: title });

const brand = computed(() => userStore.brands.list[panelStore.selectedBrandId] || {});

const errorField = ref("");
const responseMessage = ref("");

const toggleLang = (langCode) => {
    if (settings.languages.includes(langCode)) {
        settings.languages.splice(settings.languages.indexOf(langCode), 1);
    } else {
        if (settings.languages.length >= settings.languageLimit) {
            // TODO : make toast and inform user that they cant pick more than the limit and they must unselect a selected lang first
            return;
        }
        settings.languages.push(langCode);
    }
};

// saving data -------------------------------------------------
const saving = ref(false);
const saveSetting = async () => {
    if (saving.value) return;
    saving.value = true;

    responseMessage.value = "";
    errorField.value = "";

    await axios
        .post(
            `/api/v1/panel/brands/${route.params.brandID}/settings`,
            { languages: settings.languages, currency: settings.currency },
            { headers: { brand: route.params.brandID } }
        )
        .then((response) => {
            // TODO : make toast and inform user that data is saved
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
            // TODO : log errors in sentry type thing
            // TODO : make toast and inform user the error
        })
        .finally(() => (saving.value = false));
};
// -------------------------------------------------

const handleErrors = (err) => {
    errorField.value = "data";
    if (typeof err.response !== "undefined" && err.response.data) {
        const errors = err.response.data.errors || err.response.data.message;
        if (typeof errors === "object") responseMessage.value = errors[0].errors[0];
    } else responseMessage.value = t("Something went wrong!");
    if (process.server) console.log({ err });
    // TODO : log errors in sentry type thing
};

// getBrandSettings -------------------------------------------------
const loadingSettings = ref(true);
const settings = reactive({ languages: [], currency: "", languageLimit: 2 });
const getBrandSettings_results = await useLazyAsyncData(() => getBrandSettings(route.params.brandID));

if (getBrandSettings_results.error.value) handleErrors(getBrandSettings_results.error.value);
watch(getBrandSettings_results.error, (err) => handleErrors(err));

const handleBrandSettings_results = (data) => {
    settings.languages = data._languages;
    settings.currency = data._currency;
    settings.languageLimit = data._languageLimit;
    loadingSettings.value = false;
};
watch(getBrandSettings_results.data, (val) => handleBrandSettings_results(val), { immediate: process.server || nuxtApp.isHydrating });
// -------------------------------------------------

// getLanguages -------------------------------------------------
const loadingLanguages = ref(true);
const languages = reactive({ list: {} });
const getLanguages_results = await useLazyAsyncData(() => getLanguages());

if (getLanguages_results.error.value) handleErrors(getLanguages_results.error.value);
watch(getLanguages_results.error, (err) => handleErrors(err));

const handleLanguages_results = (data) => {
    languages.list = data._languages;
    loadingLanguages.value = false;
};
watch(getLanguages_results.data, (val) => handleLanguages_results(val), { immediate: process.server || nuxtApp.isHydrating });
// -------------------------------------------------

// getCurrencies -------------------------------------------------
const loadingCurrencies = ref(true);
const currencies = reactive({ list: {} });
const getCurrencies_results = await useLazyAsyncData(() => getCurrencies());

if (getCurrencies_results.error.value) handleErrors(getCurrencies_results.error.value);
watch(getCurrencies_results.error, (err) => handleErrors(err));

const handleCurrencies_results = (data) => {
    currencies.list = data._currencies;
    loadingCurrencies.value = false;
};
watch(getCurrencies_results.data, (val) => handleCurrencies_results(val), { immediate: process.server || nuxtApp.isHydrating });
// -------------------------------------------------
</script>
