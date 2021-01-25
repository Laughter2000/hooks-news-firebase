import React from 'react';
import { FirebaseContext } from '../../firebase';
import useFormValidation from '../Auth/useFormValidation';
import validateCreateLink from '../Auth/validateCreateLink';

const INITIAL_STATE = {
  description: '',
  url: '',
};

function CreateLink(props) {
  const { firebase, user } = React.useContext(FirebaseContext);
  const { handleSubmit, handleChange, values, errors } = useFormValidation(
    INITIAL_STATE,
    validateCreateLink,
    handleCreateLink
  );

  function handleCreateLink() {
    if (!user) {
      props.history.push('./login');
    } else {
      const { description, url } = values;
      const newLink = {
        description,
        url,
        postedBy: {
          id: user.uid,
          name: user.displayName,
        },
        votes: [],
        voteCount: 0,
        comments: [],
        created: Date.now(),
      };
      firebase.db.collection('Links').add(newLink);
      props.history.push('./');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-column mt3">
      <input
        type="text"
        name="description"
        placeholder="A description for your link"
        value={values.description}
        onChange={(e) => handleChange(e)}
        className={errors.description && 'error-input'}
      />
      {errors.description && <p className="error-text">{errors.description}</p>}
      <input
        type="text"
        name="url"
        placeholder="The Url for your link"
        value={values.url}
        onChange={(e) => handleChange(e)}
        className={errors.url && 'error-input'}
      />
      {errors.url && <p className="error-text">{errors.url}</p>}
      <button className="button">Submit</button>
    </form>
  );
}

export default CreateLink;
