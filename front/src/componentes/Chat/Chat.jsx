import React, { useEffect, useState } from "react";
import { get, post } from "../../utils/Fetch";

import './Chat.css';

function Chat() {
    const [questions] = useState([
        {question: "Olá, tudo bem ?"},
        {question: "Como podemos te ajudar ?", options: ["Informações de transação", "Informações de conta", "Informações de perfil"]},
        {question: "Informe-nos seu cpf -"},
        {question: "Informe-nos seu email -"},
        {question: "Mensagem não reconhecida !"}
    ]);
    const [messages, setMessages] = useState([]);
    const [response, setResponse] = useState('');
    const [input, setInput] = useState('');
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

    useEffect(() => {
        if (response) {
            reset()
        }
    }, [response]);

    const initBotMessages = () => {
        setMessages(prevMessages => [
            ...prevMessages,
            { sender: 'bot', text: questions[1].question },
            { sender: 'bot', text: questions[1].options }
        ]);
    }

    const sendMessage = (event) => {
        if (input.trim()) {
            setMessages(prevMessages => [
                ...prevMessages,
                { sender: 'client', text: input }
            ]);
            setResponse(input);
        }
    }

    const reset = () => {
        solicitar();
        setInput('');
        setResponse('');
    }

    const obter = async (param) => {
        let usuario = await get(param);
        setUser(usuario);
    }

    // const criar = async (param, body) => {
    //     let usuario = await post(param, body);
    //     setUser(usuario);
    // }

    const solicitar = () => {
        const regexEmail = /^[a-zA-Z]+[^@]*@[a-zA-Z]+[^@]*\.[a-zA-Z]+[^@]*$/;
        const regexCpf = /^\d{11}$/;

        if (
            response.toLowerCase().includes('transação') || response.toLowerCase().includes('transacao') ||
            response.toLowerCase().includes('conta') || response.toLowerCase().includes('perfil')
        ) {
            setMessages(prevMessages => [
                ...prevMessages,
                { sender: 'bot', text: questions[2].question }
            ]); 
        } else if (regexCpf.test(response)) {
            const data = obter('user/detailByCpf/12345678901');

            console.log(data)

            if (!data) {
                setUser(prevUser => ({
                    ...prevUser,
                    cpf: response
                }));
                setMessages(prevMessages => [
                    ...prevMessages,
                    { sender: 'bot', text: questions[3].question }
                ]); 
            }
        } else if (regexEmail.test(response)) {
            // const data = criar('user/create', user);
            console.log("User")
            console.log(user)
            if (user.nome == undefined) {
                setUser(prevUser => ({
                    ...prevUser,
                    email: response
                }));
            }
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
    }

    const selectOption = (event) => {
        const option = event.target.title;
        const optionToSelect = option.split(' ')[2].charAt(0).toUpperCase() + option.split(' ')[2].slice(1);

        setMessages(prevMessages => [
            ...prevMessages,
            { sender: 'client', text: option }
        ]);

        setResponse(optionToSelect)
    }

    return (
        <div className="containerChat">
            <div id="ChatMessages" className="containerChatMessages">
                {messages.map((msg, index) => (
                    <div key={index} className={msg.sender === 'bot' ? 'containerBotMessage' : 'containerClientMessage'}>
                        <p className={msg.sender === 'bot' ? 'botMessage bubbleMessage' : 'clientMessage bubbleMessage'}>
                            {Array.isArray(msg.text) ? (
                                msg.text.map((option, idx) => (
                                    <span key={idx} className="spanLink" title={option} onClick={e => selectOption(e)}>
                                        {option}
                                        {idx < msg.text.length - 1 && <br />}
                                    </span>
                                ))
                            ) : (
                                <span>{msg.text}</span>
                            )}
                        </p>
                    </div>
                ))}
            </div>
            <div className="containerChatInput">
                <input
                    type="text"
                    id="inputChat"
                    placeholder="Digite aqui..."
                    className="inputChat"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && sendMessage()}
                />
                <button className="btnChat" onClick={sendMessage}>
                    <i className="bi-arrow-up-short arror-up"></i>
                </button>
            </div>
        </div>
    )
}

export default Chat;
