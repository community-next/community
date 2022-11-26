import { Container } from "@community-next/design-system";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container maxWidth="xs" className="h-screen">
      {children}
    </Container>
  );
}
