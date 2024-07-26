export const get = (params) => {
    try {
        return fetch(`http://localhost:8080/${params}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) return response.json();
            }
        )
    } catch (error) {
        console.log('[ERRO] => '+ error);
        return error;
    }
}

export const post = (params, bodyJson) => {
    try {
        return fetch(`http://localhost:8080/${params}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bodyJson)
            })
            .then(response => {
                if (response.ok) return response.json();
            }
        )
    } catch (error) {
        console.log('[ERRO] => '+ error);
        return error;
    }
}
