import { create } from 'zustand';

interface PaymentState {
  paymentModal: boolean;
  togglePayment: () => void;
}

export const usePaymentStore = create<PaymentState>((set) => ({
  paymentModal: false,
  togglePayment: () => set((state) => ({ paymentModal: !state.paymentModal })),
}));
