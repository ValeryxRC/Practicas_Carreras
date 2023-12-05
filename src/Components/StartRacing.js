import React from "react";
import Vehicule from "../Class/Vehicules/Vehicule";
import Bike from "../Class/Vehicules/Bike";
import Car from "../Class/Vehicules/Car";
import Participant from "../Class/Participant";
import { useState } from 'react';
import rainy from "../assets/time/rain.gif";
import wet from "../assets/time/humedo.gif";
import dry from "../assets/time/sun.gif";


export default function StartRacing({ participants,setParticipants, setIniciar, iniciar }) {
  const [selectedParticipantIndex, setSelectedParticipantIndex] = useState(0);

  function moverPersonaje(circuito, index, speed) {
    console.log("circuito.long:", circuito.long);
    let metros = 1000/circuito.long;
    console.log("metros:", metros);

    let divs = document.getElementsByClassName("partPista");
    
    
    if (index >= 0 && index < divs.length) {
      console.log("Estilo actual:", divs[index].style.marginLeft);
      divs[index].style.marginLeft = metros * speed + "px";
    } else {
      console.error("Índice de elemento no válido");
    }
  }
  
  function actualizarEstadisticas(participants, setParticipants, pts, parts) {
    let positions = [];

    parts.forEach((element, index) => {
        positions.push({ points: pts[index], participant: parts[index] });
    });

    // Ordenar el array de posiciones según los puntos en orden descendente
    positions = positions.sort((a, b) => b.points - a.points);

    console.log("Ganador: " + positions[0].participant.name);
    alert("Ganador: " + positions[0].participant.name);
    console.log(positions);

    for (let index = 0; index < positions.length; index++) {
        let participant = positions[index].participant;
        let pos = participants.indexOf(participant);

        if (pos !== -1) {
            participants[pos].setClasif(index);
        }
    }

    setParticipants([...participants]);
}


  
  
  function empezarCarrera(iniciar) {
    console.log(iniciar.long);
    let pts = [[0, 0], [0, 0], [0, 0], [0, 0]];
    let ganador;
    let metros = parseInt(iniciar.long / 1340);
    let interval = setInterval(function () {
      for (let index = 0; index < iniciar.participants.length; index++) {
        if (pts[index][0] >= iniciar.long) {
          ganador = iniciar.participants[index];
          alert("La carrera a finalizado ");
          clearInterval(interval);
          actualizarEstadisticas(participants, setParticipants, pts, iniciar.participants);
        }
        let vehicule = iniciar.participants[index].vehicule;
        if (iniciar.participants[index].vehicule instanceof Car) {
          pts[index][0] += vehicule.setspeed(iniciar.participants[index].vehicule.traccion, iniciar.time);
          console.log(iniciar.participants[index]);
          console.log(pts[index][0]);
          console.log(vehicule.speed);
          moverPersonaje(iniciar, index, pts[index][0], metros);
        }
        if (iniciar.participants[index].vehicule instanceof Bike) {
          console.log('hbike');
          if (pts[index][1] > 0) {
            pts[index][1]--;
          } else {
            let fallD = Math.random() * 100;
            // Llamamos al método setFallDown y comparamos su valor con fallD
            if (vehicule.setFallDown(iniciar.time) < fallD) {
              pts[index][0] += vehicule.speed;
            } else {
              pts[index][1] = 5;
            }
          }
          console.log(pts[index][0]);
          console.log(vehicule.speed);
          moverPersonaje(iniciar, index, pts[index][0], metros);
        }
      }
    }, 500);
  }
  
  
  

  function addPart() {
    const part = participants[selectedParticipantIndex];

    // Verifica si el participante ya está en la carrera
    const isParticipantAlreadyInRace = iniciar.participants.find(
      (participant) => participant.name === part.name
    );

    if (!isParticipantAlreadyInRace) {
      setIniciar((prevIniciar) => ({
        ...prevIniciar,
        participants: [...prevIniciar.participants, part],
      }));
      console.log(iniciar);
    } else {
      alert("Ese participante ya está en la carrera");
    }
  }

  function delPart() {
    const updatedParticipants = [...iniciar.participants];
    updatedParticipants.splice(selectedParticipantIndex, 1);
    setIniciar((prevIniciar) => ({
      ...prevIniciar,
      participants: updatedParticipants,
    }));
    console.log(iniciar);
    console.log(participants);
  }

  const handleSelectChange = (event) => {
    const index = parseInt(event.target.value, 10);
    setSelectedParticipantIndex(index);
  };

  const isFunctionAllowed = iniciar.participants.length >= 2 && iniciar.participants.length <= 4;

  const openFunction = () => {
    const pistaContainer = document.getElementById('pista');
    pistaContainer.innerHTML = "";
  
    if (isFunctionAllowed) {
      iniciar.participants.forEach((participant, index) => {
        let img;
        // Verificar si es una instancia de Bike
        if (participant.vehicule instanceof Bike) {
          img = 'bike';
        } else if (participant.vehicule instanceof Car) {
          img = 'car';
        }
  
        const participantDiv = document.createElement('div');
        participantDiv.className = 'partPista';
        if(img == 'car') participantDiv.innerHTML = `<div><p class="name">${participant.name}</p><img class="car" src="${require(`../assets/participants/${img+'-'+index}.gif`)}"></img></div>`;
        else participantDiv.innerHTML = `<div><p class="name">${participant.name}</p><img class="bike" src="${require(`../assets/participants/${img+'-'+index}.gif`)}"></img></div>`;
        
        pistaContainer.appendChild(participantDiv);
      });
  
      const cant = iniciar.participants.length;
      const participantDivs = document.getElementsByClassName('partPista');
  
      // Establecer la altura para cada elemento .partPista
      for (let i = 0; i < cant; i++) {
        participantDivs[i].style.height = 100 / cant + '%';
      }
      empezarCarrera(iniciar, cant);
    }
  };
  let timeImage;
            switch (iniciar.time) {
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

  return (
    <div id="start">
      <div>
        <h1>START</h1>
      </div>
      <div id="dates">
        <p className="bold">Name: </p>
        <p>{iniciar.name}</p>
        <p className="bold">Time:</p>
        <img src={timeImage} alt="Time" />
        <p className="bold">Longitude:</p>
        <p>{iniciar.long}</p>
      </div>
      <div>
        <label>
          Select the Participants
          <select
            id="selec_circuit"
            value={selectedParticipantIndex}
            onChange={handleSelectChange}
          >
            {participants.map((PAR, index) => (
              <option key={index} value={index}>
                {PAR.name}
              </option>
            ))}
          </select>
        </label>
        <button onClick={addPart}>ADD</button>

        <label>
          Select the Participants
          <select id="del_circuit" onChange={handleSelectChange}>
            {iniciar.participants.map((option, index) => (
              <option key={index} value={index}>
                {option.name}
              </option>
            ))}
          </select>
        </label>
        <button onClick={delPart}>DELETE</button>
        
      </div>
      <button onClick={openFunction} disabled={!isFunctionAllowed}>Comenzar Carrera</button>
    </div>
  );
}


