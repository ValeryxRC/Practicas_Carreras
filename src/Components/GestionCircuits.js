import React from "react";
import Vehicule from "../Class/Vehicules/Vehicule";
import Bike from "../Class/Vehicules/Bike";
import Car from "../Class/Vehicules/Car";
import Participant from "../Class/Participant";
import rainy from "../assets/time/rain.gif";
import wet from "../assets/time/humedo.gif";
import dry from "../assets/time/sun.gif";


export default function GestionCircuits({ circuites, setMostrarST, mostrarST, setIniciar, iniciar}) {
    function estadisticas() {
        console.log(circuites);
        let selectedIndex = document.getElementById("selec_circuit").value;
        let selectedCircuit = circuites[selectedIndex];
        if (!selectedCircuit) {
            console.error("Error: Circuito no encontrado");
            return;
        }
        let name = selectedCircuit.name;
        let time = selectedCircuit.time;
        let distance = selectedCircuit.long;
        setMostrarST(true);
        setIniciar(selectedCircuit);
        let timeImage;
            switch (time) {
            case "rainy":
                timeImage = rainy;
                break;
            case "wet":
                timeImage = wet;
                break;
            case "dry":
                timeImage = dry;
                break;
            }

        document.getElementById('estadisticasCir').innerHTML = `
            <div>
            <h3>Name:</h3><p>${name}</p>
            <h3>Time:</h3><p><img src=${timeImage}></img></p>
            <h3>Long</h3><p>${distance}</p>
            </div>
        `;
    }

    return (
        <div id="container" class="GC">
            <div><h1>Circuit Gestion</h1></div>
            <div>
                <div>
                    <label>Circuit
                        <select id="selec_circuit">
                            {circuites.map((option, index) => (
                                <option key={option.name} value={index}>{option.name}</option>
                            ))}
                        </select>
                    </label>
                    <button onClick={estadisticas}>Cargar</button>
                </div>
                <div id="estadisticasCir">
                    {/* Contenido dinámico */}
                </div>
            </div>
        </div>
    );
}

