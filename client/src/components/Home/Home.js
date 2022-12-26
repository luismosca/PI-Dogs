import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../../components/Nav/Navbar';
import DogsCards from "../Dogs/DogsCards";
import { getAllDogs, getDogByName } from "../../redux/actions/actions";
import '../Home/Home.css'
import Paginado from "../Pagination/Paginado";
import FilteredBy from '../../components/Filter/Filter';
//import { all } from "axios";

const Home = () => {
    const dispatch= useDispatch()
    
    //estado de filtrado y ordenamiento
    // const filteredDogs = useSelector((state) => state.filteredDogs);
	// const filterBy = useSelector((state) => state.filterBy);
	// const orderBy = useSelector((state) => state.orderBy);

    //estado de los Dogs
    const error = useSelector(state=>state.error)
    const allDogs = useSelector(state=>state.allDogs)
    const dogSearch = useSelector(state=>state.dogSearch)
    const filteredDogs = useSelector(state=>state.filteredDogs)
    const queryParams = new URLSearchParams(window.location.search)
    const [queryParam, setQueryParam] = useState(queryParams.get("search") ? queryParams.get("search") : "home")
    
    console.log(filteredDogs)

    //Set pages en 8
    //estado para las paginas
    const [currentPage, setcurrentPage] = useState(1)
    const [dogsPerPage, setdogsPerPage] = useState(9)
    const indexOfLastDog = currentPage * dogsPerPage
    const indexOfFirstDog = indexOfLastDog - dogsPerPage
    let currentDogs = []
    let currentSDogs = []
    filteredDogs.length ? currentDogs = filteredDogs.slice(indexOfFirstDog, indexOfLastDog) :
        currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog)
    filteredDogs.length ? currentSDogs = filteredDogs.slice(indexOfFirstDog, indexOfLastDog) : 
        currentSDogs = dogSearch.slice(indexOfFirstDog, indexOfLastDog)

    //Funcion de Paginado
    const paginado = (pageNumber) => {
        setcurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getAllDogs())
    }, [dispatch])

    useEffect(() => {
        setQueryParam("home")
        if (queryParams.get("search")) {
            dispatch(getDogByName(queryParams.get("search")))
            setQueryParam(queryParams.get("search"))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryParams.get("search")]) 

    if(error){
        return(
        <>
        <p>{error}</p>
        </>
        )
    }else if(dogSearch.length && queryParam !== "home"){
        return (
            <>
            <Navbar showSearch={true}/>
            <h3>Search - Dogs Cards</h3>
            <FilteredBy />
            <Paginado
                dogsPerPage={dogsPerPage}
                dogSearch={dogSearch.length}
                paginado = {paginado}
                />
            <div className="cardContainer">
                {currentSDogs.map(dog=>{
                    return <DogsCards
                    id={dog.id}
                    name={dog.name}
                    temperament={dog.temperament}
                    weight={dog.weight}
                    image={dog.image}
                    key={dog.id}
                    />
                    })
                }
            </div>
            </>
        )
    } else if(allDogs.length){
        
        return (
            <>
            <Navbar showSearch={true}/>
            <h3>Home - Dogs Cards</h3>

            <FilteredBy />
            <Paginado
                dogsPerPage={dogsPerPage}
                allDogs={allDogs.length}
                paginado = {paginado}
                />
            <div className="cardContainer">
                {currentDogs.map(dog=>{
                    return <DogsCards
                    id={dog.id}
                    name={dog.name}
                    temperament={dog.temperament}
                    weight={dog.weight}
                    image={dog.image}
                    key={dog.id}
                    />
                    })
                }
                
            </div>
            </>
        )
    } else{
        return(
            <>
            <h1>Loading...</h1>
            </>
        )
    }

    
}

export default Home
