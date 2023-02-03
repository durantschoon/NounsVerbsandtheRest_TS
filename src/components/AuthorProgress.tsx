import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

import { AuthorProgressData, PoetryURL } from "src/type-definitions";

var randomColor = '#'+Math.floor(Math.random()*0xFFFFFF).toString(16).padStart(6, '0');

function AuthorProgress({authorName, percentage}: AuthorProgressData, url: PoetryURL) {
    return (
        <Box id="progress-box" sx={{ width: '90%', margin: '1rem' }}>
          <LinearProgress 
            variant="determinate" 
            value={percentage} 
            aria-describedby="progress-box"
            aria-busy={percentage < 100 ? true : false}
          />
          <i>{authorName}</i>
          {url && `<br/>${url}`}
        </Box>
    )
}

export default AuthorProgress
