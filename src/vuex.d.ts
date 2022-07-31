// vuex.d.ts
import { Store } from "vuex";

import { State } from "./types";

declare module "vue" {
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
