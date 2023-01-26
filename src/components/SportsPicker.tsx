import Link from "next/link";

interface Link {
  label: string;
  href: string;
  disabled?: boolean;
}

const links: Link[] = [
  { label: "nba", href: "/nba" },
  { label: "ncaab", href: "/ncaab" },
  { label: "nfl", href: "/nfl" },
  { label: "nhl", href: "/nhl" },
  //   { label: "nhl", href: "#nhl", disabled: true },
  //   { label: "soccer", href: "#soccer", disabled: true },
  //   { label: "mlb", href: "#mlb", disabled: true },
];

export const SportsPicker = () => {
  return (
    <div className="overflow-x-scroll h-3xl p-4">
      <div className="flex">
        {links.map((link) => (
          <Link
            href={link.href}
            passHref={true}
            className="text-3xl mr-4"
            // disabled={link.disabled || false}
            key={link.href}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
};
