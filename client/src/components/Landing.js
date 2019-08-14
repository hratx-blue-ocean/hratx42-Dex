import React from 'react';
import Register from './Register/Register.js';
import Login from './Login';
import { Container, Row, Col, Image } from 'react-bootstrap';
export default function Landing(props) {
  return (
    <div style={{ backgroundColor: '#C3D1D1' }}>
      <Login login={props.login} />
      <Container>
        <Row>
          <Col>
            <Image
              src='https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/v107-bb-05-cards_1.jpg?auto=format&bg=F4F4F3&con=3&cs=srgb&dpr=1&fm=jpg&ixlib=php-1.1.0&mark=rawpixel-watermark.png&markalpha=90&markpad=13&markscale=10&markx=25&q=75&usm=15&vib=3&w=800&s=da19d499d8e7dff0667b749a3247e71b'
              fluid
            />
          </Col>
          <Col>
            <h1>Dex lets you win at planning projects.</h1>
            <Register login={props.login} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
