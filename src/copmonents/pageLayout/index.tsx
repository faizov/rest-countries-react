import type { RootState } from "../../app/store";
import { useSelector, useDispatch } from "react-redux";
import { Link, Outlet } from "react-router-dom";

import { setTheme } from "../../features/theme/themeSlice";

import { DarkModeIcon } from "../../assets/icons/DarkModeIcon";

import "./styles.scss";

export const PageLayout = () => {
  const theme = useSelector((state: RootState) => state.theme.value);
  const dispatch = useDispatch();

  const onChangeTheme = () => {
    dispatch(setTheme(theme !== "light" ? "light" : "dark"));
  };

  return (
    <div className={`theme-${theme}`}>
      <div className="global-theme">
        <div className="header">
          <Link to="/">
            <h2>Where in the world</h2>
          </Link>
          <button onClick={() => onChangeTheme()}>
            <DarkModeIcon />
            <h4>Dark Mode</h4>
          </button>
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
