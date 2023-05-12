import './App.css';
import RestaurantList from './components/RestaurantList';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className='App'>
      <Sidebar />
      <RestaurantList />
    </div>
  );
}

export default App;
