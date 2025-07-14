<template>
  <div class="model-visualization">
    <div class="content-wrapper">
      <h2 class="page-title">模型可视化</h2>
      <div class="visualization-content">
        <a-row :gutter="[24, 24]">
          <a-col :span="24">
            <a-card class="tech-card" title="网络结构可视化">
              <template #extra>
                <a-upload
                  :show-upload-list="false"
                  :before-upload="beforeUpload"
                  @change="handleUpload"
                  accept=".pt,.pth,.h5,.pb,.caffemodel,.ckpt,.pdparams"
                >
                  <a-button type="primary" ghost class="upload-btn-large">
                    <template #icon><UploadOutlined /></template>
                    <span style="color: white;">导入参数</span>
                  </a-button>
                </a-upload>
              </template>
              <div class="visualization-placeholder">
                <div class="placeholder-content">
                  <template v-if="loading">
                    <a-progress type="circle" :percent="progress" :width="140" :format="(percent: number) => percent + '%'" />
                    <div style="margin-top: 12px; color: #00d4ff;">正在加载模型...</div>
                  </template>
                  <template v-else-if="showGif">
                    <img src="/src/assets/images/ModelVisual.png" alt="模型可视化" class="model-visual-gif" />
                  </template>
                  <template v-else>
                    <UploadOutlined class="placeholder-icon" />
                    <p>结果将在这里显示</p>
                  </template>
                </div>
              </div>
            </a-card>
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { UploadOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'

const loading = ref(false)
const showGif = ref(false)
const progress = ref(0)
let timer: number | null = null

function beforeUpload(file: File) {
  const allowed = [
    '.pt', '.pth', '.h5', '.pb', '.caffemodel', '.ckpt', '.pdparams'
  ]
  const ext = file.name.slice(file.name.lastIndexOf('.')).toLowerCase()
  if (!allowed.includes(ext)) {
    message.error('仅支持上传模型参数文件（pt, pth, h5, pb, caffemodel, ckpt, pdparams）')
    return false
  }
  return true
}

function handleUpload(info: any) {
  if (info.file.status === 'done' || info.file.status === 'uploading' || info.file.status === undefined) {
    loading.value = true
    showGif.value = false
    progress.value = 0
    if (timer) clearInterval(timer)
    timer = window.setInterval(() => {
      if (progress.value < 100) {
        progress.value += 5
      } else {
        clearInterval(timer!)
        loading.value = false
        showGif.value = true
      }
    }, 100)
  }
}
</script>

<style scoped>
.model-visualization {
  width: 100%;
  height: 100%;
}

.content-wrapper {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(0, 212, 255, 0.2);
  border-radius: 8px;
  padding: 24px;
  min-height: calc(100vh - 128px);
  backdrop-filter: blur(10px);
}

.page-title {
  color: #00d4ff;
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 24px;
  text-align: center;
  text-shadow: 0 0 10px rgba(0, 212, 255, 0.3);
}

.tech-card {
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 8px;
  backdrop-filter: blur(10px);
}

.tech-card :deep(.ant-card-head) {
  background: rgba(0, 212, 255, 0.1);
  border-bottom: 1px solid rgba(0, 212, 255, 0.3);
}

.tech-card :deep(.ant-card-head-title) {
  color: #00d4ff;
  font-weight: bold;
}

.tech-card :deep(.ant-card-body) {
  background: transparent;
}

.visualization-placeholder {
  height: 800px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 212, 255, 0.05);
  border: 2px dashed rgba(0, 212, 255, 0.3);
  border-radius: 8px;
}

.placeholder-content {
  width: 100%;
  height: 100%;
  text-align: center;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
}

.placeholder-icon {
  font-size: 48px;
  color: rgba(0, 212, 255, 0.5);
  margin-bottom: 16px;
}

.placeholder-content p {
  margin: 0;
  font-size: 16px;
}

.model-visual-gif {
  width: 80%;
  max-width: 800px;
  max-height: 100%;
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 212, 255, 0.2);
  margin: 0;
  display: block;
  object-fit: contain;
}

.tech-card :deep(.ant-progress-inner) .ant-progress-text {
  color: #fff !important;
}

.upload-btn-large {
  font-size: 18px;
  padding: 8px 32px;
  height: 48px;
  border-radius: 6px;
}
</style> 