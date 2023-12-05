import Vehicule from "./Vehicule";

export default class Car extends Vehicule {
  speed;

  constructor(model, traccion, min, max) {
    super(model, traccion, min, max);
  }

  setspeed(traccion, time) {
    let num = Math.random() * (this.max - this.min);
    if (traccion == "soft") {
      if (time == "rainy") num = num + 4;
      if (time == "wet") num = num + 2;
    }
    if (traccion == "medium") num = num + 2;
    if (traccion == "hard") {
      if (time == "wet") num = num + 2;
      if (time == "dry") num = num + 4;
    }
    return parseInt(num); // Devuelve el valor calculado
  }

  nameVehicule() {
    return "Car: " + this.model + " " + this.traccion;
  }
}
