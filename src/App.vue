<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const currentRoute = computed(() => {
  const path = route.path
  if (path.startsWith('/model-description')) {
    return 'model-description'
  }
  return path.substring(1)
})

const handleMenuClick = ({ key }: { key: string }) => {
  if (key === 'model-description') {
    router.push('/model-description/alexnet')
  } else if (['alexnet', 'vgg', 'resnet'].includes(key)) {
    router.push(`/model-description/${key}`)
  } else {
    router.push(`/${key}`)
  }
}
</script>

<template>
  <div id="app">
    <!-- 顶部Header -->
    <a-layout-header class="header">
      <div class="header-content">
        <h1 class="system-title">网络表征分析与可解释映射诊断工具</h1>
        <div class="menu-container">
          <a-menu
            mode="horizontal"
            :selected-keys="[currentRoute]"
            :open-keys="[]"
            class="main-menu"
            @click="handleMenuClick"
          >
            <a-menu-item key="model-description">模型说明</a-menu-item>
            <a-menu-item key="model-visualization">模型可视化</a-menu-item>
            <a-menu-item key="model-analysis">模型分析</a-menu-item>
          </a-menu>
        </div>
      </div>
    </a-layout-header>

    <!-- 主内容区域 -->
    <a-layout-content class="main-content">
      <router-view />
    </a-layout-content>
  </div>
</template>

<style scoped>
#app {
  min-height: 100vh;
  background: #000;
}

.header {
  background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%);
  border-bottom: 2px solid #00d4ff;
  box-shadow: 0 4px 20px rgba(0, 212, 255, 0.3);
  padding: 0;
  height: 80px;
  display: flex;
  align-items: center;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
}

.system-title {
  color: #00d4ff;
  font-size: 24px;
  font-weight: bold;
  margin: 0;
  text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
  background: linear-gradient(45deg, #00d4ff, #0099cc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  flex-shrink: 0;
  margin-right: 40px;
}

.menu-container {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}

.main-menu {
  background: transparent;
  border: none;
  flex: 1;
  display: flex;
  justify-content: flex-end;
}

.main-menu :deep(.ant-menu-item),
.main-menu :deep(.ant-submenu-title) {
  color: #ffffff !important;
  font-size: 16px;
  font-weight: 500;
  border-bottom: 2px solid transparent;
  transition: all 0.3s ease;
  margin: 0 8px;
}

.main-menu :deep(.ant-menu-item:hover),
.main-menu :deep(.ant-submenu-title:hover) {
  color: #00d4ff !important;
  border-bottom-color: #00d4ff;
  background: rgba(0, 212, 255, 0.1);
}

.main-menu :deep(.ant-menu-item-selected) {
  color: #00d4ff !important;
  border-bottom-color: #00d4ff;
  background: rgba(0, 212, 255, 0.15);
}

.main-menu :deep(.ant-submenu-selected .ant-submenu-title) {
  color: #00d4ff !important;
  border-bottom-color: #00d4ff;
}

/* 当子菜单被选中时，父菜单显示选中状态 */
.main-menu :deep(.ant-submenu-open .ant-submenu-title) {
  color: #00d4ff !important;
  border-bottom-color: #00d4ff;
  background: rgba(0, 212, 255, 0.15);
}

/* 子菜单样式 */
.main-menu :deep(.ant-menu-submenu) {
  background: transparent;
}

.main-menu :deep(.ant-menu-submenu-popup) {
  background: rgba(0, 0, 0, 0.9) !important;
  border: 1px solid rgba(0, 212, 255, 0.3) !important;
  border-radius: 8px;
  backdrop-filter: blur(10px);
}

.main-menu :deep(.ant-menu-submenu-popup .ant-menu-item) {
  color: #ffffff !important;
  background: transparent !important;
  border-bottom: none !important;
  padding: 12px 24px !important;
  transition: all 0.3s ease;
}

.main-menu :deep(.ant-menu-submenu-popup .ant-menu-item:hover) {
  color: #00d4ff !important;
  background: rgba(0, 212, 255, 0.1) !important;
  border-bottom: none !important;
}

.main-menu :deep(.ant-menu-submenu-popup .ant-menu-item-selected) {
  color: #00d4ff !important;
  background: rgba(0, 212, 255, 0.15) !important;
  border-bottom: none !important;
}

.main-content {
  background: #000;
  min-height: calc(100vh - 80px);
  padding: 24px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 16px;
    padding: 16px;
  }
  
  .system-title {
    font-size: 20px;
    margin-right: 0;
  }
  
  .menu-container {
    width: 100%;
  }
  
  .main-menu {
    width: 100%;
    justify-content: center;
  }
}
</style>
