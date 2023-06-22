<script setup>

import RouterLink from '../components/UI/RouterLink.vue';
import Heading from '../components/UI/Heading.vue';
import { onMounted, ref, computed } from 'vue';
import Cliente from '../components/Cliente.vue';
import ClientesService from '../services/ClientesService';

const clientes = ref([])

onMounted(() => {

    ClientesService.obtenerClientes()
    .then(({ data }) => {
        clientes.value = data
        console.log(clientes.value)
    })
        .catch(e => console.log(e))



})

defineProps({
    titulo: String
})

const existenClientes = computed(() => {
    return clientes.value.length > 0
})

const actualizarEstado = ({id, estado}) => {

    // esto cambia el estaado enn base de datos pero no solo se cambia ahi 
    // tambien hay que cambiarlo en el front y despues del then es donde hacemos el cambio 
    // del front
    ClientesService.cambiarEstado(id,{estado: !estado}).then(()=>{
        const i = clientes.value.findIndex(cliente => cliente.id === id)
        clientes.value[i].estado = !estado
    }).catch(e => console.log(e))
}

// lo mismo aca, eliminamos un cliente de base de datos pero no asi del front reactivamente 
// por loq ue necesitamos hacer el filter para poder eliminarlo tambien del front
const eliminarCliente = (id) => {
    ClientesService.eliminarCliente(id).then(()=>{
    clientes.value = clientes.value.filter(c => c.id !== id)
    }).catch(e => console.log(e)) 
}


</script>
<template>
    <div>

        <div class="flex justify-end">
            <RouterLink to="agregar-cliente">
                Agregar Cliente
            </RouterLink>
        </div>

        <Heading>{{ titulo }}</Heading>

        <div v-if="existenClientes" class="flow-root mx-auto  mt-10 p-5 bg-white shadow">
            <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <table class="min-w-full divide-y divide-gray-300">
                        <thead>
                            <tr>
                                <th scope="col" class="p-2 text-left text-sm font-extrabold text-gray-600">Nombre</th>
                                <th scope="col" class="p-2 text-left text-sm font-extrabold text-gray-600">Empresa</th>
                                <th scope="col" class="p-2 text-left text-sm font-extrabold text-gray-600">Estado</th>
                                <th scope="col" class="p-2 text-left text-sm font-extrabold text-gray-600">Acciones</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200 bg-white">

                            <Cliente
                            v-for="cliente in clientes"
                            :key="cliente.id"
                            :cliente="cliente"
                            @actualizar-estado="actualizarEstado"
                            @eliminar-cliente="eliminarCliente"
                            />

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <p v-else class="text-center mt-10">No hay clientes</p>

    </div>
</template>

