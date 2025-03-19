

class MarvelService{
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=5612e8f1e5717d96da3d398dd24946bf';
    _baseOffset = 210;
    
    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = async (offset = this._baseOffset) => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (char) => {
        if(!char.description) {
            char.description = 'There is no character description at the moment.'
        }
        if(char.description.length > 220) {
            char.description = char.description.slice(0,215) + '...';
        }
        let comics = char.comics.items;
        if (comics.length === 0) {
            comics = [{name: 'There are no comics for this character at the moment.'}];
        }
        return {
            id: char.id,
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension ,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: comics
        }
    }
 }

 export default MarvelService;

