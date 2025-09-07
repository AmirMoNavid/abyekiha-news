import { useEffect } from "react"

export const useAsyncEffect = (effect, deps) => {
    useEffect(() => {
        effect()
    }, deps);
}