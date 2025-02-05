<script setup lang="ts">
defineProps<{
  modelValue: API.EnglishDictionary
}>()

// type API.EnglishDictionary = {
// author?: string:
// create_time?: string;
// description?: string;
// ctid?: number;
// image_url?: string:
// is_delete?: number;
// isbn?: string:
// name?: string;
// publication_date?: string:
// publisher?: string;
// update_time?: string;
// }
</script>

<template>
  <div class="DictionaryBookDisplay">
    <div class="cover">
      <el-image v-if="modelValue.image_url" class="min-h[80px] min-w[80px]" :src="modelValue.image_url" :alt="modelValue.name">
        <template #error>
          <div class="image-slot">
            <i class="el-icon-picture-outline" />
          </div>
        </template>
      </el-image>
      <div v-else class="no-image">
        <span>{{ modelValue.name?.slice(0, 1) || 'D' }}</span>
      </div>
    </div>
    <div class="info">
      <div class="name">
        {{ modelValue.name }}
      </div>
      <div class="description">
        {{ modelValue.description }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.DictionaryBookDisplay {
  width: 100%;
  //   height: 80px;
  //   border-radius: 16px;
  //   background-color: var(--el-fill-color-light);
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .cover {
    flex: 1;
    border: 1px solid var(--el-border-color);
    border-radius: 8px;
    margin: 8px;
    overflow: hidden;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .no-image {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--el-fill-color);

      span {
        font-size: 32px;
        color: var(--el-text-color-secondary);
      }
    }
  }

  .info {
    padding: 0 12px 12px;

    .name {
      font-size: 14px;
      font-weight: bold;
      margin-bottom: 4px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .description {
      font-size: 12px;
      color: var(--el-text-color-secondary);
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}
</style>
