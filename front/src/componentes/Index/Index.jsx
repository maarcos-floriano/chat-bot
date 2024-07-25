import React from "react";
import "./Index.css"

function Index() {

    function openModal() {
        fetch(`http://localhost:5050/chat/createChat`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                
            })
        })
        .then()
        .catch()
    }

    return (
        <div className="containerIndex">
            <button 
                className="btn_chat"
                onMouseEnter={() => openModal()}>
                Chat
            </button>
        </div>
    )
}

export default Index;