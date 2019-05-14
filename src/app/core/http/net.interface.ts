import { PageService } from 'app/core/http';

export interface IReqestService {
  controller?: string;
  action?: string;
  method: string;
}

export interface IRequestOption {
  service: IReqestService;
  append?: string[];
  loading?: boolean | string;
  model?: any;
  params?: any;
  page?: PageService;
}
