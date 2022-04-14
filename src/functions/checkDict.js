// https://ord.uib.no/ord_2_API.html

async function checkUib(w, dict="bm") {
    const url = "https://ord.uib.no/api/articles?"

    const parameters = {
        w: w,
        dict: dict,
        scope: "ei"
    }

    const reponse = await fetch( url + new URLSearchParams( parameters ) )

    const data = await reponse.json()


    
    let resultCount = 0

    if (data.meta.bm) resultCount += data.meta.bm.total
    if (data.meta.nn) resultCount += data.meta.nn.total

    const isWord = resultCount > 1



    let articles = []

    if (data.articles.bm) articles= [...articles, ...data.articles.bm]
    if (data.articles.nn) articles= [...articles, ...data.articles.nn]



    return {isWord: isWord, article: articles}
}

export {checkUib}