import React from 'react';
import {useFormik} from 'formik';


const validation = (email, password) => {
  const errors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    errors.email = 'Field required';
  }
  else if (!emailRegex.test(email)) {
    errors.emailFormat = 'Username should be an email';
  }
  if (!password) {
    errors.password = 'Field required';
  }

  return errors;
};

function App() {
  const formik = useFormik(
      {
        initialValues: {
          email: '',
          password: ''
        },
        onSubmit: (values) => {
          console.log('form', values);
          const errors = validation(values.email, values.password);
          if (Object.keys(errors).length === 0) {
            alert('Login Successful');
          }
        },
        validate: ({email, password}) => {
          return validation(email, password);
        }
      }
  );

  return (
      <div>
        <form onSubmit={formik.handleSubmit}>

          {/* Email */}
          <div>
            <label>Username:</label>
            <input id="emailField" name="email" type="text"
                   value={formik.values.email}
                   onChange={formik.handleChange}/>
            {formik.errors.email && <div id="emailError" style={{color:'red'}}>{formik.errors.email}</div>}
            {formik.errors.emailFormat && <div id="emailError" style={{color:'red'}}>{formik.errors.emailFormat}</div>}
          </div>

          {/* Password */}
          <div>
            <label>Password:</label>
            <input id="pswField" name="password" type="password"
                   value={formik.values.password}
                   onChange={formik.handleChange}/>
            {formik.errors.password && <div id="pswError" style={{color:'red'}}>{formik.errors.password}</div>}
          </div>

          <button id="submitBtn" type="submit">Submit</button>
        </form>
      </div>
  );
}

export default App;
