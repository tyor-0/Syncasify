import { useState, useEffect } from "react";
import { X, Plus, Minus, Package, Tag, Hash, Layers, ShoppingCart, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function ProductDetailModal({ product, onClose, onAddToCart, isInCart }) {
    const [quantity, setQuantity] = useState(1);
    const [added, setAdded] = useState(false);

    // Reset quantity when product changes
    // eslint-disable-next-line react-hooks/set-state-in-effect
    useEffect(() => {
        if (product?._id) {
            setQuantity(1);
            setAdded(false);
        }
    }, [product?._id]);
    if (!product) return null;

    const isLowStock = product.quantity <= product.lowStockThreshold;
    const isOutOfStock = product.quantity === 0;

    function increment() {
        setQuantity((prev) => Math.min(prev + 1, product.quantity));
    }

    function decrement() {
        setQuantity((prev) => Math.max(prev - 1, 1));
    }

    function handleAddToCart() {
        onAddToCart(product, quantity);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    }

    return (
        // Backdrop
        <div
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h2 className="text-base font-semibold text-gray-900">Product Details</h2>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Body */}
                <div className="px-6 py-5 space-y-5">

                    {/* Name + stock badge */}
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 leading-tight">{product.name}</h3>
                            {product.sku && (
                                <p className="text-xs text-gray-400 mt-1 font-mono">SKU: {product.sku}</p>
                            )}
                        </div>
                        <div className="shrink-0">
                            {isOutOfStock ? (
                                <Badge className="bg-red-100 text-red-600 border-0">Out of stock</Badge>
                            ) : isLowStock ? (
                                <Badge className="bg-yellow-100 text-yellow-700 border-0">Low stock</Badge>
                            ) : (
                                <Badge className="bg-green-100 text-green-700 border-0">In stock</Badge>
                            )}
                        </div>
                    </div>

                    {/* Details grid */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-gray-50 rounded-xl p-3 flex items-center gap-2.5">
                            <Tag className="w-4 h-4 text-gray-400 shrink-0" />
                            <div>
                                <p className="text-xs text-gray-400">Category</p>
                                <p className="text-sm font-medium text-gray-700 capitalize">{product.category || "Uncategorized"}</p>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-3 flex items-center gap-2.5">
                            <Layers className="w-4 h-4 text-gray-400 shrink-0" />
                            <div>
                                <p className="text-xs text-gray-400">Unit</p>
                                <p className="text-sm font-medium text-gray-700 capitalize">{product.unit || "piece"}</p>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-3 flex items-center gap-2.5">
                            <Package className="w-4 h-4 text-gray-400 shrink-0" />
                            <div>
                                <p className="text-xs text-gray-400">Available</p>
                                <p className="text-sm font-medium text-gray-700">{product.quantity} {product.unit || "pcs"}</p>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-3 flex items-center gap-2.5">
                            <Hash className="w-4 h-4 text-gray-400 shrink-0" />
                            <div>
                                <p className="text-xs text-gray-400">Low stock at</p>
                                <p className="text-sm font-medium text-gray-700">{product.lowStockThreshold} {product.unit || "pcs"}</p>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Price */}
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Selling Price</span>
                        <span className="text-2xl font-bold text-blue-600">
                            ₦{product.sellingPrice?.toLocaleString()}
                        </span>
                    </div>

                    {/* Quantity selector */}
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Quantity</span>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={decrement}
                                disabled={quantity <= 1}
                                className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-gray-600"
                            >
                                <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-base font-bold text-gray-900 w-8 text-center">{quantity}</span>
                            <button
                                onClick={increment}
                                disabled={quantity >= product.quantity}
                                className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-gray-600"
                            >
                                <Plus className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>

                    {/* Subtotal */}
                    <div className="bg-blue-50 rounded-xl px-4 py-3 flex justify-between items-center">
                        <span className="text-sm text-blue-600">Subtotal</span>
                        <span className="text-base font-bold text-blue-700">
                            ₦{(product.sellingPrice * quantity).toLocaleString()}
                        </span>
                    </div>
                </div>

                {/* Footer — CTA */}
                <div className="px-6 pb-6">
                    <Button
                        onClick={handleAddToCart}
                        disabled={isOutOfStock}
                        className={`w-full py-5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${added
                                ? "bg-green-500 hover:bg-green-500 text-white"
                                : "bg-blue-600 hover:bg-blue-700 text-white"
                            } disabled:opacity-40`}
                    >
                        {added ? (
                            <>
                                <CheckCircle className="w-4 h-4" />
                                Added to Cart
                            </>
                        ) : (
                            <>
                                <ShoppingCart className="w-4 h-4" />
                                {isInCart ? "Update Cart" : "Add to Cart"} · ₦{(product.sellingPrice * quantity).toLocaleString()}
                            </>
                        )}
                    </Button>
                </div>

            </div>
        </div>
    );
}