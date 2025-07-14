<template>
  <div class="model-description-card">
    <div class="content-wrapper">
      <a-tabs v-model:activeKey="activeKey" @change="onTabChange">
      <a-tab-pane key="alexnet" tab="AlexNet">
        <AlexNet />
      </a-tab-pane>
      <a-tab-pane key="vgg" tab="VGG">
        <VGG />
      </a-tab-pane>
      <a-tab-pane key="resnet" tab="ResNet">
        <ResNet />
      </a-tab-pane>
    </a-tabs>
    </div>
  
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AlexNet from '../components/AlexNet.vue'
import VGG from '../components/VGG.vue'
import ResNet from '../components/ResNet.vue'

const activeKey = ref('alexnet')
const onTabChange = (key: string) => {
  activeKey.value = key
}
</script>

<style scoped>
.content-wrapper {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(0, 212, 255, 0.2);
  border-radius: 8px;
  padding: 24px;
  min-height: calc(100vh - 128px);
  backdrop-filter: blur(10px);
}

.model-description-card {
  width: 100%;
  height: 100%;
}
</style> 

<style>
/* Ant Design Vue Tabs自定义科技感标签样式 */
.model-description-card .ant-tabs-tab {
  font-size: 18px !important;
  color: #00d4ff !important;
  font-weight: 500;
  letter-spacing: 1px;
  transition: color 0.3s;
}
.model-description-card .ant-tabs-tab-active .ant-tabs-tab-btn {
  color: #00d4ff !important;
}
.model-description-card .ant-tabs-tab:hover .ant-tabs-tab-btn {
  color: #00eaff !important;
}
.model-description-card .ant-tabs-ink-bar {
  background: linear-gradient(90deg, #00d4ff 0%, #0099cc 100%);
  height: 3px;
  border-radius: 2px;
}
</style> 