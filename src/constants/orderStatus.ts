export const ORDER_STATUS = {
  REGISTERED: 1,
  ACCEPTED: 2,
};

export const ORDER_STATUS_LABELS = {
  [ORDER_STATUS.REGISTERED]: { label: "Sifariş qeydə alındı", color: "primary" },
  [ORDER_STATUS.ACCEPTED]: { label: "Sifariş qəbul olundu", color: "success" },
};
