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
}

export const PRODUCT_FAMILIES: ProductFamily[] = [
  {
    slug: 'non-standard-automated-customized-equipment',
    name: 'Custom Automation Equipment',
    short: 'Purpose-built assembly equipment and production lines configured around your part, process and plant layout.',
    description: 'Custom stations and lines developed around the workpiece, process sequence and available production space.',
    icon: 'cog',
  },
  {
    slug: 'tighten-the-assembly-module-and-tools',
    name: 'Assembly Tightening Modules & Tools',
    short: 'Automatic screw-fastening modules and tools for integration into assembly stations and production lines.',
    description: 'Fastening modules and tools integrated with feeding, controls and the surrounding assembly process.',
    icon: 'wrench',
  },
  {
    slug: 'feeder',
    name: 'Feeding Systems',
    short: 'Feeding equipment that presents fasteners and small parts reliably to automated assembly stations.',
    description: 'Feeding systems configured for the part geometry, required orientation and downstream process.',
    icon: 'funnel',
  },
  {
    slug: 'tighten-function-attachments',
    name: 'Tightening Accessories',
    short: 'Supporting accessories for screw feeding, positioning, alignment and controlled fastening operations.',
    description: 'Accessories selected to support stable fastening, part presentation and operator or machine access.',
    icon: 'workflow',
  },
  {
    slug: 'unmanned-aerial-vehicle-onboard-control-tablet',
    name: 'Rugged & Vehicle-Mounted Tablets',
    short: 'Rugged tablet terminals for vehicle-mounted, field-control and demanding mobile applications.',
    description: 'Tablet terminals designed for field work, vehicle installation and industrial control interfaces.',
    icon: 'tablet',
  },
  {
    slug: 'robot-system-integration',
    name: 'Robotic System Integration',
    short: 'Robot cells and handling systems integrated with tooling, feeding, safety and production controls.',
    description: 'Robot-based systems assembled with the tooling, controls and safeguards required by the application.',
    icon: 'bot',
  },
  {
    slug: 'forming-machine',
    name: 'Forming Machines',
    short: 'Forming equipment supplied with electrical controls, guarded structures and application-specific tooling.',
    description: 'Forming machines configured around the material, process requirements and plant operating conditions.',
    icon: 'hammer',
  },
  {
    slug: 'heavy-machinery-processing',
    name: 'Heavy Machining',
    short: 'Large-format machining services for heavy components using gantry-type machine tools.',
    description: 'Machining support for large and heavy workpieces that require substantial travel and load capacity.',
    icon: 'drill',
  },
  {
    slug: 'outsourcing-services-for-control-software-plc-labview-c',
    name: 'Industrial Control Software Development',
    short: 'PLC, LabVIEW and C# development services for automated equipment, monitoring and production systems.',
    description: 'Control and industrial software developed around equipment logic, data collection and operator workflows.',
    icon: 'braces',
  },
]

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
        src: '/images/product-forming.jpg',
        alt: 'Green forming machine with pneumatic cylinders beside an open electrical control cabinet and mesh guarding',
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
    id: 'process',
    image: '/images/banner-1.jpg',
    imageAlt:
      'Advertising illustration of an automated production line with two robot arms, a conveyor and a machining centre',
    eyebrow: 'Custom automation equipment',
    title: 'Automation Engineered Around Your Process',
    body: 'Share the part, the process steps and the plant layout. JUFTECH engineers review them and propose equipment, tightening, feeding and controls to fit.',
    primary: { label: 'Request a Quote', href: '/contact#rfq' },
    secondary: { label: 'Browse Products', href: '/products' },
    textSide: 'left',
    focusDesktop: 72,
    focusMobile: 96,
  },
  {
    id: 'integrated',
    image: '/images/banner-2.jpg',
    imageAlt:
      'Advertising illustration of a glass office building beside an industrial plant with a robot arm and a gantry machining centre',
    eyebrow: 'Capability',
    title: 'Integrated Equipment and Manufacturing Capability',
    body: 'Equipment integration, machining and assembly organised across three workshops and approximately 9,000 m² in Suzhou Industrial Park.',
    primary: { label: 'View Capabilities', href: '/capabilities' },
    secondary: { label: 'About JUFTECH', href: '/about' },
    textSide: 'right',
    focusDesktop: 34,
    focusMobile: 24,
  },
  {
    id: 'systems',
    image: '/images/banner-3.jpg',
    imageAlt:
      'Advertising illustration of tiered platforms showing automation equipment, machine tools, a rugged tablet, machined parts and a control software screen',
    eyebrow: 'Nine product families',
    title: 'From Tightening Modules to Industrial Control Systems',
    body: 'Source tightening, feeding, robotic, forming, machining, tablet and software items through one engineering contact.',
    primary: { label: 'Product Families', href: '/products' },
    secondary: { label: 'Control Software Services', href: '/products?family=industrial-control-software' },
    textSide: 'left',
    focusDesktop: 70,
    focusMobile: 80,
  },
]

