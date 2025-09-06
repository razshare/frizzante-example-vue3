import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

const IS_DEV = (process.env.DEV ?? "0") === "1"

let sourcemap: "inline" | boolean = false
if (IS_DEV) {
    sourcemap = "inline"
}

// https://vite.dev/config/
export default defineConfig({
    define: {
        __VUE_OPTIONS_API__: "true",
        __VUE_PROD_DEVTOOLS__: "false",
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: "false",
    },
    plugins: [vue()],
    resolve: {
        alias: {
            $lib: "./lib",
        },
    },
    build: {
        copyPublicDir: false,
        sourcemap,
        rollupOptions: {
            input: {
                index: "./index.html",
            },
        },
    },
})
