<script setup lang="ts">
import { href } from "$lib/scripts/core/href.ts"
import type { View } from "$lib/scripts/core/types.ts"
import { computed } from "@vue/reactivity"
import { type Ref, ref } from "vue"

type Props = {
    view: View<unknown>
    href: string
    class?: string
    style?: string
}
let { view, href: path, class: cls, style } = defineProps<Props>()

let pending: Ref<boolean> = ref(false)
let error: Ref<false | Error> = ref(false)

let options = computed(function run() {
    const out = href(view, path)

    return {
        href: out.href,
        onclick(event: MouseEvent) {
            pending.value = true
            out.onclick(event)
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
    <a
        v-bind:class="cls"
        v-bind:style="style"
        v-bind:href="options.href"
        v-on:click="options.onclick"
    >
        <slot v-bind:pending="pending" v-bind:error="error"></slot>
    </a>
</template>
