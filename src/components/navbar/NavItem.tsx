import { Link } from "react-router-dom";

type NavItemProps = {
  icon: string;
  title: string;
  page: string;
};

const NavItem: React.FC<NavItemProps> = ({ icon, title, page }) => {
  return (
    <Link
      to={page}
      className="mx-8 flex cursor-pointer flex-col items-center justify-center hover:opacity-50"
    >
      <img className="justify-self-center" src={icon} alt={title} />
      <span>{title}</span>
    </Link>
  );
};

export default NavItem;
