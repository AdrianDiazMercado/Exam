<script setup lang="ts">
import { Auth_Service } from '@/services/Auth/Auth.service';
import mavi_imagen from '../assets/imgs/mavi.jpg';
import { BButton, BCard, BCardImg, BCol, BForm, BFormGroup, BFormInput, BRow } from 'bootstrap-vue-next';
import { ref } from 'vue';
import { LoginUserPayload } from '../../../../packages/global-interfaces/dist';
import { sweetAlert } from '@/utils';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/Auth/auth.store'

const router = useRouter()

const goHome = () => {
      router.push('/home')
}

const form = ref<LoginUserPayload>({email: '', password: ''})
const onSubmit = async (event: Event) =>  {
  event.preventDefault()
  const {msg,success, errors, result} = await Auth_Service.postLogin(form.value)

  if(!success){
    return sweetAlert.displayAlert({
      msg,
      success,
      errors
    })
  }

  const authStore = useAuthStore();
  authStore.setToken(result && result.jwt || '');
  sweetAlert.displayAlert({
      msg,
      success,
    })
    goHome()

}
</script>

<template>
<div class="d-login d-flex justify-content-center align-items-center">

  <BCard
      header="Mavi"
      header-text-variant="white"
       header-class="header-card-login"
  class="card-b-login mt-3"
  align="center"
  >
    <BRow>
      <BCol>
          <BCardImg :src="mavi_imagen" class="card-img-login" rounded="5"/>
      </BCol>
      <BCol class="b-login-info " md="6">
        <div >
        <BForm @submit="onSubmit">
          <BFormGroup id="input-group-1" label-align="start" label="Email" label-for="input-1" class="mb-2">
            <BFormInput id="input-1" placeholder="Email" required v-model="form.email"/>
          </BFormGroup>
          <BFormGroup id="input-group-1" label-for="input-1" label-align="start" label="Password" class="mb-2">
            <BFormInput id="input-1" placeholder="Password" type="password" required v-model="form.password" />
          </BFormGroup>

          <BButton variant="success" class="w-100 mt-3" type="submit">
            Login
          </BButton>
        </BForm>
      </div>
      </BCol>
    </BRow>
  </BCard>

</div>
</template>

<style>
.header-card-login{
  background-color: #6c5b7b;
  font-size: x-large;
  font-weight: bold;
}
  .d-login{
    height: 97vh;
  }
  .card-b-login{
    width: 60%;
  }

  .b-login-info{
    margin-top: 12%;
  }
  .card-img-login{
    width: 100%;
  }
</style>
