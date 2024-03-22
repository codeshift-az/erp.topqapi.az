export const ORDER_STATUS = {
  DRAFT: 0,
  REGISTERED: 1,
  ACCEPTED: 2,
  PENDING: 3,
};

export const ORDER_STATUS_LABELS = {
  [ORDER_STATUS.DRAFT]: { label: "DRAFT", color: "secondary" },
  [ORDER_STATUS.REGISTERED]: { label: "Satış qeydə alındı", color: "primary" },
  [ORDER_STATUS.ACCEPTED]: { label: "Anbar satışı qəbul etdi", color: "success" },
  [ORDER_STATUS.PENDING]: { label: "Məhsullar hazırlanır", color: "info" },
};
