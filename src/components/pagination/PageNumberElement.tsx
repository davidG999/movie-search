type PageNumberElementProps = {
  number: number
  handlePageChange: any
}

const PageNumberElement: React.FC<PageNumberElementProps> = ({
  number,
  handlePageChange,
}) => {
  return (
    <li
      className="hover:bg-gray-600"
      onClick={(e: any) => handlePageChange(e.target.textContent)}
    >
      {number}
    </li>
  )
}

export default PageNumberElement
