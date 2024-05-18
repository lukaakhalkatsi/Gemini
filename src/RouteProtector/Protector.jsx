import { useContext } from "react";
import { Context } from "../context/Context"
import Enter from "../pages/Enter/Enter";
import { Navigate } from "react-router-dom";

function Protector({children}) {

    const {isUserExists} = useContext(Context);

    return (
        <>
            {isUserExists ? children : <Navigate to="/" />}
        </>
    )
}

export default Protector
