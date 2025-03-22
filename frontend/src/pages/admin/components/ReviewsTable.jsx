import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const reviews = [
  {
    id: "67c9872a1a112ffa8f3aaf62",
    user: "hello",
    content: "first review",
    mediaTitle: "Mufasa: The Lion King",
    createdAt: "2025-03-06",
  },
  {
    id: "67daa06fc525d17ff1b95ca5",
    user: "hello",
    content: "mau dua het tien day",
    mediaTitle: "Mufasa: Vua Sư Tử",
    createdAt: "2025-03-19",
  },
];

const ReviewsTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell>Content</TableCell>
            <TableCell>Movie Title</TableCell>
            <TableCell>Created At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reviews.map((review) => (
            <TableRow key={review.id}>
              <TableCell>{review.user}</TableCell>
              <TableCell>{review.content}</TableCell>
              <TableCell>{review.mediaTitle}</TableCell>
              <TableCell>{review.createdAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ReviewsTable;
