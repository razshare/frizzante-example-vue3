<style>
form {
    display: inline-block;
}
</style>

<script setup lang="ts">
import { action } from "$lib/scripts/core/action.ts"
import type { View } from "$lib/scripts/core/types.ts"
import { computed } from "@vue/reactivity"
import { type Ref, ref } from "vue"

type Props = {
    view: View<unknown>
    method?: "GET" | "POST"
    enctype?:
        | "multipart/form-data"
        | "application/x-www-form-urlencoded"
        | "text/plain"
    action: string
    class?: string
    style?: string
}
let {
    view,
    method = "GET",
    enctype,
    action: actionPath,
    class: cls,
    style,
} = defineProps<Props>()
let pending: Ref<boolean> = ref(false)
let error: Ref<false | Error> = ref(false)
let options = computed(function run() {
    const out = action(view, actionPath)

    return {
        action: out.action,
        onsubmit(event: Event) {
            pending.value = true
            out.onsubmit(event)
                .then(function run() {
                    pending.value = false
                })
                .catch(function run(errorLocal: Error) {
                    error.value = errorLocal
                })
        },
    }
})
</script>

<template>
    <form
        v-bind:enctype="enctype"
        v-bind:method="method"
        v-bind:action="options.action"
        v-on:submit="options.onsubmit"
        v-bind:class="cls"
        v-bind:style="style"
    >
        <slot v-bind:pending="pending" v-bind:error="error"></slot>
    </form>
</template>
