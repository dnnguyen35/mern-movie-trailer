import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const users = [
  {
    id: "67bf42333c7f63582862fd2e",
    displayName: "hello",
    username: "hello",
    isAdmin: true,
    createdAt: "2025-02-26",
  },
  {
    id: "67dd26f7c8037f14b66c093c",
    displayName: "hehehe",
    username: "hehehe",
    isAdmin: false,
    createdAt: "2025-03-21",
  },
];

const UsersTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Display Name</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Admin</TableCell>
            <TableCell>Created At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.displayName}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.isAdmin ? "Yes" : "No"}</TableCell>
              <TableCell>{user.createdAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersTable;
