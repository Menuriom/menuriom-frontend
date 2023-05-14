<style scoped></style>

<template>
    <div>
        <!-- user active session with ability to revoke them -->
    </div>
</template>

<script setup>
const { t } = useI18n();

useHead({ title: computed(() => t("panel.account.Invitations List")) });
definePageMeta({ title: "panel.account.Invitations List", icon: "/_nuxt/assets/images/panel-icons/envelope-open-text-dark.png" });
</script>
