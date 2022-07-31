import { test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import App from "./src/components/App.vue";
import router from "../router";
import store from "../store/index";

test("App component mounts", async () => {
  expect(App).toBeTruthy();

  const wrapper = mount(App, {
    global: {
      plugins: [store, router],
    },
  });

  expect(wrapper.text()).toContain("This website created with Malar Zhapaj by");
});
