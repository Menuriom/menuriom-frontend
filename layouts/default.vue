<style scoped>
#app {
    width: 100vw;
}
@media (min-width: 768px) {
    #app {
        width: calc(100vw - 10px);
    }
}
</style>

<template>
    <div class="flex flex-col items-center bg-neutral-900 text-fgPrimary overflow-clip" id="app">
        <Html :lang="localHead.htmlAttrs.lang" :dir="localHead.htmlAttrs.dir">
            <NuxtLoadingIndicator color="repeating-linear-gradient(to right, #9f74cd 0%, #7ecfe1 100%)" />
            <Header />
            <main class="w-full mt-18 md:mt-24">
                <slot />
            </main>
            <Footer class="mt-64 lg:mt-80" />
        </Html>
    </div>
</template>

<script setup>
import Header from "~/components/web/Header.vue";
import Footer from "~/components/web/Footer.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const localHead = useLocaleHead({ addDirAttribute: true, identifierAttribute: "id", addSeoAttributes: true });
const userStore = useUserStore();
const i18n_redirected = useCookie("i18n_redirected");
i18n_redirected.value = "fa";

useHead({
    // title: t("layouts.title"),
    link: [...localHead.value.link],
    meta: [...localHead.value.meta],
});

await userStore.getUserInfo().catch((e) => {});
onMounted(() => {
    if (!userStore.isIntervalSet) userStore.setRefreshInterval();
});
</script>
