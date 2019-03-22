// const {
// Avatar,
// Button,
// CssBaseline,
// FormControl,
// FormControlLabel,
// Checkbox,
// Input,
// InputLabel,
// LockOutlinedIcon,
// Icon,
// Paper,
// Typography,
// withStyles,

// InputAdornment,
// IconButton,
// Visibility,
// VisibilityOff,
// Tooltip,

// } = window['material-ui'];

// const PropTypes = window.PropTypes;



import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
// import Visibility from '@material-ui/core/Visibility';
// import VisibilityOff from '@material-ui/core/VisibilityOff';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import { Formik } from "formik";
import * as Yup from "yup";
import TextField from '@material-ui/core/TextField';
import axios from "axios";
import AlertDialogSlide from './ErrorDialogues';


const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});


class Form extends React.Component {
  constructor(props) {
    super(props);

  }

  render () {

  const { classes } = this.props;

  const {
    values: { name, email, password, confirmPassword },
    errors,
    touched,
    handleSubmit,
    handleChange,
    isValid,
    setFieldTouched
  } = this.props;


  const change = (name, e) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };

 return (
   <form
     onSubmit={handleSubmit}
     className={classes.form}
   >
     <TextField
       id="name"
       name="name"
       helperText={touched.name ? errors.name : ""}
       error={touched.name && Boolean(errors.name)}
       label="Name"
       value={name}
       onChange={change.bind(null, "name")}
       fullWidth
       className={classes.form}
       required

     />
     <TextField
       id="email"
       name="email"
       helperText={touched.email ? errors.email : ""}
       error={touched.email && Boolean(errors.email)}
       label="Email"
       fullWidth
       value={email}
       onChange={change.bind(null, "email")}
       className={classes.form}
       required

     />
     <TextField
       id="password"
       name="password"
       helperText={touched.password ? errors.password : ""}
       error={touched.password && Boolean(errors.password)}
       label="Password"
       fullWidth
       type="password"
       value={password}
       onChange={change.bind(null, "password")}
       className={classes.form}
       required

     />
     <TextField
       id="confirmPassword"
       name="confirmPassword"
       helperText={touched.confirmPassword ? errors.confirmPassword : ""}
       error={touched.confirmPassword && Boolean(errors.confirmPassword)}
       label="Confirm Password"
       fullWidth
       type="password"
       value={confirmPassword}
       onChange={change.bind(null, "confirmPassword")}
       className={classes.form}
       required

     />
     <Button
       type="submit"
       fullWidth
       variant="contained"
       color="primary"
       disabled={!isValid}
       className={classes.submit}
     >
       Submit
     </Button>
   </form>
 );
}
}

// export default withStyles(styles)(InputForm);
const FormComponent = withStyles(styles)(Form);

class InputForm extends React.Component {
 constructor(props) {
   super(props);
   this.state = {
     usernameError: false
   };
 }

 componentDidUpdate() {
  const { errors } = this.props;

  this.form.setErrors(errors);
}

 render() {
   const { classes } = this.props;
   const values = { name: "", email: "", confirmPassword: "", password: "" };

   // submit function
const submitValues = ({ name, email, confirmPassword, password }) => {
    console.log({ name, email, confirmPassword, password });

    // send user/id password to check and persist
    // $.ajax({
    //     url: "http://localhost:8080/system/userManager/user.create.html",
    //     type: "POST",
    //     async: false,
    //     global: false,
    //     dataType: "text",
    //     data: {
    //         // _charset_: "utf-8",
    //         ":name": name,
    //         pwd: password,
    //         pwdConfirm: confirmPassword,
    //         email: email
    //     },
    //     success: function (){
    //       alert("Created user!");
    //     },
    //     error: function() {
    //     alert("Error creating user");
    //     }
    // });

    // Axios with promise based syntax
    // axios({
    //   method: 'post',
    //   url: '/system/userManager/user.create.html',
    //   headers: {
    //     // Unsure if following is actually needed
    //     // 'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
    //   },
    //   dataType: "text",
    //   params: {
    //     ":name": name,
    //     pwd: password,
    //     pwdConfirm: confirmPassword,
    //     email: email
    //   }
    // })
    // .then(function (response) {
    //   alert("Created user!");
    // })
    // .catch(function (error) {
    //   alert("Error creating user");
    // });

    // Use native fetch, sort like the XMLHttpRequest so 
    //  no need for other libraries.
    function handleErrors(response) {
      if (response.status == 500) {
        console.log('Detected 500 response');
        this.setState({
          usernameError: true
        });
      }
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    }
    
    // Build formData object.
    // We need to do this because sling does not accept JSON, need
    //  url encoded data
    let formData = new FormData();
    formData.append(":name", name);
    formData.append('pwd', password);
    formData.append('pwdConfirm', confirmPassword);
    formData.append('email', email);

    // Important note about native fetch, it does not reject failed
    // HTTP codes, it'll only fail when network error
    // Therefore, you must handle the error code yourself.
    fetch('/system/userManager/user.create.html', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
     body: formData
    })
    .then(handleErrors) // Handle errors first
    .then(function (response) {
      alert("Created user!");
    })
    .catch(function (error) {
      alert("Error creating user. Check console.");
    });
  };

