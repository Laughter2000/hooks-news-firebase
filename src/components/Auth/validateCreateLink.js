export default function validateCreateLink(values) {
  let errors = {};

  //Description Errors
  if (!values.description) {
    errors.description = 'Description required';
  } else if (values.description.length < 10) {
    errors.description = 'Description must be atleat 10 characters';
  }

  //Url Errors
  if (!values.url) {
    errors.url = 'Url required';
  } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url)) {
    errors.url = 'Enter a valid Url';
  }

  return errors;
}
