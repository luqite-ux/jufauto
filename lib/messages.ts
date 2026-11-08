import type { HeroSlide } from '@/lib/site-data'

export const NAV_LINKS_ZH = [
  { href: '/', label: '首页' },
  { href: '/products', label: '产品中心' },
  { href: '/solutions', label: '解决方案' },
  { href: '/capabilities', label: '能力与服务' },
  { href: '/about', label: '关于九峰' },
  { href: '/news', label: '新闻资讯' },
  { href: '/contact', label: '联系我们' },
] as const

export const ZH_COMMON = {
  quote: '获取报价',
  mobileDescription: '工业自动化设备与控制系统',
  address: '中国江苏省苏州工业园区东富路33号',
  legalName: '苏州工业园区九峰自动化技术有限公司',
  site: '网站导航',
  productFamilies: '产品分类',
  contact: '联系方式',
  phone: '电话',
  email: '邮箱',
  requestEyebrow: '获取报价',
  requestTitle: '向工程团队提交您的需求',
  requestDescription: '请说明工件、工艺、产量及应用场景，我们将根据已提供的信息与您进一步沟通。',
  submit: '提交需求',
  captcha: '图片验证码',
} as const

export const HERO_SLIDES_ZH: HeroSlide[] = [
  {
    id: 'process', image: '/images/banner-1.jpg', imageAlt: '包含机器人、输送线和加工设备的自动化生产线应用示意图',
    eyebrow: '非标自动化设备', title: '围绕您的工艺设计自动化方案',
    body: '从工件、节拍和现场空间出发，完成工作站、装配线、检测与控制系统的协同设计。',
    primary: { label: '查看产品', href: '/zh/products' }, secondary: { label: '提交需求', href: '/zh/contact#rfq' },
    textSide: 'left', focusDesktop: 50, focusMobile: 50,
  },
  {
    id: 'tightening', image: '/images/banner-2.jpg', imageAlt: '自动锁付、供料及装配工位应用示意图',
    eyebrow: '锁付与供料系统', title: '将锁付、供料与工位控制集成为一体',
    body: '根据紧固件、产品结构和节拍要求配置锁付模块、供料系统及控制逻辑。',
    primary: { label: '查看产品分类', href: '/zh/products' }, secondary: { label: '联系工程团队', href: '/zh/contact' },
    textSide: 'right', focusDesktop: 50, focusMobile: 50,
  },
  {
    id: 'integration', image: '/images/banner-3.jpg', imageAlt: '工业机器人与自动化控制系统应用示意图',
    eyebrow: '机器人系统集成', title: '机械、控制与现场应用协同落地',
    body: '结合机器人、工装、供料、安全防护和软件控制，形成可执行的自动化单元或生产线方案。',
    primary: { label: '了解解决方案', href: '/zh/solutions' }, secondary: { label: '了解企业能力', href: '/zh/capabilities' },
    textSide: 'left', focusDesktop: 50, focusMobile: 50,
  },
]

export const PROCUREMENT_FAQ_ZH = [
  { q: '询价时需要提供哪些信息？', a: '建议提供工件图纸或照片、工艺流程、目标节拍、产量、现场空间及需要对接的现有设备。' },
  { q: '是否可以按现有生产线条件进行定制？', a: '可以。方案会结合工件、工艺顺序、空间条件、上下游接口和现场控制要求进行确认。' },
  { q: '锁付模块如何选型？', a: '需要结合螺钉规格、锁付位置、扭矩要求、节拍和上料方式确认具体配置。' },
  { q: '供料系统可以处理哪些零件？', a: '是否适用取决于零件形状、尺寸、材质、姿态要求及后续工位的取料方式。' },
  { q: '可以提供机器人集成吗？', a: '可以根据搬运、装配、锁付或加工任务配置机器人、末端工具、安全防护和控制系统。' },
  { q: '如何开始项目沟通？', a: '请通过询价表提交产品和工艺信息，工程团队会根据现有资料确认下一步需要补充的内容。' },
]

export const ZH_PAGE_COPY = {
  products: { eyebrow: '产品中心', title: '按采购需求查找产品', description: '按产品分类筛选已发布产品。页面仅展示已有资料中的参数，其他配置需结合具体需求确认。' },
  solutions: { eyebrow: '解决方案', title: '基于九峰产品体系构建自动化方案', description: '根据工件、工艺、节拍和现场条件组合自动化设备、锁付、供料、机器人与控制软件。' },
  capabilities: { eyebrow: '能力与服务', title: '机械设计、系统集成与制造协同完成', description: '从机械结构和控制软件到成型与大型加工，项目工作在苏州工业园区协同推进。' },
  about: { eyebrow: '关于九峰', title: '位于苏州工业园区的自动化技术企业', description: 'JUFTECH 是苏州工业园区九峰自动化技术有限公司的对外品牌，公司成立于2014年。' },
  news: { eyebrow: '新闻资讯', title: '企业与产品动态', description: '查看九峰团队发布的企业、产品和技术动态。' },
  contact: { eyebrow: '联系我们', title: '与九峰工程团队沟通', description: '提交询价或技术问题时，请尽量附上工件、工艺、产量和现场条件。' },
} as const
