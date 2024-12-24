<script setup lang="ts">
import { Auth_Service } from '@/services/Auth/Auth.service'
import { BButton, BCard, BCardBody, BCardText, BCol, BRow } from 'bootstrap-vue-next'
import Swal from 'sweetalert2'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

const userId = route.params.id

const user = ref({ nombres: '', primerApellido: '', segundoApellido: '', email: '', domicilio: '' })

const updateUserRoute = () => {
  router.push(`/update-user/${userId}`)
}

const getBackHome = () => {
  router.push('/home')
}

const handleDelete = (userId: number) => {
  console.log(userId)
  Swal.fire({
    title: `¿Estás seguro de eliminar el registro de ${user.value.nombres}?`,
    text: '¡Esta acción no se puede deshacer!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: 'red',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const { success, msg, errors } = await Auth_Service.deleteUser(userId)
        console.log(success)
        if (!success) {
          Swal.fire(`${errors}`, 'error')
          return
        }

        Swal.fire('Eliminado!', `${msg}`, 'success')
        getBackHome()
      } catch (error) {
        console.error('Error deleting user:', error)
        Swal.fire('Error', 'Hubo un problema al eliminar el registro.', 'error')
      }
    }
  })
}

const getUserData = async () => {
  const { result, success } = await Auth_Service.getInfoUser(+userId)
  if (!success || !result) return
  user.value = result
}

onMounted(() => {
  getUserData()
})
</script>

<template>
  <div class="d-flex justify-content-center">
    <BCard
      header="Informacion de usuario"
      header-text-variant="white"
      header-class="hearder-card"
      class="card-b mt-3"
      align="center"
    >
      <BCardBody>
        <BCardText> <strong>Nombre completo: </strong> {{ user.nombres }} </BCardText>

        <BCardText> <strong>Primer apellido: </strong> {{ user.primerApellido }} </BCardText>

        <BCardText> <strong>Segundo apellido: </strong> {{ user.segundoApellido }} </BCardText>

        <BCardText> <strong>Correo electronico:</strong> {{ user.email }} </BCardText>

        <BCardText> <strong>Dirección: </strong> {{ user.domicilio }} </BCardText>

        <BRow>
          <BCol class="mb-3" md="4" >
            <BButton @click="handleDelete(+userId)" variant="danger" class="me-3 button-into-user">
              Eliminar
            </BButton>
          </BCol>
          <BCol class="mb-3" md="4">
            <BButton variant="warning" @click="updateUserRoute" class="button-into-user"> Modificar </BButton>
          </BCol>

          <BCol class="mb-3" md="4">
            <BButton variant="secondary" @click="getBackHome" class="me-3 button-into-user"> Regresar </BButton>
          </BCol>
        </BRow>
      </BCardBody>
    </BCard>
  </div>
</template>

<style>
.hearder-card {
  background-color: #6c5b7b;
  font-size: x-large;
  font-weight: bold;
}
.card-b {
  width: 50%;
}

.button-into-user {
  width: 100%;
}
</style>
