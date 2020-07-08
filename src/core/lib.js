import * as EmailValidator from "email-validator";

const validateURL = str => {
  try {
    new URL(str);
  } catch (_) {
    return false;
  }
  return true;
};

const validateEmail = email => EmailValidator.validate(email);
// const regex = `/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/`;
// return regex.test(String(email).toLowerCase());

export { validateURL, validateEmail };
