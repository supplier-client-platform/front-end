export interface IBrand {
  id: number;
  brandName: string;
}

export interface IBrandEditInfo extends IBrand {
  businessID: number;
}

export interface IBrandCreateInfo {
  brandName: string;
  businessID: number;
}
