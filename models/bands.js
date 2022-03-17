const Band = require("./band");

class Bands{
    constructor(){
        //arreglo vacio
        this.bands = [];

    }

    //anadir nueva banda
    addBand(band = new Band() ){
        this.bands.push(band);

    }

    //obtener bandas
    getBands(){
        return this.bands;
    }

    //borrar banda //necesita el id, vacio para no error
    deleteBand( id = '' ){
        this.bands = this.bands.filter( band => band.id !== id); // filtra todas las bandas a excepcion de la que coincide el id a borrar
        return this.bands; //regresa el nuevo arreglo
    }

    //vota por banda
    voteBand( id = ''){
        //barrer el listado medianbte un map
        //si se tuviera en una BDD se lee e intaractua a el directamente, en vez de hacerlo como arreglo
        this.bands = this.bands.map( band => {
            //regresar un nuevo objeto votes
            if(band.id === id){

                band.votes++;
                return band;

            } else {
                return band;
            }
        });
    }


}

module.exports = Bands;