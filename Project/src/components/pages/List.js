import React, { useState } from "react";
import Layout from "../Layout/Layout";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import {
  Box,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableBody,
  Table,
} from "@mui/material";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import { deleteFromLocalStorage, deleteShortUrl } from "../../lib/library";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function List() {
  const [reload, setReload] = useState(false);
  const rows = localStorage.getItem("mobin_short_url")
    ? JSON.parse(localStorage.getItem("mobin_short_url"))
    : [];

  const handeleDelete = (evt) => {
    const hash = evt.target.dataset.hash
      ? evt.target.dataset.hash
      : evt.target.parentElement.dataset.hash;
    deleteFromLocalStorage(hash);
    deleteShortUrl(hash);
    setReload(!reload);
  };

  return (
    <>
      <Layout>
        <Box sx={{ maxWidth: "80vw", margin: "20px auto ", minHeight: "80vh" }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Id</StyledTableCell>
                  <StyledTableCell align="center">Short URL</StyledTableCell>
                  <StyledTableCell align="right">Delete</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.length &&
                  rows.map((row, idx) => (
                    <StyledTableRow key={row.hash}>
                      <StyledTableCell component="th">
                        {idx + 1}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <a href={row.long_url}>{row.short_url}</a>
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <RestoreFromTrashIcon
                          onClick={handeleDelete}
                          data-hash={row.hash}
                          sx={{ color: "#000", cursor: "pointer" }}
                        />
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Layout>
    </>
  );
}
