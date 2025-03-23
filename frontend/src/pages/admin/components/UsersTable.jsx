import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { Lock, LockOpen } from "@mui/icons-material";
import adminApi from "../../../api/modules/admin.api";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const UsersTable = () => {
  const [listUsers, setListUsers] = useState([]);

  useEffect(() => {
    const getUsersStats = async () => {
      const { response, error } = await adminApi.getUsersStats();

      if (response) setListUsers(response);
      if (error) toast.error(error.message);
    };

    getUsersStats();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: "primary.main", fontWeight: "bold" }}>
              Display Name
            </TableCell>
            <TableCell sx={{ color: "primary.main", fontWeight: "bold" }}>
              Username
            </TableCell>
            <TableCell sx={{ color: "primary.main", fontWeight: "bold" }}>
              Created At
            </TableCell>
            <TableCell sx={{ color: "primary.main", fontWeight: "bold" }}>
              Total Reviews
            </TableCell>
            <TableCell sx={{ color: "primary.main", fontWeight: "bold" }}>
              Total Favorites
            </TableCell>
            <TableCell sx={{ color: "primary.main", fontWeight: "bold" }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.displayName}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>
                {new Date(user.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>{user.totalReviews}</TableCell>
              <TableCell>{user.totalFavorites}</TableCell>
              <TableCell>
                <IconButton
                  onClick={() =>
                    console.log(`Toggle lock for ${user.username}`)
                  }
                  color={user.isActive ? "success" : "error"}
                >
                  {user.isActive ? <LockOpen /> : <Lock />}
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersTable;
