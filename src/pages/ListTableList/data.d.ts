export interface TableListItem {
  key: number;
  disabled?: boolean;
  avatar: string;
  name: string;
  age: string;
  address: string;
  school: string;
  status: string;
  createdAt: Date;
  progress: number;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  sorter?: string;
  status?: string;
  name?: string;
  age?: string;
  key?: number;
  address?: string;
  school?: string;
  pageSize?: number;
  currentPage?: number;
}
