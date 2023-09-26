import { useState } from "react";
import { ThemeContext } from "./context";

export const ThemeProvider = ({ children }) => {
    const defaultTheme = JSON.parse(localStorage.getItem("defaultTheme"));
    const [theme, setTheme] = useState(
        defaultTheme ? defaultTheme : { isChecked: false, type: "light" }
    );

    const handleSettingTheme = (event) => {
        const isDark = event.target.checked;

        if (isDark) {
            setTheme({ isChecked: true, type: "dark" });
            localStorage.setItem(
                "defaultTheme",
                JSON.stringify({ isChecked: true, type: "dark" })
            );
        } else {
            setTheme({ isChecked: false, type: "light" });
            localStorage.setItem(
                "defaultTheme",
                JSON.stringify({ isChecked: false, type: "light" })
            );
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, handleSettingTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
