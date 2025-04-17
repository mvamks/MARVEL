import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import PropTypes from 'prop-types';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import './charInfo.scss';


const CharInfo = (props) => {
    const [char, setChar] = useState(null);
    const location =  useLocation();
    

    /* state = {
        char: null,
        loading: false,
        error: false
    } */

    const {loading, error, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateChar();
    }, [props.charId])

    

    /* componentDidMount() {
        this.updateChar();
    } */

   /*  componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    } */

    const updateChar = () => {
        const charId = props.charId || 1010338;
        if (!charId) {
            return;
        }

        clearError();
        getCharacter(charId)
            .then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        console.log('Загруженный персонаж:', char);
        setChar(char);
        /* this.setState({
            char,
            loading: false
        }) */
    }

        //const {char, loading, error} = this.state;

    const skeleton =  char || loading || error ? null : <Skeleton/>;
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char} location={location}/> : null;


    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}   
        </div>
    )      
}

const View = ({char, location}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;
    const isImageNotAvailable = thumbnail.includes('image_not_available');
    const imgStyle = isImageNotAvailable ? { objectFit: 'contain' } : { objectFit: 'cover' };
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt="{name}" style={imgStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : 'There is no comics with this character'}
                {
                    comics.map((item, i) => {
                         // eslint-disable-next-line
                        if (i >= 10 || !item?.resourceURI) return null; 
                        const comicId = item.resourceURI.split('/').pop();
                        
                        return (
                            <li className="char__comics-item" key={i}>
                                <Link to={{
                                    pathname: `/comics/${comicId}`,
                                    state: { from: location }, // передаем состояние с текущим путем
                                }}>
                                    {item.name}
                                </Link> 
                            </li>
                        );     
                    })
                }                
            </ul>
        </>  
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;