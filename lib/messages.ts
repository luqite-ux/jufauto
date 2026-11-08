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

export const CAPABILITIES_ZH = [
  { title: '需求工程', text: '在形成方案前，与客户工程团队核对工件、工艺和现场信息。', icon: 'clipboard' },
  { title: '设备设计', text: '将机械框架、工作站、工装与安全防护作为完整设备协同设计。', icon: 'ruler' },
  { title: '锁付与供料集成', text: '协同选配锁付模块与振动盘供料系统，使工位形成完整运行单元。', icon: 'wrench' },
  { title: '机器人单元集成', text: '将机器人、末端工具、零件供给和控制系统组合为可执行单元。', icon: 'bot' },
  { title: '电气与控制软件', text: '控制柜、PLC 程序和操作界面与机械系统同步开发。', icon: 'cable' },
  { title: '成型与大型加工', text: '为设备制造及独立订单提供成型设备和大型重型部件加工。', icon: 'drill' },
] as const

export const SOLUTIONS_ZH = [
  { slug: 'assembly-and-fastening', title: '自动装配与锁付', text: '在带安全防护的系统中集成零件输送、供料与自动锁螺丝。', icon: 'cog', familySlugs: ['non-standard-automated-customized-equipment', 'tighten-the-assembly-module-and-tools', 'feeder'], points: ['多工位装配生产线', '自动锁螺丝', '紧固件与小型零件振动盘供料'] },
  { slug: 'robotic-cells', title: '机器人工作单元', text: '将机器人、工装和控制系统集成，用于搬运、装配或加工任务。', icon: 'bot', familySlugs: ['robot-system-integration', 'feeder'], imageProductSlug: 'valve-plate-production-line', points: ['机器人、夹具与工装集成', '零件供给与定位', '单元级控制逻辑'] },
  { slug: 'forming-and-machining', title: '成型与大型加工', text: '面向设备框架、底座和结构件的成型设备与大型加工。', icon: 'hammer', familySlugs: ['forming-machine', 'heavy-machinery-processing'], points: ['带控制柜的成型设备', '重型零件龙门加工'] },
  { slug: 'field-terminals', title: '现场与车载计算终端', text: '用于数据采集、定位显示和车载操作的加固型平板终端。', icon: 'tablet', familySlugs: ['unmanned-aerial-vehicle-onboard-control-tablet'], points: ['加固型平板终端', '车载应用', '应用信息显示'] },
  { slug: 'control-software', title: '工业控制软件', text: '为自动化设备及操作人员提供控制程序与软件服务。', icon: 'braces', familySlugs: ['outsourcing-services-for-control-software-plc-labview-c'], points: ['设备控制程序', '操作界面', '集成系统的软件支持'] },
] as const

export const WORKFLOW_STEPS_ZH = [
  { title: '需求分析', text: '核对工件、工艺步骤、现场条件以及客户提供的图纸或样品。' },
  { title: '方案设计', text: '根据确认的需求形成机械、电气与控制方案。' },
  { title: '装配与集成', text: '将框架、工装、锁付、供料和控制部件组合为完整系统。' },
  { title: '调试与验证', text: '根据双方确认的要求对系统功能进行运行检查。' },
  { title: '交付支持', text: '完成发运准备，并在设备交付过程中保持技术沟通。' },
] as const

export const FACTS_ZH = [
  { value: '2014', label: '成立时间', note: '位于苏州工业园区' },
  { value: '约 9,000 m²', label: '厂区面积', note: '现有资料中的约数' },
  { value: '3', label: '车间', note: '设备制造、装配与加工资源' },
  { value: '9', label: '产品分类', note: '按采购需求组织产品目录' },
] as const

export const EVIDENCE_ZH = [
  { src: '/images/product-custom-automation.jpg', alt: '带输送工位和安全防护的铝型材自动化生产线', caption: '带操作面板和安全防护的自动化生产线' },
  { src: '/images/product-forming.jpg', alt: '成型设备及打开的电气控制柜', caption: '成型设备与电气控制柜' },
  { src: '/images/product-heavy-machining.jpg', alt: '带钢制伸缩防护罩的龙门机床', caption: '龙门大型加工设备' },
] as const

export const CASE_STUDIES_ZH = [
  { productSlug: 'horn-assembly-production-line', title: '多工位零部件装配线', sector: '汽车零部件', process: ['零件供料与定位', '装配、检测与追溯'], scope: ['机械工位与防护', '电气控制与操作界面'] },
  { productSlug: 'welding-of-motor-stator', title: '电机定子焊接设备', sector: '电驱动部件', process: ['定子定位', '受控焊接与结果采集'], scope: ['工艺工装', '控制顺序与安全集成'] },
  { productSlug: 'gear-shifter-production-line-43', title: '机器人上下料单元', sector: '工业制造', process: ['工件识别', '机器人在工艺设备间转运'], scope: ['机器人与末端工具', '防护、联锁与控制'] },
  { productSlug: 'blow-type-tightening-module', title: '自动锁付工作站', sector: '装配制造', process: ['紧固件供给', '受控锁付与结果记录'], scope: ['供料器与锁付模块', '夹具、控制与操作空间'] },
  { productSlug: 'factory-air-conditioning-monitoring-system', title: '工厂环境监控', sector: '工厂公用系统', process: ['设备数据采集', '报警与运行状态可视化'], scope: ['PLC 通信', '监控界面与记录'] },
  { productSlug: 'water-treatment-monitoring-system', title: '水处理监控系统', sector: '工艺公用系统', process: ['状态采集与控制', '趋势、报警与运行记录'], scope: ['控制软件', '操作界面与系统通信'] },
] as const
