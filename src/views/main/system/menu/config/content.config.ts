export const contentTableConfig = {
  title: '菜单列表',
  propList: [
    { prop: 'name', label: '菜单名称', minWidth: '100' },
    { prop: 'type', label: '菜单类型', minWidth: '100' },
    { prop: 'url', label: '菜单url', minWidth: '100' },
    { prop: 'icon', label: '菜单icon', minWidth: '100', slotName: 'enable' },
    {
      prop: 'permission',
      label: '按钮权限',
      minWidth: '100',
      slotName: 'enable'
    },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '100',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '100',
      slotName: 'updateAt'
    },
    {
      label: '操作',
      minwidth: '120',
      slotName: 'handler'
    }
  ],
  showIndexColumn: false,
  showSelectionColumn: false,
  // 是否有展开的菜单表格
  childrenProps: {
    rowKey: 'id',
    treeProps: {
      children: 'children'
    }
  },
  isShowFooter: false
}
