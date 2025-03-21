import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const columns = ["Title", "Artist", "Release Date", "Actions"];

const rows = [
  { id: 1, title: "2 Giờ Sáng", artist: "BIGDADDY", releaseDate: "2025-01-16" },
  { id: 2, title: "BẠN ĐỜI", artist: "KARIK", releaseDate: "2025-01-16" },
  {
    id: 3,
    title: "SAI TƯ THẾ",
    artist: "Andree Right Hand",
    releaseDate: "2025-01-16",
  },
  { id: 4, title: "Trốn Tìm", artist: "Đen Vâu", releaseDate: "2025-01-16" },
  { id: 5, title: "Có Em", artist: "madiu", releaseDate: "2025-01-16" },
  { id: 6, title: "Bình Yên", artist: "Vu", releaseDate: "2025-01-16" },
  {
    id: 7,
    title: "Lời Yêu",
    artist: "buitruonglinh",
    releaseDate: "2025-01-16",
  },
  { id: 8, title: "Trở Về", artist: "Wrxdie", releaseDate: "2025-01-16" },
];

const AdminPage = () => (
  <Box sx={{ padding: 4 }}>
    {/* Header */}
    <Typography
      variant="h4"
      gutterBottom
      sx={{ color: "white", fontWeight: "bold" }}
    >
      Music Manager
    </Typography>

    {/* Card chứa Table */}
    <Card
      sx={{
        backgroundColor: "#121212",
        color: "white",
        borderRadius: "12px",
        boxShadow: 3,
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
          🎵 Songs Library
        </Typography>
        <Typography variant="body2" sx={{ color: "#aaa", marginBottom: 2 }}>
          Manage your music tracks
        </Typography>

        {/* Bảng bài hát */}
        <TableContainer
          component={Paper}
          sx={{ backgroundColor: "#1e1e1e", borderRadius: "10px" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((col, index) => (
                  <TableCell
                    key={index}
                    sx={{
                      fontWeight: "bold",
                      color: "#fff",
                      backgroundColor: "#333",
                    }}
                  >
                    {col}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(({ id, title, artist, releaseDate }) => (
                <TableRow
                  key={id}
                  sx={{ "&:hover": { backgroundColor: "#2a2a2a" } }}
                >
                  <TableCell sx={{ color: "#ddd" }}>{title}</TableCell>
                  <TableCell sx={{ color: "#ddd" }}>{artist}</TableCell>
                  <TableCell sx={{ color: "#ddd" }}>{releaseDate}</TableCell>
                  <TableCell>
                    {/* Nút Edit */}
                    <IconButton color="primary">
                      <Edit />
                    </IconButton>
                    {/* Nút Delete */}
                    <IconButton color="error">
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  </Box>
);

export default AdminPage;
