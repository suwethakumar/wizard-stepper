// src/components/WizardStepper.jsx
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Wiz.css';

const steps = [
  {
    id: 'step1',
    title: 'Personal Information',
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
    }),
    initialValues: { name: '', email: '' },
    component: ({ values, handleChange, handleBlur }) => (
      <>
        <label htmlFor="name">Name:</label>
        <Field type="text" id="name" name="name" />
        <ErrorMessage name="name" component="div" className="error" />
        <label htmlFor="email">Email:</label>
        <Field type="email" id="email" name="email" />
        <ErrorMessage name="email" component="div" className="error" />
      </>
    ),
  },
  {
    id: 'step2',
    title: 'Address Details',
    validationSchema: Yup.object({
      address: Yup.string().required('Address is required'),
      city: Yup.string().required('City is required'),
    }),
    initialValues: { address: '', city: '' },
    component: ({ values, handleChange, handleBlur }) => (
      <>
        <label htmlFor="address">Address:</label>
        <Field type="text" id="address" name="address" />
        <ErrorMessage name="address" component="div" className="error" />
        <label htmlFor="city">City:</label>
        <Field type="text" id="city" name="city" />
        <ErrorMessage name="city" component="div" className="error" />
      </>
    ),
  },
  {
    id: 'step3',
    title: 'Confirmation',
    validationSchema: Yup.object({}),
    initialValues: {},
    component: ({ values }) => (
      <div>
        <h3>Confirm your details:</h3>
        <p>Name: {values.name}</p>
        <p>Email: {values.email}</p>
        <p>Address: {values.address}</p>
        <p>City: {values.city}</p>
      </div>
    ),
  },
];

const WizardStepper = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = (values, { setTouched }) => {
    setTouched({});
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const current = steps[currentStep];

  return (
    <div className="wizard-stepper">
      <h2>{current.title}</h2>
      <Formik
        initialValues={current.initialValues}
        validationSchema={current.validationSchema}
        onSubmit={(values, actions) => handleNext(values, actions)}
      >
        {({ values, handleChange, handleBlur }) => (
          <Form>
            {current.component({
              values,
              handleChange,
              handleBlur,
            })}
            <div className="buttons">
              {currentStep > 0 && (
                <button type="button" onClick={handleBack}>
                  Back
                </button>
              )}
              <button type="submit">
                {currentStep < steps.length - 1 ? 'Next' : 'Finish'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default WizardStepper;
