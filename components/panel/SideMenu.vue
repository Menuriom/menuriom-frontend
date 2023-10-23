<style scoped>
aside {
    width: calc(275px + 0.5rem);
    height: calc(100% - 1rem);
    padding-block: 0.5rem;
    padding-inline-start: 0.5rem;
    transition: all 0.2s ease-in-out;
}
aside.close {
    width: 0px;
    padding-inline: 0px;
}

aside > div {
    min-width: 275px;
    max-width: 275px;
}

.link {
    transition: all 0.2s;
    padding: 0.65rem 0.5rem;
    border-radius: 10px;
    cursor: pointer;
    border-color: transparent;
}
.link:hover {
    background-color: theme("colors.neutral.700");
}
.link.router-link-exact-active {
    background-color: theme("colors.neutral.600");
}
.link.toggler_active {
    /* border: 1px solid theme("colors.neutral.700"); */
    box-shadow: inset theme("boxShadow.mr35");
}

.sub_menu {
    margin-inline-start: 1rem;
    padding-inline-start: 0.5rem;
    border-inline-start: 2px solid theme("colors.zinc.700");
}
.sub_menu:hover {
    border-inline-start: 2px solid theme("colors.primary");
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
    <aside class="absolute md:relative flex rounded-lg overflow-hidden z-20 shrink-0" :class="{ close: !panelStore.sideMenuOpen }">
        <div class="flex flex-col gap-4 h-full p-4 bg-bgAccent rounded-2xl shadow-mr35">
            <nuxt-link
                class="flex items-center gap-2 p-2 rounded-xl hover:bg-neutral-600 bg-bgSecondary cursor-pointer transition-all group"
                :to="localePath(`/panel/`)"
            >
                <img class="w-14 h-14 object-cover rounded-full shadow-nr35 shrink-0" :src="brand.logo" v-if="brand.logo" />
                <img class="w-14 h-14 object-cover rounded-full shadow-nr35 shrink-0" src="~/assets/images/fake-logo2.svg" v-else />
                <div class="flex flex-col gap-1 w-full grow">
                    <h4 class="w-full font-semibold whitespace-nowrap text-ellipsis overflow-hidden">{{ brand.name }}</h4>
                    <span class="text-xs whitespace-nowrap text-ellipsis overflow-hidden w-full text-purple-300">{{ brand.role }}</span>
                </div>
                <Icon class="w-5 h-5 bg-fgPrimary group-hover:rotate-180 transition-all shrink-0" name="caret-left.svg" folder="icons/tabler" size="20px" />
            </nuxt-link>

            <div class="flex items-center gap-1.5 w-full" v-if="panelStore.selectedBrandId !== ''">
                <nuxt-link
                    class="btn relative flex items-center justify-center gap-2 p-2 px-1 hover:px-4 rounded-lg bg-fgPrimary text-pencil-tip grow"
                    :to="localePath(`/orders-panel/${panelStore.selectedBrandId}`)"
                    v-if="checkPermissions(['orders-panel'], brand)"
                >
                    <img class="w-5" src="~/assets/images/panel-icons/cash-register.png" alt="" />
                    <span class="text-sm">{{ $t("panel.side-menu.Orders") }}</span>
                    <span class="absolute -top-1.5 end-1 gradient w-3 h-3 rounded-full"></span>
                </nuxt-link>
                <nuxt-link
                    class="btn flex items-center justify-center gap-2 p-2 px-1 hover:px-4 rounded-lg bg-fgPrimary text-pencil-tip grow"
                    :to="localePath(`/ordering-app/${panelStore.selectedBrandId}`)"
                    v-if="checkPermissions(['ordering-app'], brand)"
                >
                    <img class="w-5" src="~/assets/images/panel-icons/mobile-button.png" alt="" />
                    <span class="text-sm">{{ $t("panel.side-menu.Ordering App") }}</span>
                </nuxt-link>
            </div>

            <hr class="w-full opacity-20" />

            <nav
                class="flex flex-col items-center gap-2 pe-1 w-full max-h-full overflow-y-auto overflow-x-hidden grow text-sm"
                ref="nav"
                v-if="panelStore.selectedBrandId !== ''"
            >
                <ul class="flex flex-col gap-2 w-full">
                    <nuxt-link
                        class="link"
                        :to="localePath(`/panel/${panelStore.selectedBrandId}`)"
                        v-if="checkPermissions(['main-panel.dashboard.view'], brand)"
                    >
                        <li class="flex items-center gap-3">
                            <!-- <Icon class="w-6 h-6 gradient" name="column-light.svg" folder="icons/light" size="22px" /> -->
                            <Icon class="w-5 h-5 gradient" name="rectangles-mixed.svg" folder="icons/duo" size="20px" />
                            <span>{{ $t("panel.side-menu.Dashboard") }}</span>
                        </li>
                    </nuxt-link>
                    <nuxt-link
                        class="link"
                        :to="localePath(`/panel/${panelStore.selectedBrandId}/feedback`)"
                        v-if="checkPermissions(['main-panel.customer-feedback.view'], brand)"
                    >
                        <li class="flex items-center gap-3">
                            <Icon class="w-5 h-5 gradient" name="comments.svg" folder="icons/duo" size="20px" />
                            <!-- <Icon class="w-6 h-6 gradient" name="comments-light.svg" folder="icons/light" size="22px" /> -->
                            <!-- <img class="w-5" src="~/assets/images/panel-icons/comments-light.png" alt="" /> -->
                            <span>{{ $t("panel.side-menu.Customers Feedback") }}</span>
                        </li>
                    </nuxt-link>
                </ul>
                <hr class="w-full opacity-20 mx-4" />
                <ul class="flex flex-col gap-2 w-full">
                    <nuxt-link
                        class="link"
                        :to="localePath(`/panel/${panelStore.selectedBrandId}/branches`)"
                        v-if="checkPermissions(['main-panel.branches.view'], brand)"
                    >
                        <li class="flex items-center gap-3">
                            <Icon class="w-5 h-5 gradient" name="store.svg" folder="icons/duo" size="20px" />
                            <!-- <Icon class="w-6 h-6 gradient" name="store.svg" folder="icons/light" size="22px" /> -->
                            <!-- <img class="w-5" src="~/assets/images/panel-icons/store-light.png" alt="" /> -->
                            <span>{{ $t("panel.side-menu.Branches") }}</span>
                        </li>
                    </nuxt-link>
                    <button
                        class="link"
                        :class="{ toggler_active: openSubMenus2.has('menu') }"
                        @click="toggleSubMenu2('menu')"
                        v-if="checkPermissions(['main-panel.menu.items', 'main-panel.menu.style', 'main-panel.menu.qr-code'], brand)"
                    >
                        <li class="flex items-center gap-3">
                            <Icon class="w-5 h-5 gradient" name="cards-blank.svg" folder="icons/duo" size="20px" />
                            <!-- <Icon class="w-6 h-6 gradient" name="cards-blank.svg" folder="icons/light" size="22px" /> -->
                            <!-- <img class="w-5" src="~/assets/images/panel-icons/cards-blank-light.png" alt="" /> -->
                            <span>{{ $t("panel.side-menu.Menu") }}</span>
                            <Icon
                                class="sub_menu_toggler bg-fgPrimary"
                                :class="{ open: openSubMenus2.has('menu') }"
                                name="arrow.svg"
                                folder="icons"
                                size="12px"
                            />
                        </li>
                    </button>
                    <div
                        class="grid transition-all"
                        :class="{ '-mb-2': !openSubMenus2.has('menu') }"
                        :style="`grid-template-rows: ${openSubMenus2.has('menu') ? 1 : 0}fr;`"
                    >
                        <ul class="sub_menu flex flex-col gap-1 overflow-hidden">
                            <nuxt-link
                                class="link"
                                :to="localePath(`/panel/${panelStore.selectedBrandId}/menu/editor`)"
                                v-if="checkPermissions(['main-panel.menu.items'], brand)"
                            >
                                <li class="flex items-center gap-3">
                                    <span>{{ $t("panel.side-menu.Menu Editor") }}</span>
                                </li>
                            </nuxt-link>
                            <nuxt-link
                                class="link"
                                :to="localePath(`/panel/${panelStore.selectedBrandId}/menu/style`)"
                                v-if="checkPermissions(['main-panel.menu.style'], brand)"
                            >
                                <li class="flex items-center gap-3">
                                    <span>{{ $t("panel.side-menu.Style Editor") }}</span>
                                </li>
                            </nuxt-link>
                            <nuxt-link
                                class="link"
                                :to="localePath(`/panel/${panelStore.selectedBrandId}/menu/qr-code`)"
                                v-if="checkPermissions(['main-panel.menu.qr-code'], brand)"
                            >
                                <li class="flex items-center gap-3">
                                    <span>{{ $t("panel.side-menu.QR Code") }}</span>
                                </li>
                            </nuxt-link>
                        </ul>
                    </div>
                    <button
                        class="link"
                        :class="{ toggler_active: openSubMenus2.has('staff') }"
                        @click="toggleSubMenu2('staff')"
                        v-if="checkPermissions(['main-panel.staff.view', 'main-panel.staff.invite', 'main-panel.staff.roles'], brand)"
                    >
                        <li class="flex items-center gap-3">
                            <Icon class="w-5 h-5 gradient" name="user-group.svg" folder="icons/duo" size="20px" />
                            <!-- <Icon class="w-6 h-6 gradient" name="user-group-light.svg" folder="icons/light" size="22px" /> -->
                            <!-- <img class="w-5" src="~/assets/images/panel-icons/user-group-light.png" alt="" /> -->
                            <span>{{ $t("panel.side-menu.Manage Staff") }}</span>
                            <Icon
                                class="sub_menu_toggler bg-fgPrimary"
                                :class="{ open: openSubMenus2.has('staff') }"
                                name="arrow.svg"
                                folder="icons"
                                size="12px"
                            />
                        </li>
                    </button>
                    <div
                        class="grid transition-all"
                        :class="{ '-mb-2': !openSubMenus2.has('staff') }"
                        :style="`grid-template-rows: ${openSubMenus2.has('staff') ? 1 : 0}fr;`"
                    >
                        <ul class="sub_menu flex flex-col gap-1 overflow-hidden">
                            <nuxt-link
                                class="link"
                                :to="localePath(`/panel/${panelStore.selectedBrandId}/staff/members`)"
                                v-if="checkPermissions(['main-panel.staff.view'], brand)"
                            >
                                <li class="flex items-center gap-3">
                                    <span>{{ $t("panel.side-menu.Staff Members") }}</span>
                                </li>
                            </nuxt-link>
                            <button
                                class="link"
                                @click="panelStore.openPopUp('sent-invites')"
                                v-if="checkPermissions(['main-panel.staff.view', 'main-panel.staff.invite'], brand, 'AND')"
                            >
                                <li class="flex items-center gap-3">
                                    <span>{{ $t("panel.side-menu.Sent Invites") }}</span>
                                </li>
                            </button>
                            <nuxt-link
                                class="link"
                                :to="localePath(`/panel/${panelStore.selectedBrandId}/staff/roles`)"
                                v-if="checkPermissions(['main-panel.staff.roles'], brand)"
                            >
                                <li class="flex items-center gap-3">
                                    <span>{{ $t("panel.side-menu.Staff Roles") }}</span>
                                </li>
                            </nuxt-link>
                        </ul>
                    </div>
                    <button
                        class="link"
                        :class="{ toggler_active: openSubMenus2.has('settings') }"
                        @click="toggleSubMenu2('settings')"
                        v-if="checkPermissions(['main-panel.settings'], brand)"
                    >
                        <li class="flex items-center gap-3">
                            <Icon class="w-5 h-5 gradient" name="gear.svg" folder="icons/duo" size="20px" />
                            <!-- <Icon class="w-6 h-6 gradient" name="gear-light.svg" folder="icons/light" size="22px" /> -->
                            <!-- <img class="w-5" src="~/assets/images/panel-icons/gear-light.png" alt="" /> -->
                            <span>{{ $t("panel.side-menu.Settings") }}</span>
                            <Icon
                                class="sub_menu_toggler bg-fgPrimary"
                                :class="{ open: openSubMenus2.has('settings') }"
                                name="arrow.svg"
                                folder="icons"
                                size="12px"
                            />
                        </li>
                    </button>
                    <div
                        class="grid transition-all"
                        :class="{ '-mb-2': !openSubMenus2.has('settings') }"
                        :style="`grid-template-rows: ${openSubMenus2.has('settings') ? 1 : 0}fr;`"
                    >
                        <ul class="sub_menu flex flex-col gap-1 overflow-hidden">
                            <nuxt-link class="link" :to="localePath(`/panel/${panelStore.selectedBrandId}/settings`)">
                                <li class="flex items-center gap-3">
                                    <span>{{ $t("panel.side-menu.Brand Settings") }}</span>
                                </li>
                            </nuxt-link>
                            <nuxt-link class="link" :to="localePath(`/panel/${panelStore.selectedBrandId}/settings/languages`)">
                                <li class="flex items-center gap-3">
                                    <span>{{ $t("panel.side-menu.Language Settings") }}</span>
                                </li>
                            </nuxt-link>
                        </ul>
                    </div>
                </ul>
                <hr class="w-full opacity-20 mx-4" />
                <ul class="flex flex-col gap-2 w-full">
                    <nuxt-link
                        class="link"
                        :to="localePath(`/panel/${panelStore.selectedBrandId}/billing`)"
                        v-if="checkPermissions(['main-panel.billing'], brand)"
                    >
                        <li class="flex items-center gap-3">
                            <Icon class="w-5 h-5 gradient" name="money-bills.svg" folder="icons/duo" size="20px" />
                            <!-- <Icon class="w-6 h-6 gradient" name="money-bills.svg" folder="icons/light" size="22px" /> -->
                            <!-- <img class="w-5" src="~/assets/images/panel-icons/money-bills-light.png" alt="" /> -->
                            <span>{{ $t("panel.side-menu.Billing & Plan Upgrade") }}</span>
                        </li>
                    </nuxt-link>
                    <nuxt-link class="link" :to="localePath(`/panel/${panelStore.selectedBrandId}/support`)">
                        <li class="flex items-center gap-3">
                            <Icon class="w-5 h-5 gradient" name="message-question.svg" folder="icons/duo" size="20px" />
                            <!-- <Icon class="w-6 h-6 gradient" name="message-question-light.svg" folder="icons/light" size="22px" /> -->
                            <!-- <img class="w-5" src="~/assets/images/panel-icons/message-question-light.png" alt="" /> -->
                            <span>{{ $t("panel.side-menu.Support") }}</span>
                        </li>
                    </nuxt-link>
                </ul>
            </nav>

            <div class="relative flex flex-col items-center p-2 md:p-4 bg-bgPrimary rounded-xl shadow-inner overflow-hidden shrink-0">
                <span class="absolute end-1/2 -top-20 rotate-12 gradient-re w-24 h-24 rounded-2xl blur-sm opacity-75"></span>
                <span class="absolute end-10 -bottom-20 rotate-12 gradient-re w-24 h-24 rounded-2xl blur-sm opacity-75"></span>
                <span class="absolute -end-4 -bottom-14 -rotate-45 gradient-re w-24 h-24 rounded-2xl"></span>
                <div class="relative flex flex-col items-center justify-between gap-4">
                    <div class="flex items-start gap-2">
                        <img class="w-11 mix-blend-exclusion" src="/pricing/pro-g.png" alt="pro" />
                        <div class="flex flex-col">
                            <h5 class="hidden 2sm:flex gradient-text text-xl font-black whitespace-nowrap">Upgrade To Pro</h5>
                            <small class="hidden 2sm:flex text-xs opacity-60">Remove The Limitations</small>
                        </div>
                    </div>
                    <nuxt-link
                        class="btn flex items-center gap-2 p-1 px-4 hover:px-8 bg-fgPrimary text-bgAccent rounded-xl shadow-xl"
                        :to="localePath('/panel/billing/upgrade')"
                    >
                        <img class="w-8 md:w-10 animate-pulse" src="~/assets/images/icons/sparkles.png" alt="" />
                        <b class="text-xl/none">Go Pro</b>
                    </nuxt-link>
                </div>
            </div>
        </div>
    </aside>
</template>

<script setup>
import { usePanelStore } from "@/stores/panel";
import { useUserStore } from "@/stores/user";

// const { locale } = useI18n();
const localePath = useLocalePath();
const panelStore = usePanelStore();
const userStore = useUserStore();

const brand = computed(() => userStore.brands.list[panelStore.selectedBrandId] || {});

// toggle sub menus open and close state
const openSubMenus = reactive([]);
const openSubMenus2 = ref(new Set());
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
const toggleSubMenu2 = (subMenuName) => {
    openSubMenus2.value.has(subMenuName) ? openSubMenus2.value.delete(subMenuName) : openSubMenus2.value.add(subMenuName);
};
// --------------------------

onMounted(() => {
    const links = nav.value.querySelectorAll("a");
    links.forEach((link) => {
        link.addEventListener("click", () => {
            if (window.innerWidth > 768) return;
            panelStore.sideMenuOpen = false;
        });
    });
});
</script>
