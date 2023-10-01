<style scoped></style>

<template>
    <div class="sticky lg:top-0 flex flex-col gap-4 w-full sm:w-auto lg:w-72 p-4 rounded-2xl bg-bgAccent tegradient shadow-nr10">
        <div class="flex flex-wrap items-center justify-between gap-2">
            <div class="flex items-center gap-2">
                <Icon class="w-6 h-6 bg-white" name="language.svg" folder="icons/duo" size="24px" />
                <h3 class="text-lg">{{ $t("panel.Languages") }}</h3>
            </div>
            <nuxt-link
                class="btn flex items-center justify-center gap-2 text-xs border border-bgSecondary p-2 hover:px-4 rounded-xl"
                :to="localePath(`/panel/${brandID}/settings/languages`)"
                :title="$t('panel.side-menu.Language Settings')"
            >
                <Icon class="w-4 h-4 gradient" name="gear.svg" folder="icons/duo" size="16px" />
            </nuxt-link>
        </div>
        <hr class="w-full border-bgSecondary" />
        <small class="text-xs opacity-75 -mt-2">{{ $t("panel.languages.By selecting different language, you can translate text fields") }}</small>
        <ul class="flex lg:flex-col gap-2 w-full pb-2 md:pb-0 overflow-auto" v-if="!loadingSettings">
            <li
                class="flex items-center justify-between gap-3 p-3 rounded-xl transition-all cursor-pointer shrink-0"
                :class="[formLang == 'default' ? 'bg-fgPrimary text-bgPrimary' : 'bg-bgSecondary bg-opacity-50']"
                @click="$emit('update:formLang', 'default')"
            >
                <div class="flex items-center gap-2">
                    <Icon class="w-6 h-6 gradient" name="earth-america.svg" folder="icons/duo" size="24px" />
                    <span class="first-letter:capitalize">{{ $t("panel.Default") }}</span>
                </div>
            </li>
            <li
                class="flex items-center justify-between gap-3 p-3 rounded-xl transition-all cursor-pointer shrink-0"
                :class="[formLang == lang ? 'bg-fgPrimary text-bgPrimary' : 'bg-bgSecondary bg-opacity-50']"
                v-for="(lang, i) in settings.languages"
                :key="i"
                @click="$emit('update:formLang', lang)"
            >
                <div class="flex items-center gap-2">
                    <img class="w-6" :src="`/flags/${lang}.png`" alt="" />
                    <span class="first-letter:capitalize">{{ lang }}</span>
                </div>
            </li>
        </ul>
        <Loading v-else />
        <small class="text-xs opacity-75" v-if="!loadingSettings && settings.languages.length == 0">{{ $t("panel.needMoreLang") }}</small>
        <small class="flex items-start gap-0.5 text-xs text-rose-400" v-if="!loadingSettings && errorField === '' && responseMessage !== ''">
            <Icon class="icon w-4 h-4 bg-rose-400 shrink-0" name="Info-circle.svg" folder="icons/basil" size="16px" />{{ responseMessage }}
        </small>
    </div>
</template>

<script setup>
import Loading from "~/components/Loading.vue";
import { getBrandSettings } from "~/composables/useApiCalls";

const { t } = useI18n();
const localePath = useLocalePath();
const route = useRoute();

const props = defineProps({
    formLang: String,
    brandID: String,
});
const emit = defineEmits(["updateLanguages", "update:formLang"]);

const errorField = ref("");
const responseMessage = ref("");

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
const settings = reactive({ languages: [] });
const getBrandSettings_results = await useLazyAsyncData(() => getBrandSettings(props.brandID));

if (getBrandSettings_results.error.value) handleErrors(getBrandSettings_results.error.value);
watch(getBrandSettings_results.error, (err) => handleErrors(err));

const handleBrandSettings_results = (data) => {
    settings.languages = data._languages;

    const translations = {};
    settings.languages.forEach((lang) => (translations[lang] = ""));
    emit("updateLanguages", { ...translations });

    loadingSettings.value = false;
};
if (getBrandSettings_results.data.value) handleBrandSettings_results(getBrandSettings_results.data.value);
watch(getBrandSettings_results.data, (val) => handleBrandSettings_results(val));
// -------------------------------------------------
</script>
