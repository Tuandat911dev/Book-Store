<script setup lang="ts">
import { ElNotification } from 'element-plus'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    validator: (value: string) => ['success', 'warning', 'info', 'error'].includes(value)
  }
})

const handleNotification = () => {
  ElNotification({
    title: props.title,
    message: props.message,
    type: props.type as 'success' | 'warning' | 'info' | 'error'
  })
}

handleNotification()
</script>
