import { useContext, useEffect } from "react"
import CountryContext from "../context/CountryProvider"
import { useNavigate } from "react-router-dom";
function Main() {
    const navigate = useNavigate();
    const { countries, filterName, setFilterName, theme, handleChange, handleName } = useContext(CountryContext);

    useEffect(() => {
        setFilterName(countries);
    }, [countries]);    

    return (
        <main className='mt-10'>
            <div className="flex flex-col md:flex-row md:justify-between md:mb-10">
                <div className="relative md:w-1/3 rounded-md">
                    <label htmlFor='search' className="material-symbols-outlined absolute top-2 left-2 p-2 text-slate-400">search</label>
                    <input type="text" name='search'
                        className={`${theme ? 'bg-[hsl(209,23%,22%)] text-white' : 'bg-white'} p-4 pl-20 w-full shadow-md outline-none`}
                        placeholder='Search for a country...'
                        onChange={handleName} />
                </div>
                <select name="filter" className={`${!theme ? 'bg-white' : 'bg-[hsl(209,23%,22%)] text-white'} p-5 mt-10 mb-5 w-52 md:m-0 md:p-0 md:px-5 shadow-md`}
                    onChange={handleChange}>
                    <option value="">Filter by Region</option>
                    <option value="africa">Africa</option>
                    <option value="america">America</option>
                    <option value="asia">Asia</option>
                    <option value="europe">Europe</option>
                    <option value="oceania">Oceania</option>
                </select>
            </div>
            <section className="grid grid-cols-1 md:grid-cols-4 gap-10 rounded-md">
                {filterName?.sort((a, b) => a.name.common.localeCompare(b.name.common))
                    .map((item, index) =>
                        <div className={`${!theme ? 'bg-white' : 'bg-[hsl(209,23%,22%)] text-white'} w-full mt-5 pb-10 shadow-md rounded-md`} key={index}>

                            <img src={item.flags.svg} alt={item.flags.alt} className="object-cover object-center w-full h-60 rounded-t-md" 
                            onClick={()=> navigate(`/${item.cca3}`)} />

                            <p className="font-bold text-xl px-8 mt-10 mx-2 ">{item.name.common}</p>
                            <div className="px-8 pt-5 text-lg  m-2">
                                <p>Population: {item.population}</p>
                                <p>Region: {item.region}</p>
                                <p>Capital: {item.capital}</p>
                            </div>
                        </div>
                    )}
            </section>




        </main>
    )
}

export default Main