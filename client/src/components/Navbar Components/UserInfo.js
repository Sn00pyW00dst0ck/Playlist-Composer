import React from "react";
import { useState } from "react";
import useFetch from "../../customHooks/useFetch";
import styles from "./UserInfo.module.css";

import defaultProfileImg from "../../imgs/defaultProfile.png";

const options = {};

function UserInfo()  {
    //State for the user data
    const {isLoading, responseData, fetchError } = useFetch("/api/current-user", options);
    //State for if the dropdown is open or not
    const [open, setOpen] = useState(false);

    //Function to logout from Spotify
    const logout = async () =>  {
        await fetch("/logout", {
            method: 'POST'
        });
        window.location.reload();
    }
    
    return (
        <>
            <li className={styles.userInfoContainer}>
                <p className={styles.iconButton} onClick={() =>  {setOpen(!open)}}>
                    {isLoading &&
                        //placeholder image for loading
                        <img src={defaultProfileImg}></img>
                    }
                    {(!isLoading && responseData != null) &&
                        //put the image from the data there if it's provided, else the normal icon
                        <img src={(responseData.images.length > 0 ? responseData.images[0].url : defaultProfileImg)}></img>
                    }
                    {(!isLoading && fetchError != null) && 
                        //put the placeholder image
                        <img src={defaultProfileImg}></img>
                    }
                </p>

                {open && 
                    <UserInfoDropDown>
                        {isLoading && 
                            <p>Currently Loading User Data!</p>
                        }
                        {(!isLoading && responseData != null) && 
                        <>
                        <UserInfoDropDownItem
                            leftIcon={<img src={(responseData.images.length > 0 ? responseData.images[0].url : defaultProfileImg)} height="40px" width="40px"></img>}
                            rightIcon="😃">
                            {responseData.display_name}
                        </UserInfoDropDownItem>
                        <UserInfoDropDownItem>
                            <a href={responseData.external_urls.spotify}>
                                View Your Spotify Page
                            </a>
                        </UserInfoDropDownItem>
                        <UserInfoDropDownItem
                            leftIcon="😃">
                            <p onClick={() => { logout(); }}>Logout</p>
                        </UserInfoDropDownItem>
                        </>
                        }
                        {(!isLoading && fetchError != null) && 
                            <p> Error Loading User Data! Try Again Later.</p>
                        }
                    </UserInfoDropDown>
                }
            </li>
        </>
    )
}

function UserInfoDropDown(props)  {

    return (
        <>
            <div className={styles.dropdown}>
                {props.children}
            </div>
        </>
    )
}

function UserInfoDropDownItem(props)  {

    return (
        <p className={styles.UserInfoDropDownItem}>
            <span className={styles.leftIcon}>{props.leftIcon}</span>

            {props.children}

            <span className={styles.rightIcon}>{props.rightIcon}</span>
        </p>
    )
}

export default UserInfo;