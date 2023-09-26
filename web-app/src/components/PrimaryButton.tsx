import { ReactNode } from "react";

export default function PrimaryButton({ children }: { children: ReactNode }) {
  return <button className="button button-primary">{children}</button>;
}
