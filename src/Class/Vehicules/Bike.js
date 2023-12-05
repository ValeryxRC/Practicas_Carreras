import Vehicule from "./Vehicule";

export default class Bike extends Vehicule {
  constructor(model, traccion, min, max) {
    super(model, traccion, min, max);
    let num = Math.random() * (max - min);
    if (traccion === "medium") {
      num = num + 2;
    } else {
      num = num + 5;
    }
    this.speed = parseInt(num);
    this.fallDownValue = 5;
  }


setFallDown(land) {
    if (land === "rainy" && this.traccion === "hard") this.fallDownValue = 30;
    if (land === "wet" && this.traccion === "hard") this.fallDownValue = 20;
    if (land === "dry" && this.traccion === "medium") this.fallDownValue = 10;
    return this.fallDownValue; // Devolvemos el valor actualizado
  }
  
  

  get fallDown() {
    return this.fallDownValue;
  }

  nameVehicule() {
    return `Bike: ${this.model} ${this.traccion} ${this.speed} cv`;
  }
}
