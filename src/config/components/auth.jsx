import { useState, useEffect } from "react"
import { 
    createUserWithEmailAndPassword, 
    signInWithPopup, 
    signOut,
    onAuthStateChanged
} from "firebase/auth";
import { auth } from "../firebase.config";
import { provider } from "../firebase.config";

export default function Auth(){
    
    const [name,setName] = useState("");
    const [passwd,setPasswd] = useState("");
    const [user,setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser); // Updates instantly on login/logout!
        });

        // Cleanup listener when component unmounts
        return () => unsubscribe();
    }, []);
    
    //firebase returns promises so we use async and err handling
    
    async function signin(){
        try{
            await createUserWithEmailAndPassword(auth,name,passwd);
        }
        catch(err){
            console.log(err);
        }
    }

    //google sign in
    async function googleSignIn(){
        try{
            await signInWithPopup(auth, provider);
        }
        catch(err){
            console.log(err);
        }
    }
    async function logout(){
        try{
            await signOut(auth);
        }
        catch(err){
            console.log(err);
        }
    }
    return <>
        <div className="container">
                <h1>{auth?.currentUser?.email}</h1>
                <p>
                    <input type="text" 
                    placeholder="email"
                    onChange={(e)=>setName(e.target.value)}
                    />
                </p>
                <p>
                    <input type="password" 
                    placeholder="password"
                     onChange={(e)=>setPasswd(e.target.value)}
                    />
                </p>
                <p>
                    <button className="btn btn-primary"
                    onClick={signin}>
                        sign In
                    </button>
                    &nbsp;
                    <button className="btn btn-dark"
                    onClick={googleSignIn}>
                        google sign in
                    </button>
                </p>
                <p>
                    <button className="btn btn-danger"
                    onClick={logout}>
                        Logout
                    </button>
                </p>
        </div>
    </>
}