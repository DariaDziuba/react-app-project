import { Route, Routes } from "react-router-dom";
import BooksGrid from "./productComponents/BooksGrid";
import ProductDetails from "./productComponents/ProductDetails";

function Router() {
    return (
        <Routes>
            <Route path="/" element={<BooksGrid />} />
            <Route path="/:productId" element={<ProductDetails />} />
        </Routes>
    )
}

export default Router;