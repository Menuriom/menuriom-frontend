<style scoped>
aside li a.router-link-active {
    background-color: theme("colors.neutral.600");
    box-shadow: inset 0px 5px 15px -5px rgba(0, 0, 0, 0.4);
}
</style>

<template>
    <div class="flex flex-col gap-4 md:gap-6 w-full">
        <header class="flex flex-wrap items-center justify-between gap-4">
            <div class="flex flex-col gap-2">
                <div class="flex items-center gap-2">
                    <img class="w-9" src="~/assets/images/panel-icons/brand.png" alt="" />
                    <h1 class="text-4xl/none font-bold">{{ $t("panel.brands.Brand Settings & Info") }}</h1>
                </div>
            </div>
        </header>
        <hr class="w-full border-gray-300 opacity-50" />
        <section class="flex flex-wrap lg:flex-nowrap items-start justify-center gap-4 w-full">
            <aside class="flex w-full lg:max-w-xs rounded-lg bg-pencil-tip text-white shadow-nr10">
                <ul class="flex lg:flex-col gap-4 p-4 w-full overflow-auto">
                    <li class="flex items-center text-sm flex-shrink-0">
                        <nuxt-link
                            class="flex items-center gap-2 p-2 rounded-md w-full hover:bg-neutral-800"
                            :to="localePath(`/panel/brand/${route.params.id}/general-info`)"
                        >
                            <Icon class="w-4 h-4 bg-white" name="pen-to-square.svg" folder="icons/light" size="16px" />
                            {{ $t("panel.brands.General Info") }}
                            <div class="gradient w-3 h-3 rounded-lg ms-auto"></div>
                        </nuxt-link>
                    </li>
                    <li class="flex items-center text-sm flex-shrink-0">
                        <nuxt-link class="flex items-center gap-2 p-2 rounded-md w-full hover:bg-neutral-800" to="">
                            <Icon class="w-4 h-4 bg-white" name="pen-to-square.svg" folder="icons/light" size="16px" />
                            Billing & Plan Upgrades
                        </nuxt-link>
                    </li>
                    <li class="flex items-center text-sm flex-shrink-0">
                        <nuxt-link class="flex items-center gap-2 p-2 rounded-md w-full hover:bg-neutral-800" to="">
                            <Icon class="w-4 h-4 bg-white" name="pen-to-square.svg" folder="icons/light" size="16px" />
                            Language Settings
                        </nuxt-link>
                    </li>
                </ul>
            </aside>
            <NuxtPage />
        </section>
    </div>
</template>

<script setup>
definePageMeta({ middleware: ["only-owner-gate"] });

const route = useRoute();
const localePath = useLocalePath();
</script>
