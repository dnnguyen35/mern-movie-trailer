import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const favorites = [
  {
    id: "67d16f8befc06692a043df28",
    user: "hello",
    mediaTitle: "The Gorge",
    mediaRate: 7.8,
    createdAt: "2025-03-12",
  },
  {
    id: "67dd095a4e0fabb05debb005",
    user: "hello",
    mediaTitle: "Sonic the Hedgehog 3",
    mediaRate: 7.753,
    createdAt: "2025-03-21",
  },
];

const FavoritesTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell>Movie Title</TableCell>
            <TableCell>Rating</TableCell>
            <TableCell>Created At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {favorites.map((fav) => (
            <TableRow key={fav.id}>
              <TableCell>{fav.user}</TableCell>
              <TableCell>{fav.mediaTitle}</TableCell>
              <TableCell>{fav.mediaRate}</TableCell>
              <TableCell>{fav.createdAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FavoritesTable;
