export interface EventItem {
  id: number
  category: string
  title: string
  description: string
  location: string
  date: string
  time: string
  organizer: Organizer | string
  petsAllowed: boolean
  images: string[]

}

export interface StudentItem {
  id:number
  studentId:string
  name:string
  surname: string
  gpa: number
  image: string
  penAount:number
  description: string
  
}

export interface Organizer {
  id: number
  name: string
  address: string
  images: string[]
  roles: string[]
}

