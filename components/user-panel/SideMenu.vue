<style scoped>
aside {
    width: 275px;
    height: calc(100% - 1rem);
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
    padding: 0.65rem 0.5rem;
    border-radius: 5px;
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
    margin-inline-start: 1rem;
    padding-inline-start: 0.5rem;
    border-inline-start: 1px solid theme("colors.zinc.400");
}
.sub_menu:hover {
    border-inline-start: 1px solid theme("colors.violet");
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

@media (min-width: 768px) {
    aside {
        height: 100%;
    }
}
</style>

<template>
    <aside class="absolute md:relative flex rounded-lg overflow-hidden z-10 flex-shrink-0 shadow-nr35" :class="{ close: !panelStore.sideMenuOpen }">
        <div class="flex flex-col gap-4 h-full p-4 bg-pencil-tip text-white rounded-lg">
            <!-- TODO : make skeluton fallback for when user data is loading and dont show if no brand available -->
            <div
                class="flex items-center gap-2 hover:px-2 py-2 rounded-lg hover:bg-neutral-600 cursor-pointer transition-all group"
                @click="openBrandSwitcher()"
            >
                <img class="w-16 h-16 object-contain flex-shrink-0" src="~/assets/images/fake-logo2.svg" alt="" />
                <div class="flex flex-col gap-1 w-full">
                    <h4 class="font-semibold text-lg">Brand Name</h4>
                    <span class="flex items-center justify-center w-max p-0.5 px-1 text-xs rounded-md bg-violet">Owner</span>
                </div>
                <Icon class="w-3 h-3 bg-white group-hover:-rotate-90 transition-all flex-shrink-0" name="arrow.svg" folder="icons" size="12px" />
            </div>

            <div class="flex items-center gap-2 w-full">
                <nuxt-link
                    class="btn relative flex items-center justify-center gap-2 p-2 rounded bg-white text-pencil-tip flex-grow"
                    :to="localePath('/orders-panel')"
                >
                    <img class="w-5" src="~/assets/images/panel-icons/cash-register.png" alt="" />
                    <span class="text-sm">{{ $t("user-panel.side-menu.Orders") }}</span>
                    <span class="absolute -top-1.5 end-1 gradient w-3 h-3 rounded-full"></span>
                </nuxt-link>
                <nuxt-link class="btn flex items-center justify-center gap-2 p-2 rounded bg-white text-pencil-tip flex-grow" :to="localePath('/ordering-app')">
                    <img class="w-5" src="~/assets/images/panel-icons/mobile-button.png" alt="" />
                    <span class="text-sm">{{ $t("user-panel.side-menu.Ordering App") }}</span>
                </nuxt-link>
            </div>

            <nav class="flex flex-col items-center gap-2 w-full max-h-full overflow-y-auto overflow-x-hidden flex-grow text-sm" ref="nav">
                <ul class="flex flex-col gap-2 w-full">
                    <nuxt-link class="link" :to="localePath('/user-panel')">
                        <li class="flex items-center gap-3">
                            <img class="w-5" src="~/assets/images/panel-icons/rectangles-mixed.png" alt="" />
                            <span>{{ $t("user-panel.side-menu.Dashboard") }}</span>
                        </li>
                    </nuxt-link>
                    <nuxt-link class="link" :to="localePath('/user-panel/branches')">
                        <li class="flex items-center gap-3">
                            <img class="w-5" src="~/assets/images/panel-icons/store.png" alt="" />
                            <span>{{ $t("user-panel.side-menu.Branches") }}</span>
                        </li>
                    </nuxt-link>
                    <button class="link" :class="{ toggler_active: openSubMenus.includes('menu') }" @click="toggleSubMenu('menu')">
                        <li class="flex items-center gap-3">
                            <img class="w-5" src="~/assets/images/panel-icons/cards-blank.png" alt="" />
                            <span>{{ $t("user-panel.side-menu.Menu") }}</span>
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
                            <nuxt-link class="link" :to="localePath('/user-panel/menu/items')">
                                <li class="flex items-center gap-3">
                                    <span>{{ $t("user-panel.side-menu.Menu Editor") }}</span>
                                </li>
                            </nuxt-link>
                            <nuxt-link class="link" :to="localePath('/user-panel/menu-style')">
                                <li class="flex items-center gap-3">
                                    <span>{{ $t("user-panel.side-menu.Style Editor") }}</span>
                                </li>
                            </nuxt-link>
                            <nuxt-link class="link" :to="localePath('/user-panel/menu/qr-code')">
                                <li class="flex items-center gap-3">
                                    <span>{{ $t("user-panel.side-menu.QR Code") }}</span>
                                </li>
                            </nuxt-link>
                            <nuxt-link class="link" :to="localePath('/user-panel/menu/splash-screen')">
                                <li class="flex items-center gap-3">
                                    <span>{{ $t("user-panel.side-menu.Splash Screen") }}</span>
                                </li>
                            </nuxt-link>
                        </ul>
                    </div>
                    <button class="link" :class="{ toggler_active: openSubMenus.includes('staff') }" @click="toggleSubMenu('staff')">
                        <li class="flex items-center gap-3">
                            <img class="w-5" src="~/assets/images/panel-icons/user-group.png" alt="" />
                            <span>{{ $t("user-panel.side-menu.Manage Staff") }}</span>
                            <Icon
                                class="sub_menu_toggler bg-white"
                                :class="{ open: openSubMenus.includes('staff') }"
                                name="arrow.svg"
                                folder="icons"
                                size="12px"
                            />
                        </li>
                    </button>
                    <div class="sub_menu_wrapper" :class="{ '-my-1': !openSubMenus.includes('staff') }" name="staff">
                        <ul class="sub_menu flex flex-col">
                            <nuxt-link class="link" :to="localePath('/user-panel/staff-list')">
                                <li class="flex items-center gap-3">
                                    <span>{{ $t("user-panel.side-menu.Staff Members") }}</span>
                                </li>
                            </nuxt-link>
                            <nuxt-link class="link" :to="localePath('/user-panel/sent-invites')">
                                <li class="flex items-center gap-3">
                                    <span>{{ $t("user-panel.side-menu.Sent Invites") }}</span>
                                </li>
                            </nuxt-link>
                            <nuxt-link class="link" :to="localePath('/user-panel/staff-roles')">
                                <li class="flex items-center gap-3">
                                    <span>{{ $t("user-panel.side-menu.Staff Roles") }}</span>
                                </li>
                            </nuxt-link>
                        </ul>
                    </div>
                    <nuxt-link class="link" :to="localePath('/user-panel/feedback')">
                        <li class="flex items-center gap-3">
                            <img class="w-5" src="~/assets/images/panel-icons/comments.png" alt="" />
                            <span>{{ $t("user-panel.side-menu.Customers Feedback") }}</span>
                        </li>
                    </nuxt-link>
                </ul>
                <hr class="w-full opacity-40 mx-4" />
                <ul class="flex flex-col gap-2 w-full">
                    <nuxt-link class="link" :to="localePath('/user-panel/billing')">
                        <li class="flex items-center gap-3">
                            <img class="w-5" src="~/assets/images/panel-icons/money-bills.png" alt="" />
                            <span>{{ $t("user-panel.side-menu.Billing & Plan Upgrade") }}</span>
                        </li>
                    </nuxt-link>
                    <nuxt-link class="link" :to="localePath('/user-panel/support')">
                        <li class="flex items-center gap-3">
                            <img class="w-5" src="~/assets/images/panel-icons/message-question.png" alt="" />
                            <span>{{ $t("user-panel.side-menu.Support") }}</span>
                        </li>
                    </nuxt-link>
                </ul>
            </nav>

            <div class="relative flex flex-col items-center p-2 md:p-6 bg-black rounded-xl shadow-lg overflow-hidden shrink-0">
                <span class="absolute end-1/2 -top-20 rotate-12 gradient-re w-24 h-24 rounded-2xl blur-sm opacity-75"></span>
                <span class="absolute end-10 -bottom-20 rotate-12 gradient-re w-24 h-24 rounded-2xl blur-sm opacity-75"></span>
                <span class="absolute -end-4 -bottom-14 -rotate-45 gradient-re w-24 h-24 rounded-2xl"></span>
                <div class="relative flex flex-col items-center justify-between gap-4">
                    <small class="hidden 2sm:flex text-sm opacity-75">Remove The Limitations</small>
                    <h5 class="hidden 2sm:flex gradient-text text-2xl font-black -mt-2 md:mb-2">Upgrade To Pro</h5>
                    <nuxt-link class="flex items-center gap-2 p-1 px-4 bg-pencil-tip rounded-xl shadow-xl" :to="localePath('/user-panel/billing/upgrade')">
                        <img class="w-9 md:w-12" src="~/assets/images/icons/sparkles.png" alt="" />
                        <b class="text-xl">Go Pro</b>
                    </nuxt-link>
                </div>
            </div>
        </div>

        <Teleport to="body">
            <BrandSwitcher />
        </Teleport>
    </aside>
</template>

<script setup>
import BrandSwitcher from "~/components/user-panel/dialogs/BrandSwitcher.vue";
import { usePanelStore } from "@/stores/panel";

// const { locale } = useI18n();
const localePath = useLocalePath();
const panelStore = usePanelStore();

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

const openBrandSwitcher = () => {
    panelStore.openPopUp("brand-switcher");
};
</script>
