import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Button, Card, Col, Row } from "react-bootstrap";

const Grid = ({ tasks, setTasks, setOnEdit }) => {
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (id) => {
    await axios
      .delete("http://localhost:8800/" + id)
      .then(({ data }) => {
        const newArray = tasks.filter((user) => user.id !== id);

        setTasks(newArray);
        toast.success(data);
      })
      .catch(({ data }) => toast.error(data));

    setOnEdit(null);
  };

  return (
    <Row className="mx-5">
      {tasks.map((item, i) => (
        <Col className="container" xs={12} lg={"auto"}>
          <Card
            bg="light"
            className="container "
            text="dark"
            style={{ width: "18rem" }}
          >
            <Card.Header>{item.titulo}</Card.Header>
            <Card.Body>
              <Card.Text>{item.descricao}</Card.Text>
              <Card.Title>{item.data}</Card.Title>
              <Card.Title>Duração {item.duracao} Minutos</Card.Title>
              <div className="text-center ">
                <Button
                  className="mx-3"
                  variant="outline-dark"
                  onClick={() => handleEdit(item)}
                >
                  Editar
                </Button>
                <Button
                  className="mx-3 my-2"
                  variant="outline-danger"
                  onClick={() => handleDelete(item.id)}
                >
                  Excluir
                </Button>
              </div>
            </Card.Body>
          </Card>
          <br />
        </Col>
      ))}
    </Row>
  );
};

export default Grid;
