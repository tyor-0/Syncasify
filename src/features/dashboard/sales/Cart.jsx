import { ShoppingCart, Trash2, CheckCircle, RefreshCw, User, CreditCard, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/use-cart";

function StatusBadge({ status }) {
    const map = {
        pending: "bg-yellow-100 text-yellow-700",
        completed: "bg-green-100 text-green-700",
        cancelled: "bg-red-100 text-red-600",
    };
    return (
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${map[status] || "bg-gray-100 text-gray-500"}`}>
            {status}
        </span>
    );
}

function CartCard({ cart, onConfirm, onCancel, onDelete, isCancelling, isConfirming, isDeleting }) {
    const customer = cart.customer;
    const itemCount = cart.items?.length || 0;
    const isCancelled = cart.status === "cancelled";

    return (
        <div className={`bg-white border rounded-2xl p-5 shadow-sm flex flex-col gap-4 ${isCancelled ? "border-red-100 opacity-75" : "border-gray-200"}`}>

            {/* Top row */}
            <div className="flex items-start justify-between gap-2">
                <div>
                    <p className="text-xs text-gray-400 font-mono">#{cart._id?.slice(-8).toUpperCase()}</p>
                    <p className="text-sm text-gray-500 mt-0.5">
                        {new Date(cart.createdAt).toLocaleDateString("en-NG", {
                            day: "numeric", month: "short", year: "numeric",
                        })}
                    </p>
                </div>
                <StatusBadge status={cart.status} />
            </div>

            <Separator />

            {/* Customer */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="w-4 h-4 text-gray-400 shrink-0" />
                <span>{customer?.name || <span className="italic text-gray-400">Walk-in customer</span>}</span>
                {customer?.phone && (
                    <span className="text-gray-400 text-xs ml-1">· {customer.phone}</span>
                )}
            </div>

            {/* Payment method */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
                <CreditCard className="w-4 h-4 text-gray-400 shrink-0" />
                <span className="capitalize">{cart.paymentMethod || "—"}</span>
            </div>

            {/* Items */}
            <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium mb-1">
                    <Package className="w-3.5 h-3.5" />
                    <span>{itemCount} item{itemCount !== 1 ? "s" : ""}</span>
                </div>
                {cart.items?.map((item, i) => (
                    <div key={i} className="flex justify-between items-center text-sm">
                        <span className="text-gray-700 truncate max-w-[60%]">{item.name}</span>
                        <span className="text-gray-500 text-xs">
                            x{item.quantity} · ₦{item.subtotal?.toLocaleString()}
                        </span>
                    </div>
                ))}
            </div>

            <Separator />

            {/* Total */}
            <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Total</span>
                <span className="font-bold text-gray-900 text-base">
                    ₦{cart.totalAmount?.toLocaleString()}
                </span>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-1">
                {isCancelled ? (
                    // Cancelled — show Delete button only
                    <Button
                        onClick={() => onDelete(cart._id)}
                        disabled={isDeleting}
                        variant="outline"
                        className="flex-1 border-red-200 text-red-500 hover:bg-red-50 rounded-full text-sm py-2 flex items-center justify-center gap-1.5"
                    >
                        {isDeleting ? (
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                            <Trash2 className="w-3.5 h-3.5" />
                        )}
                        {isDeleting ? "Deleting..." : "Delete Order"}
                    </Button>
                ) : (
                    // Pending — show Confirm + Cancel
                    <>
                        <Button
                            onClick={() => onConfirm(cart._id)}
                            disabled={isConfirming || isCancelling}
                            className="flex-1 bg-[#c8f135] hover:bg-[#b8e020] text-black font-semibold rounded-full text-sm py-2 flex items-center justify-center gap-1.5"
                        >
                            {isConfirming ? (
                                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                                <CheckCircle className="w-3.5 h-3.5" />
                            )}
                            {isConfirming ? "Confirming..." : "Confirm Payment"}
                        </Button>

                        <Button
                            onClick={() => onCancel(cart._id)}
                            disabled={isCancelling || isConfirming}
                            variant="outline"
                            className="flex-1 border-red-200 text-red-500 hover:bg-red-50 rounded-full text-sm py-2 flex items-center justify-center gap-1.5"
                        >
                            {isCancelling ? (
                                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                                <Trash2 className="w-3.5 h-3.5" />
                            )}
                            {isCancelling ? "Cancelling..." : "Cancel"}
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
}

export default function CartPage() {
    const {
        carts,
        loading,
        error,
        cancellingId,
        confirmingId,
        deletingId,
        fetchSavedCarts,
        confirmCart,
        cancelCart,
        deleteCart,
    } = useCart();

    const pendingCount = carts.filter((c) => c.status === "pending").length;

    return (
        <div className="min-h-screen bg-[#f7f7f5]">
            <div className="max-w-5xl mx-auto px-4 py-10">

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <ShoppingCart className="w-6 h-6 text-gray-700" />
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Saved Carts</h1>
                        {!loading && (
                            <Badge className="bg-[#c8f135] text-black font-semibold text-xs px-2 py-0.5 rounded-full">
                                {pendingCount} pending
                            </Badge>
                        )}
                    </div>
                    <Button
                        onClick={fetchSavedCarts}
                        variant="outline"
                        className="text-sm rounded-full flex items-center gap-2"
                        disabled={loading}
                    >
                        <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
                        Refresh
                    </Button>
                </div>

                {/* Loading */}
                {loading && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white rounded-2xl border border-gray-200 p-5 h-64 animate-pulse">
                                <div className="h-3 bg-gray-100 rounded w-1/3 mb-3" />
                                <div className="h-3 bg-gray-100 rounded w-1/2 mb-6" />
                                <div className="h-3 bg-gray-100 rounded w-full mb-2" />
                                <div className="h-3 bg-gray-100 rounded w-3/4" />
                            </div>
                        ))}
                    </div>
                )}

                {/* Error */}
                {!loading && error && (
                    <div className="text-center py-16 text-red-400">
                        <p className="text-sm">{error}</p>
                        <Button onClick={fetchSavedCarts} variant="outline" className="mt-4 rounded-full text-sm">
                            Try again
                        </Button>
                    </div>
                )}

                {/* Empty */}
                {!loading && !error && carts.length === 0 && (
                    <div className="text-center py-20 text-gray-400">
                        <ShoppingCart className="w-12 h-12 mx-auto mb-3 opacity-30" />
                        <p className="text-sm">No saved carts found.</p>
                    </div>
                )}

                {/* Grid */}
                {!loading && !error && carts.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {carts.map((cart) => (
                            <CartCard
                                key={cart._id}
                                cart={cart}
                                onConfirm={confirmCart}
                                onCancel={cancelCart}
                                onDelete={deleteCart}
                                isCancelling={cancellingId === cart._id}
                                isConfirming={confirmingId === cart._id}
                                isDeleting={deletingId === cart._id}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}