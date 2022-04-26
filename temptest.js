import firebase from 'firebase/app';
import 'firebase/database';

export default function CustomerContent() {
    const [designers, setDesigners] = useState([]);

    function printUsers() {
        var users = firebase.database().ref('/users');
        users.on('value', (snapshot) => {
            snapshot.forEach((snap) => {
                const userObject = snap.val();
                console.log(userObject);
                const role = userObject['role'];
                console.log(role);
                if (role === 'designer') {
                    const newDesigners = [...designers, userObject];
                    setDesigners(newDesigners);
                }
            });
        });
    }
    useEffect(() => {
        printUsers();
        console.log(designers);
    }, []);

    return (
        <div>
            <h2>The designer are...</h2>
            <ul>
                {designers.map((designerObject) => {
                    return <li>{designerObject.name}</li>;
                })}
            </ul>
        </div>
    );
}