import React, {useContext} from "react";
import { ThemeContext } from "./context/context";
import styles from "../styles/Profile.module.css";
import profile from "../images/kb-logo.png";

interface ProfileProps {
    theme?: {type: "light" | "dark"}
}

const Profile: React.FC<ProfileProps> = () => {
    const { theme } = useContext(ThemeContext);

    return (
        <a href="https://github.com/kbuiblue" target="_blank" rel="noreferrer">
            <div className={`${theme?.type === "dark" ? styles.dark : ""} ${styles.userContainer}`}>
                <img
                    className={styles.profileIcon}
                    src={profile}
                    alt="Profile"
                />
                <p className={`${theme?.type === "dark" ? styles.dark : ""} ${styles.userName}`}>Khanh Bui</p>
            </div>
        </a>
    );
}

export default Profile