  const validationSchema = Yup.object({
    name: Yup.string("Enter a name")
    .required("Name is required"),
    email: Yup.string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
    password: Yup.string("")
    .min(8, "Password must contain at least 8 characters")
    .required("Enter your password"),
    confirmPassword: Yup.string("Enter your password")
    .required("Confirm your password")
    .oneOf([Yup.ref("password")], "Password does not match"),
  });

  // Hooks only work inside functional components
  // const formikRef = React.useRef();

   return (
     <React.Fragment>
          {this.state.usernameError &&
            <AlertDialogSlide></AlertDialogSlide>
          }
          <div className={classes.main}>
         <Paper elevation={1} className={classes.paper}>
          <Typography component="h1" variant="h5">
           Sign Up Form
          </Typography>
           <Avatar className={classes.avatar}>
            <Icon>group_add</Icon>
           </Avatar>
           <Formik
             render={props => <FormComponent {...props} />}
             initialValues={values}
             validationSchema={validationSchema}
             onSubmit={submitValues}
            //  ref={formikRef}
            ref={el => (this.form = el)}
           />
         </Paper>
       </div>
     </React.Fragment>
   );
 }
}

// export default withStyles(styles)(InputForm);
const InputFormComponent = withStyles(styles)(InputForm);


class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      passwordIsMasked: false,
    };
  }

  togglePasswordMask = () => {
    this.setState(prevState => ({
      passwordIsMasked: !prevState.passwordIsMasked,
    }));
  };

  render () {
    const { classes } = this.props;
    const { passwordIsMasked } = this.state;
  
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            {/*<LockOutlinedIcon />*/}
            <Icon>lock</Icon>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} method="POST" action={loginValidationPOSTPath}>
            <input type="hidden" name="resource" value={loginRedirectPath} />
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="j_username">Username</InputLabel>
              <Input id="j_username" name="j_username" autoComplete="email" autoFocus />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="j_password">Password</InputLabel>
              <Input name="j_password" type={this.state.passwordIsMasked ? 'text' : 'password'} id="j_password" autoComplete="current-password"
                endAdornment={
                <InputAdornment position="end">
                  <Tooltip title={this.state.passwordIsMasked ? "Mask Password" : "Show Password"}>
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={this.togglePasswordMask}
                    >
                      {this.state.passwordIsMasked ? <Icon>visibility</Icon> : <Icon >visibility_off</Icon>}
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              }
             />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign in
            </Button>
          </form>
          <Typography>
            Don't have an account?
          </Typography>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
          >
            Register
          </Button>
        </Paper>
      </main>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

// export default withStyles(styles)(SignIn);

const SignInComponent = withStyles(styles)(SignIn);





class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      name: '',
    };

  }

  render () {


    const { classes } = this.props

    // I'm produce state using useState.
    // The second parameter that will keep the first parameter value will change the value.
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [fruit, setFruit] = useState('')

    //When the form is submitted it will run
    function onSubmit(e){
      e.preventDefault()//blocks the postback event of the page
      console.log('email: '+email)
      console.log('password: '+password)
      console.log('name: '+name)
      console.log('fruit: '+fruit)
    }

    return (
      <main className={classes.main}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register Account
              </Typography>
          <form className={classes.form} onSubmit={onSubmit}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="name">Name</InputLabel>
              {/* When the name field is changed, setName will run and assign the name to the value in the input. */}
              <Input id="name" name="name" autoComplete="off" autoFocus value={name} onChange={e => setName(e.target.value)}  />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              {/* When the e-mail field is changed, setEmail will run and assign the e-mail to the value in the input. */}
              <Input id="email" name="email" autoComplete="off" value={email} onChange={e => setEmail(e.target.value)}   />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              {/* When the password field is changed, setPassword will run and assign the password to the value in the input. */}
              <Input name="password" type="password" id="password" autoComplete="off" value={password} onChange={e => setPassword(e.target.value)}  />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="fruit">Your Favorite Fruit</InputLabel>
              {/* When the fruit field is changed, setFruit will run and assign the fruit to the value in the input. */}
              <Input name="fruit" type="text" id="fruit" autoComplete="off" value={fruit} onChange={e => setFruit(e.target.value)}  />
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}>
              Register
                  </Button>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"

              className={classes.submit}>
              Go back to Login
                  </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

const RegisterComponent = withStyles(styles)(Register);

class Main extends React.Component {
  render () {
    return (
      <div>
        <SignInComponent />
        {/* <RegisterComponent /> */}
        <InputFormComponent />
      </div>
    );
  }
}

ReactDOM.render(
  <Main />,
  // withStyles(styles, EnhancedTable),
  document.getElementById('main-login-container')
);