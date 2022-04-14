// https://ord.uib.no/ord_2_API.html

async function checkSymbol(article, dict="bm") {
    const url = `https://ord.uib.no/${dict}/article/${article}.json`


    const reponse = await fetch( url )

    const data = await reponse.json()

    const isSymbol = JSON.stringify(data).includes("symbol")

    return isSymbol
}

export {checkSymbol}