import { useMainStore } from "~/stores/main";

export default defineNuxtPlugin(({ $pinia }) => {
  return {
    provide: {
      store: useMainStore($pinia),
    },
  };
});
