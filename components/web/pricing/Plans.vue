<style scoped></style>

<template>
    <div class="flex flex-col items-center gap-10 w-full p-8">
        <div class="relative flex items-center gap-10 p-3 px-5 rounded-md bg-neutral-200">
            <span class="absolute h-8 shadow-md bg-white rounded transition-all" :class="[priceType == 'monthly' ? 'left-2 w-22' : 'left-28 w-36']"></span>
            <span class="relative cursor-pointer" @click="togglePriceType('monthly')">Monthly</span>
            <div class="relative flex items-center gap-1 cursor-pointer" @click="togglePriceType('annual')">
                <span>Annual</span>
                <small class="f-inter p-0.5 px-2 rounded-full text-xs bg-pencil-tip text-purple-200">{{ annualOffPercent }}% Off</small>
            </div>
        </div>
        <ul class="flex flex-wrap justify-center gap-12 w-full max-w-screen-xl mt-12">
            <li
                class="flex flex-col gap-2 rounded-2xl shadow-xl"
                :class="[item.highlight ? 'gradient-re p-3 md:-mt-12' : 'bg-pencil-tip']"
                v-for="(item, i) in pricing.list"
                :key="i"
            >
                <span class="f-inter text-lg mx-auto text-white drop-shadow-md" v-if="item.highlight">Most Popular</span>
                <div class="flex flex-col gap-4 w-full max-w-xs h-full p-6 rounded-xl bg-pencil-tip text-white">
                    <!-- TODO: calculate prices base on priceType -->
                    <div class="flex items-center gap-2">
                        <img class="w-10" :src="item.icon" :alt="item.title" />
                        <h3 class="f-inter text-lg font-bold">{{ item.title }}</h3>
                    </div>
                    <p class="text-xs text-white opacity-90">{{ item.desc }}</p>
                    <div class="flex items-baseline gap-1" v-if="item.monthlyPrice > 0">
                        <b class="f-inter text-4xl">{{ item.monthlyPrice / 1000 }}<span class="text-xs">,000</span></b>
                        <b class="f-inter text-baby-blue">Toman</b>
                        <small class="">/ {{ priceType == "monthly" ? "month" : "year" }}</small>
                    </div>
                    <b class="f-inter text-3xl text-baby-blue" v-else>Free</b>
                    <hr class="border-2 border-gray-400 opacity-25" />
                    <ul class="flex flex-col gap-4 flex-grow">
                        <li class="flex items-center gap-2" v-if="i > 0">
                            <Icon class="relative w-4 h-4 bg-baby-blue" name="plus.svg" folder="icons" size="16px" />
                            <small class="opacity-90 text-sky-200">Everything on previous plan</small>
                        </li>
                        <li class="flex items-center gap-2" v-for="(feature, j) in item.features" :key="j">
                            <Icon class="relative w-4 h-4 bg-baby-blue" name="check.svg" folder="icons" size="16px" />
                            <small class="opacity-90">{{ feature }}</small>
                        </li>
                    </ul>
                    <a
                        class="flex items-center justify-center w-full p-3 mt-4 text-white rounded hover:translate-y-1 transition-transform"
                        :class="[item.highlight ? 'gradient-re' : 'bg-violet']"
                        href="#"
                    >
                        Get Started
                    </a>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup>
import Icon from "~/components/Icon.vue";

const priceType = ref("monthly");
const annualOffPercent = ref(10);

const pricing = reactive({
    list: [
        {
            highlight: false,
            icon: "/pricing/basic.webp",
            title: "Basic",
            desc: "For individuals or small restaurants and small coffee shops",
            monthlyPrice: 0,
            features: [
                "Unlimited QR scans",
                "Fully customizable",
                "Unlimited Category and menu items",
                "Menu item like option",
                "Brand logo and name in the menu",
                "Multiple language option",
                "Ticketing and support system",
            ],
        },
        {
            highlight: true,
            icon: "/pricing/standard.webp",
            title: "Standard",
            desc: "For businesses and restaurants with more than one branch",
            monthlyPrice: 50000,
            features: [
                "Multiple menu templates",
                "Create up to 3 branches",
                "Customizable QR code",
                "Restaurant info at bottom of menu",
                "Analytics for scans and reviews",
                "Item highlight and sold out options",
            ],
        },
        {
            highlight: false,
            icon: "/pricing/pro.webp",
            title: "Pro",
            desc: "For businesses that need more than a digital menu",
            monthlyPrice: 100000,
            features: [
                "Unlimited branches",
                "Ordering system",
                "Server call button in the menu",
                "Restaurant logo in the QR code",
                "Menu item coupling",
                "Discount tags on menu items",
                "Customizable category logos",
                "Customer review option",
            ],
        },
    ],
});

const togglePriceType = (type) => {
    priceType.value = type;
};
</script>
