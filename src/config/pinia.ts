import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const piniaPlugin = createPinia();
piniaPlugin.use(piniaPluginPersistedstate);

export default piniaPlugin;