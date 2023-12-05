import React from "react";
import Vehicule from "../Class/Vehicules/Vehicule";
import Bike from "../Class/Vehicules/Bike";
import Car from "../Class/Vehicules/Car";
import Participant from "../Class/Participant";


export default function GestionParticipants({ participants }) {
    function estadisticas() {
        let selectedIndex = document.getElementById("selec_participants").value;
        let selectedParticipant = participants[selectedIndex];
        
        if (!selectedParticipant) {
            console.error("Error: Participante no encontrado");
            return;
        }

        let name = selectedParticipant.name;
        let bike = selectedParticipant.vehicule;
        let first = selectedParticipant.clasif[0];
        let second = selectedParticipant.clasif[1];
        let three = selectedParticipant.clasif[2];

        document.getElementById('estadisticasC').innerHTML = `
            <div id='datosPAR'>
            <h3>Name:</h3><p>${name}</p>
            <h3>Vehicule:</h3><p>${bike.nameVehicule()}</p>
                <h3 id='es'>Estadisticas:</h3>
                <h5>1°Position</h5><p>${first}</p>
                <h5>2°Position</h5><p>${second}</p>
                <h5>3°Position</h5><p>${three}</p>
            </div>
        `;
    }

    return (
        <div id="container" class="GP">
            <div><h1>Participant Gestion</h1></div>
            <div>
                <div>
                    <label>Participant 
                        <select id="selec_participants">
                            {participants.map((option, index) => (
                                <option key={option.name} value={index}>{option.name}</option>
                            ))}
                        </select>
                    </label>
                    <button onClick={estadisticas}>Cargar</button>
                </div>
                <div id="estadisticasC">
                    {/* Contenido dinámico */}
                </div>
            </div>
        </div>
    );
}

