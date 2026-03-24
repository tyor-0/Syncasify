import { useLocation, useNavigate } from "react-router-dom";
import { useCreateSale } from "@/hooks/useCreateSale";
import ProductDetailModal from "./Productdetailmodal";

// This page is navigated to from the products table via:
// navigate("/admin/sales/add-to-carts", { state: { product: row.original } })

export default function AddtoCart() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { addToCart, cart } = useCreateSale();

    const product = state?.product;

    function handleAddToCart(prod, quantity) {
        addToCart(prod, quantity);
    }

    function handleClose() {
        navigate(-1); // go back to where they came from
    }

    // If someone lands on this page without a product (direct URL), send them back
    if (!product) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-500 text-sm mb-4">No product selected.</p>
                    <button
                        onClick={() => navigate("/admin/all-items")}
                        className="text-blue-600 text-sm underline"
                    >
                        Go to products
                    </button>
                </div>
            </div>
        );
    }

    const isInCart = cart.some((item) => item.productId === product._id);

    return (
        <div className="min-h-screen bg-gray-50">
            <ProductDetailModal
                product={product}
                onClose={handleClose}
                onAddToCart={handleAddToCart}
                isInCart={isInCart}
            />
        </div>
    );
}