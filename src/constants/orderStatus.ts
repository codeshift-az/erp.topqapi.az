export const ORDER_STATUS = {
  DRAFT: 0,
  REGISTERED: 1,
  ACCEPTED: 2,
  PENDING: 3,
  READY: 4,
  RETURN: 5,
  ON_DELIVERY: 6,
  DELIVERED: 7,
  INSTALLED: 8,
};

export const ORDER_STATUS_LABELS = {
  [ORDER_STATUS.DRAFT]: { label: "DRAFT", color: "secondary" },
  [ORDER_STATUS.REGISTERED]: { label: "Satış qeydə alındı", color: "primary" },
  [ORDER_STATUS.ACCEPTED]: { label: "Anbar satışı qəbul etdi", color: "success" },
  [ORDER_STATUS.PENDING]: { label: "Məhsullar hazırlanır", color: "warning" },
  [ORDER_STATUS.READY]: { label: "Məhsullar hazırdır", color: "success" },
  [ORDER_STATUS.RETURN]: { label: "Geri Qayıtma", color: "danger" },
  [ORDER_STATUS.ON_DELIVERY]: { label: "Məhsullar yoldadır", color: "primary" },
  [ORDER_STATUS.DELIVERED]: { label: "Məhsullar çatdırıldı", color: "success" },
  [ORDER_STATUS.INSTALLED]: { label: "Satış tamamlandı", color: "success" },
};
