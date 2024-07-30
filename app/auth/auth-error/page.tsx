import { RxExclamationTriangle } from "react-icons/rx";
import Link from 'next/link';

const AuthErrorPage: React.FC = () => {
  return (
    <div className="auth-error-page">
      <div className="auth-error-card">
        <div className="auth-error">
          <RxExclamationTriangle className="icon" />
          <h1>Oops, something went wrong.</h1>
          <h5>Please try again later or contact support.</h5>
          <p>It seems there's been an issue with your authentication.</p>
        </div>
        <div className="back-link">
          <p>
            To return to the sign-in page, <Link href="/api/auth/signin" className="link-text">Click Here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthErrorPage;
