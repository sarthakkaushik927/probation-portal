import Link from "next/link";

interface SidebarLinkProps {
  href: string;
  title: string;
}

export default function SidebarLink({
  href,
  title,
}: SidebarLinkProps) {
  return (
    <Link
      href={href}
      className="block rounded-xl p-3 hover:bg-muted"
    >
      {title}
    </Link>
  );
}