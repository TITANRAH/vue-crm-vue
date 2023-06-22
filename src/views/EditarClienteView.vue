<script setup>

import RouterLink from '../components/UI/RouterLink.vue';
import Heading from '../components/UI/Heading.vue';
import { FormKit } from '@formkit/vue'
import { useRouter, useRoute } from 'vue-router'

import ClientesService from '../services/ClientesService';
import { onMounted, reactive,  } from 'vue';
const router = useRouter()
const route = useRoute()

const {id} = route.params

// para editar el registro deusuario creo el objeto vacio formData 
// con los valores del formulario, esto lo mapeare con la respuesta de laapi
// tiene que ser un objecto reactive o ref
// en este caso hay que usar v-model en el form
const formData = reactive({})

// puede ser ref const formData = ref({})
onMounted(()=>{
    ClientesService.obtenerCliente(id).then(({data}) => {
        // forma corta de llenar el objeto formData
        Object.assign(formData, data)

        // si uso ref
        // formData.value = data

        // tambien puede ser asi el llenado

        // console.log('data',data)
        // formData.nombre = data.nombre
        // formData.apellido = data.apellido
        // formData.email = data.email
        // formData.telefono = data.telefono
        // formData.empresa = data.empresa
        // formData.puesto = data.puesto

        // console.log('formData', formData)
    }).catch(e => console.log(e))
})



defineProps({
    titulo: String
})

const handleSubmit = (data) => {
ClientesService.actualizarCliente(id, data).then(() => {
    router.push({name: 'listado-clientes'})
}).catch(e => console.log(e))

}

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
                    submit-label="Guardar Cambios" 
                    incomplete-message="No se pude enviar"
                    @submit="handleSubmit"
                    :value="formData"
                    >

                    <FormKit type="text" label="Nombre" name="nombre" placeholder="Nombre de Cliente"
                        prefix-icon="avatarMan" help="Coloca el nombre del Cliente que deseas registrar"
                        validation="required" :validation-messages="{ required: 'El nombre del cliente es obligatorio' }" 
                        v-model="formData.nombre"
                        />

                    <FormKit type="text" label="Apellido" name="apellido" placeholder="Apellido de Cliente"
                        prefix-icon="avatarMan" validation="required"
                        :validation-messages="{ required: 'El apellido del cliente es obligatorio' }" 
                        v-model="formData.apellido"
                        />

                    <FormKit type="email" label="Email" name="email" placeholder="Emmail de Cliente" prefix-icon="email"
                        validation="required|email"
                        :validation-messages="{ required: 'El email del cliente es obligatorio', email: 'Coloca un email válido' }"
                        v-model="formData.email"
                        />

                    <FormKit type="number" label="Télefono" name="telefono" placeholder="Télefono: XXX-XXX-XXXX"
                        prefix-icon="telephone" 
                        v-model="formData.telefono"
                        />


                    <FormKit type="text" label="Empresa" name="empresa" placeholder="Empresa de Cliente"
                        prefix-icon="people"
                        v-model="formData.empresa"
                        />

                    <FormKit type="text" label="Puesto" name="puesto" placeholder="Puesto de Cliente" prefix-icon="tools"
                        v-model="formData.puesto"
                        />      



                </FormKit>



            </div>
        </div>



    </div>
</template>

<style>
.formkit-wrapper {
    max-width: 100%;
}
</style>

