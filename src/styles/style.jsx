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
    overflow: hidden;
    background-color: #F8F7F5;
    
    --main-color: #182026;
    --second-color: #5564D3;
    --third-color: #A7ADE4;
    --fourth-color: #858996;
}

*, html, body{
    cursor: default;
}
`