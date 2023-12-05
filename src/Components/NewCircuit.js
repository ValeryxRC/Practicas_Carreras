import React from "react";
import Circuit from "../Class/Circuit";


export default function NewCircuit({setCircuites, circuites, setMostrarNC, mostrarNC }) {
    function createCircuit(){
      let name = document.getElementById("name").value;
      let long = document.getElementById("num").value;
      let time = document.getElementById("time").value;
      if (!name || !long) {
        alert("Por favor, complete todos los campos.");
        return;
      }
      if (circuites.find(circuit => circuit.name === name)) {
        alert("Circuito ya existe.");
        return;
      }
      let circuit = new Circuit(name, time, long);
        setCircuites([...circuites, circuit]);
        setMostrarNC(true);
        console.log(circuites);
    }
    return (<div id="container">
        <div>
        <div><h1>New Circuit</h1></div>
          <label>Name<input id="name" type="text"></input></label>
          <label>Longitude<input id="num" type="number" min={500} max={5000} defaultValue={500}></input></label>
          <label>Time
            <select id="time">
              <option value={"rainy"}>Rain</option>
              <option value={"wet"}>Wet</option>
              <option value={"dry"}>Dry
              </option>
            </select>
          </label>
          <div> <button onClick={createCircuit}>New Circuit</button></div>
        </div>
    </div>);
}