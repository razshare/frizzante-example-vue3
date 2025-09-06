import { createApp } from "vue"
import App from "./app.client.vue"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
target().innerHTML = ""
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
createApp(App, data()).mount(target())
