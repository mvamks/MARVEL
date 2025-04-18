import { useState, useRef } from "react";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import decoration from '../../resources/img/vision.png';

const MainPage = () => {
        const [selectedChar, setSelectadChar] = useState(1010338);
            
       /*  state = {
            selectedChar: null
        } */
        

        const onCharSelected = (id) => {
            setSelectadChar(id);
            
            
            /* this.setState({
                selectedChar: id
            }) */
        }

    return (
        <>
            <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList onCharSelected={onCharSelected}/>
                </ErrorBoundary>
                <ErrorBoundary>
                   <CharInfo charId={selectedChar}/>        
                </ErrorBoundary>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}

export default MainPage;