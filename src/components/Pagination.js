import arrowLeft from '../assets/icons/arrow-left.svg'
import arrowRight from '../assets/icons/arrow-right.svg'

const PageNumberElement = ({ number, handlePageChange }) => {
  return (
    <li
      className="hover:bg-gray-600"
      onClick={(e) => handlePageChange(e.target.textContent)}
    >
      {number}
    </li>
  );
}

const Pagination = ({ setPage, numOfPages = 10, currentPage }) => {
  const handlePageChange = (page) => {
    setPage(page)
    window.scroll(0, 0)
  }

  const generatePages = () => {
    let pages = []

    for (let i = 0; i < numOfPages; i++) {
      pages.push(<PageNumberElement number={i + 1} key={i + 1} handlePageChange={handlePageChange} />)
    }

    return pages.map((e) => e)
  }

  return (
    <div className="flex justify-center pb-6 my-14">
      <button disabled={currentPage === 1}
        className="mx-2"
        onClick={() => handlePageChange(currentPage === 1 ? 1 : --currentPage)}>

        <img src={arrowLeft} width={30} alt="Previous page" className={`invert border-gray-700 ${currentPage === 1 ? 'opacity-30' : ''}`} />

      </button>

      <ul className={`inline-flex
        pages:cursor-pointer pages:py-2 pages:px-3 pages:border pages:text-gray-200`}
      >

        {generatePages()}

      </ul>

      <button disabled={currentPage === numOfPages}
        className="mx-2"
        onClick={() => handlePageChange(currentPage === numOfPages ? currentPage : ++currentPage)}>

        <img src={arrowRight} width={30} alt="Next page" className={`invert border-gray-700 ${currentPage === numOfPages ? 'opacity-30' : ''}`} />

      </button>

    </div>
  );
}

export default Pagination;