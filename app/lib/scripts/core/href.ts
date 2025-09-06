import type { View } from "$lib/scripts/core/types.ts"
import { route } from "$lib/scripts/core/route.ts"
import { swap } from "$lib/scripts/core/swap.ts"
import { IS_BROWSER } from "$lib/scripts/core/constants.ts"

export function href(
    view: View<unknown>,
    path = "",
): {
    href: string
    onclick: (event: MouseEvent) => Promise<boolean>
} {
    if (!IS_BROWSER) {
        return {
            href: path,
            async onclick() {
                return true
            },
        }
    }

    const anchor = document.createElement("a")
    anchor.href = path
    route(view)
    return {
        href: path,
        async onclick(event: MouseEvent) {
            event.preventDefault()
            const record = await swap(anchor, view)
            record()
            return false
        },
    }
}
