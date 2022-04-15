import { checkSymbol } from "./checkSymbol";
import { checkUib } from "./checkDict";

async function isSymbol(word) {
    const data = await checkUib(word)

    if (!data.article.length) return false
    
    const articleID = data.article[0]

    const wordIsSymbol = await checkSymbol(articleID)

    if (wordIsSymbol) {
        alert(`${word} er en forkortelse og gir halvpaprten så mange poeng!`)
    }

    return wordIsSymbol
}

export {isSymbol}