<style scoped></style>

<template>
    <div class="relative flex flex-col items-center justify-center w-screen min-h-screen bg-bgPrimary text-fgPrimary overflow-hidden" id="app">
        <Html :lang="localHead.htmlAttrs.lang" :dir="localHead.htmlAttrs.dir">
            <NuxtLoadingIndicator />
            <main class="relative flex items-center justify-center w-full">
                <slot />
            </main>
        </Html>
    </div>
</template>

<script setup>

// const { t } = useI18n();
const localHead = useLocaleHead({ addDirAttribute: true, identifierAttribute: "id", addSeoAttributes: true });

useHead({
    // title: t("layouts.title"),
    link: [...localHead.value.link],
    meta: [...localHead.value.meta],
});
</script>
