import * as URL from './urls';
import axios from 'axios';

const handleGetDate = async ({ setData }) => {
    axios.get(URL.getMovieURL).
        then(data => {
            setData(data.data)
            // console.log(data)
        }).
        catch(err => console.log(err))
}

const handleSetYear = async ({ year, setData }) => {
    await axios.get(URL.getMoviesByYearURL + year).
        then(data => {
            setData(data.data)
            // console.log(data)
        }).
        catch(err => console.log(err))
}

const handleAddData = async ({ newdata, setData }) => {
    await axios.post(URL.addMovieURL, newdata).
        then(data => {
            handleGetDate(setData)
            console.log(data)
        }).
        catch(err => console.log(err))
}

const handleUpdateData = async ({ id, updatedData, setData }) => {
    await axios.put(URL.updateMovieURL + id, updatedData).
        then(data => {
            handleGetDate(setData)
            console.log(data)
        }).
        catch(err => console.log(err))
}

const handleDelete = async ({ id, data, setData }) => {
    await axios.delete(URL.deleteMovieByIdURL + id).
        then(() => {
            console.log("movie deleted")
            setData(data.filter((row) => (row.id != id)))
        }).
        catch(err => console.log(err))
}

export {
    handleGetDate,
    handleSetYear,
    handleAddData,
    handleUpdateData,
    handleDelete
}