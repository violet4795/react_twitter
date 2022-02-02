// import logo from './logo.svg';
// import './App.css';
import {useEffect, useState} from 'react'
import AppRouter from 'components/Router'
import {authService} from 'fbase'

function App() {
    const [init, setInit] = useState(false)
    const [userObj, setUserObj] = useState(null)

    const setUser = user => {
        setUserObj(
            user && {
                uid: user.uid,
                displayName: user.displayName,
                updateProfile: args => user.updateProfile(args),
            },
        )
    }
    //https://ko.reactjs.org/docs/hooks-effect.html
    //두번째 인자로 배열을 넘겨서, 배열안의 변수가 변하지 않는다면 effect를 막는식으로
    //렌더링 될떄마다 effect가 발동되는것을 막을 수 있다.
    //빈배열을 넘긴다면, effect가 일어나지 않음을 의미
    useEffect(() => {
        authService.onAuthStateChanged(user => {
            if (user) {
                setUser(user)
            } else {
                setUser(null)
            }
            setInit(true)
        })
    }, [])

    const refreshUser = () => {
        // setUserObj(authService.currentUser)
        const user = authService.currentUser
        setUser(user)
    }

    return (
        <>
            {init ? (
                <AppRouter
                    isLoggedIn={Boolean(userObj)}
                    userObj={userObj}
                    refreshUser={refreshUser}
                />
            ) : (
                'initializing...'
            )}
        </>
    )
}

export default App
