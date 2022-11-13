import { Navigate, useLocation } from "react-router-dom";

type Props = {};

/* Redirecting the user to the home page after they register. */
const RegisterPage = (props: Props) => {
    const location = useLocation();
    return <Navigate to={"/"} state={{ from: location }} />;
};

export default RegisterPage;
