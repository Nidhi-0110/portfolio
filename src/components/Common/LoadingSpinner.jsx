import './LoadingSpinner.css';

export default function LoadingSpinner() {
  return (
    <div className="loading-overlay" aria-label="Loading">
      <div className="loading-ring">
        <div /><div /><div /><div />
      </div>
    </div>
  );
}
