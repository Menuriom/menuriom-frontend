<style scoped></style>

<template>
    <div class="flex flex-col gap-6 w-full">
        <!-- <button
            class="btn flex items-center justify-center gap-2 w-max text-sm p-3 hover:px-6 rounded-xl bg-primary"
            :class="{ 'opacity-50 cursor-not-allowed': saving }"
            :disabled="saving"
            @click="saveSetting()"
            v-if="checkPermissions(['main-panel.settings'], brand)"
        >
            <Icon class="w-4 h-4 bg-fgPrimary" name="floppy-disk.svg" folder="icons" size="16px" />
            {{ $t("panel.Save") }}
        </button> -->
        <section class="flex flex-wrap items-start gap-4 w-full" ref="sec">
            <div class="flex flex-col gap-4 p-4 bg-bgAccent rounded-2xl w-full max-w-3xl shadow-nr15 flex-grow">
                <h2 class="text-2xl/none font-bold">{{ $t("panel.languages.Menu Languages") }}</h2>
                <div class="flex flex-col opacity-75">
                    <small>{{ $t("panel.languages.Choose which languages you want your menu to have") }}</small>
                    <small>{{ $t("panel.languages.You can translate your menu items and your restaurant info base on languages you choose") }}</small>
                </div>
                <hr class="w-full border-bgSecondary" />
                <ul class="grid gap-2" style="grid-template-columns: repeat(auto-fill, minmax(250px, 1fr))" v-if="!loadingLanguages">
                    <li
                        class="flex items-center justify-between gap-2 p-3 rounded-xl group"
                        :class="[settings.languages.includes(code) ? 'bg-fgPrimary text-bgPrimary' : 'bg-bgSecondary bg-opacity-50']"
                        v-for="(language, code) in languages.list"
                        :key="code"
                    >
                        <div class="flex items-center gap-2">
                            <img class="w-10" :src="`/flags/${code}.png`" alt="" />
                            <span class="first-letter:capitalize">{{ language }}</span>
                        </div>
                        <small
                            class="btn p-2 text-rose-400 hover:text-fgPrimary bg-rose-50 hover:bg-rose-400 rounded-xl cursor-pointer"
                            v-if="settings.languages.includes(code)"
                            @click="toggleLang(code)"
                        >
                            {{ $t("panel.Delete") }}
                        </small>
                        <small
                            class="btn p-2 text-secondary hover:text-bgPrimary bg-bgSecondary hover:bg-secondary rounded-xl hidden group-hover:flex cursor-pointer"
                            @click="toggleLang(code)"
                            v-else
                        >
                            {{ $t("panel.Select") }}
                        </small>
                        <!-- <span class="flex items-center justify-center w-5 h-5 bg-primary rounded-full" v-if="settings.languages.includes(code)">
                            <Icon class="w-5 h-5 bg-dolphin" name="check.svg" folder="icons" size="14px" />
                        </span> -->
                    </li>
                </ul>
                <Loading v-else />
                <hr class="w-full border-bgSecondary" />
                <div class="flex flex-wrap items-center gap-1">
                    <small class="text-sm">{{ $t("panel.languages.You can choose up to n languages", { n: 2 }) }} -</small>
                    <nuxt-link class="text-sm hover:underline text-primary" :to="localePath(`/panel/${route.params.brandID}/billing`)">
                        {{ $t("panel.languages.Upgrade your plan to support more languages") }}
                    </nuxt-link>
                </div>
            </div>
            <div class="flex flex-col gap-4 p-4 bg-bgAccent rounded-2xl w-full md:w-max shadow-nr15 shrink-0">
                <h2 class="text-2xl/none font-bold">{{ $t("panel.languages.Currency") }}</h2>
                <small class="opacity-75">{{ $t("panel.languages.Select what currency you want to show for your prices") }}</small>
                <hr class="w-full border-bgSecondary" />
                <ul class="flex flex-col gap-2 w-full max-w-screen-sm" v-if="!loadingCurrencies">
                    <li
                        class="flex items-center justify-between gap-2 p-3 rounded-xl cursor-pointer"
                        :class="[i == settings.currency ? 'bg-fgPrimary text-bgPrimary' : 'bg-bgSecondary bg-opacity-50']"
                        v-for="(currency, i) in currencies.list"
                        :key="i"
                        @click="changeCurrency(i)"
                    >
                        <span>{{ currency }}</span>
                        <span class="flex items-center justify-center w-6 h-6 bg-primary rounded-full" v-if="i == settings.currency">
                            <Icon class="w-5 h-5 bg-black" name="check.svg" folder="icons" size="14px" />
                        </span>
                    </li>
                </ul>
                <Loading v-else />
            </div>
        </section>
        <!-- <small class="flex items-start gap-0.5 text-xs text-rose-500" v-if="errorField === 'data' && responseMessage !== ''">
            <Icon class="icon w-4 h-4 bg-rose-500 shrink-0" name="Info-circle.svg" folder="icons/basil" size="16px" />{{ responseMessage }}
        </small> -->
    </div>
</template>

<script setup>
import Loading from "~/components/Loading.vue";
import { getBrandSettings, getLanguages, getCurrencies } from "~/composables/useApiCalls";
import axios from "axios";
import { useUserStore } from "@/stores/user";
import { usePanelStore } from "@/stores/panel";

// TODO
// add new setting for tax percent and other service percentages

const { t } = useI18n();
const route = useRoute();
const nuxtApp = useNuxtApp();
const localePath = useLocalePath();
const panelStore = usePanelStore();
const userStore = useUserStore();

// const title = computed(() => `${t("panel.side-menu.Language Settings")} - ${t("panel.Your Menuriom Panel")}`);
useHead({ title: `${t("panel.side-menu.Language Settings")} - ${t("panel.Your Menuriom Panel")}` });

const brand = computed(() => userStore.brands.list[panelStore.selectedBrandId] || {});

const errorField = ref("");
const responseMessage = ref("");

const toggleLang = async (langCode) => {
    if (settings.languages.includes(langCode)) {
        settings.languages.splice(settings.languages.indexOf(langCode), 1);
        await saveSetting();
    } else {
        if (settings.languages.length >= settings.languageLimit) {
            // TODO : make toast and inform user that they cant pick more than the limit and they must unselect a selected lang first
            return;
        }
        settings.languages.push(langCode);
        await saveSetting();
    }
};
const changeCurrency = async (index) => {
    settings.currency = index;
    await saveSetting();
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
            // LOGGER : log errors in sentry type thing
            // TODO : make toast and inform user the error
        })
        .finally(() => (saving.value = false));
};
// -------------------------------------------------

const handleErrors = (err) => {
    if (!err) return;
    errorField.value = "data";
    if (typeof err.response !== "undefined" && err.response.data) {
        const errors = err.response.data.errors || err.response.data.message;
        if (typeof errors === "object") responseMessage.value = errors[0].errors[0];
    } else responseMessage.value = t("Something went wrong!");
    if (process.server) console.log({ err });
    // LOGGER : log errors in sentry type thing
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
