export const contentTableConfig = {
  title: '商品信息',
  propList: [
    { prop: 'name', label: '商品名称', minWidth: '100' },
    {
      prop: 'oldPrice',
      label: '原价格',
      minWidth: '100',
      slotName: 'oldPrice'
    },
    {
      prop: 'newPrice',
      label: '现价格',
      minWidth: '100',
      slotName: 'newPrice'
    },
    { prop: 'status', label: '状态', minWidth: '100', slotName: 'status' },
    { prop: 'imgUrl', label: '商品图片', minWidth: '100', slotName: 'image' },
    { prop: 'inventoryCount', label: '剩余库存', minWidth: '100' },
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
  showIndexColumn: true,
  showSelectionColumn: true
}
