import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="mx-5 mb-2 text-center text-5xl font-bold">
        Page not found!
      </h1>
      <p className="mx-5 mt-10 text-center text-3xl font-medium">
        Maybe this page moved? Got deleted? Never existed in the first place?
        Let's go
        <span>
          <Link to="/" className="text-white underline">
            home
          </Link>
        </span>
        and try from there.
      </p>
    </div>
  );
};

export default NotFound;
