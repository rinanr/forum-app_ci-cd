import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  HiMenu,
  HiOutlineHome,
  HiOutlineLogout,
  HiOutlineUser,
  HiOutlineX,
  HiPlus,
} from 'react-icons/hi';
import { HiTrophy } from 'react-icons/hi2';

import { logout } from '../states/auth';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    dispatch(logout());
    closeMenu();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link
          to="/"
          className="text-xl font-extrabold tracking-tight text-blue-600"
          onClick={closeMenu}
        >
          ForumKu
        </Link>

        <button
          type="button"
          className="rounded-xl p-2 text-slate-700 hover:bg-slate-100 md:hidden"
          onClick={() => setIsOpen((current) => !current)}
          aria-label={isOpen ? 'Tutup menu' : 'Buka menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <HiOutlineX className="text-2xl" />
          ) : (
            <HiMenu className="text-2xl" />
          )}
        </button>

        <nav className="hidden items-center gap-1 md:flex">
          <Link
            to="/"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-blue-600"
          >
            <HiOutlineHome />
            Home
          </Link>

          <Link
            to="/leaderboard"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-blue-600"
          >
            <HiTrophy />
            Leaderboard
          </Link>

          {token ? (
            <>
              <Link
                to="/threads/new"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-blue-600"
              >
                <HiPlus />
                Buat Thread
              </Link>

              <Link
                to="/profile"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-blue-600"
              >
                <HiOutlineUser />
                Profile
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="ml-1 flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600"
              >
                <HiOutlineLogout />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-blue-600"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>

      {isOpen && (
        <nav className="border-t border-slate-100 bg-white px-4 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            <Link
              to="/"
              onClick={closeMenu}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              <HiOutlineHome />
              Home
            </Link>
            <Link
              to="/leaderboard"
              onClick={closeMenu}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              <HiTrophy />
              Leaderboard
            </Link>

            {token ? (
              <>
                <Link
                  to="/threads/new"
                  onClick={closeMenu}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  <HiPlus />
                  Buat Thread
                </Link>
                <Link
                  to="/profile"
                  onClick={closeMenu}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  <HiOutlineUser />
                  Profile
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  <HiOutlineLogout />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="rounded-lg bg-blue-600 px-3 py-2.5 text-sm font-semibold text-white"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}

export default Navbar;
