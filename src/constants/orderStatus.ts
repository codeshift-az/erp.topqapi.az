export const ORDER_STATUS = {
  DRAFT: 0,
  REGISTERED: 1,
  ACCEPTED: 2,
};

export const ORDER_STATUS_LABELS = {
  [ORDER_STATUS.DRAFT]: { label: "Sifariş qeydə alındı", color: "secondary" },
  [ORDER_STATUS.REGISTERED]: { label: "Sifariş qəbul olundu", color: "primary" },
  [ORDER_STATUS.ACCEPTED]: { label: "Sifariş hazırlanır", color: "success" },
};
