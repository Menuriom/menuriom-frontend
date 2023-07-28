<style scoped></style>

<template>
    <div>
        <!-- this is for all transaction that this user made, no matter its status -->
    </div>
</template>

<script setup>
const { t } = useI18n();

// useHead({ title: computed(() => t("panel.account.Invitations List")) });
useHead({ title: `${t("panel.account.Invitations List")}` });
definePageMeta({ title: "panel.account.Invitations List", icon: "/_nuxt/assets/images/panel-icons/envelope-open-text-dark.png" });
</script>
