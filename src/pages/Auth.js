import {firebaseInstance, authService} from 'fbase'
import AuthForm from 'components/AuthForm.js'

const Auth = () => {
    const onSocialClick = async e => {
        const {
            target: {name},
        } = e
        let provider

        //팝업창 닫을 시 에러발생
        //https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth
        //참고하여 해결
        if (name === 'google') {
            provider = new firebaseInstance.auth.GoogleAuthProvider()
        } else if (name === 'github') {
            provider = new firebaseInstance.auth.GithubAuthProvider()
        }

        const data = await authService.signInWithPopup(provider).then(
            function (result) {},
            function (error) {},
        )
    }

    return (
        <div>
            <AuthForm />
            <div>
                <button onClick={onSocialClick} name="google">
                    Continue with Google
                </button>
                <button onClick={onSocialClick} name="github">
                    Continue with Github
                </button>
            </div>
        </div>
    )
}

export default Auth
