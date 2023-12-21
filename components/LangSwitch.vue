<style scoped>
.selected {
    background-color: theme("colors.fgPrimary");
    color: theme("colors.bgPrimary");
}
</style>

<template>
    <div class="relative z-10" ref="dropdown">
        <div
            class="flex items-center gap-1.5 border border-neutral-500 border-opacity-50 rounded-lg py-1 px-2 hover:mix-blend-difference cursor-pointer"
            @click="toggleDropdown()"
        >
            <Icon class="w-6 h-6" :class="[textColor == 'black' ? 'bg-bgPrimary' : 'bg-fgPrimary']" name="language.svg" folder="icons/light" size="24px" />
            <!-- <img class="w-6" :src="`/flags/${locale}.png`" :alt="locale" /> -->
            <small class="leading-none" :class="[textColor == 'black' ? 'text-bgPrimary' : 'text-fgPrimary']" v-if="showText">{{ locale }}</small>
            <!-- <Icon class="w-2.5 h-2.5" :class="[textColor == 'black' ? 'bg-bgPrimary' : 'bg-fgPrimary']" name="arrow.svg" folder="icons" size="10px" /> -->
        </div>
        <transition name="slide-up" mode="out-in" appear>
            <ul class="absolute top-10 end-0 flex flex-col gap-1.5 w-max p-1 bg-bgSecondary text-fgPrimary shadow-nr35 rounded-xl" v-if="open">
                <!-- @mousedown="selectOption(i)" -->
                <li
                    class="flex items-center w-full hover:bg-bgAccent rounded-lg cursor-pointer"
                    :class="{ selected: lang.code == locale }"
                    v-for="lang in locales"
                    :key="lang.code"
                >
                    <!-- <a class="flex items-center gap-1 p-2 py-1" :href="switchLocalePath(lang.code)">
                        <img class="w-6" :src="`/flags/${lang.code}.png`" :alt="lang.code" />
                        <span class="flex text-xs">{{ lang.name }}</span>
                    </a> -->
                    <a class="flex items-center gap-1 p-2" href="#" @click.prevent.stop="selectOption(lang.code)">
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

const { locale, locales, setLocale } = useI18n();
const switchLocalePath = useSwitchLocalePath();
const i18n_redirected = useCookie("i18n_redirected");

const availableLocales = computed(() => locales.value.filter((i) => i.code !== locale.value));

onMounted(() => {
    document.addEventListener("click", closeDropdown);
});
onBeforeUnmount(() => {
    document.removeEventListener("click", closeDropdown);
});

const open = ref(false);
const dropdown = ref(null); //Ref to DOM
const toggleDropdown = () => (open.value = !open.value);
const closeDropdown = (event) => {
    if (dropdown.value && !dropdown.value.contains(event.target)) open.value = false;
};

const selectOption = (code) => {
    if (locale === code) return;
    i18n_redirected.value = code;
    setLocale(code);
    toggleDropdown();
};
</script>
