/**
 * @desc 工器具状态
 */
export const toolStatusEnum = (status: string) => {
  switch (status) {
    case '0':
      return '在库'
    case '1':
      return '预领取'
    case '2':
      return '已领用'
    case '3':
      return '检验中'
    case '4':
      return '维修中'
    case '5':
      return '已报废'
    case '6':
      return '脱检'
    case '7':
      return '在库(异常)'
    case '8':
      return '预归还'
    default:
      return '状态错误'
  }
}

export const toolStatusOptions = [
  {
    label: '在库',
    value: '0',
  },
  {
    label: '预领取',
    value: '1',
  },
  {
    label: '已领用',
    value: '2',
  },
  {
    label: '检验中',
    value: '3',
  },
  {
    label: '维修中',
    value: '4',
  },
  {
    label: '已报废',
    value: '5',
  },
  {
    label: '脱检',
    value: '6',
  },
  {
    label: '在库(异常)',
    value: '7',
  },
  {
    label: '预归还',
    value: '8',
  },
]
