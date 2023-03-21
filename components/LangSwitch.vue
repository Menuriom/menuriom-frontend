<style scoped>
.selected {
    background-color: theme("colors.zinc.100");
}
</style>

<template>
    <div class="relative" ref="dropdown">
        <div class="flex items-center gap-1" @click="toggleDropdown()">
            <img class="w-6" :src="languages[selectedLanguage].flag" :alt="languages[selectedLanguage].code" />
            <img src="/icons/arrow.svg" alt=">" />
        </div>
        <transition name="slidedown" mode="out-in" appear>
            <ul class="absolute flex flex-col gap-2 w-max p-2 bg-white shadow-md rounded-md" v-if="open">
                <li
                    class="flex items-center gap-1 p-2 w-full hover:bg-zinc-200 rounded-md cursor-pointer"
                    :class="{ selected: i == selectedLanguage }"
                    v-for="(option, i) in languages"
                    :key="i"
                    @mousedown="selectOption(i)"
                >
                    <img class="w-6" :src="option.flag" :alt="option.code" />
                    <span class="flex text-sm">{{ option.name }}</span>
                </li>
            </ul>
        </transition>
    </div>
</template>

<script setup>
const dropdown = ref(null); //Ref to DOM

const selectedLanguage = ref("en");
const languages = reactive({
    en: { flag: "/flags/en.png", name: "English", code: "En" },
    fa: { flag: "/flags/fa.png", name: "فارسی", code: "Fa" },
});

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
    toggleDropdown();
};
</script>
