import { createApp } from 'vue'
import App from './App'
import components from "@/components/UI"
import router from '@/router/router'
import Vintersection from './directives/Vintersection'

const app = createApp(App);

components.forEach(component => {
    app.component(component.name, component)
})

app.directive('intersection', Vintersection)

app.use(router).mount('#app')
