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
            <nuxt-link class="flex justify-center p-2 rounded-md border-2 border-pencil-tip w-10 hover:w-16 transition-all" :to="localePath(`/panel`)">
                <Icon
                    class="w-5 h-5 bg-dolphin"
                    :class="[localeProperties.dir == 'rtl' ? 'rotate-45' : '-rotate-[135deg]']"
                    name="arrow-angle.svg"
                    folder="icons"
                    size="20px"
                />
            </nuxt-link>
            <div class="flex items-center gap-2">
                <img class="w-16 h-16 rounded-full object-cover bg-zinc-600 shadow-nr25" :src="userStore.avatar" alt="" />
                <div class="flex flex-col gap-1">
                    <h4 class="text-lg md:text-2xl/none font-bold">{{ `${userStore.name} ${userStore.family}` }}</h4>
                    <span class="text-sm md:text-base">{{ userStore.email }}</span>
                </div>
            </div>
        </header>
        <hr class="w-full border-gray-300 opacity-50" />
        <section class="flex flex-wrap lg:flex-nowrap items-start gap-4 w-full h-full">
            <aside class="flex flex-col gap-4 w-full lg:max-w-xs">
                <nav class="flex flex-col w-full p-2 lg:max-w-xs rounded-lg bg-pencil-tip text-white shadow-nr10">
                    <ul class="flex lg:flex-col gap-2 p-2 w-full overflow-auto">
                        <li class="flex items-center text-sm shrink-0">
                            <nuxt-link class="flex items-center gap-2 p-2.5 rounded-md w-full hover:bg-neutral-800" :to="localePath(`/panel/account/profile`)">
                                <img class="w-5" src="~/assets/images/panel-icons/user-edit.png" alt="" />
                                {{ $t("panel.account.Profile") }}
                            </nuxt-link>
                        </li>
                        <li class="flex items-center text-sm shrink-0">
                            <nuxt-link
                                class="flex items-center gap-2 p-2.5 rounded-md w-full hover:bg-neutral-800"
                                :to="localePath(`/panel/account/invite-list`)"
                            >
                                <img class="w-5" src="~/assets/images/panel-icons/envelope-open-text-light.png" alt="" />
                                {{ $t("panel.account.Invitations List") }}
                            </nuxt-link>
                        </li>
                        <hr class="my-2 opacity-30" />
                        <li class="flex items-center text-sm shrink-0">
                            <nuxt-link
                                class="flex items-center gap-2 p-2.5 rounded-md w-full hover:bg-neutral-800"
                                :to="localePath(`/panel/account/notification-settings`)"
                            >
                                <img class="w-5" src="~/assets/images/panel-icons/cowbell.png" alt="" />
                                {{ $t("panel.account.Notification Settings") }}
                            </nuxt-link>
                        </li>
                        <li class="flex items-center text-sm shrink-0">
                            <nuxt-link
                                class="flex items-center gap-2 p-2.5 rounded-md w-full hover:bg-neutral-800"
                                :to="localePath(`/panel/account/transactions`)"
                            >
                                <img class="w-5" src="~/assets/images/panel-icons/money-bill-transfer.png" alt="" />
                                {{ $t("panel.account.Transactions") }}
                            </nuxt-link>
                        </li>
                        <li class="flex items-center text-sm shrink-0">
                            <nuxt-link class="flex items-center gap-2 p-2.5 rounded-md w-full hover:bg-neutral-800" :to="localePath(`/panel/account/sessions`)">
                                <img class="w-5" src="~/assets/images/panel-icons/laptop-mobile.png" alt="" />
                                {{ $t("panel.account.Sessions") }}
                            </nuxt-link>
                        </li>
                    </ul>
                </nav>
            </aside>
            <div class="flex items-start w-full h-full border-t-2 lg:border-t-0 lg:border-s-2 pt-4 lg:pt-0 lg:ps-4">
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
