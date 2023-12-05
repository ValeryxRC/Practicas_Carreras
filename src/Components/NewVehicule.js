import React from "react";
import Bike from "../Class/Vehicules/Bike";
import Car from "../Class/Vehicules/Car";
import '../Components/styles/styles.css';
export default function NewVehicule({setVehicules, vehicules, setMostrarNP, mostrarNP}) {
    function createVehicule() {
        let model = document.getElementById("model").value;
        let traccion = document.getElementById("traccion").value;
        let min = document.getElementById("min").value;
        let max = document.getElementById("max").value;
        // Verificar que todos los campos estén llenos
        if (!model || !traccion || !min || !max) {
            alert("Por favor, complete todos los campos.");
            return;
        }
        if( min < 0 || max > 100){
            alert("Rango Invalido, por favor, complete bien los campos.")
            return;
        }
        let vehicule;
        if(document.getElementById("type").value == "bike"){
            vehicule = new Bike(model, traccion, min, max);
        }
        if(document.getElementById("type").value == "car"){
            vehicule = new Car(model, traccion, min, max);
        }
        if(vehicules.find(existingVehicule =>existingVehicule.nameVehicule() === vehicule.nameVehicule())){
            alert("Vehiculo ya Existente")
            return;
        }
        //vehicules.push(vehicule);
        setVehicules([...vehicules,vehicule]);
        //setVehicules(vehicules);
        console.log(vehicules);
        setMostrarNP(true);
    }
    return(<div id="container">
        <div><h1>New Vehicule</h1></div>
        <div>
            <label>Model:
                <select id="model">
                    <option >Yamaha</option>
                    <option>Kawassaki</option>
                    <option>Ducati</option>
                    <option>BMW</option>
                    <option>Nissan</option>
                    <option>Ferrari</option>
                </select>
            </label>
            <label>Traccion:
                <select id="traccion">
                    <option>Soft</option>
                    <option>Medium</option>
                    <option>Hard</option>
                </select>
            </label>
            <label>Vehicule:
                <select id="type">
                    <option value="bike">Bike</option>
                    <option value="car">Car</option>
                </select>
            </label>
            <div>
                <label>Min Speed (min:1)
                    <input type="number" id="min" required min={1} max={100}></input>
                </label>
                <label>Max Speed (max:100)
                    <input type="number" id="max" required min={1} max={100}></input>
                </label>
            </div>
            <div>
                <button onClick={createVehicule}>New Vehicule</button>
            </div>
        </div>
    </div>);
}