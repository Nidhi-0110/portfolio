import './Toast.css';

export default function ToastContainer({ toasts, removeToast }) {
  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map(t => (
        <div key={t.id} className={`toast toast-${t.type}`}>
          <i className={t.type === 'success' ? 'fas fa-circle-check' : 'fas fa-triangle-exclamation'} />
          <span>{t.message}</span>
          <button className="toast-close" onClick={() => removeToast(t.id)} aria-label="Dismiss">
            <i className="fas fa-times" />
          </button>
        </div>
      ))}
    </div>
  );
}
