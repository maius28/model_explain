<template>
  <div class="alexnet-component">
    <!-- <h2 class="model-title">AlexNet 模型说明</h2> -->
    
    <a-row :gutter="[24, 24]" class="equal-height-row">
      <a-col :span="16">
        <a-card class="tech-card" title="模型架构">
          <div class="architecture-content">
            <div class="architecture-image">
              <img src="/src/assets/images/AlextNet.png" alt="AlexNet架构图" class="model-architecture-img" />
            </div>
          </div>
        </a-card>
      </a-col>
      
      <a-col :span="8">
        <a-card class="tech-card" title="模型特性">
          <a-descriptions :column="1" size="small">
            <!-- <a-descriptions-item label="发布年份">2012</a-descriptions-item> -->
            <a-descriptions-item label="参数量">60M</a-descriptions-item>
            <a-descriptions-item label="层数">8</a-descriptions-item>
            <a-descriptions-item label="输入尺寸">227×227×3</a-descriptions-item>
            <a-descriptions-item label="输出类别">1000</a-descriptions-item>
            <!-- <a-descriptions-item label="ImageNet准确率">57.1%</a-descriptions-item> -->
          </a-descriptions>
        </a-card>
        
        <a-card class="tech-card" title="创新点" style="margin-top: 16px;">
          <ul class="innovation-list">
            <li>首次使用ReLU激活函数</li>
            <li>引入Dropout防止过拟合</li>
            <li>使用数据增强技术</li>
            <li>GPU并行训练</li>
            <li>局部响应归一化(LRN)</li>
          </ul>
        </a-card>
        
        <a-card class="tech-card" title="技术细节" style="margin-top: 16px;">
          <ul class="tech-details-list">
            <li>
              <strong>卷积层设计：</strong>
              AlexNet包含5个卷积层，前两个卷积层使用较大的卷积核(11×11和5×5)来捕获大尺度特征，后续层使用较小的卷积核(3×3)来提取更精细的特征。
            </li>
            <li>
              <strong>池化策略：</strong>
              使用最大池化层进行下采样，池化窗口大小为3×3，步长为2，有效减少特征图尺寸并保留重要特征。
            </li>
            <li>
              <strong>全连接层：</strong>
              包含3个全连接层，最后一层输出1000个类别概率。使用Dropout技术(概率0.5)防止过拟合。
            </li>
            <li>
              <strong>训练策略：</strong>
              使用随机梯度下降(SGD)优化器，学习率0.01，动量0.9。使用权重衰减(0.0005)进行正则化。
            </li>
          </ul>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.alexnet-component {
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
  padding: 60px 0 60px 0; /* 上下内边距，顶部加大 */
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
}

.model-architecture-img:hover {
  transform: scale(1.02);
  box-shadow: 0 12px 40px rgba(0, 212, 255, 0.3);
}

.layer-diagram {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.layer {
  display: flex;
  align-items: center;
  gap: 16px;
}

.layer-info {
  flex: 1;
  background: rgba(0, 212, 255, 0.1);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 8px;
  padding: 16px;
  transition: all 0.3s ease;
}

.layer-info:hover {
  background: rgba(0, 212, 255, 0.15);
  border-color: rgba(0, 212, 255, 0.5);
}

.layer-info h4 {
  color: #00d4ff;
  margin: 0 0 8px 0;
  font-size: 16px;
}

.layer-info p {
  color: #cccccc;
  margin: 0 0 8px 0;
  font-size: 14px;
}

.layer-stats {
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: #888888;
}

.layer-arrow {
  color: #00d4ff;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(0, 212, 255, 0.1);
  border-radius: 50%;
}

.innovation-list {
  color: #cccccc;
  padding-left: 20px;
}

.innovation-list li {
  margin-bottom: 8px;
  line-height: 1.5;
}

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

.tech-card :deep(.ant-descriptions-item-label) {
  color: #00d4ff;
  font-weight: bold;
}

.tech-card :deep(.ant-descriptions-item-content) {
  color: #ffffff;
}
</style> 

<style>
.equal-height-row {
  align-items: stretch;
}
.alexnet-component .ant-col {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.alexnet-component .tech-card {
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
}
.alexnet-component .architecture-content {
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style> 