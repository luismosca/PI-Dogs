import React, { useEffect } from "react";
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
    
    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search)
        dispatch(getAllDogs())
        if (queryParams.get("search")) {
            dispatch(getDogByName(queryParams.get("search")))
        }
    }, [dispatch])
    console.log(dogSearch)
    console.log(allDogs)
    if(error){
        return(
        <>
        <p>{error}</p>
        </>
        )
    }else if(dogSearch.length){
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
                    weight={dog.weight.metric}
                    image={dog.image.url}
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
