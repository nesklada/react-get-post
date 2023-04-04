import { Alert } from '@mui/material';
import Swal from 'components/Swal/Swal';

export default function response(url, params, utms = '') {
    const URL = url + utms;

    return fetch(URL, {
        method: 'GET',
        ...(params ? params : {})
    })
            .then(data => data.json())
            .then(data => {
                if(data.success === false) {
                    throw new Error(JSON.stringify(data));
                }

                return data;
            })
            .catch(error => {
                if(error.name === 'AbortError') {
                    return
                }
                
                const err = jsonError(error.message);

                const fails = err?.fails;
                const failsKeys = fails ? Object.keys(fails) : null;
                let listOfBackendErrors = null;

                if(failsKeys) {
                    listOfBackendErrors = <div style={{textAlign: 'left'}}>{failsKeys.map((target, i) => {
                        return (<Alert style={{marginBottom: `${((i + 1) === failsKeys.length) ? '0' : '10px'}`}} severity="error">
                            <b>{target}:</b>
                            {fails[target].map((err) => <div>{err}</div>)}
                        </Alert>)
                    })}</div>;
                }
                
                const isBackendError = err.success === false;

                Swal.fire({
                    icon: 'error',
                    title: isBackendError ? err.message : 'Something went wrong!',
                    html: listOfBackendErrors || (isBackendError ? '' : 'Please try again latter.')
                });
            });
}

function jsonError(text){
    try{
        var json = JSON.parse(text);
        return (typeof json === 'object') ? json : false;
    }
    catch (error){
        return false;
    }
}