import { useContext, useEffect, useRef, useState } from "react";
import AppContext from "../context/AppContext";
import { LogOut, Menu, User, X } from "lucide-react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Menubar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const { userProfile, clearUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    setShowDropdown(false);
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  useEffect(() => {
    document.body.style.overflow = openSideMenu ? "hidden" : "auto";
  }, [openSideMenu]);

  return (
    <div className="flex items-center justify-between gap-5 bg-[#717866] border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-4 sm:px-7 sticky top-0 z-3">
      <div className="flex items-center gap-5 ">
        <button
          onClick={() => setOpenSideMenu(!openSideMenu)}
          className="block lg:hidden text-black p-1 rounded transition-colors"
        >
          {openSideMenu ? (
            <X className="text-2xl hover:cursor-pointer text-[#e5e1df]" />
          ) : (
            <Menu className="text-2xl hover:cursor-pointer text-[#e5e1df]" />
          )}
        </button>

        <div className="flex items-center gap-2">
          <img src={assets.logo} alt="logo" className="w-10 h-10" />
          <span className="text-lg font-medium text-[#e5e1df] truncate">
            Inventory
          </span>
        </div>
      </div>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center justify-center w-10 h-10 bg-[#e5e1df] hover:bg-gray-200 hover:cursor-pointer rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#505746] focus:ring-offset-2"
        >
          {userProfile?.profileImageUrl ? (
            <img src={userProfile?.profileImageUrl || ""} alt="profile image" className="h-10 w-10 bg-slate-400 rounded-full"/>
          ) : (
            <User className="text-[#949488] w-10 h-10"/>
          )}
        </button>

        {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                <div className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 bg-[#e5e1df] rounded-full">
                            {userProfile?.profileImageUrl ? (
                                <img src={userProfile?.profileImageUrl || ""} alt="profile image" className="h-8 w-10 bg-slate-400 rounded-full"/>
                            ) : (
                                <User className="text-[#949488] w-10 h-10"/>
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-[#949488] truncate">
                                {userProfile.name}
                            </p>
                            <p className="text-xs text-[#b7b2ac] truncate">
                                {userProfile.email}
                            </p>
                        </div>
                    </div>
                </div>
            

                <div className="py-1">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                    >
                        <LogOut className="w-4 h-4 text-gray-500 hover:cursor-pointer hover:text-red-500" />
                        <span>Logout</span>
                    </button>
                </div>
          </div>
        )}
      </div>

      {openSideMenu && (
        <div className="fixed inset-x-0 top-[73px] bottom-0 bg-white border-b border-gray-200 lg:hidden z-20 overflow-y-auto">
          <Sidebar activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Menubar;
