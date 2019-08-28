import config from './config'

const {apiKey} = config
const URL = `http://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=:country&api_key=${apiKey}&format=json`

/* Obtiene el top con la información de los artistas para un pais en especifico*/
export default function getArtist(country)
{
    /* fetch devuelve un objeto el cual maneja diferentes metodos
    como por ejemplo json()
    */
    let url = URL.replace(":country", country);
    return fetch(url)
    .then(res => res.json())
    .then(json => json.topartists.artist)
}