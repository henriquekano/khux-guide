import XMLParser from 'react-xml-parser'

const baseUrl = 'https://api.sp.kingdomhearts.com/information'

export const latest = () => {
    return fetch(`${baseUrl}/list`)
        .then(html => html.text())
        .then(text => new XMLParser().parseFromString(text))
        .then(xml =>
            xml.getElementsByTagName('li')
                .map( item => item.children)
        )
        .then(newsInformations => {
            return newsInformations.map( news => {
                const date = news.find(item => item.attributes.class === 'date').value
                const title = unescape(news.find(item => item.attributes.class === 'subject').value)
                const detailsPage = baseUrl + news.find(item => item.attributes.class === 'subject').attributes.href
                const type = news.find(item => item.attributes.class.includes('news_cat')).value

                return {
                    date, title, type, detailsPage
                }
            })
        })
}
