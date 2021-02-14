import React from "react";
import {useSelector} from "react-redux";

export const CheckIfAdmin = (props) => {

    if (props.user == null || !props.user.roles.includes("ROLE_ADMIN")) {
        props.history.push("/login");
        window.location.reload();
    }

    console.log("CHECK", props.user)


};