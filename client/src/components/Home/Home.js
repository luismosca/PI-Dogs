import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../../components/Nav/Navbar';
import DogsCards from "../Dogs/DogsCards";
import { getAllDogs, getDogByName } from "../../redux/actions/actions";
import '../Home/Home.css'

const Home = () => {
    const dispatch= useDispatch()
    const error = useSelector(state=>state.error)
    const allDogs = useSelector(state=>state.allDogs)
    const dogSearch = useSelector(state=>state.dogSearch)
    const queryParams = new URLSearchParams(window.location.search)
    const [queryParam, setQueryParam] = useState(queryParams.get("search") ? queryParams.get("search") : "home")
    
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
    
            <div className="cardContainer">
                {dogSearch.map(dog=>{
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
        //console.log(allDogs)
        return (
            <>
            <Navbar showSearch={true}/>
            <h3>Home - Dogs Cards</h3>
    
            <div className="cardContainer">
                {allDogs.map(dog=>{
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
