<script setup>

import  RouterLink  from '../components/UI/RouterLink.vue';
import Heading from '../components/UI/Heading.vue';
import {FormKit} from '@formkit/vue'
import { useRouter} from 'vue-router'
import { reactive } from 'vue';
import ClientesService from '../services/ClientesService';


// const route = useRoute()
const router = useRouter()

// para parametros, nombre de ruta etc relacionado a url
// console.log(route)
// console.log(route.name)

// rutas del proyecto, redireccionar a usario , volver a la pagina anterior, agregar una ruta
console.log(router)


defineProps({
    titulo: String
})

const handleSubmit = (data) => {

    data.estado = 1
    ClientesService.agregarCliente(data)
    .then(resp => {
        
        console.log(resp)

        router.push('/')

        // o router.push({name: 'inicio'})
    })
    .catch(e => console.log(e))
}

// podemos pre cargar informacion pero tiene que las propiedades 
// ser iguales a los name de los campos
// puede vernir de una api por lo que usariamos reactive
// se coloca en la propiedad value :value="formData" en FormKit de type="form"
const formData = reactive({
    nombre: 'Sergio',
    apellido: 'Miranda',
    telefono: '+56954743944'
})
</script>
<template>
    <div>

        <div class="flex justify-end">
            <RouterLink to="listado-clientes">
                Volver
            </RouterLink>
        </div>

        <Heading>{{ titulo }}</Heading>

       

            <div class="mx-auto mt-10 bg-white shadow">
           
                <div class="mx-auto md:w-2/3 py-20 px-6">
                <FormKit
                    type="form"
                    submit-label="Agregar Cliente"
                    incomplete-message="No se pude enviar"
                    @submit="handleSubmit"
                   
                >
                    <!--FormKit puede ser select, text, radio, etc -->
                    <!-- si el label fuera dinamico con : y ya  -->
                    <!--para validation-visibility esta blur, live, submit cuando toca afuera, directamente y validaciones en submit o boton-->
                    <!--  validation-visibility="blur", live, submit cuando toca afuera, directamente y validaciones en submit o boton-->
                    <!--  :actions="false" en el formkit tipo form esto saca el boton por defecto y loa gregamos nosotros-->
                <FormKit
                type="text"
                label="Nombre"
                name="nombre"
                placeholder="Nombre de Cliente"
                prefix-icon="avatarMan"
                help="Coloca el nombre del Cliente que deseas registrar"
                validation="required"
                :validation-messages="{required: 'El nombre del cliente es obligatorio'}"

                />

                <FormKit
                type="text"
                label="Apellido"
                name="apellido"
                placeholder="Apellido de Cliente"
                prefix-icon="avatarMan"
                validation="required"
                :validation-messages="{required: 'El apellido del cliente es obligatorio'}"

                />

                <FormKit
                type="email"
                label="Email"
                name="email"
                placeholder="Emmail de Cliente"
                prefix-icon="email"
                validation="required|email"
                :validation-messages="{required: 'El email del cliente es obligatorio', email: 'Coloca un email válido'}"

                />

                <!-- 
                    revisar validacion
                    validation="*matches:/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/"
                :validation-messages="{matches: 'Formato no válido'}" -->
                <FormKit
                type="number"
                label="Télefono"
                name="telefono"
                placeholder="Télefono: XXX-XXX-XXXX"
                prefix-icon="telephone"
              

                />


                <FormKit
                type="text"
                label="Empresa"
                name="empresa"
                placeholder="Empresa de Cliente"
                prefix-icon="people"

                />

                <FormKit
                type="text"
                label="Puesto"
                name="puesto"
                placeholder="Puesto de Cliente"
                prefix-icon="tools"

                />

                <!-- <FormKit
                    type="submit"
                    label="Agregar Cliente"
                    prefix-icon="add"
                /> -->
               
            </FormKit>

         
           
        </div>
        </div>

       

    </div>
</template>

<style>

.formkit-wrapper {
    max-width: 100% ;
}

</style>

