import React, { useEffect, useState } from "react";

function Chat({ id }) {
    const [questions, setQuestions] = useState([
        {question: "Olá ${} como podemos ajudar?", options: ["Buscar informações de usuário", "Buscar informações de transações", "Buscar informações de conta"]}
        {question: "Como deseja selecionar?", options: ["Por Email", "Por Telefone", "Por Identificador"]}
    ]);
    const [response, setResponse] = useState();
    
    useEffect(() => {

        fetch(`http://localhost:5050/chat/findMessages/${id}`)
        .then()
        .catch()
    }, [response])

    return (
        <div className="containerChat">
            {
                selectOthers
            }
            {
                selectMyDB
            }
        </div>
    )    
}

export default Chat;
