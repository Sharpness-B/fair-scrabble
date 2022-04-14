import { checkSymbol } from "./checkSymbol";
import { checkUib } from "./checkDict";

async function isSymbol(word) {
    const data = await checkUib(word)

    if (!data.article.length) return false
    
    const articleID = data.article[0]

    const wordIsSymbol = await checkSymbol(articleID)

    return wordIsSymbol
}

export {isSymbol}