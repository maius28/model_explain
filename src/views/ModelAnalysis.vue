<template>
  <div class="model-analysis">
    <div class="content-wrapper">
      <h2 class="page-title">模型分析</h2>
      <div class="analysis-content">
        <a-row :gutter="[24, 24]">
          <a-col :span="24">
            <a-card class="tech-card" title="模型分析">
              <template #extra>
                <a-upload
                  :show-upload-list="false"
                  :before-upload="beforeUpload"
                  @change="handleUpload"
                  accept=".png,.jpg,.jpeg,.gif"
                >
                  <a-button type="primary" ghost class="upload-btn-large">
                    <template #icon><UploadOutlined /></template>
                    <span style="color: white; font-size: 18px;">上传图片</span>
                  </a-button>
                </a-upload>
              </template>
              <div class="analysis-main-content">
                <template v-if="loading">
                  <div class="progress-wrapper" v-if="progressStarted">
                    <a-progress type="circle"  :percent="progress" :width="140" :format="(percent: number) => percent + '%'" />
                    <div style="margin-top: 12px; color: #00d4ff;">正在分析图片...</div>
                  </div>
                </template>
                <template v-else-if="showResult">
                  <a-row gutter="24">
                    <a-col :span="14">
                      <a-card class="sub-card" bordered>        
                        <div class="analysis-title">表征分析</div>          
                        <img src="/src/assets/images/AnalysisShow.gif" alt="表征分析" class="analysis-image" />
                      </a-card>
                    </a-col>
                    <a-col :span="10">
                      <a-card class="sub-card" bordered>
                        <div class="analysis-title">贡献度分析</div>
                        <div ref="radarRef" class="radar-chart"></div>
                      </a-card>
                    </a-col>
                  </a-row>
                </template>
                <template v-else>
                  <div class="placeholder-row">
                    <UploadOutlined class="placeholder-icon" />
                    <p>结果将在这里显示</p>
                  </div>
                </template>
              </div>
            </a-card>
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'
import { UploadOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import * as echarts from 'echarts'

const loading = ref(false)
const progress = ref(0)
let timer: number | null = null
const radarRef = ref<HTMLElement | null>(null)
const progressStarted = ref(false)
const showResult = ref(false)

function beforeUpload(file: File) {
  const allowed = ['.png', '.jpg', '.jpeg', '.gif']
  const ext = file.name.slice(file.name.lastIndexOf('.')).toLowerCase()
  if (!allowed.includes(ext)) {
    message.error('仅支持上传图片文件（png, jpg, jpeg, gif）')
    return false
  }
  return true
}

function handleUpload(info: any) {
  if (info.file.status === 'done' || info.file.status === 'uploading' || info.file.status === undefined) {
    loading.value = true
    progress.value = 0
    progressStarted.value = true
    showResult.value = false
    if (timer) clearInterval(timer)
    timer = window.setInterval(() => {
      if (progress.value < 100) {
        progress.value += 5
      } else {
        clearInterval(timer!)
        loading.value = false
        showResult.value = true
        nextTick(() => renderRadar())
      }
    }, 100)
  }
}

function renderRadar() {
  if (radarRef.value) {
    const myChart = echarts.init(radarRef.value)
    myChart.setOption({
      title: {
        text: 'VGG Layer Contribution Rates',
        left: 'center',
        top: 10,
        textStyle: {
          fontSize: 22,
          fontWeight: 500
        }
      },
      tooltip: {},
      radar: {
        indicator: [
          { name: 'conv1_1', max: 0.3 },
          { name: 'conv1_2', max: 0.3 },
          { name: 'pool1', max: 0.3 },
          { name: 'conv2_1', max: 0.3 },
          { name: 'conv2_2', max: 0.3 },
          { name: 'pool2', max: 0.3 },
          { name: 'conv5_3', max: 0.3 },
          { name: 'pool5', max: 0.3 },
          { name: 'fc6', max: 0.3 },
          { name: 'fc7', max: 0.3 }
        ],
        splitNumber: 6,
        radius: '70%',
        name: {
          textStyle: {
            color: '#bfbfbf',
            fontSize: 14
          }
        }
      },
      series: [{
        type: 'radar',
        data: [
          {
            value: [0.05, 0.07, 0.04, 0.08, 0.10, 0.00, 0.30, 0.15, 0.10, 0.06],
            name: '贡献度',
            areaStyle: {
              color: 'rgba(255, 200, 80, 0.3)'
            },
            lineStyle: {
              color: '#ffb300',
              width: 3
            },
            symbol: 'circle',
            itemStyle: {
              color: '#ffb300'
            }
          }
        ]
      }]
    })
  }
}

onMounted(() => {
  loading.value = false
  progress.value = 0
  progressStarted.value = false
  showResult.value = false
})

const activeTab = ref('accuracy')
const selectedModel = ref('alexnet')
const selectedDataset = ref('imagenet')
const analysisTypes = ref(['accuracy'])

const threeContainer = ref<HTMLElement | null>(null)
const showThree = ref(false)

function showThreeVisualization() {
  showThree.value = true
  nextTick(() => {
    if (threeContainer.value) {
      // 清空容器
      threeContainer.value.innerHTML = ''
      // 初始化 three.js 场景
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000)
      camera.position.set(0, 0, 60)
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
      renderer.setSize(300, 260)
      threeContainer.value.appendChild(renderer.domElement)

      // 生成模拟特征图数据
      const depth = 8 // 层数
      const width = 24 // 每层宽
      const height = 16 // 每层高
      for (let d = 0; d < depth; d++) {
        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            // 随机颜色，实际可用模型数据映射
            const value = Math.random()
            const color = new THREE.Color().setHSL(0.3 + 0.7 * value, 1, 0.5)
            const geometry = new THREE.PlaneGeometry(0.9, 0.9)
            const material = new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide })
            const mesh = new THREE.Mesh(geometry, material)
            mesh.position.set(
              x - width / 2,
              y - height / 2,
              d * 1.2
            )
            scene.add(mesh)
          }
        }
      }

      // 灯光
      const light = new THREE.AmbientLight(0xffffff, 1)
      scene.add(light)

      // 动画
      function animate() {
        scene.rotation.z += 0.002
        scene.rotation.x += 0.001
        renderer.render(scene, camera)
        requestAnimationFrame(animate)
      }
      animate()
    }
  })
}

