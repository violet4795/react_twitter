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
                    <div
                        style={{
                            maxWidth: 890,
                            width: '100%',
                            margin: '0 auto',
                            marginTop: 80,
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
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
                    </div>
                ) : (
                    <Route exact path="/" element={<Auth />} />
                )}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    )
}

export default AppRouter
