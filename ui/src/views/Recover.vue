<template>
  <div class="home">
    <h1>Scrypta Shamir Backup</h1><br>
    Recover a secret by inserting all of the required shares.<br><br>
    <Recover />
  </div>
</template>

<script>
import Recover from '@/components/Recover.vue'

export default {
  name: 'Home',
  components: {
    Recover
  }
}
</script>
<style>
  .home{
    padding: 20px;
  }
</style> 