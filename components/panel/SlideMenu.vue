<style scoped></style>

<template>
    <div class="flex flex-col" ref="menu">
        <button
            class="absolute top-3 end-3 flex items-center justify-center w-8 h-8 rounded-full bg-white hover:bg-neutral-50 scale-100 lg:scale-0 lg:group-hover:scale-100 group-hover:border transition-all"
            @click="toggleMenu()"
        >
            <Icon class="w-5 h-5 bg-black" name="dots.svg" folder="icons" size="4px" />
        </button>
        <Transition name="slide-down" appear>
            <menu
                class="absolute inset-x-0 bottom-0 flex flex-col items-center gap-2 w-full p-2 bg-pencil-tip bg-opacity-95 text-white rounded-lg transition-all"
                v-if="!!open"
            >
                <hr class="w-1/2 border-b-2 my-1 mx-auto" />
                <div class="flex flex-col gap-2 w-full">
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
