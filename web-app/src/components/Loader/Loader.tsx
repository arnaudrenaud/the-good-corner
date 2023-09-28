import * as styled from "./Loader.styled";

export default function Loader({ global = false }: { global?: boolean }) {
  return global ? (
    <styled.GlobalLoaderWrapper>
      <styled.Loader />
    </styled.GlobalLoaderWrapper>
  ) : (
    <styled.Loader />
  );
}
