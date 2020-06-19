<template>
  <div class="home">
    <h1>Scrypta Shamir Backup</h1><br>
    <Backup />
  </div>
</template>

<script>
import Backup from '@/components/Backup.vue'

export default {
  name: 'Home',
  components: {
    Backup
  }
}
</script>
<style>
  .home{
    padding: 20px;
  }
</style> 