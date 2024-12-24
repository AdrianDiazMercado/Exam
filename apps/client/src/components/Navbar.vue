<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
</script>
<template>
  <div class="nav-container">
  <nav>
    <ul>
      <li class="order-list"><RouterLink to="/home">Home</RouterLink></li>
      <li><RouterLink to="/card-user-info/1">User Info</RouterLink></li>
    </ul>
  </nav>
</div>
</template>

<style scoped>
nav ul {
  list-style: none;
  display: flex;
  gap: 1rem;
}

nav ul li {
  cursor: pointer;
  /* Quitar linea de abajo del link */
}
.order-list{
  text-decoration: none;
}
.nav-container{
  min-width: 100%;
  background-color: #f8b195;
  height: 3rem;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
}

</style>
