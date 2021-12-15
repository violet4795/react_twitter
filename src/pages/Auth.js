import { useState } from "react";
import { authService } from "fbase";

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

    const onSubmit = async e =>{
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

    const onSocialClick = e => {
        console.log(e.target.name);
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