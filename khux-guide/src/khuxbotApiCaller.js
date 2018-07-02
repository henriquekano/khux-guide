const baseUrl = 'https://www.khuxbot.com'
const apiBaseUrl = `${baseUrl}/api/v2`

const prefixImageLinks = (medal) => {
    return {
        ...medal,
        image_link: `${baseUrl}${medal.image_link}`
    }
}

function flatten(listOfLists) {
    if (listOfLists) {
        let flattenedList = []
        for (let i = 0; i < listOfLists.length; i++) {
            flattenedList = flattenedList.concat(listOfLists[i])
        }
        return flattenedList
    }
    
    return listOfLists
}

const createATierPromiseForEachElement = (list) => {
    const uri = `${apiBaseUrl}/get`
    const requestInfo = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        }
    }

    return list.map(tier => {
        return {
            ...requestInfo,
            body: JSON.stringify({
                "filter": {
                    "tier": tier
                }
            })
        }
    })
    .map(request => {
        return fetch(uri, request)
            .then(response => response.json())
            .then(itens => itens.map(prefixImageLinks))
            .catch(console.log)
    })
}

export const filterItens = (tierFilter) => {
    return Promise.all(createATierPromiseForEachElement(
        tierFilter
    ))
    .then(arrayOfArrays => flatten(arrayOfArrays))
    .then(values => console.log(values) || values)
} 