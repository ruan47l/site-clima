
const apiKey = import.meta.env.VITE_API_KEY;

const inputSearch = document.querySelector('#inputSearch')
const search = document.querySelector('#search')


const temperatura = document.querySelector('.temperatura')
const condicao = document.querySelector('#condicao')
const imgClima = document.querySelector('#imgClima') 
const bandeira = document.querySelector('#bandeira')
const humidade = document.querySelector('#humidade')
const vento = document.querySelector('#vento')
const city = document.querySelector('#cidade')
const blocoInformacoes = document.querySelector('.blocoInformacoes')


const getWeatherData = async (cidade) =>{
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${apiKey}&lang=pt_br`

    const res = await fetch(apiWeatherURL)
    const data = await res.json()

    console.log(data)
    return data
}

const showWeatherData = async (cidade) =>{
    const data = await getWeatherData(cidade)
    
    city.innerText = data.name
    temperatura.innerText = parseInt(data.main.temp) + ' graus';
    condicao.innerText = data.weather[0].description;
    imgClima.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
    bandeira.setAttribute('src', `https://flagsapi.com/${data.sys.country}/flat/64.png`)
    humidade.innerText = `${data.main.humidity}%`
    vento.innerText = `${data.wind.speed}km/h`
    
}

search.addEventListener('click', (e) =>{
    e.preventDefault()

    const cidade = inputSearch.value

    showWeatherData(cidade)

    blocoInformacoes.style.display = 'block'

    inputSearch.value = ""
})