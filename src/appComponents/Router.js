import { Route, Routes } from "react-router-dom";
import BooksGrid from "./productComponents/BooksGrid";
import ProductDetails from "./productComponents/ProductDetails";
import NotFound from "./pages/NotFound";

function Router() {
    return (
        <Routes>
            <Route path="/" element={<BooksGrid />} />
            <Route path="/details/:productId" element={<ProductDetails />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default Router;