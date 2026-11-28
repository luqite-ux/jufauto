/**
 * Centralised representative static data for the design stage.
 * Every export here is a plain object/array so it can later be replaced by a
 * database-backed loader without touching the presentation components.
 */

export type IconKey =
  | 'cog'
  | 'wrench'
  | 'funnel'
  | 'tablet'
  | 'bot'
  | 'hammer'
  | 'drill'
  | 'braces'
  | 'clipboard'
  | 'ruler'
  | 'cable'
  | 'truck'
  | 'factory'
  | 'layers'
  | 'workflow'

export const COMPANY = {
  brand: 'JUFTECH',
  legalName: 'Suzhou Industrial Park Jiufeng Automation Technology Co., Ltd.',
  domain: 'jufauto.com',
  address: 'No. 33 Dongfu Road, Suzhou Industrial Park, China',
  email: 'info@jufauto.com',
  phones: [
    { label: 'Telephone', display: '0512-67678265', href: 'tel:+8651267678265' },
    { label: 'Mobile', display: '18913596766', href: 'tel:+8618913596766' },
  ],
  founded: 2014,
} as const

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/solutions', label: 'Solutions' },
  { href: '/capabilities', label: 'Capabilities' },
  { href: '/about', label: 'About' },
  { href: '/news', label: 'News' },
  { href: '/contact', label: 'Contact' },
] as const

/* ------------------------------------------------------------------ */
/* Product architecture                                                */
/* ------------------------------------------------------------------ */

export type ProductFamily = {
  slug: string
  name: string
  short: string
  description: string
  icon: IconKey
  memberSlugs?: string[]
}

export const PRODUCT_FAMILIES: ProductFamily[] = [
  {
    slug: 'non-standard-automated-customized-equipment',
    name: 'Custom Automation Equipment',
    short: 'Non-standard assembly stations and custom production lines engineered around your workpiece, process and layout.',
    description: 'Custom stations and lines developed around the workpiece, process sequence and available production space.',
    icon: 'cog',
  },
  {
    slug: 'standard-tightening-feeding',
    name: 'Standard Products: Tightening & Feeding',
    short: 'Standardized tightening units, feeding systems and fastening accessories for reliable automated assembly.',
    description: 'Automatic screw-tightening modules, bowl and step feeders, and supporting fastening accessories configured as standard units or integrated subsystems.',
    icon: 'wrench',
    memberSlugs: [
      'tighten-the-assembly-module-and-tools',
      'feeder',
      'tighten-function-attachments',
    ],
  },
  {
    slug: 'unmanned-aerial-vehicle-onboard-control-tablet',
    name: 'UAV & Vehicle-Mounted Tablets',
    short: 'Rugged industrial tablets for UAV ground control, vehicle-mounted operation and demanding field environments.',
    description: 'Ruggedised tablet terminals engineered for UAV control, vehicle installation and field data display.',
    icon: 'tablet',
  },
  {
    slug: 'robot-system-integration',
    name: 'Robotic System Integration',
    short: 'Robot cells and handling systems integrated with end tooling, feeding, guarding and station controls.',
    description: 'Robot-based systems assembled with the tooling, controls and safeguards required by the application.',
    icon: 'bot',
  },
  {
    slug: 'forming-machine',
    name: 'Forming Machines (Standard Equipment)',
    short: 'Standard forming equipment focused on belt forming machines and compression molding machines.',
    description: 'Standard forming machines—especially automotive belt forming machines and compression molding machines—supplied with electrical controls and guarded structures.',
    icon: 'hammer',
  },
  {
    slug: 'heavy-machinery-processing',
    name: 'Batch Heavy Machining & OEM Processing',
    short: 'Batch heavy-machinery part machining and OEM custom processing to your drawings or samples.',
    description: 'Large-format gantry machining and batch OEM custom processing for heavy structural components and stocked machinery spare parts.',
    icon: 'drill',
  },
  {
    slug: 'outsourcing-services-for-control-software-plc-labview-c',
    name: 'Control Software, Electrical Cabinets & Technical Services',
    short: 'Industrial control software, electrical cabinet fabrication and automation upgrade technical services—including Southeast Asia garment smart sewing line integration.',
    description: 'PLC, LabVIEW and C# control software development, custom electrical control cabinets, and turnkey automation upgrade technical services.',
    icon: 'braces',
  },
]

