import { useNavigate, useLoaderData } from "react-router-dom";
import { useContext, useEffect } from "react";
import CountryContext from "../context/CountryProvider";
export async function loader({ params }) {
    return params.countryID;
}
function Country() {
    const navigate = useNavigate();
    const country = useLoaderData();
    const { countries, filterName, setFilterName, theme } = useContext(CountryContext);

    useEffect(() => {
        if (countries) {
            countryID();
        }
    }, [countries]);

    function countryID() {
        const filterID = countries.filter(item => item.cca2 === country);
        setFilterName(filterID);
    }

    return (
        <>
            <section className={`px-5 py-8`}>
                <button className={`${theme ? 'text-white bg-[hsl(209,23%,22%)]' : 'text-black'} w-32 shadow-md flex items-center gap-5 p-3`} onClick={() => navigate(-1)}>
                    <span className="material-symbols-outlined">
                        arrow_back
                    </span>
                    Back
                </button>
                {filterName?.map((item, index) =>
                    <section key={index} className={`${theme ? 'text-white' : 'text-black'} grid lg:grid-cols-2 gap-5 lg:gap-20 lg:items-center`}>
                        <img src={item.flags.svg} alt={item.flags.alt}
                            className="object-cover object-center w-full mt-10" />
                        <aside className="grid grid-cols-2 gap-8 items-center">
                            <article className="font-semibold lg:text-lg lg:leading-8 col-span-2 lg:col-span-1">
                                <p className="font-bold mt-8 mb-5 lg:text-3xl">{item.name.common}</p>
                                <p>Native Name:
                                    <span className="font-normal">{' '}{item.name.nativeName && Object.keys(item.name.nativeName).length > 0 ?
                                        Object.values(item.name.nativeName)[Object.values(item.name.nativeName).length - 1].common : null}
                                    </span>
                                </p>
                                <p>Population:
                                    <span className="font-normal">{' '}{item.population}</span>
                                </p>
                                <p>Region:
                                    <span className="font-normal">{' '}{item.region}
                                    </span>
                                </p>
                                <p>Sub Region: <span className="font-normal">{' '}{item.subregion}</span></p>
                                <p>Capital: <span className="font-normal">{' '}{item.capital}</span></p>
                            </article>
                            <article className="font-semibold lg:text-lg lg:leading-8 col-span-2 md:col-span-1">
                                <p>Top Level Domain:<span className="font-normal">{' '}{item.tld}</span></p>
                                <p>Currencies:
                                    <span className="font-normal">{' '}{item.currencies && Object.keys(item.currencies).length > 0 ? Object.values(item.currencies)[Object.values(item.currencies).length - 1].name : null}</span>
                                </p>
                                <p>Languages:
                                    <span className="font-normal">{' '}{item.languages && Object.keys(item.languages).length > 0 ?
                                        Object.values(item.languages).join(', ') : null}
                                    </span>
                                </p>
                            </article>
                            <article className="col-span-2 flex lg:flex-row lg:items-center flex-col  lg:text-lg">
                                <p className="font-semibold mb-10 lg:m-0 w-44">Border Countries:{' '}</p>
                                <p className="font-normal flex items-center gap-5 text-center">
                                    {item.borders && Object.keys(item.borders).length > 0 ? (
                                        item.borders.map((border, index) => (
                                            <span key={index} className={`${theme ? 'text-white bg-[hsl(209,23%,22%)]' : 'bg-white '} shadow-lg w-40 lg:w-20 p-2 md:ml-5`}>
                                                {border}
                                            </span>
                                        ))
                                    ) : (
                                        'No borders found'
                                    )}
                                </p>
                            </article>
                        </aside>
                    </section>
                )}
            </section>
        </>
    )
}

export default Country