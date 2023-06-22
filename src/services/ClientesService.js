import api from "../lib/axios"

export default {

    obtenerClientes(){
        return api.get('/clientes')
    },

    agregarCliente(data){
        return api.post('/clientes', data)
    },

    obtenerCliente(id){
        return api.get('/clientes/'+ id)
    },

    //  La diferencia entre patch y put es que patch puede reemplazar solo una priopiedad, por ejemnplo solo nombre 
    //  y dejar los otros camnpos tal como estan 

    //  en cambio put si envias solo el nombre borraria los otros cambios, por lo que aunque quieras reemplazar el nombre 
    //  deberias enviar todos los datos llenos 

    // por ejemplo con put en el formulario si edito solo el nombre perderia el estado 
    // ya que no se lo estoy enviando por formulario simplemente lo borraria, no asi el resto 
    // de campos que si lo estoy enviando por que el formulario se llena autmaticamente con los datos del usuario 
    // al presionar editar un registro, por lo que es mas recomendable patch en este caso
    actualizarCliente(id, data){
        return api.patch('/clientes/' + id, data)
    },

    cambiarEstado(id, data){
        return api.patch('/clientes/' + id, data)
    },

    eliminarCliente(id){
        return api.delete('/clientes/' + id)
    }

}