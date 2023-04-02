<style scoped></style>

<template>
    <section class="relative flex flex-col items-center gap-10 w-full p-8" title="Faqs">
        <Blob class="absolute right-28 -top-16" :class="[blobPosition == 'right' ? 'right-28' : 'left-28']" />
        <div class="relative flex flex-col items-center gap-2">
            <img class="w-16 mb-4" src="~/assets/images/icons/q&a.png" alt="Q&A" />
            <h2 class="f-inter text-2xl font-bold">Frequently Asked Questions.</h2>
        </div>
        <ul class="relative flex flex-col items-center gap-6 w-full max-w-screen-lg text-white">
            <li class="flex flex-col gap-4 p-6 w-full rounded-md bg-pencil-tip shadow-nr25" v-for="(item, i) in faqs.list" :key="i" @click="toggleQuestion(i)">
                <div class="flex flex-wrap items-center justify-between gap-4">
                    <strong class="f-inter text-xl">{{ item.q }}</strong>
                    <Icon
                        class="relative w-5 h-5 bg-baby-blue transition-transform"
                        :class="[item.opened ? 'rotate-45' : '']"
                        name="plus.svg"
                        folder="icons"
                        size="20px"
                    />
                </div>
                <div class="flex flex-col gap-4 w-full" v-show="item.opened">
                    <hr class="gradient-re border-0 h-0.5 w-full opacity-70" />
                    <p class="text-sm opacity-90 font-extralight">{{ item.a }}</p>
                </div>
            </li>
        </ul>
    </section>
</template>

<script setup>
import Icon from "~/components/Icon.vue";
import Blob from "~/components/web/Blob.vue";

defineProps({
    blobPosition: { type: String, default: "right" },
});

const faqs = reactive({
    list: [
        {
            q: "How does the pricing work?",
            a: "You can change your subscription recurrence from monthly to yearly in your account settings. You’ll be billed for the yearly price when your current billing period ends.",
            opened: true,
        },
        {
            q: "What if I don’t want use the system anymore?",
            a: "You can change your subscription recurrence from monthly to yearly in your account settings. You’ll be billed for the yearly price when your current billing period ends.",
            opened: false,
        },
        {
            q: "Can I change my plan at anytime?",
            a: "You can change your subscription recurrence from monthly to yearly in your account settings. You’ll be billed for the yearly price when your current billing period ends.",
            opened: false,
        },
    ],
});

const toggleQuestion = (index) => {
    faqs.list[index].opened = !faqs.list[index].opened;
};
</script>
