import { HashRouter as Router, Route, Routes, Switch } from "react-router-dom";
import Auth from "pages/Auth"
import Home from "pages/Home"

const AppRouter = ({isLoggedIn}) => {
    
    return (
        <Router>
            <Routes>
                { isLoggedIn ? (
                    <Route exact path="/" element={<Home/>} />
                ) : (
                    <Route exact path="/" element={<Auth/>} />
                )
                }
            </Routes>
        </Router>
    )
}

export default AppRouter;
