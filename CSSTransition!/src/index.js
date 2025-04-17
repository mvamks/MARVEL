import React from 'react'; 
import ReactDOM from 'react-dom/client';
import App from './components/app/App';


import "./style/style.scss";
 
ReactDOM
    .createRoot(document.getElementById("root"))
    .render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );


/* import { createRoot } from "react-dom/client";
import App from "./components/app/App";

import "./style/style.scss"; */

/* const marvelService = new MarvelService();

marvelService.getAllCharacters()
    .then(characters => console.log(characters))
    .catch(error => console.error('Ошибка:', error)); */

/* const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />); */