export function normalizeFamilySlug(slug?: string): string | undefined {
  if (!slug) return undefined
  const direct = PRODUCT_FAMILIES.find((f) => f.slug === slug)
  if (direct) return direct.slug
  const parent = PRODUCT_FAMILIES.find((f) => f.memberSlugs?.includes(slug))
  return parent?.slug
}

export type ProductImage = { src: string; alt: string }

export type Product = {
  slug: string
  name: string
  familySlug: string
  familyName?: string
  summary: string
  overview: string[]
  specs: { label: string; value: string }[]
  features?: string[]
  applications: string[]
  images: ProductImage[]
  featured?: boolean
}

export const PRODUCTS: Product[] = [
  {
    slug: 'custom-automation-line',
    name: 'Custom Automation Line',
    familySlug: 'non-standard-automated-customized-equipment',
    summary:
      'Framed, guarded multi-station automation line with an operator control panel and integrated conveyance.',
    overview: [
      'Custom automation equipment is configured around the part, the process sequence and the space available in your plant. The catalogue image shows an aluminium-framed, guarded line with transparent safety panels, an operator control box with indicator buttons and an emergency stop, and conveyance running through the stations.',
      'Station count, handling method, inspection steps and control architecture are defined together with your engineers during requirement analysis.',
    ],
    specs: [
      { label: 'Product family', value: 'Custom Automation Equipment' },
      { label: 'Configuration basis', value: 'Defined per part and process' },
      { label: 'Detailed parameters', value: 'Confirmed through RFQ' },
    ],
    applications: [
      'Multi-station assembly lines',
      'Guarded production cells with operator panels',
      'Conveyed part handling between stations',
    ],
    images: [
      {
        src: '/images/product-custom-automation.jpg',
        alt: 'Aluminium-framed automation line with transparent guarding, operator control panel and conveyor stations',
      },
    ],
    featured: true,
  },
  {
    slug: 'automatic-tightening-module',
    name: 'Automatic Tightening Module',
    familySlug: 'tighten-the-assembly-module-and-tools',
    summary:
      'Electric screwdriver mounted on a pneumatic slide, intended for integration into automated fastening stations.',
    overview: [
      'The tightening module pairs an electric screwdriver with a pneumatic linear slide and mounting plates so the driver can be positioned onto the fastening point inside an automated station.',
      'It is normally combined with a feeding system and the station control logic. Driver selection and mounting arrangement are agreed per application.',
    ],
    specs: [
      { label: 'Product family', value: 'Automatic Tightening Modules & Tools' },
      { label: 'Configuration basis', value: 'Selected per fastener and station' },
      { label: 'Detailed parameters', value: 'Confirmed through RFQ' },
    ],
    applications: [
      'Screw-fastening stations inside automated assembly',
      'Combination with bowl feeding of screws',
      'Robot-mounted or fixed-station fastening',
    ],
    images: [
      {
        src: '/images/product-tightening.jpg',
        alt: 'Automatic tightening module with electric screwdriver on a pneumatic linear slide',
      },
    ],
    featured: true,
  },
  {
    slug: 'bowl-feeding-system',
    name: 'Bowl Feeding System',
    familySlug: 'feeder',
    summary:
      'Bowl-type feeder on a mounting base with a control unit, valve island and pneumatic fittings.',
    overview: [
      'A bowl feeding system presents fasteners or small parts in order to a pick-up or tightening position. The catalogue image shows a bowl on a base plate with a digital control unit, a controller module, pneumatic valves and fittings.',
      'Bowl design, track geometry and sensing are set by the part to be fed.',
    ],
    specs: [
      { label: 'Product family', value: 'Feeding Systems & Tightening Accessories' },
      { label: 'Configuration basis', value: 'Matched to the part being fed' },
      { label: 'Detailed parameters', value: 'Confirmed through RFQ' },
    ],
    applications: [
      'Supplying screws and small parts to tightening modules',
      'Orderly presentation of parts to assembly stations',
    ],
    images: [
      {
        src: '/images/product-feeder.jpg',
        alt: 'Black bowl feeding system on a base plate with control unit, controller module and pneumatic valve block',
      },
    ],
    featured: true,
  },
  {
    slug: 'rugged-vehicle-mounted-tablet',
    name: 'Rugged Tablet',
    familySlug: 'unmanned-aerial-vehicle-onboard-control-tablet',
    summary:
      'Ruggedised tablet with a protective housing, shown with a positioning information screen.',
    overview: [
      'The rugged tablet is housed in a protective shell intended for field and vehicle-mounted use. The catalogue image shows the device running a positioning display with signal bars and coordinate readouts.',
      'Interface language and application software on the supplied image are customer-side content and are not a product specification.',
    ],
    specs: [
      { label: 'Product family', value: 'Rugged & Vehicle-Mounted Tablets' },
      { label: 'Configuration basis', value: 'Confirmed per project' },
      { label: 'Detailed parameters', value: 'Confirmed through RFQ' },
    ],
    applications: ['Field data capture', 'Vehicle-mounted terminals', 'Positioning and status display'],
    images: [
      {
        src: '/images/product-rugged-tablet.jpg',
        alt: 'Rugged tablet in a black protective housing displaying a positioning information screen',
      },
    ],
    featured: true,
  },
  {
    slug: 'forming-machine',
    name: 'Forming Machine',
    familySlug: 'forming-machine',
    summary:
      'Frame-built forming machine with pneumatic actuation, a separate control cabinet and mesh guarding.',
    overview: [
      'The forming machine is built on a welded frame with pneumatic cylinders, cable routing and guard panels. A separate electrical cabinet houses the PLC, drives and terminal rails.',
      'Forming stroke, tooling and control scope are defined from the part to be formed.',
    ],
    specs: [
      { label: 'Product family', value: 'Forming Machines' },
      { label: 'Configuration basis', value: 'Defined per part and tooling' },
      { label: 'Detailed parameters', value: 'Confirmed through RFQ' },
    ],
    applications: ['Part forming stations', 'Machines with a separate electrical control cabinet'],
    images: [
      {
        src: '/images/equipment/compression-molding-1.jpg',
        alt: 'Compression molding machine on the workshop floor',
      },
      {
        src: '/images/equipment/belt-forming-1.jpg',
        alt: 'Belt forming machine with control panel and guarded enclosure',
      },
    ],
    featured: true,
  },
  {
    slug: 'heavy-machining-equipment',
    name: 'Heavy Machining Equipment',
    familySlug: 'heavy-machinery-processing',
    summary:
      'Gantry-type machine tool with a long travelling bed protected by steel telescopic covers.',
    overview: [
      'Heavy machining covers large and heavy workpieces on a gantry-type machine tool with a long table and telescopic way covers.',
      'Workpiece size, material and tolerance requirements are reviewed with your drawings during RFQ.',
    ],
    specs: [
      { label: 'Product family', value: 'Heavy Machining' },
      { label: 'Configuration basis', value: 'Reviewed per drawing' },
      { label: 'Detailed parameters', value: 'Confirmed through RFQ' },
    ],
    applications: ['Large structural parts', 'Heavy frames and bases for equipment'],
    images: [
      {
        src: '/images/product-heavy-machining.jpg',
        alt: 'Large gantry-type machine tool with telescopic steel bed covers inside a machining hall',
      },
    ],
    featured: true,
  },
  {
    slug: 'robotic-system-integration',
    name: 'Robotic System Integration',
    familySlug: 'robot-system-integration',
    summary:
      'Robot cells integrated with tooling, feeding and control components for handling, assembly or processing tasks.',
    overview: [
      'Robotic system integration combines a robot with grippers or tools, part presentation, safety guarding and control logic into one working cell.',
      'Robot make, payload and reach are selected against the task you describe.',
    ],
    specs: [
      { label: 'Product family', value: 'Robotic System Integration' },
      { label: 'Configuration basis', value: 'Defined per task and cell layout' },
      { label: 'Detailed parameters', value: 'Confirmed through RFQ' },
    ],
    applications: ['Robot-based part handling', 'Robot-assisted assembly or fastening', 'Cell integration with feeding systems'],
    images: [],
  },
]

