import ItemView from './ItemView';
import ItemActions from './ItemActions';
import './MainPage.css'; // Enhanced styling
import WebcamBarcodeScanner from './Scanner/QRScan';

const MainPage = () => {
  return (
    <div className="main-container">
      <WebcamBarcodeScanner />
      <ItemView />
      <ItemActions />
    </div>
  );
};

export default MainPage;
