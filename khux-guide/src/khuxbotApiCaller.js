const baseUrl = 'https://www.khuxbot.com'
const apiBaseUrl = `${baseUrl}/api/v2`

const prefixImageLinks = (medal) => {
    return {
        ...medal,
        image_link: `${baseUrl}${medal.image_link}`
    }
}

export const filterItens = (parameters) => {
    const uri = `${apiBaseUrl}/get`
    const requestInfo = {
        method: 'POST',
        body: JSON.stringify(parameters),
        headers: {
            'Content-type': 'application/json'
        }
    }

    return fetch(uri, requestInfo)
        .then(response => response.json())
        .then(itens => itens.map(prefixImageLinks))
} 