import Image from "next/image";
import { Inter } from "@next/font/google";
// import styles from "./page.module.css";
import wretch from "wretch";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { GetServerSidePropsContext } from "next";
import styles from "../app/page.module.css";
import { createStyles } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() =>
  createStyles({
    table: {
      minWidth: 650,
    },
  })
);

const inter = Inter({ subsets: ["latin"] });
function Home({ games }) {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Team 1</TableCell>
            <TableCell align="right">Score</TableCell>
            <TableCell align="right">Team 2</TableCell>
            <TableCell align="right">Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {games.map((game) => (
            <TableRow key={game.id}>
              <TableCell component="th" scope="row">
                {game.name}
              </TableCell>
              <TableCell align="right">0 - 0</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const protocol = process.env.VERCEL_URL ? "https" : "http";
    const baseUrl = context.req
      ? `${protocol}://${context.req.headers.host}`
      : "";
    const response = await wretch(`${baseUrl}/api/scores`).get().json();
    console.log("response...", { response });
    return { props: { games: response } };
  } catch (e) {
    console.error({ e });
  }
}

export default Home;
