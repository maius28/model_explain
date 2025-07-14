<template>
  <div class="vgg-component">
    <!-- <h2 class="model-title">VGG (Very Deep Convolutional Networks) 模型说明</h2> -->
    
    <a-row :gutter="[24, 24]" class="equal-height-row">
      <a-col :span="16">
        <a-card class="tech-card" title="模型架构">
          <div class="architecture-content">
            <div class="architecture-image">
              <img src="/src/assets/images/VGG.png" alt="VGG架构图" class="model-architecture-img" />
            </div>
          </div>
        </a-card>
      </a-col>
      
      <a-col :span="8">
        <a-card class="tech-card" title="模型特性">
          <a-descriptions :column="1" size="small">
            <!-- <a-descriptions-item label="发布年份">2014</a-descriptions-item> -->
            <a-descriptions-item label="参数量">138M</a-descriptions-item>
            <a-descriptions-item label="层数">16-19</a-descriptions-item>
            <a-descriptions-item label="输入尺寸">224×224×3</a-descriptions-item>
            <a-descriptions-item label="输出类别">1000</a-descriptions-item>
            <!-- <a-descriptions-item label="ImageNet准确率">71.3%</a-descriptions-item> -->
          </a-descriptions>
        </a-card>
        
        <a-card class="tech-card" title="设计理念" style="margin-top: 16px;">
          <ul class="design-list">
            <li>使用小卷积核(3×3)</li>
            <li>增加网络深度</li>
            <li>统一的卷积层设计</li>
            <li>全连接层参数共享</li>
            <li>多尺度特征提取</li>
          </ul>
        </a-card>

        <a-card class="tech-card" title="技术优势" style="margin-top: 16px;">
          <ul class="tech-details-list">
            <li v-for="(advantage, index) in advantages" :key="index">
              <strong>{{ advantage.title }}：</strong>
              {{ advantage.description }}
            </li>
          </ul>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
const advantages = [
  {
    title: '深度优势',
    description: '通过增加网络深度，能够学习更复杂的特征表示，提高模型性能。'
  },
  {
    title: '小卷积核',
    description: '使用3×3小卷积核，减少参数量，增加非线性表达能力。'
  },
  {
    title: '特征重用',
    description: '深层特征可以用于多种任务，提高特征利用效率。'
  },
  {
    title: '结构简单',
    description: '统一的卷积层设计，便于理解和实现。'
  }
]
</script>

<style scoped>
.vgg-component {
  color: #ffffff;
}

.model-title {
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

.architecture-content {
  padding: 48px 0 16px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

.architecture-image {
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 212, 255, 0.05);
  border: 2px dashed rgba(0, 212, 255, 0.3);
  border-radius: 8px;
  padding: 20px;
  min-height: 500px;
}

.model-architecture-img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 212, 255, 0.2);
  transition: all 0.3s ease;
}

.model-architecture-img:hover {
  transform: scale(1.02);
  box-shadow: 0 12px 40px rgba(0, 212, 255, 0.3);
}

.vgg-blocks {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.vgg-block {
  background: rgba(0, 212, 255, 0.1);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 8px;
  padding: 16px;
  transition: all 0.3s ease;
}

.vgg-block:hover {
  background: rgba(0, 212, 255, 0.15);
  border-color: rgba(0, 212, 255, 0.5);
}

.block-title {
  color: #00d4ff;
  margin: 0 0 12px 0;
  font-size: 18px;
  font-weight: bold;
}

.block-layers {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}

.layer-item {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.layer-name {
  color: #00d4ff;
  font-weight: bold;
}

.layer-size {
  color: #cccccc;
  font-size: 10px;
}

.block-output {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #888888;
}

.design-list {
  color: #cccccc;
  padding-left: 20px;
}

.design-list li {
  margin-bottom: 8px;
  line-height: 1.5;
}

.config-table :deep(.ant-table) {
  background: transparent;
}

.config-table :deep(.ant-table-thead > tr > th) {
  background: rgba(0, 212, 255, 0.1);
  color: #00d4ff;
  border-bottom: 1px solid rgba(0, 212, 255, 0.3);
}

.config-table :deep(.ant-table-tbody > tr > td) {
  background: transparent;
  color: #ffffff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.advantages {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.advantage-item {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.advantage-icon {
  color: #00d4ff;
  font-size: 20px;
  margin-top: 2px;
}

.advantage-content h5 {
  color: #00d4ff;
  margin: 0 0 4px 0;
  font-size: 14px;
}

.advantage-content p {
  color: #cccccc;
  margin: 0;
  font-size: 12px;
  line-height: 1.4;
}

.tech-card :deep(.ant-descriptions-item-label) {
  color: #00d4ff;
  font-weight: bold;
}

.tech-card :deep(.ant-descriptions-item-content) {
  color: #ffffff;
}

/* 保持与AlexNet技术细节一致的样式 */
.tech-details-list {
  color: #cccccc;
  padding-left: 20px;
}
.tech-details-list li {
  margin-bottom: 12px;
  line-height: 1.6;
}
.tech-details-list li strong {
  color: #00d4ff;
  font-weight: bold;
}
</style> 

<style>
.equal-height-row {
  align-items: stretch;
}
.vgg-component .ant-col {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.vgg-component .tech-card {
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
}
.vgg-component .architecture-content {
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style> 