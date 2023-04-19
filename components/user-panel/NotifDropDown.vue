<style scoped></style>

<template>
    <div class="relative" ref="dropdown">
        <div class="flex items-center gap-1 cursor-pointer hover:bg-neutral-600 hover:p-1 transition-all rounded-full" @click="toggleDropdown()">
            <Icon class="w-7 h-7 bg-zinc-100" name="cowbell.svg" folder="icons" size="20px" />
        </div>
        <transition name="slide-up" mode="out-in" appear>
            <ul class="absolute top-10 end-0 flex flex-col gap-1 w-max p-1 bg-dolphin text-white shadow-md rounded-xl" v-if="open">
                <nuxt-link to="">
                    <li class="flex items-center w-full hover:bg-zinc-200 rounded-md cursor-pointer">
                        <!-- <Icon src="" alt="" /> -->
                        <span>d</span>
                    </li>
                </nuxt-link>
            </ul>
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
