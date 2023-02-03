import AuthorProgress from "./AuthorProgress";
import { 
    AuthorLoadingProgress,
    AuthorMultiProgressType,
    PoetryURL,
} from "src/type-definitions";
import { authorLoadingProgress } from "src/type-definitions.zod";

interface Props {
    authorMultiProgress: AuthorLoadingProgress[]
}

function AuthorMultiProgress({authorMultiProgress} : Props) {
    return (
        <div>
            {authorMultiProgress instanceof Array && 
                authorMultiProgress.map(
                    ({authorName, percentage, url}: AuthorLoadingProgress) => (
                        <AuthorProgress 
                            {...{authorName, percentage, url}}
                            key={authorName} 
                        /> 
                ))}
        </div>
    )
}

export default AuthorMultiProgress;