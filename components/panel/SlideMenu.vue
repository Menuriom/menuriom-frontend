<style scoped>
menu {
    width: calc(100% - 1rem);
    /* border: 1px solid theme("colors.neutral.700"); */
    box-shadow: inset theme("boxShadow.nr35");
}
</style>

<template>
    <div class="flex flex-col" ref="menu">
        <button
            class="absolute top-3 end-3 flex items-center justify-center p-1.5 hover:px-3 rounded-full shadow-mr5 hover:shadow-mr25 bg-fgPrimary scale-100 lg:scale-0 lg:group-hover:scale-100 group-hover:border transition-all"
            @click="toggleMenu()"
        >
            <Icon class="w-5 h-5 bg-bgPrimary" name="dots.svg" folder="icons" size="4px" />
        </button>
        <Transition name="slide-down" appear>
            <menu
                class="absolute start-2 bottom-2 flex flex-col items-center gap-2 p-2 mx-auto bg-bgSecondary text-fgPrimary rounded-xl transition-all"
                v-if="!!open"
            >
                <hr class="w-1/2 border-b-2 my-1 mx-auto rounded-full opacity-75" />
                <div class="flex flex-col gap-1 w-full">
                    <slot />
                </div>
            </menu>
        </Transition>
    </div>
</template>

<script setup>
onMounted(() => {
    document.addEventListener("click", closeMenu);
});
onBeforeUnmount(() => {
    document.removeEventListener("click", closeMenu);
});

const open = ref(false);
const menu = ref(null); //Ref to DOM
const toggleMenu = () => (open.value = true);
const closeMenu = (event) => {
    if (menu.value && !menu.value.contains(event.target)) open.value = false;
};
</script>
