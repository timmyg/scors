import React, { useState } from "react";
import { createStyles, makeStyles } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import wretch from "wretch";
// import { createServerContext } from 'react';

// const useStyles = makeStyles(() =>
//   createStyles({
//     table: {
//       minWidth: 650,
//     },
//   })
// );

interface Score {
  id: number;
  name: string;
  score: number;
}

interface Props {
  scores: Score[];
}

const ScoresPage = ({ scores }: Props) => {
  console.log({ scores });
  return <p>hello!</p>;
  // const classes = useStyles();

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
          {scores.map((score) => (
            <TableRow key={score.id}>
              <TableCell component="th" scope="row">
                {score.name}
              </TableCell>
              <TableCell align="right">{score.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

ScoresPage.getInitialProps = async ({ req }) => {
  // const baseUrl = req ? `${req.protocol}://${req.get("Host")}` : "";
  console.log("..................", req.headers.host);
  const response = await wretch(`/api/scores`).get().json();
  return { scores: response };
};

export default ScoresPage;
