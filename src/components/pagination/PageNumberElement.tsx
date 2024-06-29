type PageNumberElementProps = {
  number: number;
  handlePageChange: (page: number) => void;
};

const PageNumberElement: React.FC<PageNumberElementProps> = ({
  number,
  handlePageChange,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const clickedElement = e.target as HTMLLIElement;
    handlePageChange(parseInt(clickedElement.textContent || ""));
  };

  return (
    <li className="hover:bg-gray-600" onClick={handleClick}>
      {number}
    </li>
  );
};

export default PageNumberElement;
