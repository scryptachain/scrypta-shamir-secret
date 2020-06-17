<template>
  <div class="home">
    <h1>Scrypta Shamir Backup</h1><br>
    Use this tool to create a secure backup for any kind of data, please choose the amount of shares and threshold you want to create.<br><br>
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