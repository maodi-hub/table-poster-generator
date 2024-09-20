import { createApp } from 'vue'
import "./assets/font/font.css"
import 'element-plus/dist/index.css'
import App from './App.vue'

import PiniaPlugin from "@/config/pinia";

createApp(App).use(PiniaPlugin).mount('#app');
