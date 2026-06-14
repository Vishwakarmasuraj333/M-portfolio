import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Console | Mamta Yadav Space Portfolio",
  description: "Secure administrative deck for Mamta Yadav's portfolio database, managing message logs and project releases.",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-[#050816] text-gray-100 flex flex-col justify-start">
      {/* Top spacing boundary */}
      <div className="h-16 w-full" />
      {children}
    </div>
  );
}