const columns = [
  {
    title: '模型',
    dataIndex: 'model',
    key: 'model',
  },
  {
    title: '准确率',
    dataIndex: 'accuracy',
    key: 'accuracy',
  },
  {
    title: '推理时间(ms)',
    dataIndex: 'inferenceTime',
    key: 'inferenceTime',
  },
  {
    title: '参数量',
    dataIndex: 'parameters',
    key: 'parameters',
  },
  {
    title: '内存使用(MB)',
    dataIndex: 'memory',
    key: 'memory',
  },
]

const dataSource = [
  {
    key: '1',
    model: 'AlexNet',
    accuracy: '95.8%',
    inferenceTime: '12.5',
    parameters: '138M',
    memory: '256',
  },
  {
    key: '2',
    model: 'VGG',
    accuracy: '97.2%',
    inferenceTime: '18.3',
    parameters: '245M',
    memory: '384',
  },
  {
    key: '3',
    model: 'ResNet',
    accuracy: '98.1%',
    inferenceTime: '22.7',
    parameters: '512M',
    memory: '512',
  },
]
</script>

<style scoped>
.model-analysis {
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

.analysis-tabs :deep(.ant-tabs-tab) {
  color: #ffffff;
}

.analysis-tabs :deep(.ant-tabs-tab-active) {
  color: #00d4ff;
}

.analysis-tabs :deep(.ant-tabs-ink-bar) {
  background: #00d4ff;
}

.chart-placeholder {
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 212, 255, 0.05);
  border: 2px dashed rgba(0, 212, 255, 0.3);
  border-radius: 8px;
}

.chart-icon {
  font-size: 48px;
  color: rgba(0, 212, 255, 0.5);
  margin-bottom: 16px;
}

.chart-placeholder p {
  margin: 0;
  color: #666;
  font-size: 16px;
}

.analysis-table :deep(.ant-table) {
  background: transparent;
}

.analysis-table :deep(.ant-table-thead > tr > th) {
  background: rgba(0, 212, 255, 0.1);
  color: #00d4ff;
  border-bottom: 1px solid rgba(0, 212, 255, 0.3);
}

.analysis-table :deep(.ant-table-tbody > tr > td) {
  background: transparent;
  color: #ffffff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.analysis-table :deep(.ant-table-tbody > tr:hover > td) {
  background: rgba(0, 212, 255, 0.1);
}

.three-container {
  width: 300px;
  height: 260px;
  margin: 0 auto;
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 212, 255, 0.2);
  background: transparent;
}
.analysis-main-content {
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.progress-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 350px;
}
.analysis-image-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.analysis-image {
  width: 100%;
  height: 100%;
  max-width: none;
  max-height: none;
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 212, 255, 0.2);
  margin-top: 12px;
  object-fit: contain;
  display: block;
}
.analysis-title {
  color: #00d4ff;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px;
  text-align: center;
}
.contribution-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.radar-chart {
  width: 100%;
  height: 100%;
  /* height: 300px; */
  max-width: none;
  height: 600px;
  margin-top: 12px;
  display: block;
}
.sub-card {
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(0, 212, 255, 0.2);
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 212, 255, 0.08);
  height: 100%;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  /* justify-content: center; */
}
.upload-btn-large {
  font-size: 18px;
  padding: 8px 32px;
  height: 48px;
  border-radius: 6px;
}

.tech-card :deep(.ant-progress-inner) .ant-progress-text {
  color: #fff !important;
}

.placeholder-icon {
  font-size: 48px;
  color: rgba(0, 212, 255, 0.5);
  margin-bottom: 16px;
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
.placeholder-content p {
  margin: 0;
  font-size: 16px;
}
.placeholder-row {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.placeholder-row .placeholder-icon {
  font-size: 48px;
  color: rgba(0, 212, 255, 0.5);
  margin-bottom: 0;
  margin-right: 12px;
}
.placeholder-row p {
  margin: 0;
  font-size: 18px;
  color: #666; /* 或 #00d4ff，根据需求调整 */
  font-weight: 500;
  letter-spacing: 1px;
}
</style> 