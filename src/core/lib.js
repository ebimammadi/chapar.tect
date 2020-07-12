const validateURL = str => {
  try {
    new URL(str);
  } catch (_) {
    return false;
  }
  return true;
};

const validateSlug = slug => RegExp(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).test(slug);

const validateEmail = email => /\S+@\S+\.\S+/.test(email);
//! Warning this email validation is not really complete!
//import * as EmailValidator from "email-validator";
//https://ui.dev/validate-email-address-javascript/

export { validateURL, validateEmail, validateSlug };
