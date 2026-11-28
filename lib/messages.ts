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
    id: 'custom-automation', image: '/images/banner-1.jpg', imageAlt: '包含机器人、输送线和加工设备的非标自动化定制生产线应用示意图',
    eyebrow: '非标自动化 · 定制设备', title: '非标自动化定制设备与产线集成',
    body: '围绕工件结构、工艺流程与现场布局，定制单机自动化工作站及多工位生产线。',
    primary: { label: '查看非标自动化', href: '/zh/products?family=non-standard-automated-customized-equipment' }, secondary: { label: '提交需求', href: '/zh/contact#rfq' },
    textSide: 'left', focusDesktop: 72, focusMobile: 96,
  },
  {
    id: 'tightening-feeding', image: '/images/banner-2.jpg', imageAlt: '标准产品拧紧单元、供料系统及装配工位控制应用示意图',
    eyebrow: '标准产品 · 锁付与供料系统', title: '将锁付、供料与工位控制集成为一体',
    body: '根据紧固件、产品结构和节拍要求配置拧紧单元、供料系统及控制逻辑。',
    primary: { label: '查看标准产品', href: '/zh/products?family=standard-tightening-feeding' }, secondary: { label: '联系工程团队', href: '/zh/contact#rfq' },
    textSide: 'right', focusDesktop: 34, focusMobile: 24,
  },
  {
    id: 'robot-integration', image: '/images/banner-3.jpg', imageAlt: '工业机器人与自动化控制系统应用示意图',
    eyebrow: '机器人系统集成', title: '机械、控制与现场应用协同落地',
    body: '结合机器人、工装、供料、安全防护和软件控制，形成可执行的自动化单元或生产线方案。',
    primary: { label: '了解解决方案', href: '/zh/solutions' }, secondary: { label: '了解企业能力', href: '/zh/capabilities' },
    textSide: 'left', focusDesktop: 70, focusMobile: 80,
  },
  {
    id: 'uav-tablets', image: '/images/banner-4.jpg', imageAlt: '工业级无人机与车载操控加固平板的概念示意图',
    eyebrow: '无人机和车载平板', title: '工业级无人机与车载操控平板',
    body: '适用于无人机地面站控制、车载作业与复杂现场环境的加固型平板终端。',
    primary: { label: '查看平板产品', href: '/zh/products?family=unmanned-aerial-vehicle-onboard-control-tablet' }, secondary: { label: '提交需求', href: '/zh/contact#rfq' },
    textSide: 'left', focusDesktop: 70, focusMobile: 90,
  },
  {
    id: 'forming-machines', image: '/images/equipment/belt-forming-1.jpg', imageAlt: '车间标准皮带成型机及电控安全防护结构实拍图',
    eyebrow: '成型机 · 标准成型设备', title: '皮带成型机与模压成型机',
    body: '提供标准成型设备制造与工艺配置，重点覆盖皮带成型机、模压成型机及配套电控系统。',
    primary: { label: '查看成型设备', href: '/zh/products?family=forming-machine' }, secondary: { label: '咨询设备方案', href: '/zh/contact#rfq' },
    textSide: 'left', focusDesktop: 55, focusMobile: 60,
  },
  {
    id: 'heavy-machinery-parts', image: '/images/banner-5.jpg', imageAlt: '重工机械批量机加工设备与 OEM 定制加工配件概念示意图',
    eyebrow: '批量重型机械加工 · OEM定制加工', title: '现货配件与批量 OEM 定制机加工',
    body: '提供重型机械零部件批量机加工及现货备件，支持按图纸或样品沟通 OEM 定制加工。',
    primary: { label: '提交询价', href: '/zh/contact#rfq' }, secondary: { label: '了解加工能力', href: '/zh/capabilities' },
    textSide: 'right', focusDesktop: 34, focusMobile: 36,
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
  { title: '非标自动化定制', text: '围绕工件、工艺顺序和现场布局，定制非标自动化单机工作站与多工位生产线。', icon: 'clipboard' },
  { title: '标准拧紧单元与供料系统', text: '协同选配标准化拧紧单元、振动盘/阶梯/滚筒供料系统及功能附件。', icon: 'wrench' },
  { title: '机器人系统集成', text: '将机器人、末端工具、零件供给、安全防护与控制系统组合为可执行单元。', icon: 'bot' },
  { title: '标准成型设备制造', text: '重点聚焦皮带成型机、模压成型机等标准成型设备及配套电控系统。', icon: 'hammer' },
  { title: '批量重型机械加工与 OEM', text: '提供大型重型部件批量龙门机加工、现货备件及按图/按样 OEM 定制加工。', icon: 'drill' },
  { title: '控制软件、电柜制作与技术服务', text: '提供电气控制柜制作、PLC/LabVIEW/C# 控制软件开发及东南亚纺织智能缝制升级等自动化技术服务。', icon: 'cable' },
] as const

