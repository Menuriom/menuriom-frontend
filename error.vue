<template>
    <div class="flex flex-col items-center justify-center gap-4 w-full h-screen text-fgPrimary">
        <h1>Dang it Ricky!</h1>
        <h2 class="text-6xl font-bold">{{ error.statusCode }}</h2>
        <p class="text-rose-400">
            <strong>{{ error.message }}</strong>
        </p>
        <small class="opacity-75">It looks like something broke.</small>
        <button class="btn rounded-xl border-2 border-bgSecondary hover:border-primary p-3 hover:px-6 mt-6" type="button" title="go back" @click="back()">
            Let's go back
        </button>
    </div>
</template>

<script setup>
const error = useError();
const router = useRouter();

const back = () => router.back();
</script>
