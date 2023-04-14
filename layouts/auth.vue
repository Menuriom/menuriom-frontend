<style scoped></style>

<template>
    <div class="relative flex flex-col items-center justify-center w-screen min-h-screen bg-neutral-800 overflow-hidden" id="app">
        <Html :lang="localHead.htmlAttrs.lang" :dir="localHead.htmlAttrs.dir">
            <NuxtLoadingIndicator />
            <Blob class="absolute left-1/4 top-16" width="300px" height="300px" />
            <Blob class="absolute right-1/4 bottom-40" width="300px" height="300px" />
            <main class="relative flex items-center justify-center w-full">
                <slot />
            </main>
        </Html>
    </div>
</template>

<script setup>
import Blob from "~/components/web/Blob.vue";

// const { t } = useI18n();
const localHead = useLocaleHead({ addDirAttribute: true, identifierAttribute: "id", addSeoAttributes: true });

useHead({
    // title: t("layouts.title"),
    link: [...localHead.value.link],
    meta: [...localHead.value.meta],
});
</script>
