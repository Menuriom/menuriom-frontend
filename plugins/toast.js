import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(Toast, {
        shareAppContext: true,
        position: "top-center",
        transition: "Vue-Toastification__fade",
        maxToasts: 5,
        closeOnClick: false,
        draggable: true,
        draggablePercent: 0.35,
        showCloseButtonOnHover: true,
        filterBeforeCreate: (toast, toasts) => {
            if (toasts.filter((t) => t.type === toast.type && t.text === toast.text).length !== 0) return false;
            return toast;
        },
    });
});
