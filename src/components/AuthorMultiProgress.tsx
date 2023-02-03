import AuthorProgress from "./AuthorProgress";
import { AuthorMultiProgressType, PoetryURL } from "src/type-definitions";

interface Props {
    authorMultiProgress: AuthorMultiProgressType
    url: PoetryURL
}

function AuthorMultiProgress({authorMultiProgress} : Props) {
    let allProgressComponents = [];
    for (const [url, {authorName, percentage}] of Object.entries(authorMultiProgress)) {
        allProgressComponents.push(
            <AuthorProgress 
                {...{authorName, percentage, url}}
                key={authorName} 
            /> 
        )
    }
    return (
        <div>
            {allProgressComponents}
        </div>
    )
}

export default AuthorMultiProgress;