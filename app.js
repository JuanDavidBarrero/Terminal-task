const { guardarDB, leerDB } = require('./helpers/guardar_db');
const { inquirerMenu, pause, leerInput, listadoTareasBorrar, confirmar, listadoParaCompletar } = require('./helpers/lista');
const Tareas = require('./models/tareas');

console.clear();

const main = async () => {

    let opt = '';
    const tareas = new Tareas();

    const tareaDB = leerDB();

    if (tareaDB) {
        tareas.cargarTareas(tareaDB);
    }

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                const desc = await leerInput('Descripción:')
                tareas.crearTareas(desc);
                break;
            case '2':
                tareas.listadoCompleto();
                break;
            case '3':
                tareas.listarPendientesCompletadas();
                break;
            case '4':
                tareas.listarPendientesCompletadas(false);
                break;
            case '5':
                    const ids = await listadoParaCompletar(tareas.listadoArr);
                    tareas.toggleCompletadas(ids);
                    console.log('Tareas actualizadas'.yellow);
                break;
            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if (id !== '0') {
                    const okey = await confirmar("¿Esta seguro que quiere eliminir? ")
                    if (okey) {
                        tareas.borrarTarea(id);
                        console.log("Tarea borrada correctamente".yellow)
                    }
                }
                break;

        }

        guardarDB(tareas.listadoArr);

        await pause();

    } while (opt !== '0');
}

main();