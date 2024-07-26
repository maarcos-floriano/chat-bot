import React, { useEffect, useState } from "react";
import './Chat.css';

function Chat({ id }) {
    const [questions] = useState([
        {question: "Olá, tudo bem ?"},
        {question: "Como podemos te ajudar ?", options: ["Informações de transação", "Informações de conta", "Informações de perfil"]},
        {question: "Informe-nos seu cpf -"},
        {question: "Informe-nos seu email -"},
        {question: "Mensagem não reconhecida !"},
        {question: "Não encontramos você no sistema. Mas já estamos lidando com isso !"}
    ]);
    const [messages, setMessages] = useState([]);
    const [response, setResponse] = useState('');
    const [user, setUser] = useState({});
    
    useEffect(() => {

        setMessages([
            { sender: 'bot', text: questions[0].question }
        ]);

        const timeout = setTimeout(() => {
            initBotMessages();
        }, 1000);

        return () => clearTimeout(timeout);
    }, []);


    const initBotMessages = () => {
        setMessages(prevMessages => [
            ...prevMessages,
            { sender: 'bot', text: questions[1].question},
            { sender: 'bot', text: questions[1].options}
        ]);
    }
    

    const sendMessage = (event) => {
        if (response.trim()) {
            setMessages(prevMessages => [
                ...prevMessages,
                { sender: 'client', text: response}
            ]);
            reset();
        }
    }

    const reset = () => {
        solicitar();
        setResponse('');
    }

    const obterUsuario = () => {
        const url = 'http://localhost:5050/user'
        consultaBanco()
    }

    const solicitar = () => {
        const regexEmail = /^[a-zA-Z]+[^@]*@[a-zA-Z]+[^@]*\.[a-zA-Z]+[^@]*$/
        const regexCpf = /^\d{11}$/;

        if (
            response.includes('transação') || response.includes('transacao') ||
            response.includes('conta') || response.includes('perfil')
        ) {
            setMessages(prevMessages => [
                ...prevMessages,
                { sender: 'bot', text: questions[2].question }
            ]); 
        } else if (regexCpf.test(response)) {
            const data = obterUsuario();

            if (!data) {
                setMessages(prevMessages => [
                    ...prevMessages,
                    { sender: 'bot', text: questions[5].question }
                ]);
                setUser(prevUser => ({
                    prevUser,
                    cpf: response
                }));
            }
            setMessages(prevMessages => [
                ...prevMessages,
                { sender: 'bot', text: questions[3].question }
            ]); 
        } else if (regexEmail.test(response)) {
            setUser(prevUser => ({
                prevUser,
                email: response
            }));
            console.log('legal');
        } else {
            setMessages(prevMessages => [
                ...prevMessages,
                { sender: 'bot', text: questions[4].question }
            ]); 
            const timeout = setTimeout(() => {
                initBotMessages();
            }, 1000);
    
            return () => clearTimeout(timeout);
        }

        console.log("user");
        console.log(user);
    }
    
    const selectOption = (event) => {

        const option = event.target.title;
        const optionToSelect = event.target.title.split(' ')[2].charAt(0).toUpperCase() + event.target.title.split(' ')[2].slice(1);

        setMessages(prevMessages => [
            ...prevMessages,
            { sender: 'client', text: option}
        ]);
        setResponse(option);

        reset();
    }

    
    const consultaBanco = (url, methodo, data) => {
        return fetch(url, {
            method: methodo,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(response => response.json());
    }

    return (
        <div className="containerChat">
            <div
                id="ChatMessages" 
                className="containerChatMessages"
            >
                { messages.map((msg, index) => (
                    <div 
                        key={index}
                        className={msg.sender === 'bot' ? 'containerBotMessage' : 'containerClientMessage'}
                    >
                        <p className={msg.sender === 'bot' ? 'botMessage bubbleMessage' : 'clientMessage bubbleMessage'}>
                            {
                                Array.isArray(msg.text) ? (
                                    msg.text.map((option, idx) => (
                                        <span key={idx} className="spanLink" title={option} onClick={e => selectOption(e)}>
                                            {option}
                                            {idx < msg.text.length - 1 && <br />}
                                        </span>
                                    ))
                                ) : (
                                    <span>{msg.text}</span>
                                )
                            }
                        </p>
                    </div>
                )) }
            </div>
            <div className="containerChatInput">
                <input
                    type="text"
                    id="inputChat"
                    placeholder="Digite aqui..."
                    className="inputChat"
                    value={response}
                    onChange={e => setResponse(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && sendMessage()}
                />
                <button
                    className="btnChat"
                    onClick={sendMessage}
                >
                    <i className="bi-arrow-up-short arror-up"></i>
                </button>
            </div>
        </div>
    )    
}

export default Chat;
