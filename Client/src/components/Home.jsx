import React from 'react';
import '../cssApp/Home.css';
import houseImage from '../images1/Home.png';
import selectPropertyIcon from '../images1/property.png';
import contactAgentIcon from '../images1/agent.png';
import moveInIcon from '../images1/moveIn.png';
import houseBackground from '../images1/background.jpg';

const Home = () => {
    return (
        <div className='home'>
            <div className='home-container' style={{ backgroundImage: `url(${houseBackground})` }}>
                <div className='home-content'>
                    <h2>Découvrez votre prochain chez-vous</h2>
                    <h1>Économisez en louant ou achetant avec nous</h1>
                    <p>Trouvez la maison, l'appartement ou le local commercial parfait. Des options flexibles et des prix compétitifs.</p>
                    <div className='home-buttons'>
                        <button className='home-button book-ride'>Louer</button>
                        <button className='home-button learn-more'>Acheter</button>
                    </div>
                </div>
            </div>
            <div className='features-container'>
                <h2>Découvrez nos services</h2>
                <h1>Facilitez la location et l'achat immobilier</h1>
                <div className='features'>
                    <div className='feature'>
                        <img src={selectPropertyIcon} alt='Choisir un bien' className='feature-icon' />
                        <h3>Choisir un bien</h3>
                        <p>Explorez notre vaste sélection de propriétés pour trouver celle qui vous convient le mieux.</p>
                    </div>
                    <div className='feature'>
                        <img src={contactAgentIcon} alt='Contacter un agent' className='feature-icon' />
                        <h3>Contacter un agent</h3>
                        <p>Nos agents sont disponibles pour répondre à toutes vos questions et vous guider dans le processus.</p>
                    </div>
                    <div className='feature'>
                        <img src={moveInIcon} alt='Emménager' className='feature-icon' />
                        <h3>Emménager</h3>
                        <p>Profitez de notre assistance pour faciliter votre déménagement et vous installer sans stress.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
