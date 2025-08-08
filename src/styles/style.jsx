import { createGlobalStyle } from "styled-components";
export const GlobalStyle = createGlobalStyle`

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    scroll-behavior: smooth;
}

html{
    scroll-behavior: smooth;
}

body{
    background-color: #FFFCF3;
    
    --title-color: #1E4246;
    --subtitle-color: #798661;
    --text-color: #8DB447;
}

*, html, body{
    cursor: default;
}
`