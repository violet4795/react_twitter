import {HashRouter as Router, Route, Routes, Navigate} from 'react-router-dom'
import Auth from 'pages/Auth'
import Home from 'pages/Home'
import Navigation from './Navigation'
import Profile from 'pages/Profile'

const AppRouter = ({isLoggedIn, userObj, refreshUser}) => {
    return (
        <Router>
            {isLoggedIn && <Navigation userObj={userObj} />}
            <Routes>
                {isLoggedIn ? (
                    <>
                        <Route
                            exact
                            path="/"
                            element={<Home userObj={userObj} />}
                        />
                        <Route
                            exact
                            path="/profile"
                            element={
                                <Profile
                                    refreshUser={refreshUser}
                                    userObj={userObj}
                                />
                            }
                        />
                    </>
                ) : (
                    <Route exact path="/" element={<Auth />} />
                )}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    )
}

export default AppRouter
