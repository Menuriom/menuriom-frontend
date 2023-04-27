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
            <img class="w-9 h-9 rounded-md object-contain bg-zinc-600" :src="userStore.avatar" alt="" />
        </div>
        <transition name="slide-up" mode="out-in" appear>
            <ul class="absolute top-10 -end-10 md:-end-4 flex flex-col gap-1 w-max p-2 bg-dolphin text-white shadow-md rounded-xl" v-if="open">
                <li class="flex flex-col w-full p-2">
                    <!-- TODO : make skeleton fallback for when users data is loading -->
                    <h3 class="text-sm font-bold capitalize">{{ `${userStore.name} ${userStore.family}` }}</h3>
                    <small class="text-xs opacity-75">{{ userStore.email || userStore.mobile }}</small>
                </li>
                <hr class="w-11/12 mx-auto opacity-25" />
                <nuxt-link :to="localePath('/panel/profile')">
                    <li class="flex items-center gap-2 w-full p-2.5 hover:bg-neutral-600 rounded-md cursor-pointer">
                        <Icon class="icon w-5 h-5 bg-zinc-100" name="user-pen.svg" folder="icons/light" size="20px" />
                        <small>{{ $t("panel.profile.Your Profile") }}</small>
                    </li>
                </nuxt-link>
                <nuxt-link :to="localePath('/panel/invites')">
                    <li class="flex items-center gap-2 w-full p-2.5 hover:bg-neutral-600 rounded-md cursor-pointer">
                        <Icon class="icon w-5 h-5 bg-zinc-100" name="envelope-open-text.svg" folder="icons/light" size="18px" />
                        <small>{{ $t("panel.profile.Staff Invites") }}</small>
                    </li>
                </nuxt-link>
                <hr class="w-11/12 mx-auto opacity-25" />
                <nuxt-link :to="localePath('/panel/')">
                    <li class="flex items-center gap-2 w-full p-2.5 hover:bg-neutral-600 rounded-md cursor-pointer">
                        <Icon class="icon w-5 h-5 bg-zinc-100" name="square-dashed-circle-plus.svg" folder="icons/light" size="20px" />
                        <small>{{ $t("panel.brands.Your Brands") }}</small>
                    </li>
                </nuxt-link>
                <nuxt-link :to="localePath(`/panel/${panelStore.selectedBrandId}/billing/change-plan`)" v-if="panelStore.selectedBrandId != ''">
                    <li class="flex items-center gap-2 w-full p-2.5 hover:bg-neutral-600 rounded-md cursor-pointer">
                        <Icon class="icon w-5 h-5 bg-zinc-100" name="arrow-up-big-small.svg" folder="icons/light" size="20px" />
                        <small>{{ $t("panel.profile.Upgrade Plan") }}</small>
                    </li>
                </nuxt-link>
                <a :href="localePath('/help-center')" target="_blank">
                    <li class="flex items-center gap-2 w-full p-2.5 hover:bg-neutral-600 rounded-md cursor-pointer">
                        <Icon class="icon w-5 h-5 bg-zinc-100" name="square-question.svg" folder="icons/light" size="18px" />
                        <small>{{ $t("panel.profile.Help Center") }}</small>
                        <Icon class="w-3 h-3 bg-zinc-100 ms-auto" name="arrow-angle.svg" folder="icons" size="10px" />
                    </li>
                </a>
                <hr class="w-11/12 mx-auto opacity-25" />
                <button @click="logout()">
                    <li class="flex items-center gap-2 w-full p-2.5 hover:bg-neutral-600 rounded-md cursor-pointer">
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
        .then(() => {
            router.push(localePath("/"));
        })
        .catch((e) => {});
    // TODO : ...
};
</script>
