import { Link } from "react-router-dom"

type NavItemProps = {
  icon: string
  title: string
  page: string
}

const NavItem: React.FC<NavItemProps> = ({ icon, title, page }) => {
  return (
    <Link
      to={page}
      className="flex flex-col items-center justify-center cursor-pointer mx-8 hover:opacity-50"
    >
      <img className="justify-self-center" src={icon} alt={title} />
      <span>{title}</span>
    </Link>
  )
}

export default NavItem
