export default class Participant {
    constructor(name, vehicule){
        this.name = name;
        this.vehicule = vehicule ;
        this.clasif = [0,0,0];
    }
    setClasif(position){
        this.clasif[position] = this.clasif[position]+1;
    }

}