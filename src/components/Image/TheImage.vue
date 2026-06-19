<template>
  <div class="imageHolder" ref="imageHolder">
    <img :src="imageUrl" :alt="alt" class="image" />
  </div>
</template>

<script setup>
  import { computed, ref } from 'vue';

  const props = defineProps({
    imagePath: String,
    alt: String,
  });

  const imageUrl = computed(
    () => new URL(`/src/assets/images/${props.imagePath}`, import.meta.url)
  );

  const imageHolder = ref(null);
  defineExpose({
    imageHolder,
  });
</script>

<style scoped lang="scss">
  .imageHolder {
    display: flex;
  }

  .image {
    width: inherit;
    height: auto;
  }
</style>