export function getFamily(slug: string) {
  return PRODUCT_FAMILIES.find((f) => f.slug === slug)
}

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug)
}

export function productsInFamily(familySlug: string) {
  return PRODUCTS.filter((p) => p.familySlug === familySlug)
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export type HeroSlide = {
  id: string
  image: string
  imageAlt: string
  eyebrow: string
  title: string
  body: string
  primary: { label: string; href: string }
  secondary: { label: string; href: string }
  textSide: 'left' | 'right'
  focusDesktop: number
  focusMobile: number
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'custom-automation',
    image: '/images/banner-1.jpg',
    imageAlt:
      'Automated non-standard production line with dual robotic arms, conveyor stations, 3D engineering display and machining centre',
    eyebrow: 'Custom Automation · Non-Standard Equipment',
    title: 'Non-Standard Custom Automation Lines & Stations',
    body: 'Purpose-built assembly stations and multi-station production lines engineered around your workpiece, process flow and plant layout.',
    primary: { label: 'Explore Custom Automation', href: '/products?family=non-standard-automated-customized-equipment' },
    secondary: { label: 'Request a Quote', href: '/contact#rfq' },
    textSide: 'left',
    focusDesktop: 72,
    focusMobile: 96,
  },
  {
    id: 'tightening-feeding',
    image: '/images/banner-2.jpg',
    imageAlt:
      'Industrial automation engineering facility representing standardized tightening units, feeding systems and station controls',
    eyebrow: 'Standard Products · Tightening & Feeding Systems',
    title: 'Tightening, Feeding and Station Control as One Unit',
    body: 'Standardized tightening units, parts feeders and control logic configured to match your fasteners, product geometry and cycle target.',
    primary: { label: 'Browse Standard Products', href: '/products?family=standard-tightening-feeding' },
    secondary: { label: 'Contact Engineering', href: '/contact#rfq' },
    textSide: 'right',
    focusDesktop: 34,
    focusMobile: 24,
  },
  {
    id: 'robot-integration',
    image: '/images/banner-3.jpg',
    imageAlt:
      'Integrated industrial robotics, automation stations, tooling and control software platform overview',
    eyebrow: 'Robotic System Integration',
    title: 'Mechanics, Controls and Site Application Working Together',
    body: 'Combine industrial robots, end-of-arm tooling, feeding, safety guarding and control software into executable automated cells and lines.',
    primary: { label: 'View Solutions', href: '/solutions' },
    secondary: { label: 'View Capabilities', href: '/capabilities' },
    textSide: 'left',
    focusDesktop: 70,
    focusMobile: 80,
  },
  {
    id: 'uav-tablets',
    image: '/images/banner-4.jpg',
    imageAlt: 'Rugged industrial UAV ground-control and vehicle-mounted tablet terminal with drone overview',
    eyebrow: 'UAV & Vehicle-Mounted Tablets',
    title: 'Rugged UAV and Vehicle-Mounted Control Tablets',
    body: 'Industrial rugged tablets and handheld terminals built for UAV ground control, vehicle installation and demanding field operations.',
    primary: { label: 'View Tablet Catalogue', href: '/products?family=unmanned-aerial-vehicle-onboard-control-tablet' },
    secondary: { label: 'Send Requirements', href: '/contact#rfq' },
    textSide: 'left',
    focusDesktop: 70,
    focusMobile: 90,
  },
  {
    id: 'forming-machines',
    image: '/images/equipment/belt-forming-1.jpg',
    imageAlt: 'Standard belt forming machine with operator HMI panel and guarded structure on the workshop floor',
    eyebrow: 'Standard Forming Equipment',
    title: 'Belt Forming and Compression Molding Machines',
    body: 'Standard forming equipment engineered for industrial production, with dedicated focus on belt forming machines and compression molding machines.',
    primary: { label: 'View Forming Machines', href: '/products?family=forming-machine' },
    secondary: { label: 'Request Specifications', href: '/contact#rfq' },
    textSide: 'left',
    focusDesktop: 55,
    focusMobile: 60,
  },
  {
    id: 'heavy-machinery-parts',
    image: '/images/banner-5.jpg',
    imageAlt: 'Gantry machining equipment and batch-custom machined heavy machinery parts',
    eyebrow: 'Batch Heavy Machining · OEM Custom Processing',
    title: 'Stocked Parts and Batch OEM Custom Machining',
    body: 'Large-format gantry machining for heavy equipment components, stocked spare parts and batch OEM processing to your drawings or samples.',
    primary: { label: 'Request a Quote', href: '/contact#rfq' },
    secondary: { label: 'View Capabilities', href: '/capabilities' },
    textSide: 'right',
    focusDesktop: 34,
    focusMobile: 36,
  },
]

