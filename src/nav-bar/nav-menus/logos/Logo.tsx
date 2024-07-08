import soccer from './soccer.jpg';
import '../../../styling/styles.css';

export const Logo: React.FC = () => {
    return(
        <div className="container soccer-logo">
           <img src={soccer} alt="Logo" />
        </div>
    );

}