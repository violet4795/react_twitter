import { useState } from "react";
import { authService, firebaseInstance } from "fbase";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
    
    const onChange = e => {
        // const {
        //     target: {name, value},
        // } = e;
        // 왜이렇게 할당하지? 굳이 구조분해할당을 이렇게써야하나
        if(e.target.name === 'email'){
            setEmail(e.target.value);
        } else if(e.target.name === 'password'){
            setPassword(e.target.value);
        }
    }

    const onSubmit = async e => {
        e.preventDefault();
        try{
            let data;
            if (newAccount) {
                //create new Account
                data = await authService.createUserWithEmailAndPassword(email, password);
            } else {
                //log in
                data = await authService.signInWithEmailAndPassword(email, password);
            }
            console.log(data);
        } catch (e) {
            setError(e.message);
        }
    }
    const toggleAccount = () => setNewAccount((prev) => !prev);

    const onSocialClick = async e => {
        const {
            target: { name },
        } = e;
        let provider;
        

        //팝업창 닫을 시 에러발생
        //https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth
        //참고하여 해결
        if ( name === 'google' ) {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        } else if ( name === 'github' ) {
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        
        const data = await authService.signInWithPopup(provider).then(function(result){
            console.log(result); // resolve
        }, function(error){
            console.log(error); // reject
        });
        console.log(data);
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input name="email" type="email" placeholder="Email" required 
                value={email}
                onChange={onChange}/>
                <input name="password" type="password" placeholder="Password" required 
                value={password}
                onChange={onChange}/>
                <input type="submit" placeholder="value" required value={newAccount? "Create Account" : "Log In"} />
                {error}
            </form>
            <span onClick={toggleAccount}>
                {newAccount ? 'Sign In' : 'Create Account'}
            </span>
            <div>
                <button onClick={onSocialClick} name="google">Continue with Google</button>
                <button onClick={onSocialClick} name="github">Continue with Github</button>
            </div>
        </div>
    )
}

export default Auth;