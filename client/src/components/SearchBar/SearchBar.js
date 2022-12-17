import {React, useState} from 'react'
import { useDispatch } from 'react-redux'
import { getDogByName } from '../../redux/actions/actions'
import './SearchBar.css'


export default function SearchBar() {
    const dispatch = useDispatch()

    const [name, setName] = useState("")

    const handleInputChange = (event) => {
      event.preventDefault()
      setName(event.target.value);
    }

    const handleOnClick = (event) => {
      event.preventDefault()
      const queryParams = new URLSearchParams(window.location.search)
      queryParams.set("search", name)
      dispatch(getDogByName(name));
    }

    
    return (
      <div className="searchbar-div">
        <input
          className="bar-btn"
          name="buscar"
          placeholder="Dog Name..."
          onChange={(event) => handleInputChange(event)}
          value={name}
          autoComplete="off"
        ></input>
        <button className="btn" onClick={(event) => handleOnClick(event)}>
          Search Dog
        </button>
      </div>
    );
}



