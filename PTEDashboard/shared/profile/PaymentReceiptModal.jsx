import { X } from 'lucide-react';

/**
 * Stripe subscription receipt modal opened from Payment History rows.
 */
export default function PaymentReceiptModal({ receipt, onClose }) {
  if (!receipt) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/55 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl bg-white p-6 sm:p-7 shadow-2xl space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <span className="text-xl font-black tracking-tight text-[#635bff]">stripe</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close payment receipt"
            className="w-7 h-7 rounded-full border border-[#0c4a7e]/40 text-[#0c4a7e] hover:bg-slate-100 flex items-center justify-center cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <p className="text-[11px] font-medium text-slate-400">Items</p>
            <p className="text-sm font-bold text-slate-800 mt-0.5">{receipt.item}</p>
          </div>
          <div className="text-right">
            <p className="text-[11px] font-medium text-slate-400">Amount</p>
            <div className="flex items-center justify-end gap-2 mt-0.5">
              <span className="rounded bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-600">
                {receipt.status}
              </span>
              <span className="text-sm font-extrabold text-slate-800">{receipt.amountDisplay}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3 text-xs sm:text-[13px] pb-4 border-b border-slate-100">
          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-500">Transaction ID</span>
            <span className="font-semibold text-[#0c4a7e] break-all text-right">{receipt.id}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-500">Transaction Date</span>
            <span className="font-semibold text-[#0c4a7e]">{receipt.date}</span>
          </div>
        </div>

        <div className="space-y-3 text-xs sm:text-[13px] pb-4 border-b border-slate-100">
          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-500">Order ID</span>
            <span className="font-semibold text-[#0c4a7e]">{receipt.orderId}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-500">Coupon Code</span>
            <span className="font-semibold text-[#0c4a7e]">{receipt.couponCode}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-500">Coupon Code Value</span>
            <span className="font-semibold text-[#0c4a7e]">{receipt.couponValue}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-500">Coupon Code Amount</span>
            <span className="font-semibold text-[#0c4a7e]">{receipt.couponAmount}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-500">Amount</span>
            <span className="font-semibold text-[#0c4a7e]">{receipt.grossAmount}</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs sm:text-[13px] font-bold">
          <span className="text-slate-600">Grand Total</span>
          <span className="text-[#0c4a7e]">{receipt.grandTotal}</span>
        </div>
      </div>
    </div>
  );
}
