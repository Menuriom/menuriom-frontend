<style scoped>
.icon {
    position: relative;
    top: 0px;
    transition: all 0.2s ease;
}
li:hover .icon {
    transform: rotate(-15deg);
    animation: up 0.2s;
}
@keyframes up {
    50% {
        top: -4px;
    }
}
</style>

<template>
    <div class="relative" ref="dropdown">
        <div class="flex items-center gap-1 cursor-pointer" @click="toggleDropdown()">
            <img class="w-8" :src="`/avatar.svg`" alt="" />
        </div>
        <transition name="slide-up" mode="out-in" appear>
            <ul class="absolute top-10 -end-10 md:-end-4 flex flex-col gap-1 w-max p-2 bg-dolphin text-white shadow-md rounded-xl" v-if="open">
                <li class="flex flex-col w-full p-2">
                    <!-- TODO : make skeleton fallback for when users data is loading -->
                    <h3 class="text-sm font-bold capitalize">{{ `${userStore.name} ${userStore.family}` }}</h3>
                    <small class="text-xs opacity-75">{{userStore.email || userStore.mobile}}</small>
                </li>
                <hr class="w-11/12 mx-auto opacity-25" />
                <nuxt-link :to="localePath('/user-panel/profile')">
                    <li class="flex items-center gap-2 w-full p-2.5 hover:bg-neutral-600 rounded-md cursor-pointer">
                        <Icon class="icon w-5 h-5 bg-zinc-100" name="user-pen.svg" folder="icons/light" size="20px" />
                        <small>{{ $t("user-panel.profile.Your Profile") }}</small>
                    </li>
                </nuxt-link>
                <nuxt-link :to="localePath('/user-panel/invites')">
                    <li class="flex items-center gap-2 w-full p-2.5 hover:bg-neutral-600 rounded-md cursor-pointer">
                        <Icon class="icon w-5 h-5 bg-zinc-100" name="user-pen.svg" folder="icons/light" size="20px" />
                        <small>{{ $t("user-panel.profile.Staff Invites") }}</small>
                    </li>
                </nuxt-link>
                <hr class="w-11/12 mx-auto opacity-25" />
                <nuxt-link :to="localePath('/user-panel/brands')">
                    <li class="flex items-center gap-2 w-full p-2.5 hover:bg-neutral-600 rounded-md cursor-pointer">
                        <Icon class="icon w-5 h-5 bg-zinc-100" name="square-dashed-circle-plus.svg" folder="icons/light" size="20px" />
                        <small>{{ $t("user-panel.profile.Create New Brand") }}</small>
                    </li>
                </nuxt-link>
                <nuxt-link :to="localePath('/user-panel/billing/change-plan')">
                    <li class="flex items-center gap-2 w-full p-2.5 hover:bg-neutral-600 rounded-md cursor-pointer">
                        <Icon class="icon w-5 h-5 bg-zinc-100" name="arrow-up-big-small.svg" folder="icons/light" size="20px" />
                        <small>{{ $t("user-panel.profile.Upgrade Plan") }}</small>
                    </li>
                </nuxt-link>
                <a :href="localePath('/help-center')" target="_blank">
                    <li class="flex items-center gap-2 w-full p-2.5 hover:bg-neutral-600 rounded-md cursor-pointer">
                        <Icon class="icon w-5 h-5 bg-zinc-100" name="square-question.svg" folder="icons/light" size="18px" />
                        <small>{{ $t("user-panel.profile.Help Center") }}</small>
                        <Icon class="w-3 h-3 bg-zinc-100 ms-auto" name="arrow-angle.svg" folder="icons" size="10px" />
                    </li>
                </a>
                <hr class="w-11/12 mx-auto opacity-25" />
                <button @click="logout()">
                    <li class="flex items-center gap-2 w-full p-2.5 hover:bg-neutral-600 rounded-md cursor-pointer">
                        <Icon class="icon w-5 h-5 bg-rose-300" name="right-from-bracket.svg" folder="icons/light" size="18px" />
                        <small class="text-rose-300">{{ $t("user-panel.profile.Logout") }}</small>
                    </li>
                </button>
            </ul>
        </transition>
    </div>
</template>

<script setup>
import { useUserStore } from "@/stores/user";

// const { locale } = useI18n();
const userStore = useUserStore();

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

const logout = () => {
    // TODO : ...
};
</script>
