<script setup lang="ts">
import { type Component, reactive } from "vue"
import { views } from "./exports.server.ts"
import type { View } from "$lib/scripts/core/types.ts"
//eslint-disable-next-line @typescript-eslint/ban-ts-comment
const components = views as Record<string, Component>
const { name, props: remoteProps, render, align } = defineProps<View<unknown>>()
const view = reactive<View<unknown>>({
    name,
    props: remoteProps,
    render,
    align,
})
</script>

<template>
    <template v-for="key in Object.keys(components)">
        <component v-if="key === view.name" :is="components[key]"></component>
    </template>
</template>
