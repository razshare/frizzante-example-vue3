import { defineAsyncComponent } from "vue"

export const views = {
    Welcome: defineAsyncComponent(() => import("$lib/views/Welcome.vue")),
    Todos: defineAsyncComponent(() => import("$lib/views/Todos.vue")),
}
