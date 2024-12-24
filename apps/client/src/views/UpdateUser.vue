<script setup lang="ts">
import {
  BButton,
  BCard,
  BCardBody,
  BCol,
  BRow,
  BForm,
  BFormGroup,
  BFormInput,
} from 'bootstrap-vue-next'
import { onMounted, reactive, ref } from 'vue'
import 'leaflet/dist/leaflet.css'
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet'
import L from 'leaflet'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
import { Auth_Service } from '@/services/Auth/Auth.service'
import { sweetAlert } from '@/utils'

const route = useRoute()
const router = useRouter()

const userId = route.params.id

const form = reactive({
  nombres: '',
  primerApellido: '',
  segundoApellido: '',
  email: '',
  domicilio: '',
  lat: '',
  lng: '',
})

const zoom = ref(15)
const center = ref<[number, number]>([20.6767, -103.347])
const markerPosition = ref<[number, number]>([20.6767, -103.347])
const address = ref('')

const updateAddress = async () => {
  try {
    const [lat, lng] = markerPosition.value
    const response = await axios.get('https://nominatim.openstreetmap.org/reverse', {
      params: {
        lat,
        lon: lng,
        format: 'json',
      },
    })
    address.value = response.data.display_name || 'Dirección no encontrada'
    form.domicilio = address.value
    form.lat = lat.toString()
    form.lng = lng.toString()
  } catch (error) {
    console.error('Error obteniendo la dirección:', error)
    address.value = 'Error obteniendo la dirección'
  }
}

const getUserData = async () => {
  const { result, success, errors } = await Auth_Service.getInfoUser(+userId)

  if (!success || !result) {
    sweetAlert.displayAlert({
      success,
      errors,
      propsAlert: {
        title: 'Algo salió mal.',
      },
    })
    return
  }

  form.nombres = result.nombres || ''
  form.email = result.email || ''
  form.domicilio = result.domicilio || ''
  form.primerApellido = result.primerApellido || ''
  form.segundoApellido = result.segundoApellido || ''
  form.lat = result.lat || ''
  form.lng = result.lng || ''

  if (result.lat && result.lng) {
    const lat = +result.lat
    const lng = +result.lng

    markerPosition.value = [lat, lng]
    center.value = [lat, lng]
  }
}

const handleMarkerDrag = (event: L.LeafletEvent) => {
  const latLng = (event.target as L.Marker).getLatLng()
  markerPosition.value = [latLng.lat, latLng.lng]
  updateAddress()
}

const backUserInfo = () => {
  router.push(`/card-user-info/${userId}`)
}

const handleUpdateUser = async (event: Event) => {
  event.preventDefault()
  const { success, msg } = await Auth_Service.putUpdateUser(+userId, form)
  if (!success) {
    return sweetAlert.displayAlert({
      success,
      msg,
    })
  }

  sweetAlert.displayAlert({
    success,
    msg,
  })
  backUserInfo()
}

const manualDireccion = () => {
  form.lat = ''
  form.lng = ''
}

onMounted(() => {
  getUserData()
})
</script>

<template>
  <div class="d-flex justify-content-center">
    <BCard
      header="Modificar usuario"
      header-text-variant="white"
      header-class="header-card-update"
      class="card-b-update mt-3"
      align="center"
    >
      <BCardBody>
        <BForm @submit="handleUpdateUser">
          <BFormGroup id="input-group-1" label="Nombres:" label-for="input-1" class="mb-2">
            <BFormInput id="input-1" v-model="form.nombres" placeholder="Nombres" required />
          </BFormGroup>
          <BFormGroup id="input-group-2" label="Primer apellido:" label-for="input-2" class="mb-2">
            <BFormInput
              id="input-2"
              v-model="form.primerApellido"
              placeholder="Primer apellido"
              required
            />
          </BFormGroup>
          <BFormGroup id="input-group-3" label="Segundo apellido:" label-for="input-3" class="mb-2">
            <BFormInput
              id="input-3"
              v-model="form.segundoApellido"
              placeholder="Segundo apellido"
              required
            />
          </BFormGroup>
          <BFormGroup id="input-group-4" label="Email:" label-for="input-4" class="mb-2">
            <BFormInput
              id="input-4"
              v-model="form.email"
              type="email"
              placeholder="Correo electrónico"
              required
            />
          </BFormGroup>
          <BFormGroup>
            <BFormGroup id="input-group-5" label="Dirección:" label-for="input-5" class="mb-2" />
            <BFormInput
              id="input-5"
              v-model="form.domicilio"
              type="text"
              placeholder="Dirección"
              required
              class="mb-4"
              :onchange="manualDireccion"
            />

            <div class="d-map">
              <l-map ref="map" v-model:zoom="zoom" :center="center">
                <!-- Mostrar la imagen del mapa -->
                <l-tile-layer
                  url="https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png"
                  layer-type="base"
                  name="Wikimedia"
                ></l-tile-layer>
                <!-- Esto es el pin para modificar las direcciones -->
                <l-marker
                  :draggable="true"
                  :lat-lng="markerPosition"
                  @dragend="handleMarkerDrag"
                ></l-marker>
              </l-map>
            </div>
          </BFormGroup>

          <BRow>
            <BCol class="mt-3" md="6">
              <BButton type="submit" variant="success" class="me-3 button-update-user">
                Modificar
              </BButton>
            </BCol>
            <BCol class="mt-3" md="6">
              <BButton @click="backUserInfo" class="button-update-user" variant="secondary">
                Cancelar
              </BButton>
            </BCol>
          </BRow>
        </BForm>
      </BCardBody>
    </BCard>
  </div>
</template>

<style>
.header-card-update {
  background-color: #6c5b7b;
  font-size: x-large;
  font-weight: bold;
}
.card-b-update {
  width: 50%;
}
.button-update-user {
  width: 100%;
}
.d-map {
  width: auto;
  height: 260px;
}
</style>
