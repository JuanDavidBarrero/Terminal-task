const {v4: uuidV4} = require('uuid');

class Tarea {

    id ='';
    desc = '';
    completado = null;

    constructor ( desc ) {
        this.id = uuidV4();
        this.desc = desc; 
        this.completado = null;
    }


}


module.exports = Tarea;