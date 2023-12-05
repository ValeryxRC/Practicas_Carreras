import logo from './logo.svg';
import './App.css';
import NewVehicule from './Components/NewVehicule';
import NewCircuit from './Components/NewCircuit';
import { useState } from 'react';
import NewParticipant from './Components/NewParticipant';
import Vehicule from './Class/Vehicules/Vehicule';
import GestionParticipants from './Components/GestionParticipants';
import GestionCircuits from './Components/GestionCircuits';
import StartRacing from './Components/StartRacing';

function App() {
  const[circuites, setCircuites]= useState([]);
  const[participants, setParticipants]= useState([]);
  const[vehicules, setVehicules]= useState([]);
  const[mostrarNGP, setMostrarNGP]= useState(false);
  const[mostrarNP, setMostrarNP]= useState(false);
  const[mostrarNC, setMostrarNC]= useState(false);
  const[mostrarST, setMostrarST]= useState(false);
  const[iniciar, setIniciar]= useState(null);
  return (
    <div id='body' className="App">
      <div><div id='logo'></div></div>
      <div id='part1'>
        <h2 class='title'>Configuracion MOTOGP</h2>
        <NewVehicule setVehicules={setVehicules} vehicules={vehicules} setMostrarNP={setMostrarNP} mostrarNP={mostrarNP}></NewVehicule>
        <NewCircuit setCircuites={setCircuites} circuites={circuites}  setMostrarNC={setMostrarNC} mostrarNC={mostrarNC}></NewCircuit>
        {mostrarNP?(<NewParticipant setParticipants={setParticipants} participants={participants} vehicules={vehicules} setMostrarNGP={setMostrarNGP} mostrarNGP={mostrarNGP}></NewParticipant>):null}
        {mostrarNGP?(<GestionParticipants participants={participants}></GestionParticipants>):null}
        {mostrarNC?(<GestionCircuits circuites={circuites} setMostrarST={setMostrarST} mostrarST={mostrarST} setIniciar={setIniciar} iniciar={iniciar} ></GestionCircuits>):null}
        {mostrarST?(<StartRacing participants={participants}  setParticipants={setParticipants} setIniciar={setIniciar} iniciar={iniciar}></StartRacing>):null}
      </div>
      <div id='part2'>
        <h2 class='title'>Comenzar Carrera</h2>
        <div>Pista
          <div id='pista'>

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
