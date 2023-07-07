import { Link } from "react-router-dom"

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-center mb-2 mx-5 font-bold text-5xl">
        Page not found!
      </h1>
      <p className="text-center mt-10 mx-5 font-medium text-3xl">
        Maybe this page moved? Got deleted? Never existed in the first place?
        Let's go
        <span>
          <Link to="/" className="underline text-white">
            home
          </Link>
        </span>
        and try from there.
      </p>
    </div>
  )
}

export default NotFound
