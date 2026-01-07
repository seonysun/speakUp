/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useLocation, useNavigate } from 'react-router-dom';
import { LIST_MENU } from '../constants/uiData';
import useResize from '../hooks/useResize';

const MENU_TABS = [
  { to: `list/${LIST_MENU[0].to}`, tab: '목록' },
  { to: 'chat', tab: '커뮤니티' },
  { to: 'search', tab: '검색' },
];

function Navbar({ setSearchOpen }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useResize();

  const handleMenu = (menu) => {
    if (menu.to === 'search') setSearchOpen((prev) => !prev);
    else {
      setSearchOpen(false);
      navigate(menu.to);
    }
  };

  return (
    <ul
      className={`flex ${isMobile ? 'fixed bottom-0 left-0 z-30 w-full justify-around border-t bg-white p-3 text-black' : 'mx-3 items-start gap-3'}`}
    >
      {MENU_TABS.map((menu) => (
        <li
          key={menu.tab}
          onClick={() => {
            handleMenu(menu);
          }}
          className={`${
            location.pathname.includes(menu.to)
              ? 'border-y border-main font-bold text-main'
              : 'font-medium'
          } cursor-pointer`}
        >
          {menu.tab}
        </li>
      ))}
    </ul>
  );
}

export default Navbar;
