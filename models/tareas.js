const Tarea = require("./tarea");


class Tareas {
    _listado = {};

    get listadoArr() {
        const listado = [];

        Object.keys(this._listado).forEach(key => {
            listado.push(this._listado[key]);
        })

        return listado;
    }

    constructor() {
        this._listado = {};
    }

    crearTareas(desc = '') {

        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;

    }

    cargarTareas(tareas = []) {

        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea
        });

    }

    listadoCompleto() {

        this.listadoArr.forEach((tarea, i) => {

            const idx = `${i + 1}`.green;
            const { desc, completado } = tarea;

            const estado = (completado) ? `Completado -> ${completado}`.green : 'Pendiente'.red;
            console.log(`${idx} ${desc} :: ${estado}`);

        })


    }

    listarPendientesCompletadas(completadas = true) {

        let contador = 0;

        this.listadoArr.forEach(tarea => {
            const { desc, completado } = tarea;
            const estado = (completado) ? 'Completado'.green : 'Pendiente'.red;

            if (completadas) {
                if (completado) {
                    contador += 1;
                    console.log(`${(contador + '.').green} ${desc} ::  ${('Completado ->' + completado).green}`)
                }
            }
            else {
                if (!completado) {
                    contador += 1;
                    console.log(`${(contador + '.').green} ${desc} :: ${estado}`)
                }
            }

        });


    }

    borrarTarea(id = '') {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }


    toggleCompletadas(ids = []) {

        ids.forEach(id => {

            const tarea = this._listado[id];
            if (!tarea.completado) {
                tarea.completado = new Date().toISOString();
            }

        });

        this.listadoArr.forEach( (tarea) => {
            if ( !ids.includes(tarea.id)) {
                this._listado[tarea.id].completado = null;
            }
        } );

    }

}

module.exports = Tareas;