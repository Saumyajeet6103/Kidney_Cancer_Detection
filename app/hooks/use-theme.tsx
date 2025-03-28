import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { type ThemeName, themes } from '~/registry/themes'

export const changeTheme = (theme: string) => {
    const root = document.documentElement
    const themeObject: any = themes.find((t) => t.name === theme)
    if (!themeObject) return
    Object.keys(themeObject?.cssVars.dark).forEach((property) => {
        root.style.setProperty(
            `--${property}`,
            themeObject?.cssVars.dark[property]
        )
    })
}

export const getTheme = (): ThemeName => {
    let theme: ThemeName = 'zinc'
    if (typeof window !== 'undefined') {
        const storedTheme = localStorage.getItem('theme')
        if (storedTheme) {
            // Remove any quotes and parse as JSON if it's a JSON string
            try {
                const parsedTheme = JSON.parse(storedTheme)
                theme = typeof parsedTheme === 'string' ? parsedTheme as ThemeName : 'zinc'
            } catch {
                // If it's not valid JSON, just use the string directly after removing quotes
                theme = storedTheme.replace(/['"]+/g, '') as ThemeName
            }
        }
    }
    return theme
}

// Initialize with zinc as the default theme if no theme is present in storage
const themeAtom = atomWithStorage<ThemeName>('theme', 'zinc')

export default function useTheme() {
    return useAtom(themeAtom)
}
