const rules = {
  name: [
    { required: true, message: '用户名不能为空', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{4,15}$/,
      message: '用户名为4~15个字母或数字',
      // trigger(触发条件): blur: 失去焦点时触发, change: 值改变是触发
      trigger: 'change'
    }
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{6,}$/,
      message: '密码为六位以上的字母或数字',
      trigger: 'change'
    }
  ]
}

export { rules }
