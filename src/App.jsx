// App.jsx
import Header from './Components/Header/header';
import Hero from './Components/Hero/hero'; // import du Hero
import Footer from './Components/Footer/footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />

      {/* Section Hero */}
      <Hero />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
