<style scoped>
nav ul {
    scrollbar-width: thin !important;
}
nav::-webkit-scrollbar,
nav ul::-webkit-scrollbar {
    width: 4px !important;
}

aside li a.router-link-exact-active {
    background-color: theme("colors.neutral.600");
    box-shadow: 0px 5px 15px -5px rgba(0, 0, 0, 0.3);
}
</style>

<template>
    <div class="flex flex-col gap-4 md:gap-6 w-full h-full">
        <header class="flex flex-wrap items-center gap-4">
            <nuxt-link
                class="btn flex items-center justify-center p-3 hover:px-6 rounded-xl border-2 border-fgPrimary border-opacity-40"
                :to="localePath(`/panel`)"
            >
                <Icon
                    class="w-4 h-4 bg-fgPrimary"
                    :class="[localeProperties.dir == 'rtl' ? 'rotate-45' : '-rotate-[135deg]']"
                    name="arrow-angle.svg"
                    folder="icons"
                    size="16px"
                />
            </nuxt-link>
            <div class="flex items-center gap-2">
                <img class="w-16 h-16 rounded-full object-cover shadow-nr25" :src="userStore.avatar" alt="" />
                <div class="flex flex-col gap-1">
                    <h4 class="text-lg md:text-2xl/none font-bold">{{ `${userStore.name} ${userStore.family}` }}</h4>
                    <span class="text-sm md:text-base opacity-70">{{ userStore.email }}</span>
                </div>
            </div>
        </header>
        <hr class="w-full border-fgPrimary opacity-20" />
        <section class="flex flex-wrap lg:flex-nowrap items-start gap-4 w-full h-full">
            <aside class="flex flex-col gap-4 w-full lg:max-w-screen-2xs">
                <nav class="flex flex-col w-full p-2 rounded-2xl bg-pencil-tip text-white shadow-nr10">
                    <ul class="flex lg:flex-col gap-2 p-2 w-full overflow-auto">
                        <li class="flex items-center text-sm shrink-0">
                            <nuxt-link class="flex items-center gap-2 p-2.5 rounded-xl w-full hover:bg-neutral-800" :to="localePath(`/panel/account/profile`)">
                                <Icon class="w-5 h-5 gradient" name="user-edit.svg" folder="icons/duo" size="20px" />
                                {{ $t("panel.account.Profile") }}
                            </nuxt-link>
                        </li>
                        <li class="flex items-center text-sm shrink-0">
                            <nuxt-link
                                class="flex items-center gap-2 p-2.5 rounded-xl w-full hover:bg-neutral-800"
                                :to="localePath(`/panel/account/invite-list`)"
                            >
                                <Icon class="w-5 h-5 gradient" name="envelope-open-text.svg" folder="icons/duo" size="20px" />
                                {{ $t("panel.account.Invitations List") }}
                            </nuxt-link>
                        </li>
                        <hr class="my-2 opacity-30" />
                        <li class="flex items-center text-sm shrink-0">
                            <nuxt-link
                                class="flex items-center gap-2 p-2.5 rounded-xl w-full hover:bg-neutral-800"
                                :to="localePath(`/panel/account/notification-settings`)"
                            >
                                <Icon class="w-5 h-5 gradient" name="cowbell.svg" folder="icons/duo" size="20px" />
                                {{ $t("panel.account.Notification Settings") }}
                            </nuxt-link>
                        </li>
                        <li class="flex items-center text-sm shrink-0">
                            <nuxt-link
                                class="flex items-center gap-2 p-2.5 rounded-xl w-full hover:bg-neutral-800"
                                :to="localePath(`/panel/account/transactions`)"
                            >
                                <Icon class="w-5 h-5 gradient" name="money-bill-transfer.svg" folder="icons/duo" size="20px" />
                                {{ $t("panel.account.Transactions") }}
                            </nuxt-link>
                        </li>
                        <li class="flex items-center text-sm shrink-0">
                            <nuxt-link class="flex items-center gap-2 p-2.5 rounded-xl w-full hover:bg-neutral-800" :to="localePath(`/panel/account/sessions`)">
                                <Icon class="w-5 h-5 gradient" name="laptop-mobile.svg" folder="icons/duo" size="20px" />
                                {{ $t("panel.account.Sessions") }}
                            </nuxt-link>
                        </li>
                    </ul>
                </nav>
            </aside>
            <div class="flex items-start w-full h-full border-bgSecondary border-t-2 lg:border-t-0 lg:border-s-2 pt-4 lg:pt-0 lg:ps-4">
                <NuxtPage />
            </div>
        </section>
    </div>
</template>

<script setup>
import { useUserStore } from "@/stores/user";

const { localeProperties } = useI18n();
const route = useRoute();
const localePath = useLocalePath();
const userStore = useUserStore();
</script>
