import { Fragment } from "react";
import { CATEGORIES } from "../Layout/Layout";
import SearchIcon from "../Icons/SearchIcon";
import { PrimaryButton } from "../Button/PrimaryButton";

import * as styled from "./Header.styled";
import { ButtonLikeLink, Logo } from "../Link/ButtonLikeLink";
import { MainSearchField } from "../FormElements/Input/Input";
import { BaseLink } from "../Link/BaseLink";

export default function Header() {
  return (
    <styled.Header>
      <styled.MainMenu>
        <styled.MainTitle>
          <Logo href="/">
            <span className="mobile-short-label">TGC</span>
            <span className="desktop-long-label">THE GOOD CORNER</span>
          </Logo>
        </styled.MainTitle>
        <styled.TextFieldWithButton>
          <MainSearchField type="search" />
          <PrimaryButton>
            <SearchIcon />
          </PrimaryButton>
        </styled.TextFieldWithButton>
        <ButtonLikeLink href="/publish-article">
          <span className="mobile-short-label">Publier</span>
          <span className="desktop-long-label">Publier une annonce</span>
        </ButtonLikeLink>
      </styled.MainMenu>
      <styled.CategoriesNavigation>
        {CATEGORIES.map((category, index) => (
          <Fragment key={category.id}>
            <BaseLink href={`/categories/${category.id}`}>
              {category.name}
            </BaseLink>
            {index < CATEGORIES.length - 1 ? " • " : ""}
          </Fragment>
        ))}
      </styled.CategoriesNavigation>
    </styled.Header>
  );
}
