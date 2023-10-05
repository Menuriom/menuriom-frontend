<style scoped></style>

<template>
    <section class="flex flex-col items-start gap-4 w-full h-full rounded-lg">
        <h2 class="flex items-center gap-2 text-2xl font-bold">
            <Icon class="w-6 h-6 gradient" name="user-edit.svg" folder="icons/duo" size="24px" />
            {{ $t("panel.account.Profile") }}
        </h2>
        
    </section>
</template>

<script setup>
const { t } = useI18n();

// useHead({ title: computed(() => t("panel.account.Invitations List")) });
useHead({ title: t("panel.account.Invitations List") });
definePageMeta({ title: "panel.account.Invitations List", icon: "/_nuxt/assets/images/panel-icons/envelope-open-text-dark.png" });
</script>
