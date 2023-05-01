<style scoped></style>

<template>
    <div class="flex flex-col gap-4 w-full max-w-screen-2xs p-4 rounded-lg bg-pencil-tip text-white shadow-nr35">
        <div class="flex flex-wrap items-center justify-between gap-4">
            <div class="flex items-center gap-2">
                <Icon class="w-5 h-5 bg-white" name="language.svg" folder="icons/light" size="20px" />
                <h3 class="text-lg">{{ $t("panel.Languages") }}</h3>
            </div>
            <nuxt-link
                class="btn flex items-center justify-center gap-2 text-xs border p-2 rounded-md"
                :to="localePath(`/panel/${route.params.brandID}/languages`)"
                :title="$t('panel.side-menu.Language Settings')"
            >
                <Icon class="w-4 h-4 bg-white" name="cog.svg" folder="icons" size="16px" />
            </nuxt-link>
        </div>
        <hr class="w-full opacity-20" />
        <ul class="flex lg:flex-col gap-2 w-full pb-2 overflow-auto" v-if="!loadingSettings">
            <li
                class="flex items-center justify-between gap-2 p-2 bg-dolphin rounded-md transition-all cursor-pointer flex-shrink-0"
                :class="{ 'bg-neutral-100 text-pencil-tip': formLang == 'default' }"
                @click="$emit('update:formLang', 'default')"
            >
                <div class="flex items-center gap-2">
                    <img class="w-6" :src="`/gradient-icons/${formLang == 'default' ? 'dark' : 'light'}/earth-america.png`" alt="" />
                    <span class="first-letter:capitalize">{{ $t("panel.Default") }}</span>
                </div>
            </li>
            <li
                class="flex items-center justify-between gap-2 p-2 bg-dolphin rounded-md transition-all cursor-pointer flex-shrink-0"
                :class="{ 'bg-neutral-100 text-pencil-tip': formLang == lang }"
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
    </div>
</template>

<script setup>
import Loading from "~/components/Loading.vue";
import { getBrandSettings } from "~/composables/useApiCalls";

const route = useRoute();
const props = defineProps({
    formLang: String,
});
const emit = defineEmits(["updateLanguages", "update:formLang"]);

const handleErrors = (err) => {
    errorField.value = "data";
    if (typeof err.response !== "undefined" && err.response.data) {
        const errors = err.response.data.errors || err.response.data.message;
        responseMessage.value = errors[0].errors[0];
    } else responseMessage.value = t("Something went wrong!");
    // TODO : log errors in sentry type thing
    if (process.server) console.log({ err });
};

// getBrandSettings -------------------------------------------------
const loadingSettings = ref(true);
const settings = reactive({ languages: [] });
const getBrandSettings_results = await useLazyAsyncData(() => getBrandSettings(route.params.brandID));

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
