import successImage from './success.svg';

export default function FormSubmited() {
    return (
        <div style={{'textAlign': 'center'}}>
            <img src={successImage} alt='' loading='lazy' />
        </div>
    )
}