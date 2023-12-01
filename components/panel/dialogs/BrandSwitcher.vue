<style scoped></style>

<template>
    <Dialog name="brand-switcher" :title="$t('panel.side-menu.Switch Brand')" :desc="$t('panel.side-menu.Switch between your restaurant brands')">
        <div class="flex flex-col gap-3">
            <hr class="w-full border-0 h-0.5 gradient" />
            <ul class="flex flex-col gap-3 w-full max-h-96 overflow-auto">
                <div
                    class="cursor-pointer rounded-xl"
                    v-for="(brand, i) in brands.list"
                    :key="i"
                    :class="{ 'gradient-re p-1': i == panelStore.selectedBrandId }"
                >
                    <li
                        class="flex items-center gap-2 w-full rounded-lg bg-dolphin hover:bg-neutral-600 text-white"
                        :class="[i == panelStore.selectedBrandId ? 'p-2' : 'p-3']"
                        @click="selectBrand(i)"
                    >
                        <img class="w-12 h-12 rounded-full object-cover shadow-nr15 shrink-0" :src="brand.logo" v-if="brand.logo" />
                        <img class="w-12 h-12 rounded-full object-cover shadow-nr15 shrink-0" src="~/assets/images/fake-logo2.svg" v-else />
                        <div class="flex flex-col flex-grow">
                            <h4 class="font-bold whitespace-nowrap text-ellipsis overflow-hidden w-44">{{ brand.name }}</h4>
                            <small class="text-xs whitespace-nowrap text-ellipsis overflow-hidden w-44 text-purple-300"> {{ brand.role }} </small>
                        </div>
                        <span
                            class="flex items-center justify-center w-4 h-4 border-2 border-baby-blue rounded-full shrink-0"
                            :class="{ 'bg-baby-blue': i == panelStore.selectedBrandId }"
                        >
                            <Icon class="w-4 h-4 bg-dolphin" name="Check.svg" folder="icons/basil" size="16px" v-if="i == panelStore.selectedBrandId" />
                        </span>
                    </li>
                </div>
            </ul>
            <hr class="w-full opacity-20" />
            <nuxt-link
                class="btn flex items-center justify-center gap-2 p-2.5 rounded-lg text-sm border-2 border-white"
                :to="localePath('/panel/brands')"
                @click="panelStore.closePopUp()"
            >
                <Icon class="w-4 h-4 bg-white" name="cog.svg" folder="icons" size="16px" />
                {{ $t("panel.side-menu.Go To Brand Manager") }}
            </nuxt-link>
        </div>
    </Dialog>
</template>

<script setup>
import Dialog from "~/components/panel/Dialog.vue";
import { usePanelStore } from "@/stores/panel";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const localePath = useLocalePath();
const panelStore = usePanelStore();
const userStore = useUserStore();
const { brands } = storeToRefs(userStore);

const selectBrand = (index) => {
    panelStore.setSelectedBrand(index);
    panelStore.closePopUp();
    // brands.value.list[index]
};
</script>
