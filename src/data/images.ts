/**
 * Central image configuration.
 * Every image used on the site is referenced from here so it can be swapped
 * in one place. Files live in /public/images (or use any full https:// URL).
 * All current images are real photographs from the company business profile.
 */
const img = (file: string) => `/images/${file}`

export const siteImages = {
  hero: img('hero-foundation.jpg'),
  about: img('steel-truss-roof.jpg'),
  aboutSecondary: img('formwork-crew.jpg'),
  cta: img('mine-wash-bay-wide.jpg'),
  contact: img('site-rebar.jpg'),
  logo: img('logo.jpg'),
}

export const serviceImages = {
  civilWorks: img('mine-wash-bay-wide.jpg'),
  buildingConstruction: img('building-residence.jpg'),
  structuralSteel: img('steel-truss-roof.jpg'),
  fencing: img('fence-stockpile.jpg'),
  generalSupply: img('offices-interior.jpg'),
}

export const industryImages = {
  mining: img('wheel-wash-bay.jpg'),
  government: img('renovation-corridor.jpg'),
  municipalities: img('steel-roof-corridor.jpg'),
  parastatals: img('trench-formwork.jpg'),
  privateSector: img('building-brickwork.jpg'),
  education: img('green-steel-scaffold.jpg'),
}

export const projectImages = {
  stalls1: img('steel-truss-roof.jpg'),
  stalls2: img('steel-roof-corridor.jpg'),
  hospitalRoof: img('roof-installation.jpg'),
  psychiatricBlocks: img('steel-staircase.jpg'),
  matsopa: img('steel-canopy-scaffold.jpg'),
  rbf: img('steel-beams-erection.jpg'),
  futureSchool: img('green-steel-scaffold.jpg'),
  skoongesig: img('building-brickwork.jpg'),
  repairCentre: img('steel-frame-brick.jpg'),
  phokeng: img('renovation-corridor.jpg'),
  changeHouses: img('change-houses.jpg'),
  weighbridge: img('carport-interior.jpg'),
  crusher: img('site-rebar.jpg'),
  wheelWash: img('wheel-wash-bay.jpg'),
  genesisFence: img('fence-stockpile.jpg'),
  miningOffices: img('offices-interior.jpg'),
}
