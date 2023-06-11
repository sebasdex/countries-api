import { createContext, useState, useEffect } from "react";

const CountryContext = createContext();

function CountryProvider({ children }) {
    const [countries, setCountries] = useState(null);
    const [filterName, setFilterName] = useState(null);
    const [filterSelect, setFilterSelect] = useState('');
    const [theme, setTheme] = useState(false);

    useEffect(() => {        
        //Localstorage Get
        const getData = localStorage.getItem('theme');
        if (getData) {
            setTheme(JSON.parse(getData));
        }
        countriesAll();
    }, []);

    useEffect(() => {
        if (theme) {
            document.body.style.backgroundColor = 'hsl(207,26%,17%)';
            return;
        }
        document.body.style.backgroundColor = 'white';       
    }, [theme]);

    function handleTheme() {
        setTheme(!theme);
        localStorage.setItem('theme', JSON.stringify(!theme));
    }

    async function countriesAll() {
        try {
            const url = await fetch(`https://restcountries.com/v3.1/all`);
            const result = await url.json();
            setCountries(result);
        } catch (error) {
            console.log('Error encontrado', error);
        }
    }

    function handleChange(e) {
        const searchName = countries.filter(item => item.region.toLowerCase().includes(e.target.value))
        setFilterName(searchName);
        setFilterSelect(e.target.value);
    }

    function handleName(e) {
        const searchName = countries.filter(item => item.name.common.toLowerCase().includes(e.target.value) && item.region.toLowerCase().includes(filterSelect))
        setFilterName(searchName);
    }


    return (
        <CountryContext.Provider value={{
            countries,
            setCountries,
            filterName,
            setFilterName,
            filterSelect,
            setFilterSelect,
            theme,
            setTheme,
            handleTheme,
            handleChange,
            handleName
        }}>
            {children}
        </CountryContext.Provider>
    )
}

export {
    CountryProvider
}

export default CountryContext