export const SOLUTIONS_ZH = [
  {
    slug: 'sea-textile-smart-sewing',
    title: '东南亚纺织服装厂智能缝制自动化升级方案集成',
    text: '面向越南、柬埔寨、印尼、孟加拉等东南亚纺织服装厂的自动化升级技术服务，整合具备 CE 认证的智能模板缝纫机、自动裁床等成熟硬件，提供整线排布、工艺调试、工人培训与远程运维。',
    icon: 'workflow',
    familySlugs: ['outsourcing-services-for-control-software-plc-labview-c', 'forming-machine'],
    imageProductSlug: 'control-cabinet',
    points: [
      '成熟标准化智能缝制与自动裁床硬件方案整合及 CE 认证文件配套',
      '样板产线规划、工艺适配调试与 1–2 周本地工人操作培训',
      '远程运维支持及后续产线扩建、工位升级等持续技术服务',
    ],
  },
  {
    slug: 'control-software-cabinet-services',
    title: '控制软件开发、电柜制作与技术服务',
    text: '面向自动化产线与工厂升级，提供工业控制软件开发、电气控制柜制作及全流程现场技术服务。',
    icon: 'braces',
    familySlugs: ['outsourcing-services-for-control-software-plc-labview-c'],
    imageProductSlug: 'control-cabinet',
    points: [
      '电气控制柜设计、装配与成套制作',
      'PLC、LabVIEW、C# 工控软件与监控界面开发',
      '现场工艺调试、操作培训与远程运维技术服务',
    ],
  },
  {
    slug: 'assembly-and-fastening',
    title: '非标自动化与拧紧/供料集成',
    text: '将非标自动化定制设备与标准拧紧单元、供料系统深度结合，形成高节拍装配工位与生产线。',
    icon: 'cog',
    familySlugs: ['non-standard-automated-customized-equipment', 'standard-tightening-feeding'],
    imageProductSlug: 'horn-assembly-production-line',
    points: ['非标多工位装配生产线', '标准自动拧紧单元集成', '振动盘、阶梯及滚筒供料系统'],
  },
  {
    slug: 'robotic-cells',
    title: '机器人系统集成',
    text: '将机器人、末端工装、供料、安全防护和控制系统集成，用于搬运、装配或加工任务。',
    icon: 'bot',
    familySlugs: ['robot-system-integration', 'standard-tightening-feeding'],
    imageProductSlug: 'gear-shifter-production-line-43',
    points: ['机器人、夹具与工装集成', '零件供给与定位', '单元级控制逻辑与安全防护'],
  },
  {
    slug: 'forming-and-machining',
    title: '标准成型设备与批量重型机加工',
    text: '重点提供皮带成型机、模压成型机等标准成型设备，以及重型机械零部件批量加工与 OEM 定制加工。',
    icon: 'hammer',
    familySlugs: ['forming-machine', 'heavy-machinery-processing'],
    imageProductSlug: 'automobile-belt-forming-machine',
    points: ['皮带成型机与模压成型机（标准设备）', '重型零件龙门批量机械加工', '按图纸或样品 OEM 定制加工'],
  },
  {
    slug: 'field-terminals',
    title: '无人机与车载平板终端',
    text: '面向无人机地面站控制、车载应用与复杂现场环境的工业级加固平板终端。',
    icon: 'tablet',
    familySlugs: ['unmanned-aerial-vehicle-onboard-control-tablet'],
    imageProductSlug: 'three-proof-reinforced-notebook',
    points: ['无人机操控加固平板', '车载工业终端与定位显示', '三防与北斗短报文应用适配'],
  },
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
  { value: '7', label: '大核心业务', note: '覆盖非标设备、标准产品至技术服务' },
] as const

export const EVIDENCE_ZH = [
  { src: '/images/product-custom-automation.jpg', alt: '带输送工位和安全防护的铝型材自动化生产线', caption: '带操作面板和安全防护的自动化生产线' },
  { src: '/images/equipment/compression-molding-1.jpg', alt: '模压成型机实拍图', caption: '模压成型机' },
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
