import React from "react";

const EditTest = () => {

    window.onpopstate = function(event) {
        window.location.reload();
    };

    return(
        <div>LOL</div>
    );

};

export default EditTest;