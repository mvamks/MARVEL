import {Component} from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';


class  CharList extends Component {
    state = {
        characters: [],
        loading: true,
        error: false,
        offset: 210, 
        newItemLoading: false, //Флаг загрузки новых персонажей
        charEnded: false
    };

    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest();
        window.addEventListener('scroll', this.onLoadByScroll);
        
        /* this.marvelService.getAllCharacters()
        .then(this.loadCharacters )
        .catch(this.onError) */
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onLoadByScroll);
    }

    onLoadByScroll = async () => {
        if (this.state.loading) return; // Если уже загружается - не вызываем снова

        let scrollHeight = Math.max(
            (document.documentElement.scrollHeight, document.body.scrollHeight)
        );
        if(
            Math.floor(window.scrollY + document.documentElement.clientHeight) >= scrollHeight
        ) {
            this.setState({loading: true}); // Устанавливаем флаг загрузки

            try {
                await this.onRequest(this.state.offset);
            } finally {
                this.setState({loading: false});  // Сбрасываем флаг после загрузки
            };
        } 
    };


    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService.getAllCharacters(offset)
            .then(this.loadCharacters )
            .catch(this.onError)
    }

    onCharListLoading = () => {
        this.setState ({
            newItemLoading: true
        })
    }

    loadCharacters = (newCharacters) => {
        let ended = false;
        if (newCharacters.length < 9) {
            ended = true;
        }

        this.setState(({ offset, characters}) => ({
            characters: [...characters, ...newCharacters],
            loading: false, 
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended
        }))
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }       
    
    // Этот метод создан для оптимизации, 
    // чтобы не помещать такую конструкцию в метод render

    renderItems(arr) {
        const items = arr.map((item) => {
            const isImageNotAvailable = item.thumbnail.includes('image_not_available');
            const imgStyle = isImageNotAvailable ? { objectFit: 'unset' } : { objectFit: 'cover' };
        
            return (
                <li className="char__item"
                    key={ item.id }
                    onClick={() => this.props.onCharSelected(item.id)}>
                    <img src={item.thumbnail} 
                        alt={item.name} 
                        className="char__img"
                        style={imgStyle}
                    />
                    <div className="char__name">{item.name}</div> 
                </li>
            )
        });
        return(
            <ul className="char__grid">
                {items}
            </ul>   
        )
    }
    

    render () {
        const {characters, loading, error, offset, newItemLoading, charEnded} = this.state;
        const items = this.renderItems(characters);

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;
        
        
        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button className="button button__main button__long"
                        disabled={newItemLoading}
                        style={{'display': charEnded ? 'none' : 'block'}}
                        onClick={() => this.onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        );
    }
}
   
export default CharList;