import React, { useEffect, useState } from "react";
import { get, post } from "../../utils/Fetch";

import './Chat.css';

function Chat() {
    const [questions, setQuestions] = useState([
        {question: "Olá, tudo bem ?"},
        {question: "Como podemos te ajudar ?", options: ["Informações de transação", "Informações de conta", "Informações de perfil"]},
        {question: "Informe-nos seu cpf -"},
        {question: "Esse email não corresponse ao CPF:: "},
        {question: "Nenhum registro encontrado do CPF:: "},
        {question: "Mensagem não reconhecida !"}
    ]);
    const [messages, setMessages] = useState([]);
    const [response, setResponse] = useState('');
    const [input, setInput] = useState('');
    const [user, setUser] = useState({});
    const [option, setOption] = useState({});
    
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

    useEffect(() => {
        if (user.usuario_id) {
            setQuestions(prevQuestions => verifQuestions(prevQuestions, { question: "Processando..." }));
        } else {
            setQuestions(prevQuestions => verifQuestions(prevQuestions, { question: "Informe-nos seu email -" }));
        }
    }, [user]);

    const verifQuestions = (objeto, body) => {
        const exist = objeto.some(prevObject => JSON.stringify(prevObject) == JSON.stringify(body));
        if (!exist) {
            return [ ...objeto, body ];
        }
        return objeto;
    }

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

    const obterUser = async (param) => {
        let usuario = await get(param);
        if (usuario.length == 0) {
            setUser(usuario[0]);
        }
        return usuario[0];
    }

const obter = async (param) => {
        return await get(param);
    }

    const criar = async (param, body) => {
        let usuario = await post(param, body);
        if (usuario.ok) {
            setUser(usuario);
        } else if (usuario == 23000) {
            setMessages(prevMessages => [
                ...prevMessages,
                { sender: 'bot', text: questions[3].question }
            ]);
        }
    }

    const createUser = () => {
        const objectUser =  {cpf: user.cpf, email: response, senha: user.cpf.slice(7)};
        criar('user/create', objectUser);
    }

    const showInfo = () => {

    }

    const showError = () => {
        setMessages(prevMessages => [
            ...prevMessages,
            { sender: 'bot', text: questions[5].question }
        ]); 
        const timeout = setTimeout(() => {
            initBotMessages();
        }, 1000);

        return () => clearTimeout(timeout);
    }

    const formatJson = (jsonObject) => {
        const keys = Object.keys(jsonObject);
        const result = [];
        for (const key of keys) {
            if (key != "conta_id" && key != "usuario_id") {
                result.push(key.replace('_', ' ') + '- ' + jsonObject[key]);
            }
        }
        return result;
    }

    const verifOption = async (dataUser) => {
        let url;
        const email = dataUser.email ? dataUser.email : '';
        switch (option) {
            case 'Conta':
                url = `account/findAllByUserEmail/${email}`;
                break;
            case 'Perfil':
                url = `user/detailByCpf/${email}`;
                break;
            case 'Transação':
                url = `transaction/findByUserEmail/${email}`;         
                break;
            default:
                break;
        };
        const datas = await obter(url);

        if (datas) {
            for (const data of datas) {
                const result = formatJson(data);

                setMessages(prevMessages => [
                    ...prevMessages,
                    { sender: 'bot', text: result }
                ]);
            }
        } else {
            setMessages(prevMessages => [
                ...prevMessages,
                { sender: 'bot', text: questions[4].question + dataUser.cpf }
            ]);
        }

        setMessages(prevMessages => [
            ...prevMessages,
            { sender: 'bot', text: questions[1].options }
        ]);

    }

    const solicitar = async () => {
        const regexEmail = /^[a-zA-Z]+[^@]*@[a-zA-Z]+[^@]*\.[a-zA-Z]+[^@]*$/;
        const regexCpf = /^\d{11}$/;

        if (
            response.toLowerCase().includes('transação') || response.toLowerCase().includes('transacao') ||
            response.toLowerCase().includes('conta') || response.toLowerCase().includes('perfil')
        ) {
            if (user.cpf && user.email) {
                verifOption();
            } else {
                setMessages(prevMessages => [
                    ...prevMessages,
                    { sender: 'bot', text: questions[2].question }
                ]);
            } 
            
        } else if (regexCpf.test(response)) {
            const data = await obterUser(`user/detailByCpf/${response}`);

            if (!data) {
                setUser(prevUser => ({
                    ...prevUser,
                    cpf: response
                }));
                setMessages(prevMessages => [
                    ...prevMessages,
                    { sender: 'bot', text: questions[6].question }
                ]); 
            } else {
                verifOption(data);
            }
        } else if (regexEmail.test(response)) {
            if (user.usuario_id) { 
                console.log('legal');
            } else {
                createUser();
            }
            verifOption();
        } else {
           showError(); 
        }
    }

    const selectOption = (event) => {
        const option = event.target.title;
        const optionToSelect = option.split(' ')[2].charAt(0).toUpperCase() + option.split(' ')[2].slice(1);

        setMessages(prevMessages => [
            ...prevMessages,
            { sender: 'client', text: option }
        ]);

        setOption(optionToSelect);
        setResponse(optionToSelect);
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
