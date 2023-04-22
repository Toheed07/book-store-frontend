import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useAuth } from "../../context/userContext";

const api_base = "http://localhost:3001";

const AddBook = () => {
  const [newBook, setNewBook] = useState({ title: "", author: "", year: "" });
  const { currentUser } = useAuth() ?? {};

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      await fetch(api_base + "/book/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newBook.title,
          author: newBook.author,
          year: newBook.year,
        }),
      }).then((res) => res.json());
      setNewBook({ title: "", author: "", year: "" });
      alert("Your Book is added");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {currentUser ? (
        <Container>
          <h1 className="mt-5">Add New Book</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={newBook.title}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                name="author"
                value={newBook.author}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Year</Form.Label>
              <Form.Control
                type="number"
                name="year"
                value={newBook.year}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Button variant="primary" style={{ margin: "10px" }} type="submit">
              Add Book
            </Button>
          </Form>
        </Container>
      ) : (
        <h1>You need to Sign in to add</h1>
      )}
    </>
  );
};

export default AddBook;
