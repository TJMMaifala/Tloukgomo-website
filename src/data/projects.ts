import { projectImages } from './images'

export type ServiceTag = 'Civil Works' | 'Building' | 'Structural Steel' | 'Fencing'

export interface Project {
  id: number
  title: string
  client: string
  location?: string
  year: number
  duration: string
  /** Contract value in ZAR. */
  value: number
  status?: 'Completed' | 'In Progress'
  category: ServiceTag
  image: string
  imageAlt: string
}

/**
 * Real project references from the company profile (Company References and Experience).
 * Photos are real company photographs, matched to projects on a best-fit basis.
 * To change a photo, edit src/data/images.ts.
 */
export const projects: Project[] = [
  { id: 1, title: 'Building and Structuring of Stalls — Phase 1', client: 'Rustenburg Municipality', year: 2013, duration: '6 Months', value: 650000, category: 'Building', image: projectImages.stalls1, imageAlt: 'Steel truss roof structure over a large hall under construction' },
  { id: 2, title: 'Building and Structuring of Stalls — Phase 2', client: 'Rustenburg Municipality', year: 2014, duration: '5 Months', value: 450000, category: 'Building', image: projectImages.stalls2, imageAlt: 'Steel-roofed corridor between completed building blocks' },
  { id: 3, title: 'Hospital Roof Renovation', client: 'Job Shimankane Hospital', year: 2015, duration: '3 Months', value: 448000, category: 'Structural Steel', image: projectImages.hospitalRoof, imageAlt: 'Roofing crew fitting sheeting on a roof' },
  { id: 4, title: 'Roofing & Fencing of New Psychiatric Blocks / Upgrading Existing', client: 'Job Shimankane Hospital', year: 2015, duration: '3 Months', value: 450000, category: 'Fencing', image: projectImages.psychiatricBlocks, imageAlt: 'Steel walkway and scaffolding on a multi-storey block' },
  { id: 5, title: 'Installation of Steel Structure & Roof Coverage', client: 'Matsopa Mine', location: 'Mafikeng', year: 2016, duration: '2 Months', value: 250000, category: 'Structural Steel', image: projectImages.matsopa, imageAlt: 'Steel canopy structure being erected beside a gravel stockpile' },
  { id: 6, title: 'Installation of Steel Structure & Roof Coverage', client: 'RBF Fastener', location: 'Kempton Park', year: 2017, duration: '3 Months', value: 180000, category: 'Structural Steel', image: projectImages.rbf, imageAlt: 'Steel beams being installed over an industrial building' },
  { id: 7, title: 'Installation of Steel Structure & Roof Coverage', client: 'Future School', location: 'Randburg', year: 2017, duration: '4 Months', value: 555000, category: 'Structural Steel', image: projectImages.futureSchool, imageAlt: 'Green steel columns and scaffolding at a school building' },
  { id: 8, title: 'Building Work at Skoongesig', client: 'Skoongesig', year: 2017, duration: '4 Months', value: 250000, category: 'Building', image: projectImages.skoongesig, imageAlt: 'Face-brick building under construction' },
  { id: 9, title: 'Renovation of Roof', client: 'Repair Centre', location: 'Rustenburg', year: 2018, duration: '4 Weeks', value: 95000, category: 'Structural Steel', image: projectImages.repairCentre, imageAlt: 'Steel frame and brickwork of a building' },
  { id: 10, title: 'Renovation of Police Building', client: 'Phokeng Police Station', year: 2019, duration: '3 Months', value: 250000, category: 'Building', image: projectImages.phokeng, imageAlt: 'Renovated interior corridor' },
  { id: 11, title: 'Building of New Mining Change Houses', client: 'Tharisa Mine', year: 2020, duration: '6 Months', value: 650000, category: 'Building', image: projectImages.changeHouses, imageAlt: 'Interior of a new mining change house with washbasins' },
  { id: 12, title: 'Fabrication & Installation of Weighbridge Carport', client: 'Tharisa Mine', year: 2021, duration: '1 Month', value: 375000, category: 'Structural Steel', image: projectImages.weighbridge, imageAlt: 'Underside of a long steel carport structure' },
  { id: 13, title: 'Construction of Community Crusher', client: 'Tharisa Mine', year: 2021, duration: '1 Month', value: 350941, category: 'Civil Works', image: projectImages.crusher, imageAlt: 'Reinforcement steel prepared for a concrete foundation' },
  { id: 14, title: 'Construction of Wheel Washing Bay', client: 'Tharisa Mine', year: 2021, duration: '2 Months', value: 775000, category: 'Civil Works', image: projectImages.wheelWash, imageAlt: 'Compactor working between concrete walls of a wheel washing bay' },
  { id: 15, title: 'Installation of Fence at Genesis Stock Pile', client: 'Tharisa Mine', year: 2022, duration: '1 Week', value: 154000, category: 'Fencing', image: projectImages.genesisFence, imageAlt: 'Fence installed in front of a stockpile' },
  { id: 16, title: 'New Mining Offices', client: 'Tharisa Mine', year: 2022, duration: 'In Progress', value: 800000, status: 'In Progress', category: 'Building', image: projectImages.miningOffices, imageAlt: 'Office interior being fitted out' },
]

export const projectCategories: Array<'All' | ServiceTag> = ['All', 'Civil Works', 'Building', 'Structural Steel', 'Fencing']

export const formatZAR = (value: number) =>
  'R' + value.toLocaleString('en-ZA', { maximumFractionDigits: 0 }).replace(/ /g, ',').replace(/\s/g, ',')
