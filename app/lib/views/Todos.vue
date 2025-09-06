<style>
ol {
    padding: 1rem;
    border-radius: 0.3rem;
    background: rgba(0, 0, 0, 0.3);
    list-style-type: none;
    min-width: 400px;
    text-align: start;
}

input {
    background: transparent;
    border: 0;
    border-bottom: 1px solid cadetblue;
    padding: 0.3rem;
    border-radius: 0;
    color: cadetblue;
}

input:focus {
    background-color: rgba(0, 0, 0, 0.1);
    outline: none;
}
</style>

<script setup lang="ts">
import Layout from "$lib/components/Layout.vue"
import type { View } from "$lib/scripts/core/types.ts"
import Link from "$lib/components/links/Link.vue"
import Form from "$lib/components/forms/Form.vue"

type Todo = {
    Checked: boolean
    Description: string
}

type Props = {
    view: View<{
        todos: Todo[]
        error: string
    }>
}

let { view } = defineProps<Props>()
</script>
<template>
    <Layout title="Todos">
        <ol>
            <li v-for="(todo, index) in view.props.todos">
                <Form v-bind:view="view" action="/remove">
                    <input type="hidden" name="index" v-bind:value="index" />
                    <button class="link">[Remove]</button>
                </Form>
                <Form v-bind:view="view" action="/uncheck" v-if="todo.Checked">
                    <input type="hidden" name="index" v-bind:value="index" />
                    <button class="link">
                        <!---->
                        (x) {{ todo.Description }}
                        <!---->
                    </button>
                </Form>
                <Form v-bind:view="view" action="/check" v-else>
                    <input type="hidden" name="index" v-bind:value="index" />
                    <button class="link">
                        <!---->
                        (&nbsp;&nbsp;) {{ todo.Description }}
                        <!---->
                    </button>
                </Form>
            </li>
        </ol>
        <Form v-bind:view="view" action="/add">
            <span class="link">Description</span>
            <input type="text" value="" name="description" />
            <button class="link" type="submit">Add +</button>
        </Form>
        <template v-if="view.props.error">
            <br />
            <span class="error">{{ view.props.error }}</span>
        </template>
        <br />
        <Link v-bind:view="view" href="/">&lt; Back</Link>
    </Layout>
</template>
