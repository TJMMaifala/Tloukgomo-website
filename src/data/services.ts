import type { LucideIcon } from 'lucide-react'
import { Pickaxe, Building2, Cog, Fence, PackageOpen } from 'lucide-react'
import { serviceImages } from './images'

export interface Service {
  id: string
  number: string
  title: string
  icon: LucideIcon
  image: string
  description: string
  scope: string[]
  /** Pre-selects the matching option in the contact form */
  formValue: string
}

export const services: Service[] = [
  {
    id: 'civil-works',
    number: '01',
    title: 'Civil Works',
    icon: Pickaxe,
    image: serviceImages.civilWorks,
    description:
      'Infrastructure, earthworks, site preparation and civil construction, delivered with disciplined project execution.',
    scope: ['Infrastructure', 'Earthworks', 'Site preparation', 'Civil construction'],
    formValue: 'Civil Works',
  },
  {
    id: 'building-construction',
    number: '02',
    title: 'Building Construction',
    icon: Building2,
    image: serviceImages.buildingConstruction,
    description:
      'Commercial, institutional, industrial and general building construction, from new builds to renovations.',
    scope: ['Commercial', 'Institutional', 'Industrial', 'General building'],
    formValue: 'Building Construction',
  },
  {
    id: 'structural-steel',
    number: '03',
    title: 'Structural Steel',
    icon: Cog,
    image: serviceImages.structuralSteel,
    description:
      'Structural steel fabrication, installation and erection, including roofing structures and industrial steel solutions.',
    scope: ['Fabrication', 'Installation & erection', 'Roofing structures', 'Industrial steel'],
    formValue: 'Structural Steel Works & Erection',
  },
  {
    id: 'fencing',
    number: '04',
    title: 'Fencing',
    icon: Fence,
    image: serviceImages.fencing,
    description:
      'Perimeter, security, industrial and site fencing solutions for operational and project environments.',
    scope: ['Perimeter', 'Security', 'Industrial', 'Site fencing'],
    formValue: 'Fencing',
  },
  {
    id: 'general-supply',
    number: '05',
    title: 'General Supply',
    icon: PackageOpen,
    image: serviceImages.generalSupply,
    description:
      'Supply of materials, goods and services to corporate, government, mining and private-sector clients.',
    scope: ['Materials', 'Goods', 'Services', 'Corporate & government'],
    formValue: 'General Supply',
  },
]
