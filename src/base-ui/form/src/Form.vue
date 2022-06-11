<template>
  <div class="zero-form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="formItem in formItems" :key="formItem.label">
          <el-col v-bind="colLayout">
            <el-form-item
              v-if="!formItem.isHidden"
              :label="formItem.label"
              :style="itemStyle"
              :rules="formItem.rules"
              v-model="formDate[`${formItem.filed}`]"
            >
              <template
                v-if="formItem.type === 'input' || formItem.type === 'password'"
              >
                <el-input
                  :show-password="formItem.type === 'password'"
                  :placeholder="formItem.placeholder"
                  v-bind="formItem.otherOptions"
                  v-model="formDate[`${formItem.filed}`]"
                />
              </template>
              <template v-else-if="formItem.type === 'select'">
                <el-select
                  style="width: 100%"
                  :placeholder="formItem.placeholder"
                  v-bind="formItem.otherOptions"
                  v-model="formDate[`${formItem.filed}`]"
                >
                  <el-option
                    v-for="option in formItem.options"
                    :key="option.value"
                    :value="option.value"
                  >
                    {{ option.title }}
                  </el-option>
                </el-select>
              </template>
              <template v-else-if="formItem.type === 'datePicker'">
                <el-date-picker
                  style="width: 100%"
                  v-bind="formItem.otherOptions"
                  v-model="formDate[`${formItem.filed}`]"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'

import { IFormItem } from '../types'

export default defineComponent({
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    formItems: {
      type: Array as PropType<IFormItem[]>,
      default: () => []
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    itemStyle: {
      type: Object,
      default: () => ({
        padding: '5px 30px'
      })
    },
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6,
        lg: 8,
        md: 12,
        sm: 24
      })
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    // 获取 v-model 传过来的值,并结构
    const formDate = ref({ ...props.modelValue })

    // 监听 formDate 的值,并 emit 发送事件到父组件,使其更改值
    watch(formDate, (newValue) => emit('update:modelValue', newValue), {
      deep: true
    })

    return {
      formDate
    }
  }
})
</script>

<style scoped lang="less">
.zero-form {
  padding-top: 22px;
}
</style>
