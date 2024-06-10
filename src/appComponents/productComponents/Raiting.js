import { MAX_RAITING } from "../../settings";
import { FaStar, FaRegStar } from "react-icons/fa6";

function Raiting({ params }) {
    const { book } = params;
    const rating = Number(book.rating || '0');
    const reatingArray = [];

    for (let i = 0; i < MAX_RAITING; i++) {
        reatingArray.push(i < rating
            ? <FaStar key={`rating_${i}`} />
            : <FaRegStar key={`rating_${i}`} />
        );
    }

    return (
        <div className="d-flex mb-3">
            { reatingArray }
        </div>
    );
}

export default Raiting;