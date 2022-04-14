// https://ord.uib.no/ord_2_API.html

async function checkUib(w, dict="bm,nn") {
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

    return isWord
}

export {checkUib}