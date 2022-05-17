import React from "react";

const Error = (props) => {
    return(
        <div className="error" style= {{textAlign: "center"}}>
            <p className="notice" style={{color: "red"}}>{props.error}</p>
        </div>

    )
}

export default Error;