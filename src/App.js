import Formulario from "./components/Form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import "./App.scss";
import Grid from "./components/Grid";
import axios from "axios";
import { Container } from "react-bootstrap";

function App() {
  const [tasks, setTasks] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getTasks = async () => {
    try {
      const res = await axios.get("http://localhost:8800");
      setTasks(res.data.sort((a, b) => (a.titulo > b.titulo ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getTasks();
  }, [setTasks]);

  return (
    <div className="app">
      <Container>
        <Formulario onEdit={onEdit} setOnEdit={setOnEdit} getTasks={getTasks} />
        <Grid
          tasks={tasks}
          setOnEdit={setOnEdit}
          task={tasks}
          setTasks={setTasks}
        />
        <ToastContainer
          autoClose={3000}
          position={toast.POSITION.BOTTOM_LEFT}
        />
      </Container>
    </div>
  );
}

export default App;
