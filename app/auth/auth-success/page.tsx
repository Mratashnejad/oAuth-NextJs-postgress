import { RxCheckCircled } from "react-icons/rx";
import Link from 'next/link';

const AuthSuccessPage: React.FC = () => {
  return (
    <div className="auth-success-page">
      <div className="auth-success-card">
        <div className="auth-success">
          <RxCheckCircled className="icon" />
          <h1>Success!</h1>
          <p>Please check your email inbox for the sign-in link.</p>
        </div>
        <div className="back-link">
          <p>
            Didn't receive an email? To go back to the sign-in page and try again, <Link href="/api/auth/signin" className="link-text">Click Here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthSuccessPage;
