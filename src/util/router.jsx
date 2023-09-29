import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../ui/AppLayout";
import SearchBar from "../features/search/SearhBar";
import SearchResults from "../features/search/SearchResults";
import Hero from "../ui/Hero";
import Detail from "../ui/Detail";
import Collection from "../ui/Collection";
import DetailCollectionItem from "../ui/DetailCollectionItem";
import Test1 from "../ui/test1";
import Login from "../ui/Login";
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/search",
        element: (
          <>
            <Test1 />
          </>
        ),
      },
      {
        path: "/",
        element: (
          <>
            <Hero />
          </>
        ),
      },
      {
        path: "/search-results",
        element: (
          <>
            <SearchResults />
          </>
        ),
      },
      {
        path: "/detail",
        element: (
          <>
            <Detail />
          </>
        ),
      },
      {
        path: "/collection",
        element: (
          <>
            <Collection />
          </>
        ),
      },
      {
        path: "/detail-collection",
        element: (
          <>
            <DetailCollectionItem />
          </>
        ),
      },
      {
        path: "/login",
        element: (
          <>
            <Login />
          </>
        ),
      },
    ],
  },
]);

export default router;
