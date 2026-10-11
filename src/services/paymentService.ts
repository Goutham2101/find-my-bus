export interface PaymentInitParams {
  amount: number;
  currency: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  paymentMethod: 'UPI' | 'Card' | 'NetBanking' | 'Wallet';
  upiVpa?: string;
}

export const paymentService = {
  processPayment: async (params: PaymentInitParams): Promise<{ success: boolean; transactionId: string; message: string }> => {
    /**
     * Future Razorpay Integration:
     * const order = await fetch('/api/v1/payments/create-order', { body: JSON.stringify({ amount: params.amount }) });
     * const options = { key: 'RAZORPAY_KEY_ID', order_id: order.id, handler: response => verifyPayment(response) };
     * const rzp = new Razorpay(options); rzp.open();
     */
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (params.amount <= 0) {
          reject(new Error('Invalid payment amount.'));
        } else {
          resolve({
            success: true,
            transactionId: `TXN-RZP-${Date.now()}`,
            message: 'Payment processed successfully via ' + params.paymentMethod
          });
        }
      }, 800);
    });
  }
};
