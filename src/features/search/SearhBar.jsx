import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { searchTerm } from "../plant/plantSlice";

function SearchBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleChange(value) {
    dispatch(searchTerm(value));
  }

  function searchPlant() {
    navigate("/search-results");
  }

  return (
    <>
      <div className="w-full relative font-normal text-2xl text-gray-800 bg-transparent">
        <div className="w-full flex items-center border-b-2 border-green-500 py-2">
          <input
            onChange={(e) => handleChange(e.target.value)}
            className="w-full bg-transparent border-none mr-3 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Search Plants"
          />
          <button
            onClick={searchPlant}
            type="button"
            className="w-[100px] ml-[10px] py-2 px-4  bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
          >
            Search
          </button>
        </div>
      </div>
    </>
  );
}

export default SearchBar;
