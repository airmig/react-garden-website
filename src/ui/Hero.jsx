import { useNavigate } from "react-router-dom";
function Hero() {
  const navigate = useNavigate();
  return (
    <div className="mx-auto bg-color-silver max-w-7xl py-6 sm:px-6 lg:px-8">
      <section
        id="hero"
        className="flex flex-col-reverse justify-center sm:flex-row p-6 items-center gap-8 mb-12 scroll-mt-40"
      >
        <article className="w-full relative sm:w-1/2">
          <h2 className="max-w-md color-green-300 text-4xl font-bold text-center sm:text-5l sm:text-left text-slate-900 dark:text-white">
            Mike and Ariel´s plant collection.
          </h2>
          <p className="max-w-md text-lg mt-4 text-center sm:text-left text-slate-700 dark:text-slate-400">
            We are embarking on an exciting journey to curate a diverse and
            extraordinary collection of unique, hand-selected plants from all
            corners of the world. Our passion for collecting unique plants stems
            from a deep appreciation for the natural world and a desire to share
            its marvels with others.
          </p>
          <p className="max-w-md text-xs mt-4 text-center sm:text-left text-slate-700 dark:text-slate-400">
            <button
              onClick={() => navigate("collection")}
              type="button"
              className="w-[250px] py-2 px-4  mt-1 bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
            >
              View Our Collection
            </button>
          </p>
        </article>
        <img
          className="w-1/4"
          src="./emptyPot.png"
          alt="Our plant collection"
        />
      </section>
    </div>
  );
}

export default Hero;
