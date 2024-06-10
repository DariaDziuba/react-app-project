import { Route, Routes } from "react-router-dom";
import BooksGrid from "./productComponents/BooksGrid";
import ProductDetails from "./productComponents/ProductDetails";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";

function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<BooksGrid />} />
            <Route path="/details/:productId" element={<ProductDetails />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default Router;