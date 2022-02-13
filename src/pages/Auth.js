import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTwitter, faGoogle, faGithub} from '@fortawesome/free-brands-svg-icons'
import {firebaseInstance, authService} from 'fbase'
import AuthForm from 'components/AuthForm.js'

const Auth = () => {
    const onSocialClick = async e => {
        const {
            target: {name},
        } = e
        let provider
        //
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
        <div className="authContainer">
            <FontAwesomeIcon
                icon={faTwitter}
                color={'#04AAFF'}
                size="3x"
                style={{marginBotton: 30}}
            />
            <AuthForm />
            <div className="authBtns">
                <button
                    onClick={onSocialClick}
                    name="google"
                    className="authBtn"
                >
                    Continue with Google <FontAwesomeIcon icon={faGoogle} />
                </button>
                <button
                    onClick={onSocialClick}
                    name="github"
                    className="authBtn"
                >
                    Continue with Github <FontAwesomeIcon icon={faGithub} />
                </button>
            </div>
        </div>
    )
}

export default Auth
