export interface Query {
  field: string;
  value: string | number;
  type: QueryType.Filter | QueryType.Sort
}

export enum QueryType {
  Filter = 'Filter data',
  Sort = 'Sorting data'
}
