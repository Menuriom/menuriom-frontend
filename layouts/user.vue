<style scoped></style>

<template>
    <div></div>
</template>

<script setup>
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const userState = useUserStore();
const user = storeToRefs(userState);

onMounted(async () => {
    if (user.name.value === "" || user.family.value === "") await userState.getUserInfo();
    userState.setRefreshInterval();
});
</script>
