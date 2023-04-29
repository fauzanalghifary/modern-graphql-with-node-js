import React, { useState, useEffect } from "react";

import { Form } from "react-bootstrap";
import Button from "@restart/ui/esm/Button";
import { useMutation, gql } from "@apollo/client";

const SIGNIN = gql`
  mutation signin($email: String!, $password: String!) {
    signin(credentials: { email: $email, password: $password }) {
      token
      userErrors {
        message
      }
    }
  }
`;

export default function Signin() {
  const [signin, { data, loading }] = useMutation(SIGNIN);

  useEffect(() => {
    if (data) {
      if (data.signin.userErrors.length > 0) {
        setError(data.signin.userErrors[0].message);
      } else {
        localStorage.setItem("token", data.signin.token);
        window.location.href = "/";
      }
    }
  }, [data]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = () => {
    signin({
      variables: {
        email,
        password,
      },
    });
  };

  const [error, setError] = useState(null);

  return (
    <div>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        {error && <p>{error}</p>}
        <Button onClick={handleClick}>Signin</Button>
      </Form>
    </div>
  );
}
