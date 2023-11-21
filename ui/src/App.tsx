import React, { useState, useEffect } from "react";
import { Divider } from "antd";
import ListDuties from "./components/List";
import CreateDuty from "./components/Create";
import { listAll, Duty } from "./api/duty";

const App: React.FC = () => {
  const [duties, setDuties] = useState<Duty[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await listAll();
      console.log(res);
      setDuties(res);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  return (
    <>
      <Divider orientation="left">To Do List</Divider>
      <ListDuties dataSource={duties} loading={loading} refresh={fetchData} />
      <Divider />
      <CreateDuty refresh={fetchData} />
    </>
  );
};

export default App;
