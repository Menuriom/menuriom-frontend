<style scoped></style>

<template>
    <div class="relative" ref="dropdown">
        <div class="relative flex items-center gap-1 cursor-pointer hover:bg-neutral-600 hover:p-1 transition-all rounded-full" @click="toggleDropdown()">
            <Icon class="w-7 h-7 bg-zinc-100" name="cowbell.svg" folder="icons" size="20px" />
            <span class="gradient absolute top-1 start-0 w-2.5 h-2.5 rounded-full border-white"></span>
        </div>
        <transition name="slide-up" mode="out-in" appear>
            <div
                class="absolute top-10 -end-10 md:-end-4 flex flex-col gap-2 w-screen max-w-screen-2xs p-2 bg-dolphin text-white shadow-md rounded-xl"
                v-if="open"
            >
                <div class="flex items-center justify-between gap-2 w-full p-1 px-2">
                    <h4 class="font-semibold">Notifications</h4>
                    <button class="text-xs text-purple-300 hover:text-violet underline">Clear All</button>
                </div>
                <hr class="w-11/12 mx-auto opacity-40" />
                <ul class="flex flex-col gap-1">
                    <nuxt-link :to="localePath('/brand-panel/')">
                        <li class="flex flex-col gap-2 w-full p-2.5 hover:bg-neutral-600 rounded-md cursor-pointer">
                            <div class="flex items-center gap-2">
                                <Icon class="icon w-5 h-5 bg-zinc-100" name="user-pen.svg" folder="icons/light" size="20px" />
                                <span class="text-sm">{{ $t("brand-panel.profile.Your Profile") }}</span>
                            </div>
                            <p class="text-xs opacity-75">some text</p>
                        </li>
                    </nuxt-link>
                    <nuxt-link :to="localePath('/brand-panel/')">
                        <li class="flex flex-col gap-2 w-full p-2.5 hover:bg-neutral-600 rounded-md cursor-pointer">
                            <div class="flex items-center gap-2">
                                <Icon class="icon w-5 h-5 bg-zinc-100" name="user-pen.svg" folder="icons/light" size="20px" />
                                <span class="text-sm">{{ $t("brand-panel.profile.Your Profile") }}</span>
                            </div>
                            <p class="text-xs opacity-75">some text</p>
                        </li>
                    </nuxt-link>
                </ul>
            </div>
        </transition>
    </div>
</template>

<script setup>
// const { locale } = useI18n();

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
</script>
