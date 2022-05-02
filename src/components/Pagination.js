const Pagination = ({ setPage, numOfPages = 10 }) => {
  const handlePageChange = (page) => {
    setPage(page)
    window.scroll(0, 0)
  }

  const PageNumberElement = ({ number }) => {
    return (
      <li
        className="hover:bg-gray-600"
        onClick={(e) => handlePageChange(e.target.textContent)}
      >
        {number}
      </li>
    );
  }

  const generatePages = () => {
    let pages = []

    for (let i = 0; i < numOfPages; i++) {
      pages.push(<PageNumberElement number={i + 1} key={i + 1} />)
    }

    return pages.map((e, i) => e)
  }

  return (
    <div className="flex justify-center pb-6 my-14">
      <ul className="inline-flex
        pages:cursor-pointer pages:py-2 pages:px-3 pages:border pages:border-gray-700 pages:bg-slate-800 pages:text-gray-200">

        <li className="hover:bg-gray-600 rounded-l-lg">
          Previous
        </li>

        {generatePages()}

        <li className="hover:bg-gray-600 rounded-r-lg">
          Next
        </li>

      </ul>
    </div>
  );
}

export default Pagination;