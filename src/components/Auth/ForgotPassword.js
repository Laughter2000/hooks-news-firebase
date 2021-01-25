import React from 'react';
import { FirebaseContext } from '../../firebase';

function ForgotPassword() {
  const { firebase } = React.useContext(FirebaseContext);
  const [resetPasswordEmail, setResetPasswordEmail] = React.useState('');
  const [isResetPassword, setIsResetPassword] = React.useState(false);
  const [passwordResetError, setPasswordResetError] = React.useState(null);

  async function handleResetPassword() {
    try {
      await firebase.resetPassword(resetPasswordEmail);
      setIsResetPassword(true);
      setPasswordResetError(null);
    } catch (err) {
      console.error('Error sending email', err);
      setIsResetPassword(false);
      setPasswordResetError(err.message);
    }
  }
  return (
    <div>
      <input
        type="email"
        name="email"
        value={resetPasswordEmail}
        placeholder="Provide your email address"
        onChange={(e) => setResetPasswordEmail(e.target.value)}
      />

      <div>
        <button className="button" onClick={handleResetPassword}>
          Reset Password
        </button>
      </div>
      {isResetPassword && <p>Check your email to reset password</p>}
      {passwordResetError && <p className="error-text">{passwordResetError}</p>}
    </div>
  );
}

export default ForgotPassword;