/* ------------------------------------------------------------------ */
/* Capabilities, solutions, workflow, facts                            */
/* ------------------------------------------------------------------ */

export const CAPABILITIES: { title: string; text: string; icon: IconKey }[] = [
  {
    title: 'Non-Standard Custom Automation',
    text: 'Workpiece, process and layout requirements are engineered into custom assembly stations and multi-station lines.',
    icon: 'clipboard',
  },
  {
    title: 'Standard Tightening & Feeding Units',
    text: 'Tightening modules, bowl and step feeders, and fastening accessories are matched as standardized, ready-to-integrate units.',
    icon: 'wrench',
  },
  {
    title: 'Robotic System Integration',
    text: 'Robots, end-of-arm tooling, part presentation, guarding and station controls are integrated into working cells.',
    icon: 'bot',
  },
  {
    title: 'Standard Forming Equipment',
    text: 'Dedicated standard forming machines focused on belt forming machines and compression molding machines with integrated controls.',
    icon: 'hammer',
  },
  {
    title: 'Batch Heavy Machining & OEM',
    text: 'Large-format gantry machining for heavy machinery parts, stocked spares and batch OEM processing to drawings or samples.',
    icon: 'drill',
  },
  {
    title: 'Control Software, Cabinets & Technical Services',
    text: 'Electrical cabinet fabrication, PLC/LabVIEW/C# software development and overseas automation upgrade technical services.',
    icon: 'cable',
  },
]

