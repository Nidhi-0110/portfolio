import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home   from './pages/Home';
import ScrollProgress from './components/Common/ScrollProgress';
import BackToTop      from './components/Common/BackToTop';
import ToastContainer from './components/Common/Toast';
import { useToast }   from './hooks/useToast';

export default function App() {
  const { toasts, addToast, removeToast } = useToast();

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <Home addToast={addToast} />
      <Footer />
      <BackToTop />
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </>
  );
}
