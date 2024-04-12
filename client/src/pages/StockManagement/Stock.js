import { Box, Button, Grid, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography, useTheme } from "@mui/material";
import Axios from "axios";
import { useEffect, useState } from "react";
import { errorAlert, successAlert } from "../../utils";
import { CREATE_STOCK, DELETE_STOCK, GET_ALL_STOCK, GET_STOCK, GET_STOCK_ID, UPDATE_STOCK } from "../../EndPoints";


const StockPage = () => {
  const [stockDetails, setStockDetails] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [selectedStock, setSelectedStock] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  const theme = useTheme();

  useEffect(() => {
    getStockDetails();
  }, []);

  const getStockDetails = () => {
    Axios.get(GET_ALL_STOCK)
      .then(response => {
        console.log(response);
        setStockDetails(response.data ? response.data : []);
      })
      .catch(error => {
        errorAlert("Axios Error :", error);
      });
  }

  const addStock = (data) => {
    setSubmitted(true);
    const payload = {
      equipmentId: data.equipmentId,
      equipmentName: data.equipmentName,
      value: data.value,
      description: data.description,
      qty: data.qty,
    }

    Axios.post(CREATE_STOCK, payload)
      .then((response) => {
        console.log(response);
        getStockDetails();
        setSubmitted(false);
        setIsEdit(false);
        successAlert("Details Added Succesfully");
      })
      .catch(error => {
        errorAlert("Axios Error :", error);
      });
  }

  const updateStock = (data) => {
    setSubmitted(true);
    const payload = {
      equipmentId: data.equipmentId,
      equipmentName: data.equipmentName,
      value: data.value,
      description: data.description,
      qty: data.qty,
    }
    Axios.put(UPDATE_STOCK, payload)
      .then((response) => {
        console.log(response);
        getStockDetails();
        setSubmitted(false);
        setIsEdit(false);
        successAlert("Details Updated Succesfully");
      })
      .catch(error => {
        errorAlert("Axios Error :", error);
      });
  }

  const deleteStock = (data) => {
    Axios.delete(DELETE_STOCK + data.equipmentId)
      .then((response) => {
        console.log(response);
        getStockDetails();
        successAlert("Data Deleted Succesfully");
      })
      .catch(error => {
        errorAlert("Axios Error :", error);
      });
  }

  const handleUpdate = (content) => {
    setSelectedStock(content.row);
    setIsEdit(true);
  }

  return (
    <Box>
      <StockForm
        addStock={addStock}
        updateStock={updateStock}
        submitted={submitted}
        data={selectedStock}
        isEdit={isEdit}
      />
      <StockTable
        rows={stockDetails}
        selectedRow={handleUpdate}
        deleteStock={data => {
          deleteStock(data);
        }}
      />
    </Box>
  );
}

export default StockPage;


const StockForm = ({ addStock, updateStock, submitted, data, isEdit }) => {

  const theme = useTheme();
  const [equipmentId, setEquipmentId] = useState(0);
  const [equipmentName, setEquipmentName] = useState(0);
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const [qty, setQty] = useState('');

  const loadStockId = async () => {
    Axios
      .get(GET_STOCK_ID, {})
      .then((response) => {
        setEquipmentId(response.data)
      })
      .catch((error) => {
        console.log(error);
        errorAlert(error.response.data.message);
      });
  };

  useEffect(() => {
    if (!submitted) {
      loadStockId();
      setEquipmentName('');
      setValue('');
      setDescription('');
      setQty(0);

    }
  }, [submitted]);

  useEffect(() => {
    console.log(data)
    if (data?.equipmentId) {
      setEquipmentId(data.equipmentId);
      setEquipmentName(data.name);
      setValue(data.value);
      setDescription(data.description);
      setQty(data.qty);

    }
  }, [data]);

  return (
    <Grid container spacing={2} sx={theme.palette.gridBody}>
      <Grid item md={12}>
        <Typography variant="h5" gutterBottom>Add Stock</Typography>
      </Grid>

      <Grid item md={6}>
        <TextField
          required
          fullWidth
          id='equipmentId'
          label="Equpment Id"
          name="equipmentId"
          autoComplete="equipmentId"
          value={equipmentId}
          onChange={e => setEquipmentId(e.target.value)}
          disabled
        />
      </Grid>

      <Grid item md={6}>
        <TextField
          required
          fullWidth
          id='equipmentName'
          label="Equipment Name"
          name="equipmentName"
          autoComplete="equipmentName"
          value={equipmentName}
          autoFocus
          onChange={e => setEquipmentName(e.target.value)}
        />
      </Grid>

      <Grid item md={6}>
        <TextField
          margin="normal"
          required
          fullWidth
          id='value'
          label="Unit Price"
          name="value"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      </Grid>

      <Grid item md={6}>
        <TextField
          margin="normal"
          required
          fullWidth
          id='description'
          label="Description"
          name="description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </Grid>


      <Grid item md={6}>
        <TextField
          type="number"
          margin="normal"
          required
          fullWidth
          id='qty'
          label="Qty"
          name="qty"
          value={qty}
          onChange={e => setQty(e.target.value)}
        />
      </Grid>
      <Grid item md={7}>
        <Button
          variant="contained" sx={{ mt: 3, width: "50%" }}
          onClick={() => isEdit ? updateStock({ equipmentId, equipmentName, value, description, qty }) : addStock({ equipmentId, equipmentName, value, description, qty })}
        >
          {isEdit ? 'Update' : 'Add'}
        </Button>
      </Grid>

    </Grid>
  );
}

const StockTable = ({ rows, selectedRow, deleteStock }) => {

  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.text.default,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(() => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.primary.mainOpacity,
    },
    '&:nth-of-type(even)': {
      backgroundColor: theme.palette.primary.mainOpacity2,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const handleUpdate = (content) => {
    selectedRow(content);
  };

  return (
    <Box sx={theme.palette.gridBody}>
      <TableContainer component={Paper} sx={{ backgroundColor: theme.palette.primary.main }}>
        <Table>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Equipment Id</StyledTableCell>
              <StyledTableCell>Equipment Name</StyledTableCell>
              <StyledTableCell>Unit Price</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell>Qty</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {
              rows.length > 0 ? rows.map(row => (
                <StyledTableRow key={row.equipmentId}>
                  <StyledTableCell>{row.equipmentId}</StyledTableCell>
                  <StyledTableCell>{row.name}</StyledTableCell>
                  <StyledTableCell>{row.value}</StyledTableCell>
                  <StyledTableCell>{row.description}</StyledTableCell>
                  <StyledTableCell>{row.qty}</StyledTableCell>

                  <StyledTableCell>
                    <Button sx={{ margin: '0px 10px' }}
                      onClick={() => handleUpdate({ row })}
                    >
                      Upadate

                    </Button>
                    <Button sx={{ margin: '0px 10px' }}
                      onClick={() => deleteStock({ equipmentId: row.equipmentId })}
                    >
                      Delete

                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              )) : (
                <StyledTableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <StyledTableCell>No Data</StyledTableCell>
                </StyledTableRow>
              )
            }
          </TableBody>

        </Table>
        <TablePagination
          sx={{ backgroundColor: theme.palette.primary.main, }}
          rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
}