const formatDate = (props) => {
    let date = props

    let arrayDate = date.split('');

    let year = (arrayDate[0] + arrayDate[1] + arrayDate[2] + arrayDate[3]);
    let month = (arrayDate[5] + arrayDate[6]);
    let day = (arrayDate[8] + arrayDate[9]);
    let newDate = [year, month, day];

    let formattedDate = (newDate.join('-'));
    return formattedDate;
  }

export default formatDate;