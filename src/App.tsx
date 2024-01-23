import React, { useState } from "react";
import Form from "./components/Form";
import DataTable from "./components/Table";
import EditModal from "./components/EditModal";
import "./styles.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface DataItem {
  name: string;
  email: string;
  contact: string;
  isWeekday: boolean;
  gender: string;
  dob: string;
}

const App: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editModalData, setEditModalData] = useState<DataItem | null>(null);

  const handleFormSubmit = (formData: DataItem) => {
    setData((prevData) => [...prevData, formData]);
  };

  const handleEdit = (rowData: DataItem) => {
    setEditModalData(rowData);
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
    setEditModalData(null);
  };

  const handleEditModalSave = (editedData: DataItem) => {
    setData((prevData) =>
      prevData.map((item) => (item === editModalData ? editedData : item))
    );
    setEditModalOpen(false);
    setEditModalData(null);
  };

  const handleDelete = (index: number) => {
    setData((prevData) => prevData.filter((_, i) => i !== index));
  };

  return (
    <div>
      <ToastContainer />
      <Form onSubmit={handleFormSubmit} />
      <DataTable
        columns={[
          { Header: "Name", accessor: "name" },
          { Header: "Email", accessor: "email" },
          { Header: "Contact", accessor: "contact" },
          { Header: "Weekday", accessor: "isWeekday" },
          { Header: "Gender", accessor: "gender" },
          { Header: "DOB", accessor: "dob" },
        ]}
        data={data}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <EditModal
        open={editModalOpen}
        onClose={handleEditModalClose}
        onSave={handleEditModalSave}
        rowData={editModalData}
      />
    </div>
  );
};

export default App;
