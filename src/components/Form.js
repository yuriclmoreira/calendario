import axios from "axios";
import React, { useEffect, useRef } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import "./Form.scss";

const Formulario = ({ getTasks, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const task = ref.current;

      task.titulo.value = onEdit.titulo;
      task.descricao.value = onEdit.descricao;
      task.data.value = onEdit.data;
      task.duracao.value = onEdit.duracao;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const task = ref.current;

    if (
      !task.titulo.value ||
      !task.descricao.value ||
      !task.data.value ||
      !task.duracao.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
        .put("http://localhost:8800/" + onEdit.id, {
          titulo: task.titulo.value,
          descricao: task.descricao.value,
          data: task.data.value,
          duracao: task.duracao.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800", {
          titulo: task.titulo.value,
          descricao: task.descricao.value,
          data: task.data.value,
          duracao: task.duracao.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    task.titulo.value = "";
    task.descricao.value = "";
    task.data.value = "";
    task.duracao.value = "";

    setOnEdit(null);
    getTasks();
  };

  return (
    <div className="container">
      <h1 className="d-flex justify-content-center pt-5 color-label">
        <strong>Tarefas</strong>
      </h1>
      <Form ref={ref} onSubmit={handleSubmit}>
        <Form.Group className=" mx-3 pt-5" controlId="titulo">
          <Form.Label className="color-label">
            <strong>Título</strong>
          </Form.Label>
          <Form.Control name="titulo" type="text" />
        </Form.Group>

        <Form.Group className="m-3" controlId="descricao">
          <Form.Label className="color-label">
            <strong>Descrição</strong>
          </Form.Label>
          <Form.Control name="descricao" as="textarea" rows={3} />
        </Form.Group>

        <Row>
          <Col>
            <Form.Group className="m-3" controlId="data">
              <Form.Label className="color-label">
                <strong>Data</strong>
              </Form.Label>
              <Form.Control name="data" placeholder="DD-MM-YYYY" type="text" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="m-3" controlId="tempo">
              <Form.Label>
                <strong className="color-label">Duração</strong>
              </Form.Label>
              <Form.Control
                name="duracao"
                placeholder="Em minutos"
                type="text"
              />
            </Form.Group>
          </Col>
        </Row>
        <div className="d-flex justify-content-center ">
          <Button
            className="m-5"
            variant="outline-light"
            size="lg"
            type="submit"
          >
            Salvar
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Formulario;
