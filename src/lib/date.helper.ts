export function convertDate(dateToConvert : Date){
    
    const yyyy = dateToConvert.getFullYear().toString();
    const mm = (dateToConvert.getMonth()+1).toString();
    const dd  = dateToConvert.getDate().toString();
  
    const mmChars = mm.split('');
    const ddChars = dd.split('');
  
    return yyyy + '-' + (mmChars[1]?mm:"0"+mmChars[0]) + '-' + (ddChars[1]?dd:"0"+ddChars[0]);
}