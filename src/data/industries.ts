import type { LucideIcon } from 'lucide-react'
import { Mountain, Landmark, MapPinned, Zap, Briefcase, GraduationCap } from 'lucide-react'
import { industryImages } from './images'

export interface Industry {
  id: string
  label: string
  title: string
  icon: LucideIcon
  image: string
  description: string
}

export const industries: Industry[] = [
  {
    id: 'mining',
    label: 'MINING',
    title: 'Mining Companies',
    icon: Mountain,
    image: industryImages.mining,
    description: 'Site infrastructure, steel structures, buildings and fencing for mining operations.',
  },
  {
    id: 'government',
    label: 'GOVERNMENT',
    title: 'Government',
    icon: Landmark,
    image: industryImages.government,
    description: 'Building, renovation and roofing work for public facilities and institutions.',
  },
  {
    id: 'municipalities',
    label: 'MUNICIPALITIES',
    title: 'District & Local Municipalities',
    icon: MapPinned,
    image: industryImages.municipalities,
    description: 'Community-facing construction delivered for district and local municipalities.',
  },
  {
    id: 'parastatals',
    label: 'PARASTATALS',
    title: 'Parastatals',
    icon: Zap,
    image: industryImages.parastatals,
    description: 'Dependable supply and construction capability for state-owned enterprises.',
  },
  {
    id: 'private-sector',
    label: 'PRIVATE SECTOR',
    title: 'Private Sector',
    icon: Briefcase,
    image: industryImages.privateSector,
    description: 'Commercial, industrial and general building solutions for private clients.',
  },
  {
    id: 'education',
    label: 'EDUCATION',
    title: 'Academic Institutions',
    icon: GraduationCap,
    image: industryImages.education,
    description: 'Structural and building work for schools and academic institutions.',
  },
]
