import React from 'react';
import Register from './Register/Register.js';
import Login from './Login';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
export default function Landing(props) {
  return (
    <div>
      <Login />
      <Container>
        <Row>
          <Col>
            <Card style={{ height: '10rem' }}>
              <Card.Title>
                <h1>Dex lets you win at planning projects.</h1>
              </Card.Title>
            </Card>
            <Image
              src='https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/v107-bb-05-cards_1.jpg?auto=format&bg=F4F4F3&con=3&cs=srgb&dpr=1&fm=jpg&ixlib=php-1.1.0&mark=rawpixel-watermark.png&markalpha=90&markpad=13&markscale=10&markx=25&q=75&usm=15&vib=3&w=800&s=da19d499d8e7dff0667b749a3247e71b'
              fluid
            />
          </Col>
          <Col>
            <Register />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
