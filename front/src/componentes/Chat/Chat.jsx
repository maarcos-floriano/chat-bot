import React, { useEffect, useState } from "react";
import './Chat.css';

function Chat({ id }) {
    const [questions] = useState([
        {question: "Olá, tudo bem ?"},
        {question: "Como podemos te ajudar ?", options: ["Informações de transação", "Informações de conta", "Informações de perfil"]},
        {question: "Informe-nos seu cpf"},
        {question: "Informe-nos seu email"}
    ]);
    const [response, setResponse] = useState();
    
    useEffect(() => {
        document.getElementById("ChatMessages").innerHTML = `<div class="containerBotMessage"> <p class="botMessage" id="bot">${questions[0].question}</p> </div>`;
        setTimeout(() => {
            document.getElementById("ChatMessages").innerHTML += `<div class="containerBotMessage"> <p class="botMessage" id="bot">${questions[1].question}</p> </div>`;
        }, 1000);

        // fetch(`http://localhost:5050/chat/findMessages/${id}`)
        // .then()
        // .catch()
    }, [])

    const sendMessage = (event) => {
        console.log('Event:: ' + event);
        document.getElementById("ChatMessages").innerHTML += `<div class="containerClientMessage"> <p class="clientMessage" id="client">${response}</p> </div>`;
    }


    return (
        <div className="containerChat">
            <div
                id="ChatMessages" 
                className="containerChatMessages"
            >
            </div>
            <div className="containerChatInput">
                <input
                    type="text"
                    id="inputChat"
                    className="inputChat"
                    onChange={e => setResponse(e.target.value)}
                />
                <button
                    className="btnChat"
                    onClick={sendMessage}
                >
                    <i className="bi-arrow-right-short"></i>
                </button>
            </div>
        </div>
    )    
}

export default Chat;
