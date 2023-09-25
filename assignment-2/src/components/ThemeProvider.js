import { useState } from "react";
import { ThemeContext } from "./context";

export const ThemeProvider = ({ children }) => {
    const [themeType, setThemeType] = useState("dark");

    const handleSettingTheme = (isDark) => {
        if (isDark) {
            setThemeType("dark");
        } else {
            setThemeType("light");
        }
    };

    return (
        <ThemeContext.Provider value={(themeType, handleSettingTheme)}>
            {children}
        </ThemeContext.Provider>
    );
};
