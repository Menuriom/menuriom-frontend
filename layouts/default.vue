<style scoped></style>

<template>
    <div class="flex flex-col items-center w-screen bg-white overflow-clip" id="app">
        <Html :lang="localHead.htmlAttrs.lang" :dir="localHead.htmlAttrs.dir">
            <NuxtLoadingIndicator />
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

// const { t } = useI18n();
const localHead = useLocaleHead({ addDirAttribute: true, identifierAttribute: "id", addSeoAttributes: true });
const userState = useUserStore();

useHead({
    // title: t("layouts.title"),
    link: [...localHead.value.link],
    meta: [...localHead.value.meta],
});

onMounted(async () => {
    await userState.getUserInfo().then(() => {
        userState.setRefreshInterval();
    });
});
</script>
