import { useConfirmPayment } from "@/hooks/use-confirmpayment";
import { useNavigate } from "react-router-dom";
import {
  Banknote,
  CreditCard,
  ArrowLeftRight,
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
  ShoppingCart,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const PAYMENT_OPTIONS = [
  {
    id: "cash",
    label: "Cash",
    description: "Customer pays with physical cash",
    icon: Banknote,
    color: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-200",
  },
  {
    id: "card",
    label: "Card",
    description: "Debit or credit card via Paystack",
    icon: CreditCard,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
  },
  {
    id: "transfer",
    label: "Bank Transfer",
    description: "Direct bank transfer via Paystack",
    icon: ArrowLeftRight,
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "border-purple-200",
  },
];

export default function ConfirmPayment() {
  const navigate = useNavigate();
  const {
    order,
    orderLoading,
    orderError,
    paymentMethod,
    setPaymentMethod,
    paymentReference,
    setPaymentReference,
    loading,
    error,
    canConfirm,
    handleConfirmPayment,
    handleCancelOrder,
  } = useConfirmPayment();

  // ── Loading state ──
  if (orderLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          <p className="text-sm text-gray-400">Loading order...</p>
        </div>
      </div>
    );
  }

  // ── Error fetching order ──
  if (orderError || !order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-sm mb-4">{orderError || "Order not found"}</p>
          <Button variant="outline" onClick={() => navigate("/admin/sales/new")}>
            Back to New Sale
          </Button>
        </div>
      </div>
    );
  }

  const selectedOption = PAYMENT_OPTIONS.find((o) => o.id === paymentMethod);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* ── Header ── */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-30">
        <div className="max-w-5xl mx-auto flex items-center justify-between">

          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          {/* Step breadcrumb */}
          <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center gap-1.5 text-green-600 font-medium">
              <CheckCircle2 className="w-4 h-4" />
              <span>Order Created</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-300" />
            <div className="flex items-center gap-1.5 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
              <span>2</span>
              <span>Confirm Payment</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-300" />
            <div className="flex items-center gap-1.5 text-gray-400 text-xs">
              <span className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center font-semibold">3</span>
              <span>Receipt</span>
            </div>
          </div>

          <div className="w-20" /> {/* spacer to center the breadcrumb */}
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="max-w-5xl mx-auto px-6 py-8 flex gap-6 items-start">

        {/* ── LEFT: Payment method selector ── */}
        <div className="flex-1 min-w-0 space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-sm font-semibold text-gray-900">Select Payment Method</h2>
            </div>

            <div className="p-4 space-y-3">
              {PAYMENT_OPTIONS.map((option) => {
                const Icon = option.icon;
                const isSelected = paymentMethod === option.id;

                return (
                  <button
                    key={option.id}
                    onClick={() => setPaymentMethod(option.id)}
                    className={`w-full flex items-center justify-between px-4 py-4 rounded-xl border-2 transition-all text-left ${
                      isSelected
                        ? `${option.border} ${option.bg}`
                        : "border-gray-100 hover:border-gray-200 bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Radio indicator */}
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                          isSelected
                            ? "border-blue-600"
                            : "border-gray-300"
                        }`}
                      >
                        {isSelected && (
                          <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                        )}
                      </div>

                      <div>
                        <p className={`text-sm font-semibold ${isSelected ? "text-gray-900" : "text-gray-700"}`}>
                          {option.label}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">{option.description}</p>
                      </div>
                    </div>

                    {/* Icon badge */}
                    <div className={`w-9 h-9 rounded-lg ${isSelected ? option.bg : "bg-gray-50"} flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${isSelected ? option.color : "text-gray-400"}`} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Paystack reference field (card and transfer only) ── */}
          {(paymentMethod === "card" || paymentMethod === "transfer") && (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-sm font-semibold text-gray-900">Payment Reference</h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  Confirm payment on your Paystack dashboard, then paste the reference below
                </p>
              </div>
              <div className="p-5">
                <Input
                  type="text"
                  placeholder="e.g. PAY_abc123xyz..."
                  value={paymentReference}
                  onChange={(e) => setPaymentReference(e.target.value)}
                  className="font-mono text-sm bg-gray-50 border-gray-200 focus:bg-white"
                />
                <p className="text-xs text-gray-400 mt-2">
                  You can find the reference on your Paystack dashboard under Transactions.
                </p>
              </div>
            </div>
          )}

          {/* ── Cash instructions ── */}
          {paymentMethod === "cash" && (
            <div className="bg-green-50 border border-green-100 rounded-xl px-5 py-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                  <Banknote className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-green-800">Cash payment</p>
                  <p className="text-xs text-green-600 mt-1 leading-relaxed">
                    Collect <span className="font-bold">₦{order.totalAmount?.toLocaleString()}</span> from the customer, then click Confirm Payment below to complete the sale and update stock.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ── Error ── */}
          {error && (
            <div className="px-4 py-3 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm">
              {error}
            </div>
          )}

          {/* ── Cancel button ── */}
          <button
            onClick={handleCancelOrder}
            className="text-xs text-gray-400 hover:text-red-500 transition-colors underline underline-offset-2"
          >
            Cancel this sale
          </button>
        </div>

        {/* ── RIGHT: Order summary ── */}
        <div className="w-80 shrink-0">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden sticky top-24">

            {/* Cart header */}
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-4 h-4 text-gray-400" />
                <h2 className="text-sm font-semibold text-gray-900">
                  Your Cart ({order.items?.length})
                </h2>
              </div>
            </div>

            {/* Items list */}
            <div className="divide-y divide-gray-50 max-h-64 overflow-y-auto">
              {order.items?.map((item, index) => (
                <div key={index} className="flex items-center gap-3 px-5 py-3">
                  {/* Product initial avatar */}
                  <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-gray-500">
                      {item.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                    <p className="text-xs text-gray-400">x{item.quantity}</p>
                  </div>

                  <p className="text-sm font-semibold text-gray-900 shrink-0">
                    ₦{item.subtotal?.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            <Separator />

            {/* Summary */}
            <div className="px-5 py-4 space-y-2.5">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium text-gray-900">
                  ₦{order.totalAmount?.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Discount</span>
                <span className="font-medium text-gray-400">₦0</span>
              </div>

              <Separator />

              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-gray-900">Total</span>
                <span className="text-xl font-bold text-blue-600">
                  ₦{order.totalAmount?.toLocaleString()}
                </span>
              </div>

              {/* Payment method badge */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-gray-400">Paying with</span>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${
                  paymentMethod === "cash"
                    ? "bg-green-100 text-green-700"
                    : paymentMethod === "card"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-purple-100 text-purple-700"
                }`}>
                  {selectedOption?.label}
                </span>
              </div>
            </div>

            {/* Confirm button */}
            <div className="px-5 pb-5">
              <Button
                onClick={handleConfirmPayment}
                disabled={loading || !canConfirm}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-5 rounded-xl disabled:opacity-40 transition-all"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Confirming...
                  </span>
                ) : (
                  `Confirm Payment · ₦${order.totalAmount?.toLocaleString()}`
                )}
              </Button>

              {/* Hint for card/transfer when reference is missing */}
              {(paymentMethod === "card" || paymentMethod === "transfer") &&
                !paymentReference.trim() && (
                  <p className="text-center text-xs text-gray-400 mt-2">
                    Enter a payment reference to proceed
                  </p>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}