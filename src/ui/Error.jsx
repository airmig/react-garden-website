import { useNavigate, useRouteError } from "react-router-dom";

function Error({ message }) {
  const navigate = useNavigate();

  return (
    <div className="mx-auto bg-color-silver max-w-7xl py-6 sm:px-6 lg:px-8">
      <section>
        <h1 className="text-xl">Something went wrong 😢</h1>
        <p>Error: {message}</p>
        <button onClick={() => navigate(-1)}>&larr; Go back</button>
      </section>
    </div>
  );
}

export default Error;
