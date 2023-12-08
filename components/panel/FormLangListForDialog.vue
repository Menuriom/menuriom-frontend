<style scoped></style>

<template>
    <div class="flex flex-col gap-4 w-full lg:w-72 rounded-lg">
        <ul class="flex gap-2 w-full overflow-auto" v-if="!loadingSettings">
            <li
                class="flex items-center justify-between gap-2 p-2 bg-bgSecondary rounded-xl transition-all cursor-pointer shrink-0"
                :class="{ 'bg-fgPrimary text-bgPrimary': formLang == 'default' }"
                @click="$emit('update:formLang', 'default')"
            >
                <div class="flex items-center gap-2">
                    <img class="w-5" :src="`/gradient-icons/${formLang == 'default' ? 'dark' : 'light'}/earth-america.png`" alt="" />
                    <span class="first-letter:capitalize text-xs">{{ $t("panel.Default") }}</span>
                </div>
            </li>
            <li
                class="flex items-center justify-between gap-2 p-2 bg-bgSecondary rounded-xl transition-all cursor-pointer shrink-0"
                :class="{ 'bg-fgPrimary text-bgPrimary': formLang == lang }"
                v-for="(lang, i) in settings.languages"
                :key="i"
                @click="$emit('update:formLang', lang)"
            >
                <div class="flex items-center gap-2">
                    <img class="w-5" :src="`/flags/${lang}.png`" alt="" />
                    <span class="first-letter:capitalize text-xs">{{ lang }}</span>
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
