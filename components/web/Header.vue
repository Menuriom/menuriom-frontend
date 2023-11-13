<style scoped>
header {
    width: calc(100vw - 1.75rem);
    backdrop-filter: blur(8px);
}

nav {
    position: absolute;
    top: 4.25rem;
    inset-inline-end: 0rem;
    background-color: theme("colors.bgAccent");
    box-shadow: theme("boxShadow.nr35");
    border-radius: 1rem;
}

.toggle {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 2.65rem;
    height: 2.65rem;
    gap: 6px;
}
.line {
    width: 1.5rem;
    height: 2px;
}

@media (min-width: 768px) {
    header {
        width: calc(100vw - 2rem);
    }
}
@media (min-width: 1024px) {
    nav {
        display: flex !important;
        position: initial;
        background-color: transparent;
        box-shadow: none;
    }
}
</style>

<template>
    <header ref="header" class="fixed flex items-center justify-between gap-4 rounded-2xl mt-2 md:mt-4 p-2 max-w-screen-2xl bg-bgAccent shadow-mr25 z-20">
        <nuxt-link class="flex items-center gap-2 overflow-hidden shrink-0" :to="localePath('/')">
            <div class="rounded-lg p-0.5 md:p-1 bg-gradient-to-t from-primary to-secondary">
                <img class="relative h-8 rounded-md" src="/logos/logo9-dark.webp" title="Menuriom" alt="Menuriom" />
            </div>
            <img class="h-7 xl:h-8" src="/logos/logo-text-en-light2.svg" title="Menuriom" alt="Menuriom" v-if="locale == 'en'" />
            <img class="h-7 xl:h-8" src="/logos/logo-text-en-light2.svg" title="منوریوم" alt="منوریوم" v-if="locale == 'fa'" />
            <!-- <img class="h-5 xl:h-6" src="/logos/logo-text-en-light.svg" title="Menuriom" alt="Menuriom" v-if="locale == 'en'" />
            <img class="h-5 xl:h-6" src="/logos/logo-text-fa-light.svg" title="منوریوم" alt="منوریوم" v-if="locale == 'fa'" /> -->
        </nuxt-link>

        <transition name="slide-up" appear>
            <nav class="flex flex-col lg:flex-row gap-4 lg:gap-0 lg:items-center w-full max-w-[250px] lg:max-w-none p-6 lg:p-0" v-show="menuOpen">
                <ul class="relative flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-8 lg:mx-auto overflow-auto lg:overflow-visible">
                    <li class="flex items-center gap-1 rounded-xl py-2 hover:px-4 hover:bg-bgSecondary hover:text-secondary transition-all">
                        <nuxt-link class="flex items-center gap-4 w-full" :to="localePath('/features')">
                            <span>{{ $t("header.Features") }}</span>
                        </nuxt-link>
                    </li>
                    <li class="flex items-center gap-1 rounded-xl py-2 hover:px-4 hover:bg-bgSecondary hover:text-secondary transition-all">
                        <nuxt-link class="flex items-center gap-4 w-full" :to="`${$config.public.MENU_BASE_URL}/Menuriom`">
                            <span>{{ $t("header.Demo") }}</span>
                        </nuxt-link>
                    </li>
                    <li class="flex items-center gap-1 rounded-xl py-2 hover:px-4 hover:bg-bgSecondary hover:text-secondary transition-all">
                        <nuxt-link class="flex items-center gap-4 w-full" :to="localePath('/pricing')">
                            <span>{{ $t("header.Pricing") }} </span>
                        </nuxt-link>
                    </li>
                    <li class="flex items-center gap-1 rounded-xl py-2 hover:px-4 hover:bg-bgSecondary hover:text-secondary transition-all">
                        <nuxt-link class="flex items-center gap-4 w-full" :to="localePath('#')">
                            <span>{{ $t("header.How It Works") }} </span>
                        </nuxt-link>
                    </li>
                    <li class="flex items-center gap-1 rounded-xl py-2 hover:px-4 hover:bg-bgSecondary hover:text-secondary transition-all">
                        <nuxt-link class="flex items-center gap-4 w-full" :to="localePath('/contact-us')">
                            <span>{{ $t("header.Contact Us") }}</span>
                        </nuxt-link>
                    </li>
                </ul>
                <hr class="w-full h-0.5 bg-fgPrimary opacity-10 lg:hidden" />
                <div class="flex flex-wrap items-center gap-4">
                    <LangSwitch class="" textColor="white" :showText="true" />
                    <!-- <span class="w-0.5 h-full lg:hidden text-gray-400"></span> -->
                    <div class="flex flex-wrap sm:flex-nowrap items-center gap-2">
                        <nuxt-link
                            class="link md:hidden w-full sm:w-auto text-center p-2 px-3 hover:px-5 rounded-lg bg-fgPrimary text-bgPrimary transition-all"
                            :to="localePath('/authenticate')"
                            title="Login into user panel"
                            v-if="!user.email.value"
                        >
                            {{ $t("header.Login") }}
                        </nuxt-link>
                        <nuxt-link
                            class="link 2sm:hidden w-full sm:w-auto text-center p-2 px-3 hover:px-5 rounded-lg bg-primary text-fgPrimary transition-all"
                            :to="!user.email.value ? localePath(`/authenticate`) : localePath(`/panel`)"
                            :title="!user.email.value ? `Try it for free` : `Your Menuriom Dashboard`"
                        >
                            <span v-if="!user.email.value">{{ $t("header.Try It For Free") }}</span>
                            <span v-else>{{ $t("header.Your Dashboard") }}</span>
                        </nuxt-link>
                    </div>
                </div>
            </nav>
        </transition>

        <div class="flex items-center gap-2 xl:gap-4 shrink-0">
            <span class="w-0.5 h-7 -ms-4 hidden lg:flex bg-fgPrimary opacity-30"></span>
            <nuxt-link
                class="link hidden md:flex p-2 hover:px-4 rounded-lg hover:bg-bgSecondary hover:text-secondary transition-all"
                :to="localePath(`/authenticate`)"
                title="Login into user panel"
                v-if="!user.email.value"
            >
                {{ $t("header.Login") }}
            </nuxt-link>
            <nuxt-link
                class="hidden 2sm:flex text-sm p-2.5 hover:px-4 rounded-lg bg-primary text-fgPrimary shadow-md transition-all"
                :to="!user.email.value ? localePath(`/authenticate`) : localePath(`/panel`)"
                :title="!user.email.value ? `Try it for free` : `Your Menuriom Dashboard`"
            >
                <span v-if="!user.email.value">{{ $t("header.Try It For Free") }}</span>
                <span v-else>{{ $t("header.Your Dashboard") }}</span>
            </nuxt-link>
            <button class="toggle flex lg:hidden w-8 h-8 hover:bg-bgPrimary rounded-xl transition-colors" @click="headerToggle()">
                <span class="line bg-fgPrimary transition-all" :class="{ 'rotate-45 -mb-1': menuOpen }"></span>
                <span class="line bg-fgPrimary transition-all" v-show="!menuOpen"></span>
                <span class="line bg-fgPrimary transition-all" :class="{ '-rotate-45 -mt-1': menuOpen }"></span>
            </button>
        </div>
    </header>
</template>

<script setup>
import LangSwitch from "~/components/LangSwitch.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const localePath = useLocalePath();
const { locale } = useI18n();

const userStore = useUserStore();
const user = storeToRefs(userStore);

const featureDropdown = ref(null); //Ref to DOM
const featureListOpen = ref(false);

const menuOpen = ref(false);

onMounted(() => {
    document.addEventListener("click", closeFeatures);
});
onBeforeUnmount(() => {
    document.removeEventListener("click", closeFeatures);
});

const toggleFeatures = (event = "click", state = null) => {
    if (window.innerWidth > 1024 && event == "click") return;
    if (window.innerWidth < 1024 && event == "hover") return;
    featureListOpen.value = state != null ? state : !featureListOpen.value;
};
const closeFeatures = (event) => {
    if (featureDropdown.value && !featureDropdown.value.contains(event.target)) featureListOpen.value = false;
};

const headerToggle = () => (menuOpen.value = !menuOpen.value);
</script>
