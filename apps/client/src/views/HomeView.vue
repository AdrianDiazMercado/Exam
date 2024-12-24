<script setup lang="ts">
import { BButton, BCard, BCardBody, BCol, BFormInput, BRow, BTable } from 'bootstrap-vue-next';
import { onMounted, ref,watch  } from 'vue';
import { useRouter } from 'vue-router';
import { UserResponse } from 'global-interfaces';
import { Auth_Service } from '@/services/Auth/Auth.service';

const search = ref('');
const usersData = ref<UserResponse[]>([]);

const router = useRouter();

const createUserRoute = () => {
  router.push('/create-user');
};

const postUserData = async () => {
  const { result, success } = await Auth_Service.postAllUser(search.value);

  if (!success) return;
  usersData.value = Array.isArray(result) ? result : [];
};


const handleRowClick = (row: UserResponse) => {
  router.push(`/card-user-info/${row.id}`);
};

watch(search, () => {
  postUserData();
});

onMounted(() => {
  postUserData();
});

</script>

<template>
  <div class="d-flex justify-content-center">
    <BCard
      header="Home"
      header-text-variant="white"
      header-class="header-card-home"
      class="card-b-home mt-3"
      align="center"
    >
      <BCardBody>
        <BRow class="mb-5">
          <BCol>
            <BFormInput
              id="input-1"
              v-model="search"
              placeholder="Buscar por nombres"
              required
              class="mb-3"
            />
          </BCol>
          <BCol md="3">
            <BButton @click="createUserRoute" type="button" class="button-create-home">
              Crear Usuario
            </BButton>
          </BCol>
        </BRow >

        <BTable
          hover
          :items="usersData"
          :fields="[
            { key: 'nombres', label: 'Nombres' },
            { key: 'primerApellido', label: 'Primer Apellido' },
            { key: 'segundoApellido', label: 'Segundo Apellido' },
            { key: 'email', label: 'Email' },
            { key: 'domicilio', label: 'Domicilio' }
          ]"
          @row-clicked="handleRowClick"
        />
      </BCardBody>
    </BCard>
  </div>
</template>

<style>
.header-card-home {
  background-color: #6c5b7b;
  font-size: x-large;
  font-weight: bold;
}
.card-b-home {
  width: 100%;
  min-height: 96vh;
}
.button-create-home {
  width: 100%;
}
</style>
