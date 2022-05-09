const Search = () => {
  return (
    <div className="bg-zinc-800">
      <h2 className="text-slate-300 text-center uppercase font-extrabold p-1 tracking-wider">Search</h2>

      <div className="flex justify-center">
        <input
          type="search" placeholder="Search..."
          className="w-full text-gray-100 bg-gray-700 rounded transition ease-in-out p-3 mx-4 mt-4
            focus:text-gray-200 focus:bg-gray-600 focus:outline-none"
        />
      </div>
      
      <ul className="p-1 m-3 flex flex- text-center text-gray-100">
        <li className="mr-2 cursor-pointer p-4 border border-solid border-slate-600 rounded"> Moves </li>
        <li className="mr-2 cursor-pointer p-4 border border-solid border-slate-600 rounded"> TV Series</li>
      </ul>
    </div>
  );
}

export default Search;