export const SOLUTIONS: {
  slug: string
  title: string
  text: string
  icon: IconKey
  familySlugs: string[]
  imageProductSlug?: string
  points: string[]
}[] = [
  {
    slug: 'sea-textile-smart-sewing',
    title: 'Southeast Asia Textile & Garment Smart Sewing Upgrade',
    text: 'Turnkey automation upgrade integration for garment and textile factories in Vietnam, Cambodia, Indonesia and Bangladesh—combining CE-certified smart sewing hardware with line layout, commissioning and technical services.',
    icon: 'workflow',
    familySlugs: ['outsourcing-services-for-control-software-plc-labview-c', 'forming-machine'],
    imageProductSlug: 'control-cabinet',
    points: [
      'Smart template sewing & automatic cutter line integration with CE documentation',
      'Pilot line deployment, process tuning and 1–2 week local operator training',
      'Remote operations support plus ongoing line expansion and station upgrades',
    ],
  },
  {
    slug: 'control-software-cabinet-services',
    title: 'Control Software, Electrical Cabinets & Technical Services',
    text: 'Industrial control software (PLC, LabVIEW, C#), custom electrical control cabinet fabrication and field engineering technical services.',
    icon: 'braces',
    familySlugs: ['outsourcing-services-for-control-software-plc-labview-c'],
    imageProductSlug: 'control-cabinet',
    points: [
      'Electrical control cabinet design, wiring and panel fabrication',
      'PLC, LabVIEW, C# control software and HMI/SCADA monitoring',
      'On-site commissioning, operator training and remote technical support',
    ],
  },
  {
    slug: 'assembly-and-fastening',
    title: 'Non-Standard Automation & Tightening/Feeding',
    text: 'Custom automation lines combined with standardized tightening units and feeding systems in guarded production stations.',
    icon: 'cog',
    familySlugs: ['non-standard-automated-customized-equipment', 'standard-tightening-feeding'],
    imageProductSlug: 'horn-assembly-production-line',
    points: [
      'Non-standard multi-station assembly lines',
      'Standardized automatic tightening units',
      'Bowl, step and drum feeding systems',
    ],
  },
  {
    slug: 'robotic-cells',
    title: 'Robotic System Integration',
    text: 'Robot-based cells for handling, assembly or processing tasks, integrated with tooling, feeding and safety controls.',
    icon: 'bot',
    familySlugs: ['robot-system-integration', 'standard-tightening-feeding'],
    imageProductSlug: 'gear-shifter-production-line-43',
    points: ['Robot, gripper and fixture integration', 'Part presentation and feeding', 'Cell-level control logic and guarding'],
  },
  {
    slug: 'forming-and-machining',
    title: 'Standard Forming Machines & Batch Heavy Machining',
    text: 'Standard belt forming and compression molding machines alongside large-format batch heavy machining and OEM custom processing.',
    icon: 'hammer',
    familySlugs: ['forming-machine', 'heavy-machinery-processing'],
    imageProductSlug: 'automobile-belt-forming-machine',
    points: [
      'Belt forming machines and compression molding machines',
      'Batch gantry machining for heavy machinery parts',
      'OEM custom processing to customer drawings or samples',
    ],
  },
  {
    slug: 'field-terminals',
    title: 'UAV & Vehicle-Mounted Control Tablets',
    text: 'Rugged industrial tablet terminals for UAV ground control, vehicle-mounted operation and field data display.',
    icon: 'tablet',
    familySlugs: ['unmanned-aerial-vehicle-onboard-control-tablet'],
    imageProductSlug: 'three-proof-reinforced-notebook',
    points: ['UAV ground-control rugged tablets', 'Vehicle-mounted industrial terminals', 'BeiDou and field communication displays'],
  },
]

