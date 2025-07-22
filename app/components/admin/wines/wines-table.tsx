"use client";

import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_Row,
} from "material-react-table";
import { Wine } from "@/app/lib/types/wines";
import NextLink from "next/link";
import {
  Box,
  Button,
  Card,
  Chip,
  Link,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import { handleDeleteWine } from "@/app/lib/admin/wines/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function WinesTable({ data }: { data: Wine[] }) {
  const router = useRouter();

  const columns = useMemo<MRT_ColumnDef<Wine>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
      },
      {
        accessorKey: "created_at",
        header: "Created At",
        Cell: ({ cell }) => (
          <Typography>
            {new Date(cell.getValue() as string).toLocaleDateString()}
          </Typography>
        ),
      },
      {
        accessorKey: "name",
        header: "Name",
        Cell: ({ renderedCellValue, row }) => (
          <Link component={NextLink} href={`/admin/${row.getValue("id")}`}>
            {renderedCellValue}
          </Link>
        ),
      },
      {
        accessorKey: "vintage",
        header: "Vintage",
      },
      {
        accessorKey: "producer",
        header: "Producer",
      },
      {
        accessorKey: "type",
        header: "Type",
        Cell: ({ cell }) => (
            <Box>
              {JSON.parse(cell.getValue() as string).map((type: string) => (
                <Chip label={type} />
              ))}
            </Box>
          ),
      },
      {
        accessorKey: "varietals",
        header: "Varietals",
        Cell: ({ cell }) => (
          <Box>
            {JSON.parse(cell.getValue() as string).map((varietal: string) => (
              <Chip label={varietal} />
            ))}
          </Box>
        ),
      },
      {
        accessorKey: "country",
        header: "Country",
      },
      {
        accessorKey: "region",
        header: "Region",
      },
      {
        accessorKey: "subregion",
        header: "Subregion",
      },
      {
        accessorKey: "appellation",
        header: "Appellation",
      },
      {
        accessorKey: "vineyard",
        header: "Vineyard",
      },
      {
        accessorKey: "designation",
        header: "Designation",
      },
      {
        accessorKey: "distributor",
        header: "Distributor",
      },
      {
        accessorKey: "wholesale_cost",
        header: "Wholesale Cost",
        Cell: ({ cell }) => (
          <Typography>
            {cell.getValue()
              ? `$${parseFloat(cell.getValue() as string).toFixed(2)}`
              : ""}
          </Typography>
        ),
      },
      {
        accessorKey: "retail_cost",
        header: "Retail Cost",
        Cell: ({ cell }) => (
          <Typography>
            {cell.getValue()
              ? `$${parseFloat(cell.getValue() as string).toFixed(2)}`
              : ""}
          </Typography>
        ),
      },
      {
        accessorFn: (row) => {
          const wholesaleCost = row.wholesale_cost;
          const retailCost = row.retail_cost;
          if (wholesaleCost && retailCost) {
            const wholesale = parseFloat(wholesaleCost);
            const retail = parseFloat(retailCost);
            return `$${(retail - wholesale).toFixed(2)}`;
          }
          return "";
        },
        header: "Profit",
      },
      {
        accessorKey: "inventory_status",
        header: "Status",
      },
      {
        accessorKey: "tags",
        header: "Tags",
        Cell: ({ cell }) => (
          <Box>
            {JSON.parse(cell.getValue() as string).map((tag: string) => (
              <Chip label={tag} />
            ))}
          </Box>
        ),
      },
      {
        accessorKey: "notes",
        header: "Notes",
        Cell: ({ cell }) => (
          <Typography>
            {(cell.getValue() as string).slice(0, 25)}
            {(cell.getValue() as string).length > 30 && <>...</>}
          </Typography>
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableRowSelection: true,
    initialState: {
      columnVisibility: { id: false },
      sorting: [{ id: "created_at", desc: true }],
    },
    enableFacetedValues: true,
    enableStickyHeader: true,
    enableStickyFooter: true,
    globalFilterFn: "contains",
    enableColumnOrdering: true,
  });

  const handleDelete = () => {
    setIsLoading(true);

    table.getSelectedRowModel().flatRows.map(async (row) => {
      table.setRowSelection({});

      await handleDeleteWine(row.getValue("id"));
    });

    setIsLoading(false);
    setModalOpen(false);
  };

  const handleNew = () => {
    router.push("/admin/new");
  };

  const handleEdit = () => {
    const id = table.getSelectedRowModel().flatRows[0].getValue("id");

    router.push(`/admin/edit/${id}`);
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Box>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card sx={{ height: "fit", width: "30%", p: 2 }}>
            <Typography variant={"h6"}>
              Are you sure you want to delete this wine?
            </Typography>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Button
                onClick={handleDelete}
                variant={"contained"}
                color={"error"}
                sx={{ width: "33%" }}
                loading={isLoading}
              >
                Delete wine
              </Button>
              <Button
                onClick={() => setModalOpen(false)}
                variant={"contained"}
                color={"inherit"}
                sx={{ width: "66%" }}
              >
                Nevermind :)
              </Button>
            </Box>
          </Card>
        </Box>
      </Modal>

      <Stack
        direction={"row"}
        sx={{
          display: "flex",
          justifyContent: "right",
          mb: 1,
        }}
        spacing={1}
      >
        <Button
          color="secondary"
          disabled={!(table.getSelectedRowModel().flatRows.length == 1)}
          variant="contained"
          onClick={handleEdit}
        >
          Edit
        </Button>
        <Button
          color="error"
          disabled={!table.getIsSomeRowsSelected()}
          onClick={() => setModalOpen(true)}
          variant="contained"
        >
          Delete
        </Button>
        <Button color="primary" variant="contained" onClick={handleNew}>
          New
        </Button>
      </Stack>

      <MaterialReactTable table={table} />
    </Box>
  );
}
