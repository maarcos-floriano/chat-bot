import { useEffect, useState } from "react";
import './Signin.css'

function Signin() {
    
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    useEffect(() => {
        document.getElementById('inputUserNama').focus();
    }, [])

    const selectInput = (event) => {
        event.target.labels[0].classList.add('selected');
        event.target.type = "text"
    };

    const unselectInput = (event) => {
        event.target.labels[0].classList.remove('selected');
    };
    
    const changeToText = (event) => {
        event.target.type = "text"
    };

    const changeToPassword = (event) => {
        event.target.type = "password"
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch("", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
        }).then(response => {

        }).catch(error => {

        })       
    }

    const changeToLogin = (event) => {
        alert("Alterando para o login");
    }

    return (
        <div className="containerSignin">
            <form onSubmit={handleSubmit} method="post" className="formSignin">
                <h2>Cadastre-se</h2>
                <label htmlFor="inputUserNama" className="containerInput selected">
                    <input
                        type="text"
                        id="inputUserNama"
                        placeholder="Username"
                        className="inputSignin"
                        onChange={(e) => setUsername(e.target.value)}
                        onFocus={selectInput}
                        onBlur={unselectInput}
                        />
                </label>
                <label htmlFor="inputEmail" className="containerInput">
                    <input
                        type="text"
                        id="inputEmail"
                        placeholder="Email"
                        className="inputSignin"
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={selectInput}
                        onBlur={unselectInput}
                        />
                </label>
                <label htmlFor="inputPassword" className="containerInput">
                    <input
                        type="password"
                        id="inputPassword"
                        placeholder="Senha"
                        className="inputSignin"
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={(e) => { selectInput(e); changeToText(e) }}
                        onBlur={(e) => { unselectInput(e); changeToPassword(e) }}
                    />
                </label>

                <button 
                    type="submit"
                    className="buttonSignin"
                >Cadastrar</button>
            </form>
            <div className="containerLink">
                <button 
                    className="buttonLinkLogin"
                    onClick={changeToLogin}
                >
                    Login
                </button>
            </div>
        </div>
    )
}

export default Signin;