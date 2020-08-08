import { buildTableQuery, TableDataModel, TableQuery } from './model';
import { DomainObject } from './data';

function useDomainService() {
  const list = async (params?: TableQuery): Promise<TableDataModel<DomainObject>> => {
    let result = {
      data: [{ id: 1, name: 'Horizon', date: 1596868290866, status: 'approve' }],
      pagination: { total: 1, pageSize: 10, current: 1 },
    };
    return result;
  };

  const create = async (payload: DomainObject): Promise<DomainObject> => {
    return { id: 1, name: 'Horizon', date: 1596868290866, status: 'approve' };
  };

  const update = async (payload: DomainObject): Promise<DomainObject> => {
    return { id: 1, name: 'Horizon', date: 1596868290866, status: 'approve' };
  };

  const detail = async (id: number): Promise<DomainObject> => {
    return { id: 1, name: 'Horizon', date: 1596868290866, status: 'approve' };
  };

  const remove = async (id: number) => {};

  return { list, create, update, remove, detail };
}

export default useDomainService;
