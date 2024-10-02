import React from 'react';
import styles from './profile.module.css'; // Modular CSS

const Profile = () => {
    return (
        <div className={styles.profileContainer}>
            <div className={styles.profileHeader}>
                <img
                    src="https://via.placeholder.com/150"
                    alt="Profile Avatar"
                    className={styles.avatar}
                />
                <div className={styles.userInfo}>
                    <h2 className={styles.userName}>John Doe</h2>
                    <p className={styles.userBio}>
                        Frontend Developer | JavaScript Enthusiast | Tech Blogger
                    </p>
                </div>
            </div>
            <div className={styles.profileDetails}>
                <div className={styles.detailBox}>
                    <h3>Location</h3>
                    <p>San Francisco, CA</p>
                </div>
                <div className={styles.detailBox}>
                    <h3>Email</h3>
                    <p>johndoe@email.com</p>
                </div>
                <div className={styles.detailBox}>
                    <h3>Joined</h3>
                    <p>January 2020</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
