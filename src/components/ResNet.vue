<template>
  <div class="resnet-component">
    <!-- <h2 class="model-title">ResNet (Residual Network) 模型说明</h2> -->
    
    <a-row :gutter="[24, 24]" class="equal-height-row">
      <a-col :span="16" class="left-col">
        <a-card class="tech-card full-height-card" title="模型框架">
          <div class="architecture-content full-height-content">
            <div class="architecture-image">
              <img src="/src/assets/images/ResNet.png" alt="ResNet架构图" class="model-architecture-img" />
            </div>
          </div>
        </a-card>
      </a-col>
      
      <a-col :span="8">
        <a-card class="tech-card" title="模型特性">
          <a-descriptions :column="1" size="small">
            <!-- <a-descriptions-item label="发布年份">2015</a-descriptions-item> -->
            <a-descriptions-item label="参数量">25.6M</a-descriptions-item>
            <a-descriptions-item label="层数">50-152</a-descriptions-item>
            <a-descriptions-item label="输入尺寸">224×224×3</a-descriptions-item>
            <a-descriptions-item label="输出类别">1000</a-descriptions-item>
            <!-- <a-descriptions-item label="ImageNet准确率">76.0%</a-descriptions-item> -->
          </a-descriptions>
        </a-card>
        
        <a-card class="tech-card" title="核心创新" style="margin-top: 16px;">
          <ul class="tech-details-list">
            <li v-for="(innovation, index) in innovations" :key="index">
              <strong>{{ innovation.title }}：</strong>
              {{ innovation.description }}
            </li>
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
const innovations = [
  {
    title: '残差连接',
    description: '通过跳跃连接实现恒等映射，解决深层网络的梯度消失问题。'
  },
  {
    title: '批量归一化',
    description: '在每个卷积层后使用BN，加速训练收敛，提高模型稳定性。'
  },
  {
    title: '瓶颈设计',
    description: '使用1×1卷积降维和升维，减少参数量，提高计算效率。'
  }
]

const advantages = [
  {
    title: '解决梯度消失',
    description: '残差连接使得梯度可以直接传播到浅层，有效解决深层网络的梯度消失问题。'
  },
  {
    title: '易于优化',
    description: '恒等映射使得网络更容易优化，训练更稳定，收敛更快。'
  },
  {
    title: '性能提升',
    description: '在相同深度下，ResNet比传统网络具有更好的性能表现。'
  },
  {
    title: '可扩展性强',
    description: '可以轻松扩展到数百层，而不会出现性能退化问题。'
  }
]
</script>

<style scoped>
.resnet-component {
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

.residual-content {
  padding: 16px 0;
}

.residual-diagram {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.residual-block {
  background: rgba(0, 212, 255, 0.1);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 8px;
  padding: 20px;
  transition: all 0.3s ease;
}

.residual-block:hover {
  background: rgba(0, 212, 255, 0.15);
  border-color: rgba(0, 212, 255, 0.5);
}

.block-title {
  color: #00d4ff;
  margin: 0 0 16px 0;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
}

.block-structure {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

.conv-layers {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.conv-layer {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  padding: 8px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.layer-name {
  color: #00d4ff;
  font-weight: bold;
  font-size: 14px;
}

.layer-details {
  color: #cccccc;
  font-size: 12px;
}

.residual-connection {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  color: #00d4ff;
  font-size: 12px;
  padding: 8px;
  background: rgba(0, 212, 255, 0.1);
  border-radius: 4px;
}

.block-info {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #888888;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 12px;
}

.innovations {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.innovation-item {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.innovation-icon {
  color: #00d4ff;
  font-size: 20px;
  margin-top: 2px;
}

.innovation-content h5 {
  color: #00d4ff;
  margin: 0 0 4px 0;
  font-size: 14px;
}

.innovation-content p {
  color: #cccccc;
  margin: 0;
  font-size: 12px;
  line-height: 1.4;
}

.depth-table :deep(.ant-table) {
  background: transparent;
}

.depth-table :deep(.ant-table-thead > tr > th) {
  background: rgba(0, 212, 255, 0.1);
  color: #00d4ff;
  border-bottom: 1px solid rgba(0, 212, 255, 0.3);
}

.depth-table :deep(.ant-table-tbody > tr > td) {
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

.math-principle {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.formula {
  background: rgba(0, 212, 255, 0.05);
  border: 1px solid rgba(0, 212, 255, 0.2);
  border-radius: 8px;
  padding: 16px;
}

.formula h4 {
  color: #00d4ff;
  margin: 0 0 12px 0;
  font-size: 16px;
  font-weight: bold;
}

.formula-content {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 4px;
  padding: 12px;
  margin-bottom: 8px;
  text-align: center;
}

.formula-content span {
  color: #00d4ff;
  font-family: 'Courier New', monospace;
  font-size: 16px;
  font-weight: bold;
}

.formula p {
  color: #cccccc;
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
}

.tech-card :deep(.ant-descriptions-item-label) {
  color: #00d4ff;
  font-weight: bold;
}

.tech-card :deep(.ant-descriptions-item-content) {
  color: #ffffff;
}

.architecture-content {
  padding: 60px 0 60px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 420px;
}

.architecture-image {
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 212, 255, 0.05);
  border: 2px dashed rgba(0, 212, 255, 0.3);
  border-radius: 8px;
  padding: 20px;
  min-height: 420px;
}

.model-architecture-img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 212, 255, 0.2);
  transition: all 0.3s ease;
  padding: 20px 0 20px 0;
}

.model-architecture-img:hover {
  transform: scale(1.02);
  box-shadow: 0 12px 40px rgba(0, 212, 255, 0.3);
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
.left-col {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.full-height-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.full-height-content {
  flex: 1 1 0%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0;
}
.architecture-image {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 212, 255, 0.05);
  border: 2px dashed rgba(0, 212, 255, 0.3);
  border-radius: 8px;
  padding: 20px;
}
.model-architecture-img {
  max-width: 100%;
  max-height: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 212, 255, 0.2);
  transition: all 0.3s ease;
  display: block;
  margin: 0 auto;
}
</style> 

<style>
.equal-height-row {
  align-items: stretch;
  min-height: 480px;
  display: flex;
}
.resnet-component .ant-row {
  height: 100%;
  min-height: 480px;
}
.resnet-component .ant-col {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.resnet-component .tech-card,
.resnet-component .architecture-content {
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}
</style> 