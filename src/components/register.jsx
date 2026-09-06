import { Button, Card, CardBody, Form, FormGroup, Input, Label, CardHeader, FormFeedback, CardFooter } from "reactstrap";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const initialValues = {
    ad: "",
    soyad: "",
    email: "",
    password: ""
}

export const errorMessages = {
    ad: "Ad alanı boş bırakılamaz",
    soyad: "Soyad alanı boş bırakılamaz",
    email: "Email alanı boş bırakılamaz",
    password: "En az 8 karakter uzunluğunda bir şifre giriniz"
}

export default function Register() {
    const [formData, setFormData] = useState(initialValues);
    const [errors, setErrors] = useState({
        ad: false,
        soyad: false,
        email: false,
        password: false
    });
    const [isValid, setIsValid] = useState(false);
    const [id, setId] = useState("");

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    function validatePassword() {
        var newPassword = document.getElementById('changePasswordForm').newPassword.value;
        var minNumberofChars = 8;
        var maxNumberofChars = 16;
        var regularExpression = /^[a-zA-Z0-9!@#$%^&*]{8,16}$/;
        alert(newPassword);
        if (newPassword.length < minNumberofChars || newPassword.length > maxNumberofChars) {
            return false;
        }
        if (!regularExpression.test(newPassword)) {
            alert("password should contain atleast one number and one special character");
            return false;
        }
    }

    useEffect(() => {
        if (formData.ad.trim().length >= 3 &&
            formData.soyad.trim().length >= 3 &&
            validateEmail(formData.email) &&
            validatePassword(formData.password)) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }, [formData])



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
        if (name == "ad" || name == "soyad") {
            if (value.trim().length >= 3) {
                setErrors({ ...errors, [name]: false })
            } else {
                setErrors({ ...errors, [name]: true })
            }
        }

        if (name == "email") {
            if (validateEmail(value)) {
                setErrors({ ...errors, [name]: false })
            } else {
                setErrors({ ...errors, [name]: true })
            }
        }

        if (name == "password") {
            if (validatePassword(value)) {
                setErrors({ ...errors, [name]: false })
            } else {
                setErrors({ ...errors, [name]: true })
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isValid) return;
        axios
            .post("https://reqres.in/api/users", formData)
            .then(response =>{
                setId(response.data.id);
                setFormData(initialValues);
            })
            .catch(error => console.warn(error));
    }

    return (
        <Card>
            <CardHeader>Kayıt Ol</CardHeader>
            <CardBody>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="ad">
                            Ad:
                        </Label>
                        <Input
                            id="ad"
                            name="ad"
                            placeholder="Adınızı giriniz"
                            type="text"
                            onChange={handleChange}
                            value={formData.ad}
                            invalid={errors.ad}
                            data-cy="ad-input"
                        />
                        {errors.ad && <FormFeedback data-cy='error-message'>{errorMessages.ad}</FormFeedback>}
                    </FormGroup>

                    <FormGroup>
                        <Label for="soyad">
                            Soyad:
                        </Label>
                        <Input
                            id="soyad"
                            name="soyad"
                            placeholder="Soyadınızı giriniz"
                            type="text"
                            onChange={handleChange}
                            value={formData.soyad}
                            invalid={errors.soyad}
                            data-cy="soyad-input"
                        />
                        {errors.soyad && <FormFeedback data-cy='error-message'>{errorMessages.soyad}</FormFeedback>}
                    </FormGroup>

                    <FormGroup>
                        <Label for="email">
                            Email:
                        </Label>
                        <Input
                            id="email"
                            name="email"
                            placeholder="Kurumsal e-mail adresinizi giriniz"
                            type="email"
                            onChange={handleChange}
                            value={formData.email}
                            invalid={errors.email}
                            data-cy="email-input"
                        />
                        {errors.email && <FormFeedback data-cy='error-message'>{errorMessages.email}</FormFeedback>}
                    </FormGroup>

                    <FormGroup>
                        <Label for="password">
                            Şifre:
                        </Label>
                        <Input
                            id="password"
                            name="password"
                            placeholder="Şifrenizi giriniz"
                            type="password"
                            onChange={handleChange}
                            value={formData.password}
                            invalid={errors.password}
                            data-cy="password-input"
                        />
                        {errors.password && (<FormFeedback data-cy='error-message'>{errorMessages.password}</FormFeedback>)}
                    </FormGroup>


                    <Button disabled={!isValid} data-cy="submit-button">
                        Kayıt Ol
                    </Button>
                </Form>
            </CardBody>
            {id && <CardFooter data-cy="response-message">
                ID: {id}
            </CardFooter>}
        </Card>
    )
}