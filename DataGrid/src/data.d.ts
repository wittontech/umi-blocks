export interface DomainObject {
  id: number;
  name: string;
  date: number;
  status: string;
  [key: string]: any;
}

export interface DomainObjectQuery {
  [key: string]: any;
}
