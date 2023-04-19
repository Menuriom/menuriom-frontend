<style scoped>
aside {
    width: 275px;
    transition: all 0.2s ease-in-out;
}
aside.close {
    width: 0px;
}

aside > div {
    min-width: 275px;
    max-width: 275px;
}

nav {
    scrollbar-width: thin;
}
nav::-webkit-scrollbar {
    width: 4px;
}

.link {
    transition: all 0.2s;
    padding: 0.5rem;
    border-radius: 0.25rem;
    cursor: pointer;
    border-color: transparent;
}
.link:hover {
    background-color: theme("colors.neutral.700");
}
.link.router-link-active {
    background-color: theme("colors.neutral.600");
}
.link.toggler_active {
    border: 1px solid theme("colors.neutral.600");
}

.sub_menu {
    margin-inline-start: 0.5rem;
    padding-inline-start: 0.5rem;
    border-inline-start: 1px solid theme("colors.zinc.400");
}
.sub_menu_wrapper {
    height: 0px;
    overflow: hidden;
    transition: all 0.2s;
}

.sub_menu_toggler {
    width: 12px;
    height: 12px;
    margin-inline-start: auto;
    transition: all 0.2s ease-in-out;
}
.sub_menu_toggler.open {
    transform: rotate(90deg);
}
</style>

<template>
    <aside class="absolute md:relative flex h-full rounded-lg overflow-hidden z-10 flex-shrink-0" :class="{ close: !panelStore.sideMenuOpen }">
        <div class="flex flex-col gap-6 h-full p-4 bg-pencil-tip text-white rounded-lg">
            <div></div>

            <div class="flex items-center gap-2 w-full">
                <nuxt-link class="btn flex items-center p-1 px-2 rounded bg-white text-pencil-tip flex-grow" :to="localePath('/user-panel')">
                    <span class="text-sm">Orders Panel</span>
                </nuxt-link>
                <nuxt-link class="btn flex items-center p-1 px-2 rounded bg-white text-pencil-tip flex-grow" :to="localePath('/user-panel')">
                    <span class="text-sm">Ordering Panel</span>
                </nuxt-link>
            </div>

            <nav class="flex flex-col items-center gap-2 w-full max-h-full overflow-y-auto overflow-x-hidden flex-grow text-sm" ref="nav">
                <ul class="flex flex-col gap-2 w-full">
                    <nuxt-link class="link" :to="localePath('/user-panel')">
                        <li class="flex items-center gap-3">
                            <i class="fad fa-user-group-crown text-pink-400"></i>
                            <span>Dashboard</span>
                        </li>
                    </nuxt-link>
                    <nuxt-link class="link" :to="localePath('/user-panel/branches')">
                        <li class="flex items-center gap-3">
                            <i class="fad fa-box text-emerald-400"></i>
                            <span>Branches</span>
                        </li>
                    </nuxt-link>
                    <button class="link" :class="{ toggler_active: openSubMenus.includes('menu') }" @click="toggleSubMenu('menu')">
                        <li class="flex items-center gap-3">
                            <i class="fad fa-cash-register text-emerald-400"></i>
                            <span>Menu</span>
                            <Icon
                                class="sub_menu_toggler bg-white"
                                :class="{ open: openSubMenus.includes('menu') }"
                                name="arrow.svg"
                                folder="icons"
                                size="12px"
                            />
                        </li>
                    </button>
                    <div class="sub_menu_wrapper" :class="{ '-my-1': !openSubMenus.includes('menu') }" name="menu">
                        <ul class="sub_menu flex flex-col">
                            <nuxt-link class="link" to="/payments/credit">
                                <li class="flex items-center gap-3">
                                    <span>Item Editor</span>
                                </li>
                            </nuxt-link>
                            <nuxt-link class="link" to="/payments/credit">
                                <li class="flex items-center gap-3">
                                    <span>Style Editor</span>
                                </li>
                            </nuxt-link>
                            <nuxt-link class="link" to="/payments/credit">
                                <li class="flex items-center gap-3">
                                    <span>QR Code</span>
                                </li>
                            </nuxt-link>
                        </ul>
                    </div>
                    <nuxt-link class="link" :to="localePath('/user-panel/staff')">
                        <li class="flex items-center gap-3">
                            <i class="fad fa-shopping-cart text-emerald-400"></i>
                            <span>Manage Staff</span>
                        </li>
                    </nuxt-link>
                </ul>

                <hr class="w-full opacity-40 mx-4" />

                <ul class="flex flex-col gap-2 w-full">
                    <nuxt-link class="link" :to="localePath('/user-panel/billing')">
                        <li class="flex items-center gap-3">
                            <i class="fad fa-user-group-crown text-pink-400"></i>
                            <span>Billing & Plan Upgrade</span>
                        </li>
                    </nuxt-link>
                    <nuxt-link class="link" :to="localePath('/user-panel/support')">
                        <li class="flex items-center gap-3">
                            <i class="fad fa-user-group-crown text-pink-400"></i>
                            <span>Support</span>
                        </li>
                    </nuxt-link>
                </ul>
            </nav>

            <div></div>
        </div>
    </aside>
</template>

<script setup>
import Button from "~/components/web/Button.vue";
import { usePanelStore } from "@/stores/panel";

const { locale } = useI18n();
const localePath = useLocalePath();
const panelStore = usePanelStore();

// --------------------------
// toggle sub menus open and close state
const openSubMenus = reactive([]);
const nav = ref(null);
const toggleSubMenu = (subMenuName) => {
    const subMenuHeight = nav.value.querySelector(`.sub_menu_wrapper[name="${subMenuName}"] > ul`).clientHeight;

    if (openSubMenus.includes(subMenuName)) {
        nav.value.querySelector(`.sub_menu_wrapper[name="${subMenuName}"]`).style.height = `${subMenuHeight}px`;
        setTimeout(() => {
            nav.value.querySelector(`.sub_menu_wrapper[name="${subMenuName}"]`).style.height = `0px`;
        }, 50);
        openSubMenus.splice(openSubMenus.indexOf(subMenuName), 1);
    } else {
        nav.value.querySelector(`.sub_menu_wrapper[name="${subMenuName}"]`).style.height = `${subMenuHeight}px`;
        setTimeout(() => {
            nav.value.querySelector(`.sub_menu_wrapper[name="${subMenuName}"]`).style.height = `auto`;
        }, 200);
        openSubMenus.push(subMenuName);
    }
};
// --------------------------
</script>
