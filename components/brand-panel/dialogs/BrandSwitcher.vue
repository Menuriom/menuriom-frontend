<style scoped></style>

<template>
    <Dialog name="brand-switcher" :title="$t('brand-panel.side-menu.Switch Brand')" :desc="$t('brand-panel.side-menu.Switch between your restaurant brands')">
        <div class="flex flex-col gap-3">
            <hr class="w-full border-0 h-0.5 gradient" />
            <ul class="flex flex-col gap-3 w-full">
                <div class="cursor-pointer rounded-xl" v-for="(brand, i) in brands.list" :key="i" :class="{ 'gradient-re p-1': brand.selected }">
                    <li
                        class="flex gap-2 w-full rounded-lg bg-white hover:bg-zinc-100 text-pencil-tip"
                        :class="[brand.selected ? 'p-2' : 'p-3']"
                        @click="selectBrand(i)"
                    >
                        <img class="w-12 flex-shrink-0" src="~/assets/images/fake-logo2.svg" alt="" />
                        <div class="flex flex-col gap-1 flex-grow">
                            <h4 class="font-bold whitespace-nowrap text-ellipsis">{{ brand.name }}</h4>
                            <small
                                class="w-max text-xs p-0.5 px-2 rounded-md opacity-80"
                                :class="[brand.role == 'Owner' ? 'gradient text-black' : 'bg-violet text-white']"
                            >
                                {{ brand.role }}
                            </small>
                        </div>
                        <span
                            class="flex items-center justify-center w-4 h-4 border-2 border-baby-blue rounded-full flex-shrink-0"
                            :class="{ 'bg-baby-blue': brand.selected }"
                        >
                            <Icon class="w-4 h-4 bg-white" name="Check.svg" folder="icons/basil" size="16px" />
                        </span>
                    </li>
                </div>
            </ul>
            <hr class="w-full opacity-40" />
            <nuxt-link
                class="btn flex items-center justify-center gap-2 p-2.5 rounded-lg text-sm border-2 border-white"
                :to="localePath('/brand-panel/brands')"
                @click="panelStore.closePopUp()"
            >
                <Icon class="w-4 h-4 bg-white" name="cog.svg" folder="icons" size="16px" />
                {{ $t("brand-panel.side-menu.Go To Brand Manager") }}
            </nuxt-link>
        </div>
    </Dialog>
</template>

<script setup>
import Dialog from "~/components/brand-panel/Dialog.vue";
import { usePanelStore } from "@/stores/panel";

const localePath = useLocalePath();
const panelStore = usePanelStore();

const brands = reactive({
    list: [
        { logo: "", name: "Your Brand Name", role: "Owner", selected: true },
        { logo: "", name: "Your Brand Name", role: "Waiter", selected: false },
        { logo: "", name: "Your Brand Name", role: "Manager", selected: false },
    ],
});

const selectBrand = (index) => {
    brands.list.forEach((brand) => (brand.selected = false));
    brands.list[index].selected = true;
};
</script>