/* ------------------------------------------------------------------ */
/* Capabilities, solutions, workflow, facts                            */
/* ------------------------------------------------------------------ */

export const CAPABILITIES: { title: string; text: string; icon: IconKey }[] = [
  {
    title: 'Requirement Engineering',
    text: 'Part, process and site information is reviewed with your engineers before any concept is drawn.',
    icon: 'clipboard',
  },
  {
    title: 'Equipment Design',
    text: 'Mechanical frames, stations, tooling and guarding are designed as one machine.',
    icon: 'ruler',
  },
  {
    title: 'Tightening & Feeding Integration',
    text: 'Fastening modules and bowl feeders are specified together so the station works as a unit.',
    icon: 'wrench',
  },
  {
    title: 'Robotic Cell Integration',
    text: 'Robots, end-of-arm tooling, part presentation and controls are combined into working cells.',
    icon: 'bot',
  },
  {
    title: 'Electrical & Control Software',
    text: 'Control cabinets, PLC programming and operator interfaces are developed alongside the mechanics.',
    icon: 'cable',
  },
  {
    title: 'Forming & Heavy Machining',
    text: 'Forming machines and large-format machining of heavy parts are available for equipment builds and direct orders.',
    icon: 'drill',
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
    slug: 'assembly-and-fastening',
    title: 'Automated Assembly & Fastening',
    text: 'Stations and lines that combine part handling, feeding and automatic screw fastening in one guarded system.',
    icon: 'cog',
    familySlugs: ['non-standard-automated-customized-equipment', 'tighten-the-assembly-module-and-tools', 'feeder'],
    points: ['Multi-station assembly lines', 'Automatic screw fastening', 'Bowl feeding of fasteners and small parts'],
  },
  {
    slug: 'robotic-cells',
    title: 'Robotic Cells',
    text: 'Robot-based cells for handling, assembly or processing tasks, integrated with tooling and controls.',
    icon: 'bot',
    familySlugs: ['robot-system-integration', 'feeder'],
    imageProductSlug: 'valve-plate-production-line',
    points: ['Robot, gripper and fixture integration', 'Part presentation and feeding', 'Cell-level control logic'],
  },
  {
    slug: 'forming-and-machining',
    title: 'Forming & Heavy Machining',
    text: 'Forming machines and large-format machining for equipment frames, bases and structural parts.',
    icon: 'hammer',
    familySlugs: ['forming-machine', 'heavy-machinery-processing'],
    points: ['Forming machines with control cabinets', 'Gantry-type machining of heavy parts'],
  },
  {
    slug: 'field-terminals',
    title: 'Field & Vehicle-Mounted Computing',
    text: 'Rugged tablet terminals for data capture, positioning displays and in-vehicle operation.',
    icon: 'tablet',
    familySlugs: ['unmanned-aerial-vehicle-onboard-control-tablet'],
    points: ['Rugged tablet terminals', 'Vehicle-mounted use', 'Application display screens'],
  },
  {
    slug: 'control-software',
    title: 'Industrial Control Software',
    text: 'Control programming and software services that support automated equipment and its operators.',
    icon: 'braces',
    familySlugs: ['outsourcing-services-for-control-software-plc-labview-c'],
    points: ['Equipment control programming', 'Operator interface screens', 'Software support for integrated systems'],
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
  { value: '9', label: 'Product families', note: 'Catalogue organised for procurement' },
]

export const EVIDENCE: { src: string; alt: string; caption: string }[] = [
  {
    src: '/images/product-custom-automation.jpg',
    alt: 'Guarded aluminium-framed automation line with conveyor stations',
    caption: 'Guarded automation line with operator panel',
  },
  {
    src: '/images/product-forming.jpg',
    alt: 'Forming machine beside an open electrical control cabinet',
    caption: 'Forming machine and electrical control cabinet',
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
