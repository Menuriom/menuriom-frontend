<style scoped>
.selected {
    background-color: theme("colors.zinc.100");
}
</style>

<template>
    <div class="relative" ref="dropdown">
        <div class="flex items-center gap-1" @click="toggleDropdown()">
            <img class="w-6" :src="`/flags/${locale}.png`" :alt="locale" />
            <small :class="`text-${textColor}`" v-if="showText">{{ languages[locale].name }}</small>
            <Icon class="w-2.5 h-2.5 bg-black" :class="`bg-${textColor}`" name="arrow.svg" folder="icons" size="10px" />
        </div>
        <transition name="slidedown" mode="out-in" appear>
            <ul class="absolute top-6 flex flex-col gap-1 w-max p-1 bg-white text-pencil-tip shadow-md rounded-md" v-if="open">
                <!-- @mousedown="selectOption(i)" -->
                <li
                    class="flex items-center w-full hover:bg-zinc-200 rounded-md cursor-pointer"
                    :class="{ selected: lang.code == locale }"
                    v-for="lang in availableLocales"
                    :key="lang.code"
                >
                    <a class="flex items-center gap-1 p-2 py-1" :href="switchLocalePath(lang.code)">
                        <img class="w-6" :src="`/flags/${lang.code}.png`" :alt="lang.code" />
                        <span class="flex text-xs">{{ lang.name }}</span>
                    </a>
                </li>
            </ul>
        </transition>
    </div>
</template>

<script setup>
import Icon from "~/components/Icon.vue";

defineProps({
    textColor: { type: String, default: "black" },
    showText: { type: Boolean, default: false },
});

const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const dropdown = ref(null); //Ref to DOM

const selectedLanguage = ref(locale.value);
const languages = reactive({
    en: { flag: "/flags/en.png", name: "English", code: "En" },
    fa: { flag: "/flags/fa.png", name: "فارسی", code: "Fa" },
});
const availableLocales = computed(() => locales.value.filter((i) => i.code !== locale.value));

const open = ref(false);

onMounted(() => {
    document.addEventListener("click", closeDropdown);
});
onBeforeUnmount(() => {
    document.removeEventListener("click", closeDropdown);
});

const toggleDropdown = () => (open.value = !open.value);
const closeDropdown = (event) => {
    if (dropdown.value && !dropdown.value.contains(event.target)) open.value = false;
};

const selectOption = (index) => {
    selectedLanguage.value = index;
    locale.value = index;
    toggleDropdown();

    // window.location.href = switchLocalePath(locale.value);
};
</script>
