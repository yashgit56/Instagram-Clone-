import { SIGN_IN, SIGN_UP } from "./ActionType";

export const signinAction = (data) => async (dispatch) => {
    try {
        const response = await fetch("http://localhost:5665/signin", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Basic " + btoa(data.username + ":" + data.password),
            }
        });

        const res = await response.json() ;
        // console.log("response: ",res) ;

        localStorage.setItem("token",res.message) ;
        dispatch({ type: SIGN_IN, payload: res.message });
        // console.log("token:", res.message);

    } catch (error) {
        console.error("Sign-in error:", error.message); 
    }
}

export const signupAction = (data) => async (dispatch) => {
    try{
        const res = await fetch("http://localhost:5665/signup",{
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(data)
        });
        const user = await res.json() ;

        console.log("Signup user") ;

        dispatch({type: SIGN_UP , payload: user});
    }
    catch(error){
        console.log(error) ;
    }
}