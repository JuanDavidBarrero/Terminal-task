const inquirer = require('inquirer');
require('colors');



const menuOpt = [
    {
        type:'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Crear tarea`
            },
            {
                value: '2',
                name: `${'2.'.green} Listar tareas`
            },
            {
                value: '3',
                name: `${'3.'.green} Listar tareas completadas`
            },
            {
                value: '4',
                name: `${'4.'.green} Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${'5.'.green} Completar tarea(s)`
            },
            {
                value: '6',
                name: `${'6.'.green} Borrar tarea`
            },
            {
                value: '0',
                name: `${'0.'.green} Salir`
            }
        ]
    }
]


const inquirerMenu = async() => {

    console.clear();

    
    console.log('================================='.green);
    console.log('      Seleciones una opción      '.white);
    console.log('=================================\n'.green);


    const {opcion} = await inquirer.prompt(menuOpt);

    return opcion;
    

}




const pause = async () => {

   const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Oprima ${'ENTER'.green} para continuar`
        }
    ]

    console.log('\n');
    await inquirer.prompt(question);
    

}



const leerInput =  async( message ) =>  {

    question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate (value) {
                if(value.length ===0 ) {
                    return 'Ingre algun valor ';
                } else
                {
                    return true;
                }
            }
        }
    ];

    const {desc} = await inquirer.prompt(question);

    return desc;
}




const listadoParaCompletar = async ( tareas = []) => {

    console.log();

    choices = tareas.map( (tarea,i) => {

        const index = `${i +1}.`.green;

        return {
            value: tarea.id,
            name: `${index} ${tarea.desc}`,
            checked: (tarea.completado)? true : false
        };

    } );


    const question = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ]


    const {ids} = await inquirer.prompt(question);

    return ids;

}




const listadoTareasBorrar = async ( tareas = [] ) =>{

    console.log();

    const choices = tareas.map( (tarea, i) => {
        const idx = `${i + 1}.`.green;
        return {
            value: tarea.id,
            name:  `${idx} ${tarea.desc}`
        };
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + 'Cancelar'
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]

    const {id} = await inquirer.prompt(preguntas);

    return id;

}


const confirmar = async (message = '') => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const {ok} = await inquirer.prompt(question);
    return ok;
} 



module.exports = {
    inquirerMenu,
    pause,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    listadoParaCompletar,
}