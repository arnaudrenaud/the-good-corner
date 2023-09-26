import { Fragment } from "react";
import NavigationLinkToCategory from "./NavigationLinkToCategory";
import { CATEGORIES } from "./Layout";
import Link from "next/link";
import SearchIcon from "./Icons/SearchIcon";
import PrimaryButton from "./PrimaryButton";

export default function Header() {
  return (
    <header className="header">
      <div className="main-menu">
        <h1>
          <Link href="/" className="button logo link-button">
            <span className="mobile-short-label">TGC</span>
            <span className="desktop-long-label">THE GOOD CORNER</span>
          </Link>
        </h1>
        <form className="text-field-with-button">
          <input className="text-field main-search-field" type="search" />
          <PrimaryButton>
            <SearchIcon />
          </PrimaryButton>
        </form>
        <Link href="/publish-article" className="button link-button">
          <span className="mobile-short-label">Publier</span>
          <span className="desktop-long-label">Publier une annonce</span>
        </Link>
      </div>
      <nav className="categories-navigation">
        {CATEGORIES.map((category, index) => (
          <Fragment key={category.id}>
            <NavigationLinkToCategory id={category.id} name={category.name} />
            {index < CATEGORIES.length - 1 ? " • " : ""}
          </Fragment>
        ))}
      </nav>
    </header>
  );
}
