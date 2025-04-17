import { useState } from "react";

import AppBanner from "../appBanner/AppBanner";
import ComicsList from "../comicsList/ComicsList";

const ComicsPage = () => {
    const [selectedComics, setSelectadComics] = useState(null);
        
       /*  state = {
            selectedChar: null
        } */
    const onComicsSelected = (id) => {
        setSelectadComics(id);
        
        /* this.setState({
            selectedChar: id
        }) */
    }

    return(
        <>
            <AppBanner/>
            <ComicsList onComicsSelected={onComicsSelected} />
        </>
    )
}
export default ComicsPage;