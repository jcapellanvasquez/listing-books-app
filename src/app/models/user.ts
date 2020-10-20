export interface User {
  id: string
  email: string
  name: string
  photoURL: string
  roles: Roles
}

export interface Roles {
  admin?: true
  reader: true
}
