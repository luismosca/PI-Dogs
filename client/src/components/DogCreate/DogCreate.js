import React, { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createDog, getTemperaments} from "../../redux/actions/actions";
import Navbar from '../Nav/Navbar';
import './DogCreate.css';


const DogCreate = () => {
    const dispatch = useDispatch();
    const temperaments = useSelector((state) => state.temperaments)

    const [dog, setDog] = useState({
        name: "",
        heightMin: "",
        heightMax: "",
        weightMin: "",
        weightMax: "",
        lifeSpan: "",
        image: "",
        temperaments: []
    });

    useEffect(() => {
		dispatch(getTemperaments());
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

    const ChangeInput = (e) => {
		if (e.target.name === 'temperaments') {
			const arr = dog[e.target.name];
			setDog({
				...dog,
				[e.target.name]: arr.concat(e.target.value),
			});
		} else {
			setDog({
				...dog,
				[e.target.name]: e.target.value,
			});
		}
	};

    const handleSubmit = (e) => {
		e.preventDefault();

		const obj = {
			name: dog.name,
			heightMin: dog.heightMin,
            heightMax: dog.heightMax,
			weightMin: dog.weightMin,
            weightMax: dog.weightMax,
			lifeSpan: dog.lifeSpan,
			image: dog.image,
			temperaments: dog.temperaments,
			
		};

        // Validaciones
		if (!obj.name) {
			alert('Hey! falta el nombre.');
			return;
		}
		if (!obj.lifeSpan) {
			alert('Hey! aun falta la Esperansa de vida.');
			return;
		}
		if (!obj.heightMin) {
			alert('Hey! falta la altura minima.');
			return;
		}
        if (!obj.heightMax) {
			alert('Hey! falta la altura maxima.');
			return;
		}
        if (!obj.weightMin) {
			alert('Hey! falta el peso minimo.');
			return;
		}
        if (!obj.weightMax) {
			alert('Hey! falta el peso maximo.');
			return;
		}
		if (obj.heightMin > obj.heightMax) {
			alert('Hey! la altura minima no puese ser mayor que la altura maxima.');
			return;
		}
        if (obj.weightMin > obj.weightMax) {
			alert('Hey! el peso minimo no puese ser mayor que el peso maximo.');
			return;
		}

        dispatch(createDog(obj));
		e.target.reset();
		alert('Dog creado correctamente !');

        setDog({
            name: "",
            heightMin: "",
            heightMax: "",
            weightMin: "",
            weightMax: "",
            lifeSpan: "",
            image: "",
            temperaments: []
        })

    };

    return (
        <div>
            <Navbar showSearch={false}/>
            <h1>Create DOG</h1>
            <h3>Complete las caracteristicas de su nuevo Dog</h3>
            <form id='survey-form'
				className='form'
				noValidate
				onChange={(e) => ChangeInput(e)}
				onSubmit={(e) => handleSubmit(e)}>
                <div>
					<div>
						<div className='divTitles'>
							<div>
								<label>-Name: </label>
								<input
									className='label'
									type='text'
									name='name'
									value={dog.name}
								></input>
							</div>
                            <div>
								<label>-Height: Minima: </label>
								<input
									className='label'
									type='text'
									name='description'
									value={dog.heightMin}
								></input>
                                <label> Máxima: </label>
								<input
									className='label'
									type='text'
									name='description'
									value={dog.heightMax}
								></input>
							</div>
                            <div>
								<label>-Weight: Minima: </label>
								<input
									className='label'
									type='text'
									name='description'
									value={dog.weightMin}
								></input>
                                <label> Máxima: </label>
								<input
									className='label'
									type='text'
									name='description'
									value={dog.weightMax}
								></input>
							</div>
                            <div>
								<label>-Life Span: </label>
								<input
									className='label'
									type='text'
									name='released'
									value={dog.lifeSpan}
								></input>
							</div>
                        </div>
                        <div className='imagediv'>
							<label>-Image URL: </label>
							<input
								className='imagein'
								type='text'
								name='image'
								value={dog.image}
							></input>
						</div>
                    </div>
                    <div className='checkboxs'>
						<div className='checks'>
							<label>-Temperaments: </label>
							<div className='gendivs'>
								<div>
									{temperaments.map((ten) => (
										<div key={ten.name}>
											<input
												type='checkbox'
												name='temperaments'
												value={ten.name}
											></input>
											<label name={ten}>{ten.name}</label>
										</div>
									))}
								</div>
								
							</div>
						</div>
						
					</div>
                       
                </div>
                <button className='button' type='submit'>
						CREAR!
					</button>
            </form>
        </div>
    )
}

export default DogCreate
