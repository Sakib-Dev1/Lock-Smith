import About from '../About/About';
import Banner from '../Banner/Banner';
import Footer from '../Footer/Footer';
import Navbar from '../Header/NavBar';
import Services from '../Services/Services';
import Statistics from '../Statistics/Statistics';
import Testimonials from '../Testimonials/Testimonials';

const Home = () => {
  return (
    <div>
      <Navbar />
      <Banner/>
      <About/>
      <Statistics/>
      <Services/>
      <Testimonials/>
      <Footer/>
    </div>
  );
};

export default Home;
