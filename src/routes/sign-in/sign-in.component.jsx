import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

const SignIn = ()=>{    
    const logGoogleUser = async () =>{
        try{
            const {user} = await signInWithGooglePopup();
            createUserDocumentFromAuth(user);

        }catch(error){
            console.log("Error during sign-in",error);
        }

    }

    return(
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}> Sign In with google Popup </button>
        </div>
    )
}

export default SignIn;