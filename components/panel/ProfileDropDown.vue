<style scoped>
.list {
    width: 100vw;
    max-width: 15rem;
}
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
            <img class="w-8 h-8 md:w-9 md:h-9 rounded-full object-contain shadow-nr15" :src="userStore.avatar" alt="" />
        </div>
        <transition name="slide-up" mode="out-in" appear>
            <ul class="list absolute top-14 -mt-0.5 -end-10 md:-end-4 flex flex-col gap-1 p-3 bg-bgAccent text-fgPrimary shadow-mr35 rounded-2xl" v-if="open">
                <li class="flex flex-col w-full p-2">
                    <h3 class="text-sm font-bold capitalize">{{ `${userStore.name} ${userStore.family}` }}</h3>
                    <small class="text-xs opacity-75">{{ userStore.email || userStore.mobile }}</small>
                </li>
                <nuxt-link :to="localePath('/panel/account/profile')">
                    <li class="flex items-center gap-2 w-full p-2.5 hover:bg-bgSecondary rounded-xl cursor-pointer group">
                        <Icon class="icon w-5 h-5 bg-fgPrimary group-hover:bg-secondary" name="user-pen.svg" folder="icons/light" size="20px" />
                        <small class="group-hover:text-secondary">{{ $t("panel.profile.Your Profile") }}</small>
                    </li>
                </nuxt-link>
                <hr class="w-full my-1 mx-auto opacity-25" />
                <nuxt-link :to="localePath('/panel/account/invite-list')">
                    <li class="flex items-center gap-2 w-full p-2.5 hover:bg-bgSecondary rounded-xl cursor-pointer group">
                        <Icon class="icon w-5 h-5 bg-fgPrimary group-hover:bg-secondary" name="envelope-open-text.svg" folder="icons/light" size="18px" />
                        <small class="group-hover:text-secondary">{{ $t("panel.profile.Staff Invites") }}</small>
                    </li>
                </nuxt-link>
                <nuxt-link :to="localePath('/panel/')">
                    <li class="flex items-center gap-2 w-full p-2.5 hover:bg-bgSecondary rounded-xl cursor-pointer group">
                        <Icon
                            class="icon w-5 h-5 bg-fgPrimary group-hover:bg-secondary"
                            name="square-dashed-circle-plus.svg"
                            folder="icons/light"
                            size="20px"
                        />
                        <small class="group-hover:text-secondary">{{ $t("panel.brands.Your Brands") }}</small>
                    </li>
                </nuxt-link>
                <nuxt-link :to="localePath(`/panel/${panelStore.selectedBrandId}/billing`)" v-if="panelStore.selectedBrandId != ''">
                    <li class="flex items-center gap-2 w-full p-2.5 hover:bg-bgSecondary rounded-xl cursor-pointer group">
                        <Icon class="icon w-5 h-5 bg-fgPrimary group-hover:bg-secondary" name="arrow-up-big-small.svg" folder="icons/light" size="20px" />
                        <small class="group-hover:text-secondary">{{ $t("panel.profile.Upgrade Plan") }}</small>
                    </li>
                </nuxt-link>
                <a :href="localePath('/help-center')" target="_blank">
                    <li class="flex items-center gap-2 w-full p-2.5 hover:bg-bgSecondary rounded-xl cursor-pointer group">
                        <Icon class="icon w-5 h-5 bg-fgPrimary group-hover:bg-secondary" name="square-question.svg" folder="icons/light" size="18px" />
                        <small class="group-hover:text-secondary">{{ $t("panel.profile.Help Center") }}</small>
                        <Icon class="w-3 h-3 bg-fgPrimary ms-auto" name="arrow-angle.svg" folder="icons" size="10px" />
                    </li>
                </a>
                <hr class="w-full my-1 mx-auto opacity-25" />
                <button @click="logout()">
                    <li class="flex items-center gap-2 w-full p-2.5 hover:bg-bgSecondary rounded-xl cursor-pointer group">
                        <Icon class="icon w-5 h-5 bg-rose-300" name="right-from-bracket.svg" folder="icons/light" size="18px" />
                        <small class="text-rose-300">{{ $t("panel.profile.Logout") }}</small>
                    </li>
                </button>
            </ul>
        </transition>
    </div>
</template>

<script setup>
import { useUserStore } from "@/stores/user";
import { usePanelStore } from "@/stores/panel";

// const { locale } = useI18n();
const localePath = useLocalePath();
const router = useRouter();
const userStore = useUserStore();
const panelStore = usePanelStore();

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

const logout = async () => {
    await userStore
        .logout()
        .then(() => (window.location.href = localePath("/")))
        .catch((e) => {});
};
</script>
