import React from "react";
import { Navigate, useLocation } from "react-router-dom";



export default function ProtectedRoute({ element: Component, ...props }) {
    const location = useLocation();

    return props.isLogin ? <Component {...props} /> : <Navigate to={location}/>;
}
