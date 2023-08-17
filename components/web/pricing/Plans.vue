<style scoped></style>

<template>
    <div class="flex flex-col items-center gap-10 w-full p-2 sm:p-4 md:p-8">
        <div class="relative flex items-center gap-6 p-4 rounded-2xl bg-bgAccent isolate">
            <span
                class="absolute w-36 h-10 shadow-md bg-bgSecondary rounded-xl transition-all -z-10"
                :class="[priceType == 'monthly' ? 'start-2' : 'start-40']"
            ></span>
            <span class="flex items-center justify-center gap-1 w-32 cursor-pointer" @click="togglePriceType('monthly')">{{ $t("pricing.Monthly") }}</span>
            <div class="flex items-center justify-center gap-1 w-32 cursor-pointer" @click="togglePriceType('annual')">
                <span>{{ $t("pricing.Annual") }}</span>
                <small class="f-inter p-0.5 px-2 rounded-full text-xs bg-black text-secondary"> {{ annualOffPercent }}% Off </small>
            </div>
        </div>
        <ul class="flex flex-wrap items-center justify-center gap-12 w-full max-w-screen-xl">
            <li
                class="flex flex-col gap-2 rounded-4xl shadow-mr35"
                :class="[item.highlight ? 'gradient-re p-3' : 'bg-fgPrimary']"
                v-for="(item, i) in pricing.list"
                :key="i"
            >
                <div class="flex flex-col gap-6 w-full max-w-sm h-full p-6 md:p-8 rounded-3xl bg-fgPrimary text-bgPrimary">
                    <!-- TODO: calculate prices base on priceType -->
                    <div class="flex items-center gap-2">
                        <img class="w-12 p-2 rounded-xl bg-bgSecondary bg-opacity-10" :src="item.icon" :alt="item.title" />
                        <h3 class="f-inter text-2xl font-bold">{{ item.title }}</h3>
                    </div>
                    <p class="text-sm">{{ item.desc }}</p>
                    <div class="flex items-baseline gap-1 text-pencil-tip rounded-lg" v-if="item.monthlyPrice > 0">
                        <b class="f-inter text-4xl font-extrabold gradient-text">{{ item.monthlyPrice / 1000 }}<span class="text-lg">,000</span></b>
                        <b class="f-inter">{{ $t("pricing.Toman") }}</b>
                        <small class="">/ {{ priceType == "monthly" ? $t("pricing.Monthly") : $t("pricing.Annual") }}</small>
                    </div>
                    <div class="flex items-baseline gap-1 text-pencil-tip rounded-lg" v-else>
                        <b class="f-inter text-3xl font-extrabold gradient-text rounded-lg"> {{ $t("pricing.Free") }} </b>
                        <small class="">/ {{ $t("pricing.Always") }}</small>
                    </div>
                    <hr class="border-spacing-0.5 border-bgPrimary opacity-10" />
                    <ul class="flex flex-col gap-4 flex-grow">
                        <li class="flex items-center gap-2" v-if="i > 0">
                            <Icon class="relative w-4 h-4 bg-primary" name="plus.svg" folder="icons" size="14px" />
                            <small class="opacity-90 text-primary">{{ $t("pricing.Everything on previous plan") }}</small>
                        </li>
                        <li class="flex items-center gap-2" v-for="(feature, j) in item.features" :key="j">
                            <Icon class="relative w-4 h-4 bg-secondary" name="check.svg" folder="icons" size="16px" />
                            <small class="opacity-90">{{ feature }}</small>
                        </li>
                    </ul>
                    <a
                        class="flex items-center justify-center w-full p-4 mt-4 bg-bgAccent text-fgPrimary rounded-xl hover:translate-y-1 transition-transform"
                        href="#"
                    >
                        {{ $t("pricing.Get Started") }}
                    </a>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup>
import Icon from "~/components/Icon.vue";

const { locale } = useI18n();

const priceType = ref("monthly");
const annualOffPercent = ref(10);

const pricing = reactive({
    list: [
        {
            highlight: false,
            icon: "/pricing/basic-g.png",
            title: "Basic",
            desc: "For individuals or small restaurants and small coffee shops",
            monthlyPrice: 0,
            features: [
                "Unlimited QR scans",
                "Fully customizable",
                "Unlimited Category and menu items",
                "Brand logo and name in the menu",
                "Multiple language option",
                "Ticketing and support system",
            ],
        },
        {
            highlight: true,
            icon: "/pricing/standard-g.png",
            title: "Standard",
            desc: "For businesses and restaurants with more than one branch",
            monthlyPrice: 50000,
            features: [
                "Multiple menu templates",
                "Create up to 3 branches",
                "Customizable QR code",
                "Restaurant info at bottom of menu",
                "Menu item like option",
                "Analytics for scans and reviews",
                "Item highlight and sold out options",
            ],
        },
        {
            highlight: false,
            icon: "/pricing/pro-g.png",
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
