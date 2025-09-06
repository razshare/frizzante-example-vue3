<script setup lang="ts">
import Layout from "$lib/components/Layout.vue"
import type { View } from "$lib/scripts/core/types.ts"
import Link from "$lib/components/links/Link.vue"

type Props = {
    view: View<unknown>
}

let { view } = defineProps<Props>()
</script>

<template>
    <Layout title="Welcome">
        <h1>Welcome to Frizzante.</h1>
        <Link v-bind:view="view" href="/todos">Show todos</Link>
    </Layout>
</template>
