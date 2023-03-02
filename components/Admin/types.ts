export type TStatus = 'WAITING' | 'APPROVED' | 'DELETED';
export type TMarketCategory = '' | 'DELETED';

export interface IMarketList {
  category: TMarketCategory;
}

export interface IMarketItem extends IMarketList {
  enrollmentId: string;
  imageUrl: string;
  marketName: string;
  businessNumber: string;
  status: TStatus;
}