import Link from "next/link";
import { useRouter } from "next/router";
// import styles from "../pages/index.module.css";

interface Link {
  label: string;
  href: string;
  disabled?: boolean;
}

const links: Link[] = [
  { label: "ncaab", href: "/ncaab" },
  { label: "nfl", href: "/nfl" },
  { label: "nba", href: "/nba" },
  { label: "nhl", href: "/nhl" },
  { label: "soccer", href: "/soccer" },
  // { label: "mlb", href: "/mlb" },
];

export const SportsPicker = () => {
  const router = useRouter();
  console.log(router.asPath);
  return (
    <div style={{ overflowX: "scroll", padding: "4px" }}>
      <div
        style={{
          display: "flex",
          fontSize: "24px",
          marginLeft: "16px",
          marginRight: "16px",
        }}
      >
        {links.map((link) => (
          <Link
            href={link.href}
            passHref={true}
            style={{
              fontSize: "3xl",
              marginRight: "16px",
              // color:
              // router.asPath == "/" + link.label
              //   ? styles.active
              //   : styles.inactive,
            }}
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
