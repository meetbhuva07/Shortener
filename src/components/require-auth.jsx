import { UrlState } from "@/context";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";

function RequireAuth({ children }) {
    const navigate = useNavigate();
    const { loading, isAuthenticated } = UrlState();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            navigate("/auth");
        }
    }, [loading, isAuthenticated, navigate]);

    if (loading) return <BarLoader width={"100%"} color="bg-gray-900" />;
    if (isAuthenticated) return children;

    return null;
}

export default RequireAuth;