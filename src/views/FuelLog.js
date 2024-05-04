/*!

=========================================================
* Black Dashboard React v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect, useState } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";

import axios from "axios";

function FuelLog() {
  const [cars, setCars] = React.useState([]);
  const [selectedCar, setSelectedCar] = React.useState("");
  const [distance_travelled, setDistanceTravelled] = React.useState(0);
  const [mileage_adjustment, setMileageAdjustment] = React.useState(0);

  const [liters, setLiters] = React.useState(0);
  const [pricePerLiter, setPricePerLiter] = React.useState(0);

  const [error, setError] = React.useState(null);

  const onChangeSelectedCar = (carId) => {
    const selectedCarTmp = cars.find((car) => car._id === carId);

    console.log(selectedCarTmp, "  8888 XX");

    setSelectedCar(selectedCarTmp);
  };

  useEffect(() => {
    axios
      .get(
        "http://127.0.0.1:8080/api/cars/getCars/owner/65e0d5a3c4ce269aa6e1367d"
      )
      .then((response) => {
        setCars(response.data);
      });
  }, []);

  console.log(cars, " 9888");

  const handleSubmit = (event) => {
    console.log("  666666666666666");
    event.preventDefault();

    console.log(event.target, "  666666666666666");

    // Get form data
    const formData = new FormData(event.target);

    console.log(formData, "  666666666666666");

    // Convert form data to JSON
    const jsonData = Object.fromEntries(formData.entries());

    console.log(jsonData, "  xxx , 666666666666666");

    // Make POST request to backend
    axios
      .post("http://127.0.0.1:8080/api/fuelLog/addFuelLog", jsonData)
      .then((response) => {
        // Handle response
        console.log(response.data);
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col md="8">
            <Card>
              <Form onSubmit={handleSubmit}>
                <CardHeader>
                  <h5 className="title">Add a Fuel Charge</h5>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col className="pr-md-1" md="3">
                      <FormGroup>
                        <label>Date</label>
                        <Input
                          name="date"
                          placeholder="Select date"
                          type="date"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="5">
                      <FormGroup>
                        <label for="car">Example select</label>
                        <select
                          name="car"
                          class="form-control"
                          onInput={(e) => onChangeSelectedCar(e.target.value)}
                          id="car"
                        >
                          <option disabled selected hidden value="">
                            Select a car
                          </option>
                          {cars.map((car) => (
                            <option
                              value={car._id}
                            >{`${car.registrationNumber} ${car.make}  ${car.model}  ${car.year} `}</option>
                          ))}
                        </select>
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-4 pt-md-2 " md="4">
                      <FormGroup>
                        <label htmlFor="milage">Last Mileage (KM)</label>
                        {/* <Input name="milage" /> */}

                        <p>{selectedCar.mileage} KM</p>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="2">
                      <FormGroup>
                        <label>Liters</label>
                        <Input
                          name="liters"
                          onChange={(e) => setLiters(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="2">
                      <FormGroup>
                        <label>PKR / Liter </label>
                        <Input
                          className=""
                          name="cost_per_liter"
                          type="number"
                          step="0.01"
                          onChange={(e) => setPricePerLiter(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="2">
                      <FormGroup>
                        <label>Cost PKR</label>
                        <Input
                          name="cost"
                          style={{ pointerEvents: "none" }}
                          value={(liters * pricePerLiter).toFixed(2)}
                          type="number"
                          step="0.01"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="3">
                      <FormGroup>
                        <label>Mileage (KM)</label>
                        <Input
                          name="millage"
                          onChange={(e) =>
                            setDistanceTravelled(parseInt(e.target.value))
                          }
                          type="integer"
                        />
                      </FormGroup>
                    </Col>
                    {/* <Col md="3">
                      <FormGroup>
                        <label>Add Mileage Adjustment (KM)</label>
                        <Input
                          name="mileage_adjustment"
                          type="integer"
                          onChange={(e) =>
                            setMileageAdjustment(parseInt(e.target.value))
                          }
                        />
                      </FormGroup>
                    </Col> */}
                    {/* <Col md="3">
                      <FormGroup>
                        <label>New Mileage (KM)</label>
                        <Input
                          style={{ pointerEvents: "none" }}
                          name="distance_travelled"
                          // onChange={(e) => setDistanceTravelled(e.target.value)}
                          value={distance_travelled + mileage_adjustment}
                          type="integer"
                        />
                      </FormGroup>
                    </Col> */}
                  </Row>
                </CardBody>
                <CardFooter>
                  <Button className="btn-fill" color="primary" type="submit">
                    Save
                  </Button>
                </CardFooter>
              </Form>
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user">
              <CardBody>
                <CardText />
                {/* s */}
              </CardBody>
              {/* <CardFooter>
                <div className="button-container">
                  <Button className="btn-icon btn-round" color="facebook">
                    <i className="fab fa-facebook" />
                  </Button>
                  <Button className="btn-icon btn-round" color="twitter">
                    <i className="fab fa-twitter" />
                  </Button>
                  <Button className="btn-icon btn-round" color="google">
                    <i className="fab fa-google-plus" />
                  </Button>
                </div>
              </CardFooter> */}
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default FuelLog;
