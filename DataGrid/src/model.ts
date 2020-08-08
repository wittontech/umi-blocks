import { RequestData } from '@ant-design/pro-table';

export interface TablePagination {
  total: number;
  pageSize: number;
  current: number;
  [key: string]: any;
}

export interface TableDataModel<T> {
  data: T[];
  pagination: Partial<TablePagination>;
  [key: string]: any;
}

export interface TableQuery {
  pageSize?: number;
  current?: number;
  filter?: { [key: string]: React.ReactText[] };
  sort?: {
    [key: string]: 'ascend' | 'descend';
  };
  [key: string]: any;
}

export interface LegacyTableQuery {
  draw?: number;
  startColumn?: number;
  pageSize?: number;
  order?: { [key: string]: any };
  [key: string]: any;
}

export type TableFetchRequest<T> = (
  params: {
    current?: number;
    pageSize?: number;
    [key: string]: any;
  },
  sort: {
    [key: string]: 'ascend' | 'descend';
  },
  filter: { [key: string]: React.ReactText[] },
) => Promise<RequestData<T>>;

export const buildTableQuery = (params?: TableQuery): LegacyTableQuery => {
  if (!params) {
    return {};
  }
  return {
    startColumn:
      (params.current == undefined ? 0 : params.current - 1) *
      (params.pageSize ?? 10),
    pageSize: params.pageSize,
    order: params.sort,
  };
};
