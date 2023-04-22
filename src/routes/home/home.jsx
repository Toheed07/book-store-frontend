import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useAuth } from "../../context/userContext";

const api_base = "http://localhost:3001";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { currentUser } = useAuth() ?? {};

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async () => {
    try {
      const response = await fetch(api_base + "/books");
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deleteBook = async (id) => {
    const data = await fetch(api_base + "/book/delete/" + id, {
      method: "DELETE",
    }).then((res) => res.json());

    setBooks((books) => books.filter((book) => book._id !== data.result._id));
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <h1 className="text-center my-5">Book List</h1>
      <Form style={{ margin: "20px" }}>
        <Form.Group controlId="search">
          <Form.Control
            type="text"
            placeholder="Search by title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Form.Group>
      </Form>
      <Row>
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book, index) => (
            <Col md={4} key={index}>
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  <h2 className="card-title">{book.title}</h2>
                  <p className="card-text">Author: {book.author}</p>
                  <p className="card-text">Year: {book.year}</p>
                  {currentUser ? (
                    <Button
                      className="btn-danger"
                      onClick={() => deleteBook(book._id)}
                    >
                      Delete
                    </Button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </Col>
          ))
        ) : (
          <h3>No book found</h3>
        )}
      </Row>
    </Container>
  );
};

export default Home;
