"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { CassetteLogo } from "@/components/layout/CassetteLogo";
import { HeaderSearch } from "@/components/layout/HeaderSearch";
import { HeaderWaves } from "@/components/layout/HeaderWaves";
import { NavDropdown } from "@/components/layout/NavDropdown";
import { NavTabIndicators, navTabClass } from "@/components/layout/NavTab";
import { aboutNav, isNavSectionActive, mainNav, type NavId } from "@/lib/nav";

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openId, setOpenId] = useState<NavId | null>(null);
  const [mobileSection, setMobileSection] = useState<NavId | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);
  const menuId = useId();

  useEffect(() => {
    setMobileOpen(false);
    setOpenId(null);
    setMobileSection(null);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const first = mobileNavRef.current?.querySelector<HTMLElement>(
      "a, button, input, select"
    );
    first?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMobileOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  function toggleDesktop(id: NavId) {
    setOpenId((current) => (current === id ? null : id));
  }

  function toggleMobile(id: NavId) {
    setMobileSection((current) => (current === id ? null : id));
  }

  return (
    <header className="sticky top-0 z-40 border-b-4 border-pmr-border bg-pmr-elevated text-pmr-offwhite">
      <HeaderWaves />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center gap-3 py-3">
          <Link
            href="/"
            aria-current={pathname === "/" ? "page" : undefined}
            className="flex min-h-11 min-w-0 items-center gap-2 rounded-lg font-bold tracking-tight transition hover:text-pmr-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pmr-coral/70"
          >
            <CassetteLogo />
            <span className="text-base leading-tight sm:text-xl">
              People&apos;s Media Record
            </span>
          </Link>
          <button
            ref={buttonRef}
            type="button"
            className="ml-auto inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border-2 border-pmr-border bg-pmr-dark text-pmr-offwhite lg:hidden"
            onClick={() => setMobileOpen((value) => !value)}
            aria-expanded={mobileOpen}
            aria-controls={menuId}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? (
              <X className="h-6 w-6" aria-hidden />
            ) : (
              <Menu className="h-6 w-6" aria-hidden />
            )}
          </button>
        </div>

        <nav
          className="hidden items-stretch lg:flex"
          aria-label="Main"
        >
          <div className="flex items-center pb-3 pr-3">
            <HeaderSearch className="w-[20rem]" />
          </div>
          {mainNav.map((item) =>
            item.children ? (
              <NavDropdown
                key={item.id}
                item={item}
                active={isNavSectionActive(item.id, pathname)}
                open={openId === item.id}
                onToggle={() => toggleDesktop(item.id)}
                onClose={() => setOpenId(null)}
              />
            ) : (
              <Link
                key={item.id}
                href={item.href ?? "/"}
                aria-current={
                  isNavSectionActive(item.id, pathname) ? "page" : undefined
                }
                className={navTabClass()}
              >
                {item.label}
                <NavTabIndicators
                  active={isNavSectionActive(item.id, pathname)}
                />
              </Link>
            )
          )}
          <div className="ml-auto">
            <NavDropdown
              item={aboutNav}
              active={isNavSectionActive("about", pathname)}
              open={openId === "about"}
              onToggle={() => toggleDesktop("about")}
              onClose={() => setOpenId(null)}
              align="right"
            />
          </div>
        </nav>
      </div>

      {mobileOpen ? (
        <nav
          ref={mobileNavRef}
          id={menuId}
          className="relative z-10 border-t-2 border-pmr-border bg-pmr-elevated px-4 py-4 lg:hidden"
          aria-label="Main"
        >
          <HeaderSearch className="mb-4 w-full" />
          <ul className="flex flex-col">
            {mainNav.map((item) => (
              <li key={item.id}>
                {item.children ? (
                  <NavDropdown
                    item={item}
                    active={isNavSectionActive(item.id, pathname)}
                    open={mobileSection === item.id}
                    onToggle={() => toggleMobile(item.id)}
                    onClose={() => setMobileOpen(false)}
                    variant="accordion"
                  />
                ) : (
                  <Link
                    href={item.href ?? "/"}
                    aria-current={
                      isNavSectionActive(item.id, pathname) ? "page" : undefined
                    }
                    className={`${navTabClass()} w-full`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                    <NavTabIndicators
                      active={isNavSectionActive(item.id, pathname)}
                    />
                  </Link>
                )}
              </li>
            ))}
            <li>
              <NavDropdown
                item={aboutNav}
                active={isNavSectionActive("about", pathname)}
                open={mobileSection === "about"}
                onToggle={() => toggleMobile("about")}
                onClose={() => setMobileOpen(false)}
                variant="accordion"
              />
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
