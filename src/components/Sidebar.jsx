import { SIDE_BAR_DATA } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ activeMenu }) => {
  const navigate = useNavigate();

  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-[#949488] border-gray-200/50 p-5 sticky top-[61px] z-20 text-[#e5e1df]">
      {SIDE_BAR_DATA.map((item, index) => (
        <button
          onClick={() => navigate(item.path)}
          key={`menu_${index}`}
          className={`w-full flex items-centere gap-4 text-[15px] py-3 px-6 rounded-lg mb-3 hover:cursor-pointer hover:bg-[#717866] ${activeMenu === item.label ? "text-[#e5e1df] bg-[#717866]" : ""}`}
        >
          <item.icon className="text-xl" />
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
