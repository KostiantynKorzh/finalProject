import React from "react";
import {Button} from "react-bootstrap";
import getError from "../../services/error.service";

const Error = () => {

    const error = getError.then(
        resp => {
            console.log(resp);
        }
    );

    return (
        <div className="text-center">
            <h1>Oops, that's an error</h1>
            <Button href="/home">Home</Button>}
            <h1>{error}</h1>
        </div>
    );

};

export default Error;