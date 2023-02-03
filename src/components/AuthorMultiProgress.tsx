import AuthorProgress from "./AuthorProgress";
import { AuthorProgressData } from "src/type-definitions";

interface Props {
    authorMultiProgress: AuthorProgressData[]
}

function AuthorMultiProgress({authorMultiProgress} : Props) {
    return (
        <div>
            {authorMultiProgress instanceof Array && 
                authorMultiProgress.map(
                    ({authorName, percentage, url}: AuthorProgressData) => (
                        <AuthorProgress 
                            {...{authorName, percentage, url}}
                            key={authorName} 
                        /> 
                ))}
        </div>
    )
}

export default AuthorMultiProgress;