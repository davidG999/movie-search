const Search = () => {
  return (
    <div className="bg-zinc-800">
      <h2 className="text-slate-300 text-center uppercase font-extrabold p-1 tracking-wider">Search</h2>

      <div class="flex justify-center">
        <input
          type="search" placeholder="Search..."
          class="w-full text-gray-100 bg-gray-700 rounded transition ease-in-out p-3 m-4
            focus:text-gray-200 focus:bg-gray-600 focus:outline-none"
        />
      </div>
    </div>
  );
}

export default Search;