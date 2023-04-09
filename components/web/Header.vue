<style scoped>
header {
    width: calc(100vw - 1rem);
    backdrop-filter: blur(8px);
}

nav {
    position: absolute;
    top: 4rem;
    inset-inline: 0rem;
    background-color: white;
    box-shadow: theme("boxShadow.nr35");
    border-radius: 0.5rem;
}

.drop_down_list {
    inset-inline-start: -2.25rem;
}

.link {
    transition: all 0.2s ease-in;
}

.toggle {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 2.75rem;
    height: 2.75rem;
    gap: 5px;
}
.line {
    width: 1.5rem;
    height: 3px;
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
    <!-- TODO : remove the login button when user is logged in and change the primary button to "your dashboard" -->
    <header
        ref="header"
        class="fixed flex items-center justify-between gap-4 border-2 border-gray-100 rounded-lg mt-2 md:mt-4 p-2 sm:p-3 max-w-screen-2xl h-14 lg:h-16 bg-white bg-opacity-90 shadow-nr5 z-20"
    >
        <nuxt-link class="flex items-center gap-1 sm:gap-3 h-7 md:h-9 overflow-hidden flex-shrink-0" :to="localePath('/')">
            <img class="relative h-7 md:h-9" src="/logo.svg" title="Menuriom" alt="Menuriom" />
            <img class="h-6 md:h-8" src="/logo-text.svg" title="Menuriom" alt="Menuriom" />
        </nuxt-link>

        <transition name="slide-up" appear>
            <nav class="flex flex-col lg:flex-row gap-4 lg:gap-0 lg:items-center w-full p-4 lg:p-0" v-show="menuOpen">
                <ul
                    class="relative flex flex-col lg:flex-row lg:items-center gap-6 xl:gap-8 w-full lg:w-auto mx-auto max-h-96 overflow-auto lg:overflow-visible"
                >
                    <li
                        class="flex flex-col gap-1 rounded-t-lg transition-all"
                        :class="{ 'lg:bg-white lg:p-2 lg:px-3 lg:shadow-nr25': featureListOpen }"
                        ref="featureDropdown"
                        @mouseover="toggleFeatures('hover', true)"
                        @mouseleave="toggleFeatures('hover', false)"
                    >
                        <div class="flex items-center gap-1 cursor-pointer select-none" @click="toggleFeatures('click')">
                            <span>Features</span>
                            <img src="/icons/arrow.svg" alt=">" />
                        </div>
                        <transition name="slidedown" mode="out-in" appear>
                            <ul
                                class="drop_down_list lg:absolute top-9 grid grid-cols-1 lg:grid-cols-2 items-center lg:gap-3 w-full lg:w-screen lg:max-w-2xl p-0 lg:p-4 xl:p-6 bg-white rounded-xl lg:shadow-nr15"
                                v-if="featureListOpen"
                            >
                                <li class="w-full p-3 hover:bg-neutral-100 rounded-lg" v-for="(item, i) in features.list" :key="i">
                                    <nuxt-link class="flex items-center gap-2" :to="localePath(`/features#${item.title.toLowerCase().replaceAll(' ', '-')}`)">
                                        <img class="w-8" :src="item.icon" :alt="item.title" />
                                        <div class="flex flex-col">
                                            <h4 class="f-inter">{{ item.title }}</h4>
                                            <small class="text-xs opacity-75">{{ item.desc }}</small>
                                        </div>
                                    </nuxt-link>
                                </li>
                                <li class="w-full p-3">
                                    <nuxt-link class="flex items-center w-max" :to="localePath('/features')">
                                        <span class="border-b-2 border-violet hover:border-b-4">See all the features &gt;</span>
                                    </nuxt-link>
                                </li>
                            </ul>
                        </transition>
                    </li>
                    <li class="flex items-center gap-1 hover:underline">
                        <nuxt-link class="flex items-center gap-4 w-full" :to="localePath('/demo')">
                            <span>Demo</span>
                            <span class="lg:hidden flex-grow h-0.5 bg-neutral-100"></span>
                        </nuxt-link>
                    </li>
                    <li class="flex items-center gap-1 hover:underline">
                        <nuxt-link class="flex items-center gap-4 w-full" :to="localePath('/pricing')">
                            <span>Pricing</span>
                            <span class="lg:hidden flex-grow h-0.5 bg-neutral-100"></span>
                        </nuxt-link>
                    </li>
                    <li class="flex items-center gap-1 hover:underline">
                        <nuxt-link class="flex items-center gap-4 w-full" :to="localePath('/how-it-works')">
                            <span>How It Works</span>
                            <span class="lg:hidden flex-grow h-0.5 bg-neutral-100"></span>
                        </nuxt-link>
                    </li>
                    <li class="flex items-center gap-1 hover:underline">
                        <nuxt-link class="flex items-center gap-4 w-full" :to="localePath('/contact-us')">
                            <span>Contact Us</span>
                            <span class="lg:hidden flex-grow h-0.5 bg-neutral-100"></span>
                        </nuxt-link>
                    </li>
                </ul>
                <hr class="gradient-re w-full h-0.5 lg:hidden" />
                <div class="flex items-center gap-4">
                    <LangSwitch class="" textColor="black" />
                    <span class="lg:hidden text-gray-400">|</span>
                    <nuxt-link
                        class="link md:hidden text-sm p-2 hover:px-3 rounded-md"
                        :to="localePath('/authenticate')"
                        title="Login into user panel"
                        v-if="!user.email.value"
                    >
                        Login
                    </nuxt-link>
                    <nuxt-link
                        class="link 2sm:hidden text-sm p-1.5 md:p-2 hover:px-3 rounded-md bg-violet border-2 border-black text-white shadow-md"
                        :to="!user.email.value ? localePath(`/authenticate`) : localePath(`/user-panel`)"
                        :title="!user.email.value ? `Try it for free` : `Your Menuriom Dashboard`"
                    >
                        <span v-if="!user.email.value">Try It For Free</span>
                        <span v-else>Your Dashboard</span>
                    </nuxt-link>
                </div>
            </nav>
        </transition>

        <div class="flex items-center gap-2 xl:gap-4 flex-shrink-0">
            <span class="hidden md:flex text-gray-400">|</span>
            <nuxt-link
                class="link hidden md:flex text-sm p-2 hover:px-3 rounded-md"
                :to="localePath(`/authenticate`)"
                title="Login into user panel"
                v-if="!user.email.value"
            >
                Login
            </nuxt-link>
            <nuxt-link
                class="link hidden 2sm:flex text-xs md:text-sm p-1.5 md:p-2 hover:px-3 rounded-md bg-violet border-2 border-black text-white shadow-md"
                :to="!user.email.value ? localePath(`/authenticate`) : localePath(`/user-panel`)"
                :title="!user.email.value ? `Try it for free` : `Your Menuriom Dashboard`"
            >
                <span v-if="!user.email.value">Try It For Free</span>
                <span v-else>Your Dashboard</span>
            </nuxt-link>
            <button class="toggle flex lg:hidden w-10 h-10 hover:bg-zinc-100 rounded-full transition-colors" @click="headerToggle()">
                <span class="line bg-black transition-all" :class="{ 'rotate-45 -mb-1': menuOpen }"></span>
                <span class="line bg-black transition-all" v-show="!menuOpen"></span>
                <span class="line bg-black transition-all" :class="{ '-rotate-45 -mt-1': menuOpen }"></span>
            </button>
        </div>
    </header>
</template>

<script setup>
import LangSwitch from "~/components/LangSwitch.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const localePath = useLocalePath();

const userState = useUserStore();
const user = storeToRefs(userState);

const featureDropdown = ref(null); //Ref to DOM
const featureListOpen = ref(false);
const features = reactive({
    list: [
        { icon: "/gradient-icons/dark/palette.png", title: "Templates & Customization", desc: "Style your menu base on restaurant theme" },
        { icon: "/gradient-icons/dark/store.png", title: "Multiple Branches", desc: "Different menu for different branch" },
        { icon: "/gradient-icons/dark/fire.png", title: "Item Specialazation", desc: "Highlight items in your menu" },
        { icon: "/gradient-icons/dark/clipboard-list-check.png", title: "Ordering System", desc: "Get orders directly from your menu" },
        { icon: "/gradient-icons/dark/earth-america.png", title: "Menu Translation", desc: "Multiple languages for same menu" },
        { icon: "/gradient-icons/dark/bell-on.png", title: "Server Call", desc: "Notify a server when table needs one" },
        { icon: "/gradient-icons/dark/comments-question-check.png", title: "Feedback System", desc: "Receive review from your customers" },
        { icon: "/gradient-icons/dark/object-intersect.png", title: "Combo Lists", desc: "Pair items that goes best together " },
        { icon: "/gradient-icons/dark/qrcode.png", title: "Custom QR Code", desc: "Place your logo onto your QR barcode" },
    ],
});

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
