import {format} from 'date-fns';

export const formatDate = (date, time) =>{
    time = time || null;
    if(date)
        return format(new Date(date), `dd/MM/yyyy ${time ? 'HH:mm:ss' : ''}`);
    return 'Empty';
}