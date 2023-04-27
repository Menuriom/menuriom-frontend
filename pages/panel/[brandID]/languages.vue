<style scoped></style>

<template>
    <div class="flex flex-col gap-4 sm:gap-6 w-full">
        <header class="flex flex-wrap items-center justify-between gap-4">
            <div class="flex flex-col gap-2">
                <div class="flex items-center gap-2">
                    <img class="w-9" src="~/assets/images/panel-icons/language-dark.png" alt="" />
                    <h1 class="text-4xl/none font-bold">{{ $t("panel.side-menu.Language Settings") }}</h1>
                </div>
                <small class="hidden sm:flex text-sm">
                    {{ $t("panel.languages.Select your menu languages and setup your currency unit") }}
                </small>
            </div>
            <button class="btn gradient flex items-center justify-center gap-2 text-sm p-3 px-6 rounded-lg text-white">
                <Icon class="w-3 h-3 bg-white" name="plus.svg" folder="icons" size="12px" />
                {{ $t("panel.Save") }}
            </button>
        </header>
        <hr class="w-full border-gray-300 opacity-50" />
        <section class="flex flex-wrap items-start gap-4 w-full">
            <div class="flex flex-col gap-2 p-4 bg-white rounded-md border w-full max-w-3xl shadow-nr5 flex-grow">
                <h2 class="text-2xl/none font-bold">{{ $t("panel.languages.Your Menu Languages") }}</h2>
                <div class="flex flex-col">
                    <small>{{ $t("panel.languages.Choose which languages you want your menu to have") }}</small>
                    <small>{{ $t("panel.languages.You can translate your menu items and your restaurant info base on languages you choose") }}</small>
                </div>
                <hr class="w-full border-gray-300 opacity-50" />
                <ul class="grid gap-2" style="grid-template-columns: repeat(auto-fill, minmax(200px, 1fr))" v-if="!loadingLanguages.state">
                    <li
                        class="flex items-center gap-2 p-2 border shadow-nr5 rounded-md"
                        :class="[settings.languages.includes(code) ? 'bg-dolphin text-white' : 'bg-white']"
                        v-for="(language, code) in languages.list"
                        :key="code"
                    >
                        <img class="w-10" :src="`/flags/${code}.png`" alt="" />
                        <span class="first-letter:capitalize">{{ language }}</span>
                    </li>
                </ul>
                <Loading v-else />
                <hr class="w-full border-gray-300 opacity-50" />
                <div class="flex flex-wrap items-center gap-1">
                    <small class="text-sm">{{ $t("panel.languages.You can choose up to n languages", { n: 2 }) }} |</small>
                    <nuxt-link class="text-xs underline text-violet" :to="localePath(`/panel/${route.params.brandID}/billing/change-plan`)">
                        {{ $t("panel.languages.Upgrade your plan to support more languages") }}
                    </nuxt-link>
                </div>
            </div>
            <div class="flex flex-col gap-2 p-4 bg-white rounded-md border w-full md:w-max shadow-nr5 flex-shrink-0">
                <h2 class="text-2xl/none font-bold">{{ $t("panel.languages.Your Currency") }}</h2>
                <small>{{ $t("panel.languages.Select what currency you want to show for your prices") }}</small>
                <hr class="w-full border-gray-300 opacity-50" />
                <ul class="flex flex-col gap-2 w-full max-w-screen-2xs" v-if="!loadingCurrencies.state">
                    <li
                        class="flex items-center gap-2 p-2 border shadow-nr5 rounded-md"
                        :class="[i == settings.currency ? 'bg-dolphin text-white' : 'bg-white']"
                        v-for="(currency, i) in currencies.list"
                        :key="i"
                    >
                        <span>{{ currency }}</span>
                    </li>
                </ul>
                <Loading v-else />
            </div>
        </section>
        <small class="flex items-start text-xs text-rose-500" v-if="errorField === 'data' && responseMessage !== ''">
            <Icon class="icon w-4 h-4 bg-rose-500 flex-shrink-0" name="Info-circle.svg" folder="icons/basil" size="16px" />{{ responseMessage }}
        </small>
    </div>
</template>

<script setup>
import Loading from "~/components/Loading.vue";
import { getBrandSettings, getLanguages, getCurrencies } from "~/composables/useApiCalls";
import axios from "axios";
import { usePanelStore } from "@/stores/panel";

const { t } = useI18n();
const route = useRoute();
const localePath = useLocalePath();
const panelStore = usePanelStore();

const title = computed(() => `${t("panel.side-menu.Language Settings")} - ${t("panel.Your Menuriom Panel")}`);
useHead({ title: title });

const errorField = ref("");
const responseMessage = ref("");

// loading data -------------------------------------------------
const loadingSettings = ref(true);
const settings = reactive({ languages: [], currency: "" });
const loadingLanguages = ref(true);
const languages = reactive({ list: {} });
const loadingCurrencies = ref(true);
const currencies = reactive({ list: {} });
const { data, error } = await useLazyAsyncData(async () => {
    return { ...(await getBrandSettings(route.params.brandID)), ...(await Promise.all([getLanguages(), getCurrencies()])) };
});

const handleData = (data) => {
    settings.languages = data._languages;
    settings.currency = data._currency;
    languages.list = data[0]._languages;
    currencies.list = data[1]._currencies;
    loadingSettings.value = loadingLanguages.value = loadingCurrencies.value = false;
};
const handleErrors = (err) => {
    errorField.value = "data";
    if (typeof err.response !== "undefined" && err.response.data) {
        const errors = err.response.data.errors || err.response.data.message;
        responseMessage.value = errors[0].errors[0];
    } else responseMessage.value = t("Something went wrong!");
    // TODO : log errors in sentry type thing
};

if (data.value) handleData(data.value);
watch(data, (val) => handleData(val));

if (error.value) handleErrors(error.value);
watch(error, (err) => handleData(err));
// -------------------------------------------------
</script>
