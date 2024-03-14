import React, { useEffect, useRef, useCallback, useState } from "react";
import { Link, useLocation } from "react-router-dom";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "@/store";

// SimpleBar
import SimpleBar from "simplebar-react";
import SimpleBarType from "simplebar-core";

// Metis Menu
import MetisMenu from "@metismenu/react";

// Helpers
import { hasPermission } from "@/helpers";

// Menu Items
import { menuItems } from "./Menu";

const SidebarContent = () => {
  // User
  const { user } = useSelector((state: RootState) => state.account);

  // MetisMenu
  const ref = useRef<SimpleBarType | null>(null);

  const activateParentDropdown = useCallback((item: HTMLAnchorElement) => {
    item.classList.add("active");
    const parent = item.parentElement;
    const parent2El = parent?.children[1];

    if (parent2El && !parent2El.classList.contains("metismenu")) {
      parent2El.classList.add("mm-show");
    }

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show"); // ul tag

        const parent3 = parent2.parentElement; // li tag

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.children[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement; // ul
          if (parent4) {
            parent4.classList.add("mm-show"); // ul
            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add("mm-show"); // li
              parent5.children[0].classList.add("mm-active"); // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false;
    }
    scrollElement(item);
    return false;
  }, []);

  const removeActivation = (items: HTMLCollectionOf<Element>) => {
    for (let i = 0; i < items.length; ++i) {
      const item = items[i];
      const parent = items[i].parentElement;

      if (item && item.classList.contains("active")) {
        item.classList.remove("active");
      }
      if (parent) {
        const parent2El =
          parent.children && parent.children.length && parent.children[1]
            ? parent.children[1]
            : null;
        if (parent2El && !parent2El.classList.contains("metismenu")) {
          parent2El.classList.remove("mm-show");
        }

        parent.classList.remove("mm-active");
        const parent2 = parent.parentElement;

        if (parent2) {
          parent2.classList.remove("mm-show");

          const parent3 = parent2.parentElement;
          if (parent3) {
            parent3.classList.remove("mm-active"); // li
            parent3.children[0].classList.remove("mm-active");

            const parent4 = parent3.parentElement; // ul
            if (parent4) {
              parent4.classList.remove("mm-show"); // ul
              const parent5 = parent4.parentElement;
              if (parent5) {
                parent5.classList.remove("mm-show"); // li
                parent5.children[0].classList.remove("mm-active"); // a tag
              }
            }
          }
        }
      }
    }
  };

  const path = useLocation();

  const activeMenu = useCallback(() => {
    const pathName = path.pathname;
    let matchingMenuItem = null;
    const ul = document.getElementsByClassName("metismenu")[0];
    const items = ul?.getElementsByTagName("a");

    if (!items || !items.length) return;

    removeActivation(items);

    for (let i = 0; i < items.length; ++i) {
      if (pathName === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem);
    }
  }, [path.pathname, activateParentDropdown]);

  useEffect(() => {
    ref.current && ref.current.recalculate();
  }, []);

  function scrollElement(item: HTMLAnchorElement) {
    if (item) {
      const currentPosition = item.offsetTop;
      if (currentPosition > window.innerHeight) {
        const scrollElement = ref.current && ref.current.getScrollElement();
        if (scrollElement) scrollElement.scrollTop = currentPosition - 300;
      }
    }
  }

  const [userMenuItems, setUserMenuItems] = useState<typeof menuItems>([]);

  useEffect(() => {
    const items: typeof menuItems = [];

    menuItems.forEach((menuItem) => {
      if (menuItem.types && !hasPermission(user, menuItem.types)) return;

      if (menuItem.subItems) {
        const subItems = menuItem.subItems.filter((subItem) => {
          return !subItem.types || hasPermission(user, subItem.types);
        });

        if (subItems.length > 0) {
          items.push({ ...menuItem, subItems });
        } else {
          items.push({ ...menuItem, subItems: undefined });
        }
      } else {
        items.push(menuItem);
      }
    });

    setUserMenuItems(items);
  }, [user]);

  useEffect(() => {
    if (userMenuItems.length === 0) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
    activeMenu();
  }, [activeMenu, userMenuItems, path.pathname]);

  if (userMenuItems.length === 0) return null;

  return (
    <React.Fragment>
      <SimpleBar className="h-100" ref={ref}>
        <div id="sidebar-menu">
          <MetisMenu className="list-unstyled">
            <li className="menu-title">Menu</li>

            {userMenuItems.map((menuItem) => (
              <li key={menuItem.id}>
                <Link to={menuItem.link} className={menuItem.subItems && "has-arrow"}>
                  <i className={menuItem.icon}></i>
                  {menuItem.badge && (
                    <span className={`badge rounded-pill ${menuItem.badge.color} float-end`}>
                      {menuItem.badge.value}
                    </span>
                  )}
                  <span>{menuItem.label}</span>
                </Link>
                {menuItem.subItems && (
                  <ul>
                    {menuItem.subItems.map((subMenuItem) => (
                      <li key={subMenuItem.id}>
                        <Link to={subMenuItem.link}>{subMenuItem.label}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </MetisMenu>
        </div>
      </SimpleBar>
    </React.Fragment>
  );
};

export default SidebarContent;
