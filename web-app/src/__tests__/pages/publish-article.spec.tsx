import { render, screen, waitFor } from "@testing-library/react";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";

import PublishArticlePage, {
  GET_MY_PROFILE_PUBLISH_ARTICLE,
} from "../../pages/publish-article";
import { GetMyProfilePublishArticleQuery } from "@/gql/graphql";

jest.mock("next/router", () => ({ useRouter: jest.fn() }));

describe("PublishArticlePage", () => {
  const MOCK_GET_MY_PROFILE_SIGNED_IN: MockedResponse<GetMyProfilePublishArticleQuery> =
    {
      request: {
        query: GET_MY_PROFILE_PUBLISH_ARTICLE,
      },
      result: {
        data: { myProfile: { id: "1234" } },
      },
    };

  describe("while query is loading", () => {
    it("renders a loader", () => {
      render(
        <MockedProvider mocks={[MOCK_GET_MY_PROFILE_SIGNED_IN]}>
          <PublishArticlePage />
        </MockedProvider>
      );

      expect(screen.getByRole("progressbar")).toBeInTheDocument();
    });
  });

  describe("after query has loaded", () => {
    describe("if user not signed-in", () => {
      const MOCK_GET_MY_PROFILE_NOT_SIGNED_IN: MockedResponse<GetMyProfilePublishArticleQuery> =
        {
          request: {
            query: GET_MY_PROFILE_PUBLISH_ARTICLE,
          },
        };

      it("renders link to sign-in", async () => {
        render(
          <MockedProvider mocks={[MOCK_GET_MY_PROFILE_NOT_SIGNED_IN]}>
            <PublishArticlePage />
          </MockedProvider>
        );

        await waitFor(() => {
          const links = screen.getAllByRole("link");
          expect(links).toHaveLength(2);
          expect((links[0] as any).href).toMatch("/sign-up");
          expect((links[1] as any).href).toMatch("/sign-in");

          expect(screen.queryByRole("form")).not.toBeInTheDocument();
        });
      });
    });

    describe("if user signed-in", () => {
      it("renders form", async () => {
        render(
          <MockedProvider mocks={[MOCK_GET_MY_PROFILE_SIGNED_IN]}>
            <PublishArticlePage />
          </MockedProvider>
        );

        await waitFor(() => {
          expect(screen.queryByRole("link")).not.toBeInTheDocument();
          expect(screen.getByRole("form")).toBeInTheDocument();
        });
      });
    });
  });
});
