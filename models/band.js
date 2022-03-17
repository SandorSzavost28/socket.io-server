
const {v4: uuidV4} = require('uuid');
//aqio creara el id unico

class Band{
    constructor(name='no-name'){
        this.id = uuidV4();  // Identificador unico
        this.name = name;
        this.votes = 0;
    }
}

//crea exportacion
module.exports = Band;

