import CountryContext from "../context/CountryProvider"
import { useContext } from "react"

function Header() {
    const {theme, handleTheme} = useContext(CountryContext);
    
    return (
        <header className={`${!theme ? 'bg-white' : 'bg-[hsl(209,23%,22%)] text-white'} h-40 shadow-md flex justify-between items-center px-5`}>
            <h1 className='font-bold lg:text-xl'>Where in the world?</h1>
            <div className='flex gap-2'>
                <button className="material-symbols-outlined" onClick={handleTheme}>dark_mode</button>
                <p className="lg:text-xl">Dark Mode</p>
            </div>
        </header>
    )
}

export default Header