export const WORKFLOW_STEPS: { title: string; text: string }[] = [
  {
    title: 'Requirement Analysis',
    text: 'Review of the part, process steps, site conditions and the drawings or samples you supply.',
  },
  {
    title: 'Solution Design',
    text: 'Mechanical, electrical and control concept prepared against the confirmed requirement.',
  },
  {
    title: 'Assembly & Integration',
    text: 'Frames, tooling, tightening, feeding and control components built into one system.',
  },
  {
    title: 'Debugging & Verification',
    text: 'Functional run-through of the system against the agreed requirement.',
  },
  {
    title: 'Delivery Support',
    text: 'Shipment preparation and technical communication as the equipment moves to your site.',
  },
]

export const FACTS: { value: string; label: string; note: string }[] = [
  { value: '2014', label: 'Founded', note: 'Operating in Suzhou Industrial Park' },
  { value: '≈ 9,000 m²', label: 'Facility area', note: 'Approximate figure' },
  { value: '3', label: 'Workshops', note: 'Equipment, assembly and machining resources' },
  { value: '7', label: 'Core business lines', note: 'Structured from custom lines to technical services' },
]

export const EVIDENCE: { src: string; alt: string; caption: string }[] = [
  {
    src: '/images/product-custom-automation.jpg',
    alt: 'Guarded aluminium-framed automation line with conveyor stations',
    caption: 'Guarded automation line with operator panel',
  },
  {
    src: '/images/equipment/compression-molding-1.jpg',
    alt: 'Compression molding machine on the workshop floor',
    caption: 'Compression molding machine',
  },
  {
    src: '/images/product-heavy-machining.jpg',
    alt: 'Gantry-type machine tool with steel telescopic covers',
    caption: 'Gantry-type heavy machining equipment',
  },
]

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

export const FAQ_GROUPS: { title: string; items: { q: string; a: string }[] }[] = [
  {
    title: 'Project planning',
    items: [
      {
        q: 'What should an RFQ include?',
        a: 'A description of the part or product, the process steps you want automated, any drawings or samples, the installation site conditions and the application you have in mind. Partial information is welcome; engineers will reply with what else is needed.',
      },
      {
        q: 'Can you start from drawings or samples only?',
        a: 'Send whatever you have, such as drawings, photos, samples or process notes. Engineers review it and confirm which additional details are required before a proposal is prepared.',
      },
    ],
  },
  {
    title: 'Product selection',
    items: [
      {
        q: 'How do I choose between a custom machine and a catalogue module?',
        a: 'If your process fits a tightening module, feeder or terminal on its own, start from the catalogue item. If several functions have to work together at one station, a custom automation project is usually the better frame.',
      },
      {
        q: 'Where can I find detailed specifications?',
        a: 'Product pages list only the information supplied for each item. Detailed parameters are confirmed through an RFQ so they match your application.',
      },
    ],
  },
  {
    title: 'Integration',
    items: [
      {
        q: 'Can tightening modules and feeders be combined in one system?',
        a: 'Yes. They are separate catalogue families so they can be specified together within a custom automation or robotic integration project.',
      },
      {
        q: 'Do you integrate robots into existing lines?',
        a: 'Robotic System Integration is a catalogue family. Include the robot make if you have one, the task, and the available space in your RFQ.',
      },
    ],
  },
  {
    title: 'Technical communication',
    items: [
      {
        q: 'In which language can we communicate?',
        a: 'RFQs and technical discussions are handled in English. Drawings with clear dimension notes help avoid ambiguity.',
      },
      {
        q: 'How do I reach an engineer directly?',
        a: 'Use the RFQ form, email info@jufauto.com, or call 0512-67678265 or 18913596766.',
      },
    ],
  },
]

/* ------------------------------------------------------------------ */
/* News (empty by design until articles are published)                 */
/* ------------------------------------------------------------------ */

export type NewsArticle = {
  slug: string
  title: string
  excerpt: string
  publishedAt: string
  body: string[]
}

export const NEWS_ARTICLES: NewsArticle[] = []

export function getArticle(slug: string) {
  return NEWS_ARTICLES.find((a) => a.slug === slug)
}

export function formatCopyright(year: number) {
  const text = `© ${year} ${COMPANY.legalName} All rights reserved.`
  return `${text.replace(/\.+$/, '')}.`
}
