type fromType = 'input' | 'password' | 'select' | 'datePicker'

export interface IFormItem {
  filed: string
  type: fromType
  label: any
  rules?: any[]
  placeholder?: any
  // 针对 select 的 option
  options?: any[]
  // 其他的 option
  otherOptions?: any
}

export interface IForm {
  formItems: IFormItem[]
  labelWidth?: string
  itemStyle?: any
  colLayout?: any
}
