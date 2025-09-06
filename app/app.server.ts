import { renderToString } from "vue/server-renderer"
import { createSSRApp } from "vue"
import App from "./app.server.vue"
export async function render(props: Record<string, unknown>) {
    const app = createSSRApp(App, props)
    // passing SSR context object which will be available via useSSRContext()
    // @vitejs/plugin-vue injects code into a component's setup() that registers
    // itself on ctx.modules. After the render, ctx.modules would contain all the
    // components that have been instantiated during this render call.
    const ctx = {}
    return {
        body: await renderToString(app, ctx),
    }
}
