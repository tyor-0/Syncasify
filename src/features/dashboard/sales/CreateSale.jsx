import { useCreateSale } from "@/hooks/useCreateSale";
import { useRef, useState } from "react";
import { ShoppingCart, X, Plus, Minus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import ProductDetailModal from "./ProductDetailModal";

export default function CreateSale() {
  const {
    searchQuery,
    searchResults,
    searchLoading,
    handleSearch,
    cart,
    addToCart,
    updateQuantity,
    handleQuantityBlur,
    removeFromCart,
    cartTotal,
    paymentMethod,
    setPaymentMethod,
    loading,
    saving,
    error,
    handleSubmit,
    saveCart,
  } = useCreateSale();

  // ── Product detail modal state ─────────────────────────────────
  const [selectedProduct, setSelectedProduct] = useState(null);

  function openProductDetail(product) {
    setSelectedProduct(product);
  }

  function closeProductDetail() {
    setSelectedProduct(null);
  }

  // Called from modal — adds to cart with chosen quantity then stays open
  function handleAddToCartFromModal(product, quantity) {
    // Build a synthetic cart item the same way addToCart expects it
    // We call addToCart once per unit OR pass quantity directly
    // Adjust this if your useCreateSale hook supports a quantity param
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  }

  const uniqueProductCount = cart.length;
  const searchRef = useRef(null);

  function focusSearch() {
    searchRef.current?.focus();
    searchRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* ── Product Detail Modal ─────────────────────────────── */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={closeProductDetail}
          onAddToCart={handleAddToCartFromModal}
          isInCart={cart.some((c) => c.productId === selectedProduct._id)}
        />
      )}

      {/* ── Top Header Bar ───────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
        <h1 className="text-lg font-semibold text-gray-900 shrink-0">New Sale</h1>

        {/* Search bar */}
        <div className="relative w-full max-w-md mx-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <Input
            ref={searchRef}
            type="text"
            placeholder="Search product e.g. Pepsi..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-9 pr-4 bg-gray-50 border-gray-200 focus:bg-white"
          />

          {/* Search dropdown */}
          {(searchResults.length > 0 || (searchQuery && !searchLoading)) && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
              {searchLoading && (
                <p className="px-4 py-3 text-sm text-gray-400">Searching...</p>
              )}
              {!searchLoading && searchResults.length === 0 && searchQuery && (
                <p className="px-4 py-3 text-sm text-gray-400">
                  No products found for "{searchQuery}"
                </p>
              )}
              {searchResults.map((product) => (
                <button
                  key={product._id}
                  onClick={() => openProductDetail(product)}
                  className="w-full flex items-center justify-between px-4 py-3 hover:bg-blue-50 transition-colors text-left group"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900 group-hover:text-blue-700">
                      {product.name}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {product.quantity} {product.unit || "pcs"} in stock
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">
                      ₦{product.sellingPrice.toLocaleString()}
                    </p>
                    <p className="text-xs text-blue-500 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      View details
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Cart icon */}
        <div className="relative flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shrink-0">
          <ShoppingCart className="w-4 h-4" />
          <span className="text-sm font-medium hidden sm:inline">Cart</span>
          {uniqueProductCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {uniqueProductCount > 99 ? "99+" : uniqueProductCount}
            </span>
          )}
        </div>
      </div>

      {/* ── Main Content ─────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 py-6 flex gap-6">

        {/* ── Left: Product List ── */}
        <div className="flex-1 min-w-0">
          {cart.length === 0 ? (
            <div className="bg-white rounded-xl border border-dashed border-gray-200 flex flex-col items-center justify-center py-20 text-center">
              <ShoppingCart className="w-10 h-10 text-gray-200 mb-3" />
              <p className="text-gray-400 text-sm font-medium">Cart is empty</p>
              <p className="text-gray-300 text-xs mt-1">
                Search for a product above to add it here
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">

              {/* Table header */}
              <div className="grid grid-cols-[1fr_120px_100px_100px_40px] gap-4 px-5 py-3 bg-gray-50 border-b border-gray-100">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Product</span>
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide text-center">Qty</span>
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide text-right">Price</span>
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide text-right">Subtotal</span>
                <span />
              </div>

              {/* Cart rows */}
              <div className="divide-y divide-gray-50">
                {cart.map((item) => (
                  <div
                    key={item.productId}
                    className="grid grid-cols-[1fr_120px_100px_100px_40px] gap-4 px-5 py-4 items-center hover:bg-gray-50/50 transition-colors"
                  >
                    {/* Clicking name reopens detail modal */}
                    <div>
                      <button
                        onClick={() => openProductDetail({
                          _id: item.productId,
                          name: item.name,
                          sellingPrice: item.sellingPrice,
                          quantity: item.stockQuantity ?? 99,
                          unit: item.unit,
                          category: item.category,
                          sku: item.sku,
                          lowStockThreshold: item.lowStockThreshold ?? 5,
                        })}
                        className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors text-left"
                      >
                        {item.name}
                      </button>
                      <p className="text-xs text-gray-400 mt-0.5">
                        ₦{item.sellingPrice.toLocaleString()} each
                      </p>
                    </div>

                    <div className="flex items-center gap-1 justify-center">
                      <button
                        onClick={() => updateQuantity(item.productId, (Number(item.quantity) || 1) - 1)}
                        className="w-7 h-7 rounded-md border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-500"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.productId, e.target.value)}
                        onBlur={() => handleQuantityBlur(item.productId, item.quantity)}
                        className="w-12 text-center text-sm font-medium border border-gray-200 rounded-md px-1 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        onClick={() => updateQuantity(item.productId, (Number(item.quantity) || 0) + 1)}
                        className="w-7 h-7 rounded-md border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-500"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <p className="text-sm text-gray-500 text-right">
                      ₦{item.sellingPrice.toLocaleString()}
                    </p>
                    <p className="text-sm font-semibold text-gray-900 text-right">
                      ₦{(item.subtotal || 0).toLocaleString()}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-red-50 hover:text-red-500 text-gray-300 transition-colors mx-auto"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Subtotal footer */}
              <div className="px-5 py-3 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {cart.length} product{cart.length !== 1 ? "s" : ""}
                </span>
                <div className="flex items-center gap-8">
                  <span className="text-sm text-gray-500">Subtotal</span>
                  <span className="text-sm font-semibold text-gray-900 w-24 text-right">
                    ₦{cartTotal.toLocaleString()}
                  </span>
                  <span className="w-7" />
                </div>
              </div>
            </div>
          )}

          {cart.length > 0 && (
            <button
              onClick={focusSearch}
              className="mt-3 w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-blue-300 text-blue-600 hover:bg-blue-50 active:scale-[0.99] text-sm font-medium transition-all"
            >
              <Plus className="w-4 h-4" />
              Add another product
            </button>
          )}
        </div>

        {/* ── Right: Order Summary ── */}
        <div className="w-72 shrink-0">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden sticky top-24">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="text-sm font-semibold text-gray-900">Order Summary</h2>
            </div>

            <div className="px-5 py-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium text-gray-900">₦{cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Discount</span>
                <span className="font-medium text-gray-400">₦0</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-sm font-semibold text-gray-900">Total</span>
                <span className="text-lg font-bold text-blue-600">
                  ₦{cartTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Payment method */}
            <div className="px-5 pb-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                Payment method
              </p>
              <div className="grid grid-cols-3 gap-1.5">
                {["cash", "card", "transfer"].map((method) => (
                  <button
                    key={method}
                    onClick={() => setPaymentMethod(method)}
                    className={`py-2 rounded-lg text-xs font-semibold capitalize border transition-all ${
                      paymentMethod === method
                        ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                        : "bg-white text-gray-500 border-gray-200 hover:border-blue-300 hover:text-blue-600"
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <div className="mx-5 mb-4 px-3 py-2.5 bg-red-50 border border-red-100 text-red-600 rounded-lg text-xs leading-relaxed">
                {error}
              </div>
            )}

            <div className="px-5 pb-5 flex flex-col gap-2">
              <Button
                onClick={handleSubmit}
                disabled={loading || saving || cart.length === 0}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-5 rounded-xl disabled:opacity-40"
              >
                {loading
                  ? "Creating sale..."
                  : cart.length === 0
                  ? "Add items to proceed"
                  : `Proceed to Checkout · ₦${cartTotal.toLocaleString()}`}
              </Button>
              {/* Save Cart — posts to backend as pending, visible in saved carts */}
              <Button
                onClick={saveCart}
                disabled={saving || loading || cart.length === 0}
                variant="outline"
                className="w-full py-5 rounded-xl font-semibold border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40"
              >
                {saving ? "Saving cart..." : "Save Cart"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}