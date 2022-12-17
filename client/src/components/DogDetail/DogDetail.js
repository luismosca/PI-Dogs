import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDogDetail } from "../../redux/actions/actions";
import Navbar from '../Nav/Navbar';
import "./DogDetail.css";

const DogDetail = (props) => {
  
  console.log("Estoy en DogDatail con ID: ", props.match.params.id)
  
  const dispatch = useDispatch();
  const {id} = useParams()
  
  const dog = useSelector((state) => state.dogDetails);
  useEffect(() => {
    dispatch(getDogDetail(id))
  }, [dispatch, id])
  
  return (
      <div>
        <Navbar showSearch={false}/>
        <h1>Dog Detail</h1>
        <div className="full">
          <div className="info">
            <div className="image">
              <img src={dog.image} alt={dog.name} /> 
              <div>
                <h1>{dog.name} </h1>
                <h5>{dog.temperament}</h5>
              </div>
          </div>
          <div className="details">
            <div className="text">
              <h2>About this dog:</h2>
              <p>Height: {dog.height} cm.</p>
              <p>Weight: {dog.weight} kg.</p>
              <p>Life: {dog.life_span}</p>
          </div>
                    
        </div>
      </div>
      <Link to="/home">
        <button className="button" type="submit">Back</button>
      </Link>
      </div>    
    </div>
    )
}

export default DogDetail
