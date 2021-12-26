import { HashRouter as Router, Route, Routes, Redirect, Navigate} from "react-router-dom";
import Auth from "pages/Auth"
import Home from "pages/Home"
import Navigation from "./Navigation";
import Profile from "pages/Profile";

const AppRouter = ({isLoggedIn}) => {
    return (
        <Router>
            { isLoggedIn && <Navigation />}
            <Routes>
                { isLoggedIn ? (
                    <>
                    <Route exact path="/" element={<Home/>} />
                    <Route exact path="/profile" element={<Profile/>} />
                    </>
                ) : (
                    <Route exact path="/" element={<Auth/>} />
                )
                }
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    )
}
  
export default AppRouter;
