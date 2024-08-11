import PageNumberElement from "./PageNumberElement";

import arrowLeft from "../../assets/icons/arrow-left.svg";
import arrowRight from "../../assets/icons/arrow-right.svg";

type PaginationProps = {
  setPage: (page: number) => void;
  numOfPages: number;
  currentPage: number;
};

const Pagination: React.FC<PaginationProps> = ({
  setPage,
  numOfPages = 10,
  currentPage,
}) => {
  const leftArrowStyles = currentPage === 1 ? "opacity-30" : "";
  const rightArrowStyles = currentPage === numOfPages ? "opacity-30" : "";

  const handlePageChange = (page: number) => {
    setPage(page);
    window.scroll(0, 0);
  };

  return (
    <div className="my-14 flex justify-center pb-6">
      <button
        disabled={currentPage === 1}
        className="mx-2"
        onClick={() => handlePageChange(currentPage === 1 ? 1 : --currentPage)}
      >
        <img
          src={arrowLeft}
          width={30}
          alt="Previous page"
          className={`border-gray-700 invert ${leftArrowStyles}`}
        />
      </button>

      <ul
        className={`inline-flex pages:cursor-pointer pages:border pages:px-3 pages:py-2 pages:text-gray-200`}
      >
        {Array(numOfPages).map((_e, i) => (
          <PageNumberElement
            number={i + 1}
            key={i + 1}
            handlePageChange={handlePageChange}
          />
        ))}
      </ul>

      <button
        disabled={currentPage === numOfPages}
        className="mx-2"
        onClick={() =>
          handlePageChange(
            currentPage === numOfPages ? currentPage : ++currentPage,
          )
        }
      >
        <img
          src={arrowRight}
          width={30}
          alt="Next page"
          className={`border-gray-700 invert ${rightArrowStyles}`}
        />
      </button>
    </div>
  );
};

export default Pagination;
