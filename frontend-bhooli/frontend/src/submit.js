// submit.js

export const SubmitButton = ({onClick}) => {

    return (
        <div className="custom-button"
      //  style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
        >
            <button onClick ={onClick} type="submit">Submit</button>
        </div>
    );
}

