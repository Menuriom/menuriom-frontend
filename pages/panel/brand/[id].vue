<style scoped>

nav ul { scrollbar-width: thin !important; }
nav::-webkit-scrollbar, nav ul::-webkit-scrollbar { width: 4px !important; }

aside li a.router-link-exact-active {
    background-color: theme("colors.neutral.600");
    box-shadow: inset 0px 5px 15px -5px rgba(0, 0, 0, 0.4);
}
</style>

<template>
    <div class="flex flex-col gap-4 md:gap-6 w-full h-full">
        <header class="flex flex-wrap items-center justify-between gap-4">
            <div class="flex flex-col gap-2">
                <div class="flex items-center gap-2">
                    <nuxt-link class="flex justify-center p-2 rounded-md border-2 border-pencil-tip w-10 hover:w-16 transition-all" :to="localePath(`/panel`)">
                        <Icon
                            class="w-5 h-5 bg-dolphin"
                            :class="[localeProperties.dir == 'rtl' ? 'rotate-45' : '-rotate-[135deg]']"
                            name="arrow-angle.svg"
                            folder="icons"
                            size="20px"
                        />
                    </nuxt-link>
                    <img class="w-9" src="~/assets/images/panel-icons/brand.png" alt="" />
                    <h1 class="text-2xl md:text-4xl/tight font-bold">{{ $t("panel.brands.Brand Settings & Info") }}</h1>
                </div>
            </div>
        </header>
        <hr class="w-full border-gray-300 opacity-50" />
        <section class="flex flex-wrap lg:flex-nowrap items-start gap-4 w-full h-full">
            <aside class="flex flex-col gap-4 w-full lg:max-w-xs">
                <div class="flex items-center gap-2 p-2 rounded-lg border bg-white shadow-nr10">
                    <img class="w-14 h-14 object-cover rounded-full border shadow-nr5 flex-shrink-0" :src="brand.logo" v-if="brand.logo" />
                    <img class="w-14 h-14 object-cover rounded-full border shadow-nr5 flex-shrink-0" src="~/assets/images/fake-logo2.svg" v-else />
                    <div class="flex flex-col gap-1 w-full">
                        <h4 class="font-semibold whitespace-nowrap text-ellipsis overflow-hidden w-36">{{ brand.name }}</h4>
                        <span class="text-xs whitespace-nowrap text-ellipsis overflow-hidden w-28 text-violet">{{ brand.role }}</span>
                    </div>
                </div>
                <nav class="flex flex-col w-full p-2 lg:max-w-xs rounded-lg bg-pencil-tip text-white shadow-nr10">
                    <ul class="flex lg:flex-col gap-2 p-2 w-full overflow-auto">
                        <li class="flex items-center text-sm flex-shrink-0">
                            <nuxt-link
                                class="flex items-center gap-2 p-2.5 rounded-md w-full hover:bg-neutral-800"
                                :to="localePath(`/panel/brand/${route.params.id}/general-info`)"
                            >
                                <img class="w-5" src="~/assets/images/panel-icons/pen.png" alt="" />
                                {{ $t("panel.brands.General Info") }}
                                <div class="gradient w-3 h-3 rounded-lg ms-auto"></div>
                            </nuxt-link>
                        </li>
                        <li class="flex items-center text-sm flex-shrink-0">
                            <nuxt-link class="flex items-center gap-2 p-2.5 rounded-md w-full hover:bg-neutral-800" to="">
                                <img class="w-5" src="~/assets/images/panel-icons/money-bills.png" alt="" />
                                Billing & Plan Upgrades
                            </nuxt-link>
                        </li>
                        <li class="flex items-center text-sm flex-shrink-0">
                            <nuxt-link class="flex items-center gap-2 p-2.5 rounded-md w-full hover:bg-neutral-800" to="">
                                <img class="w-5" src="~/assets/images/panel-icons/language.png" alt="" />
                                Language Settings
                            </nuxt-link>
                        </li>
                        <li class="hidden lg:flex items-center text-sm flex-shrink-0">
                            <nuxt-link class="flex items-center gap-2 p-2.5 rounded-md w-full hover:bg-neutral-800" :to="localePath(`/panel`)">
                                <Icon
                                    class="w-4 h-4 py-2 bg-white"
                                    :class="[localeProperties.dir == 'rtl' ? 'rotate-45' : '-rotate-[135deg]']"
                                    name="arrow-angle.svg"
                                    folder="icons"
                                    size="14px"
                                />
                                {{ $t("panel.Go Back") }}
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

definePageMeta({ middleware: ["only-owner-gate"] });

const { localeProperties } = useI18n();
const route = useRoute();
const localePath = useLocalePath();
const userStore = useUserStore();

const brand = computed(() => userStore.brands.list[route.params.id] || {});
</script>
