import React from "react";
import Vehicule from "../Class/Vehicules/Vehicule";
import Bike from "../Class/Vehicules/Bike";
import Car from "../Class/Vehicules/Car";
import Participant from "../Class/Participant";

export default function NewParticipant({vehicules, setParticipants, participants, setMostrarNGP, mostrarNGP}) {
    console.log(vehicules);
    function createParticipant() {
        let nick = document.getElementById("nick").value;
        let selectedIndex = document.getElementById("selec_vehicules").value;
        let selectedVehicule = vehicules[selectedIndex];
        let ve = selectedVehicule;
        // Verificar que todos los campos estén llenos
        if (!nick) {
            alert("Por favor, complete todos los campos.");
            return;
        }
        let participan = new Participant(nick, ve);
        //participants.push(participan);
        // Buscar si ya existe un participante con el mismo nombre (nick)
        let existingParticipant = participants.find(participant => participant.name === nick);

        if (existingParticipant) {
            // El participante ya existe, puedes manejarlo como desees (por ejemplo, mostrar un mensaje de error)
            alert("Ya existe un participante con el mismo NOMBRE .");
        } else {
            // El participante no existe, puedes agregarlo al array
            if(participants.find(vUse =>vUse.vehicule.nameVehicule() === selectedVehicule.nameVehicule())){
                alert("Vehiculo ya en Uso")
                return;
            }
            setParticipants([...participants, participan]);
            setMostrarNGP(true);
            console.log(participants);
        }
    }
    return (<div id="container">
        <div>
        <div><h1>New Participant</h1></div>
          <label>Name<input id="nick" type="text"></input></label>
          <label>Vehicules 
            <select id="selec_vehicules">
                {vehicules.map((option,index)=>(
                    <option value={index}>{option.nameVehicule()}</option>
                ))}
            </select>
            </label>
          <div> <button onClick={createParticipant}>New Participant</button></div>
        </div>
    </div>);
}