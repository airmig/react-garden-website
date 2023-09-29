import { useNavigate } from "react-router-dom";
import SearchBar from "../features/search/SearhBar";
import { useSelector } from "react-redux";
import { setLoginToken } from "../features/plant/plantSlice";
import { useDispatch } from "react-redux";

function Header() {
  const navigate = useNavigate();
  const loginToken = useSelector((state) => state.plant.loginToken);
  const loggedIn = loginToken && loginToken.length > 0;
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(setLoginToken(""));
  }
  return (
    <header className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          <div className="flex justify-between">
            <SearchBar />
          </div>
          <div className="w-full flex mt-[10px] items-end justify-end">
            <button
              onClick={() => navigate("/collection")}
              type="button"
              className="ml-[10px] py-2 px-4  bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
            >
              Collection
            </button>
            <button
              onClick={() => navigate("/")}
              type="button"
              className="w-[100px] ml-[10px] py-2 px-4  bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
            >
              Home
            </button>
            {loggedIn ? (
              <button
                onClick={() => handleLogout()}
                type="button"
                className="w-[130px] ml-[10px] py-2 px-4  bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                type="button"
                className="w-[100px] ml-[10px] py-2 px-4  bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
              >
                Login
              </button>
            )}
          </div>
        </h1>
      </div>
    </header>
  );
}

export default Header;
