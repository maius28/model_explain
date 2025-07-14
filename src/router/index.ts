import { createRouter, createWebHistory } from 'vue-router'
import ModelDescription from '../views/ModelDescription.vue'
import ModelVisualization from '../views/ModelVisualization.vue'
import ModelAnalysis from '../views/ModelAnalysis.vue'
import AlexNet from '../components/AlexNet.vue'
import VGG from '../components/VGG.vue'
import ResNet from '../components/ResNet.vue'

const routes = [
  {
    path: '/',
    redirect: '/model-description'
  },
  {
    path: '/model-description',
    name: 'ModelDescription',
    component: ModelDescription,
    children: [
      {
        path: 'alexnet',
        name: 'AlexNet',
        component: AlexNet
      },
      {
        path: 'vgg',
        name: 'VGG',
        component: VGG
      },
      {
        path: 'resnet',
        name: 'ResNet',
        component: ResNet
      },
      {
        path: '',
        redirect: '/model-description/alexnet'
      }
    ]
  },
  {
    path: '/model-visualization',
    name: 'ModelVisualization',
    component: ModelVisualization
  },
  {
    path: '/model-analysis',
    name: 'ModelAnalysis',
    component: ModelAnalysis
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 