import React from "react";
import styles from "../styles/Profile.module.css";
import profile from "../images/kb-logo.png";

interface ProfileProps {
    theme?: {type: "light" | "dark"}
}

const Profile: React.FC<ProfileProps> = ({ theme }) => {

    return (
        <a href="https://github.com/kbuiblue" target="_blank" rel="noreferrer">
            <div className={`${theme?.type === "dark" && styles.dark} ${styles.userContainer}`}>
                <img
                    className={styles.profileIcon}
                    src={profile}
                    alt="Profile"
                />
                <p>Khanh Bui</p>
            </div>
        </a>
    );
}

export default Profile
