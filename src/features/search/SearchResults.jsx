import { useDispatch } from "react-redux";
import Spinner from "../../ui/Spinner";
import Error from "../../ui/Error";
import { useNavigate } from "react-router-dom";
import { selectedPlant } from "../plant/plantSlice";
import { usePlants } from "../../util/usePlants";
import SearchRow from "../../ui/SearchRow";

function SearchResults() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data, isLoading, error, searchTerm } = usePlants();

  function viewDetails(id) {
    dispatch(selectedPlant(id));
    navigate("/detail/");
  }

  if (error) {
    return <Error message={error.message} />;
  }

  if (!searchTerm || searchTerm.length === 0) return;

  return isLoading ? (
    <>
      <div className="text-4xl mt-[10px] flex justify-center items-center">
        Searching...
      </div>
      <Spinner />
    </>
  ) : data.data ? (
    <div className="mx-auto bg-color-silver max-w-7xl py-6 sm:px-6 lg:px-8">
      <section>
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                      <th
                        colSpan="5"
                        className="bg-black text-white w-full p-5"
                      >
                        Found {data?.total} search Results for {searchTerm}
                      </th>
                    </tr>
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        Common name
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Family
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Scientific name
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Genus
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.data.map((i) => (
                      <>
                        <SearchRow
                          onClick={() => viewDetails(i.id)}
                          key={i.id}
                          item={i}
                        />
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  ) : (
    ""
  );
}

export default SearchResults;
