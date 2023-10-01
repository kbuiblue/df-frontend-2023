import { ReactNode, useCallback, useState, useMemo, ChangeEventHandler } from 'react'
import { ThemeContext } from './context'
import { Theme } from '../types'

export interface ThemeProviderProps {
    children: ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const defaultTheme: Theme = JSON.parse(
        localStorage.getItem('defaultTheme') ||
            "{ isChecked: false, type: 'light' }",
    )
    const [theme, setTheme] = useState(defaultTheme)

    const handleSettingTheme: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
        const isDark: boolean = event.target.checked

        if (isDark) {
            setTheme({ isChecked: true, type: 'dark' })
            localStorage.setItem(
                'defaultTheme',
                JSON.stringify({ isChecked: true, type: 'dark' }),
            )
        } else {
            setTheme({ isChecked: false, type: 'light' })
            localStorage.setItem(
                'defaultTheme',
                JSON.stringify({ isChecked: false, type: 'light' }),
            )
        }
    }, [])

    const value = useMemo(
        () => ({ theme, handleSettingTheme }),
        [theme, handleSettingTheme],
    )

    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    )
}
